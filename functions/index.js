const functions = require("firebase-functions");

const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

exports.countScoreUpload = functions
  .region("australia-southeast1")
  .firestore.document("/tournaments/{tournamentId}/scores/{scoreDoc}")
  .onWrite(async (change, context) => {
    const scoreData = change.after.data();
    const tournamentId = context.params.tournamentId;
    const scoreDoc = context.params.scoreDoc;
    console.log(scoreDoc);
    console.log(tournamentId);
    console.log(scoreData.skipperId);

    if (scoreData.judgingType === "finalScores") {
      console.log("final scores doc changed");
      return;
    }
    console.log("not final scores");

    let difficultyUploaded = false;
    let requiredElementsUploaded = false;
    let presentationAUploaded = false;
    let presentationRUploaded = false;

    let existingFinalScoresDoc = null;
    let difficultyRawScores = null;
    let presentationARawScores = null;
    let presentationRRawScores = null;
    let requiredElementsRawScores = null;

    admin
      .firestore()
      .collection(`tournaments/${tournamentId}/scores`)
      .where("skipperId", "==", `${scoreData.skipperId}`)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          console.log("judgingtype: ", doc.data().judgingType);
          switch (doc.data().judgingType) {
          case "difficulty":
            difficultyUploaded = true;
            console.log("difficulty uploaded");
            difficultyRawScores = doc.data();
            break;
          case "routine presentation":
            presentationRUploaded = true;
            console.log("pres R uploaded");
            presentationRRawScores = doc.data();
            break;
          case "athlete presentation":
            presentationAUploaded = true;
            console.log("pres A uploaded");
            presentationARawScores = doc.data();
            break;
          case "required elements":
            requiredElementsUploaded = true;
            console.log("re uploaded");
            requiredElementsRawScores = doc.data();
            break;
          case "finalScores":
            console.log("final scores uploaded in document: ", doc.id);
            existingFinalScoresDoc = doc.id;
            break;
          }
        });
        if (
          difficultyUploaded &&
          requiredElementsUploaded &&
          presentationAUploaded &&
          presentationRUploaded
        ) {
          const finalScores = calculateRoutineScore(
            difficultyRawScores,
            presentationRRawScores,
            presentationARawScores,
            requiredElementsRawScores,
          );
          uploadRoutineScore(
            finalScores,
            tournamentId,
            scoreData.skipperId,
            existingFinalScoresDoc,
          );
        }
      });
  });

const uploadRoutineScore = async (
  finalScores,
  tournamentId,
  skipperId,
  existingFinalScoresDoc,
) => {
  const scoreData = {
    skipperId,
    judgingType: "finalScores",
  };

  Object.assign(scoreData, finalScores);

  console.log("Existing final scores doc: ", existingFinalScoresDoc);

  if (existingFinalScoresDoc !== null) {
    admin
      .firestore()
      .collection(`tournaments/${tournamentId}/scores`)
      .doc(existingFinalScoresDoc)
      .set(scoreData)
      .catch((error) => {
        console.log("error adding document: ", error);
      });
  } else {
    admin
      .firestore()
      .collection(`tournaments/${tournamentId}/scores`)
      .add(scoreData)
      .then((docRef) => {
        console.log("document written with id:", docRef.id);
      })
      .catch((error) => {
        console.log("error adding document: ", error);
      });
  }
};

const calculateRoutineScore = (
  difficultyRawScores,
  presentationRRawScores,
  presentationARawScores,
  requiredElementsRawScores,
) => {
  console.log("calculating routine score...");
  const difficultyScore = calculateDifficultyScore(difficultyRawScores);

  const presentationScore = calculatePresentationScore(
    presentationARawScores,
    presentationRRawScores,
  );

  const deductionScore = calculateDeductionScore(
    presentationARawScores,
    requiredElementsRawScores,
  );

  const requiredElementsScore = calculateRequiredElementsScore(
    requiredElementsRawScores,
  );

  let repetitionScore = requiredElementsRawScores["Repeated Skills"];

  repetitionScore = difficultyScore > repetitionScore ? repetitionScore : 0;

  const routineScore = parseFloat(
    (
      (difficultyScore - repetitionScore) *
      presentationScore *
      deductionScore *
      requiredElementsScore
    ).toFixed(2),
  );

  console.log("difficulty score ", difficultyScore);
  console.log("presentationScore ", presentationScore);
  console.log("deductionscore", deductionScore);
  console.log("required elements score", requiredElementsScore);
  console.log("repetition score", repetitionScore);
  console.log("Routine score ", routineScore);
  return {
    difficultyScore,
    presentationScore,
    deductionScore,
    requiredElementsScore,
    repetitionScore,
    routineScore,
  };
};

const calculateDifficultyScore = (difficultyRawScores) => {
  let difficultyScore = 0;
  // For each value in the counter, add a certain number of points
  // depending on the level of the trick

  Object.keys(difficultyRawScores)
    .filter((item) => item.includes("Level"))
    .forEach((scoreKey) => {
      const counter = difficultyRawScores[scoreKey];
      const level = parseFloat(scoreKey.split(" ")[1]);
      difficultyScore += (0.1 * 1.8 ** level).toFixed(2) * counter;
    });
  console.log("diff", difficultyScore);
  return parseFloat(difficultyScore.toFixed(2));
};

const calculatePresentationScore = (
  presentationARawScores,
  presentationRRawScores,
) => {
  console.log(presentationRRawScores);
  console.log("musicality tick", presentationRRawScores["Musicality ✓"]);
  const formScore =
    (0.5 * (-1 * presentationARawScores["-"] + presentationARawScores["+"])) /
    (presentationARawScores["-"] +
      presentationARawScores["✓"] +
      presentationARawScores["+"]);
  const musicalityScore =
    (0.25 *
      (-1 * presentationRRawScores["Musicality -"] +
        presentationRRawScores["Musicality +"])) /
    (presentationRRawScores["Musicality -"] +
      presentationRRawScores["Musicality ✓"] +
      presentationRRawScores["Musicality +"]);
  const entertainmentScore =
    (0.25 *
      (-1 * presentationRRawScores["Entertainment -"] +
        presentationRRawScores["Entertainment +"])) /
    (presentationRRawScores["Entertainment -"] +
      presentationRRawScores["Entertainment ✓"] +
      presentationRRawScores["Entertainment +"]);

  let presentationScore = 1 + formScore + musicalityScore + entertainmentScore;
  console.log(formScore);
  console.log(musicalityScore);
  console.log(entertainmentScore);

  presentationScore = Math.min(Math.max(presentationScore, 0.4), 1.6);

  return parseFloat(presentationScore.toFixed(2));
};

const calculateDeductionScore = (
  presentationARawScores,
  requiredElementsRawScores,
) => {
  const averageMisses = Math.round(
    (presentationARawScores["Mistakes"] +
      requiredElementsRawScores["Mistakes"]) /
      2,
  );
  const deductionScore = Math.max(
    0,
    1 -
      0.025 *
        (averageMisses +
          requiredElementsRawScores["Space Violations"] +
          requiredElementsRawScores["Time Violations"]),
  );

  return deductionScore;
};

const calculateRequiredElementsScore = (requiredElementsRawScores) => {
  const missingMultiples = Math.max(
    0,
    4 - requiredElementsRawScores["Multiples"],
  );
  const missingGymPower = Math.max(
    0,
    4 - requiredElementsRawScores["Gymnastics / Power"],
  );
  const missingWrapsReleases = Math.max(
    0,
    4 - requiredElementsRawScores["Wraps / Releases"],
  );
  const requiredElementsScore =
    1 - 0.025 * (missingMultiples + missingGymPower + missingWrapsReleases);
  return requiredElementsScore;
};
