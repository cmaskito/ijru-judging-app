// allows the file to access cloud functions
const functions = require("firebase-functions");

// Allows the cloud functions to access the
// firestore database using an admin service account
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// This function will run each time a document
// is added or updated to the scores collection
exports.countScoreUpload = functions
  .region("australia-southeast1")
  .firestore.document("/tournaments/{tournamentId}/scores/{scoreDoc}")
  .onWrite(async (change, context) => {
    // gets data from the file that was uploaded
    const scoreData = change.after.data();
    const tournamentId = context.params.tournamentId;

    // Checks if the document uploaded was a 'finalScores' document
    // if it is, it stops the function to prevent an infinite loop
    if (scoreData.judgingType === "finalScores") {
      return;
    }

    // variables holding the data from docs on the db
    let existingFinalScoresDoc = null;
    let difficultyRawScores = null;
    let presentationARawScores = null;
    let presentationRRawScores = null;
    let requiredElementsRawScores = null;

    // Checks the database for other score documents on the database belonging
    // to the skippers whose score was just uploaded
    // Saves the data on the documents fetched to a variable
    admin
      .firestore()
      .collection(`tournaments/${tournamentId}/scores`)
      .where("skipperId", "==", `${scoreData.skipperId}`)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          switch (doc.data().judgingType) {
            case "difficulty":
              difficultyRawScores = doc.data();
              break;
            case "routine presentation":
              presentationRRawScores = doc.data();
              break;
            case "athlete presentation":
              presentationARawScores = doc.data();
              break;
            case "required elements":
              requiredElementsRawScores = doc.data();
              break;
            case "finalScores":
              existingFinalScoresDoc = doc.id;
              break;
          }
        });
        // If all the components of the final score are uploaded
        // calculate the final scores and upload it to the database
        if (
          difficultyRawScores &&
          presentationARawScores &&
          presentationARawScores &&
          requiredElementsRawScores
        ) {
          // calculates final scores
          const finalScores = calculateRoutineScore(
            difficultyRawScores,
            presentationRRawScores,
            presentationARawScores,
            requiredElementsRawScores
          );
          // uploads final scores as a document to the scores collection
          uploadRoutineScore(
            finalScores,
            tournamentId,
            scoreData.skipperId,
            existingFinalScoresDoc
          );
        }
      });
  });

// Uploads the final scores as a document to the scores collection
const uploadRoutineScore = async (
  finalScores,
  tournamentId,
  skipperId,
  existingFinalScoresDoc
) => {
  // creates an object with the final scores in addition to the
  // skipper id and 'judgingType' of finalScores
  const scoreData = {
    skipperId,
    judgingType: "finalScores",
  };
  Object.assign(scoreData, finalScores);

  // If there is an existing document with final scores
  // on the database
  if (existingFinalScoresDoc !== null) {
    // Overwrite the existing doc
    admin
      .firestore()
      .collection(`tournaments/${tournamentId}/scores`)
      .doc(existingFinalScoresDoc)
      .set(scoreData)
      .catch((error) => {
        console.log("error adding document: ", error);
      });
  } else {
    // Create a new final scores doc
    admin
      .firestore()
      .collection(`tournaments/${tournamentId}/scores`)
      .add(scoreData)
      .catch((error) => {
        console.log("error adding document: ", error);
      });
  }
};

// Calculates the routine score from the
// difficulty, presentation, deduction,
// repetition and required elements scores
const calculateRoutineScore = (
  difficultyRawScores,
  presentationRRawScores,
  presentationARawScores,
  requiredElementsRawScores
) => {
  const difficultyScore = calculateDifficultyScore(difficultyRawScores);

  const presentationScore = calculatePresentationScore(
    presentationARawScores,
    presentationRRawScores
  );

  const deductionScore = calculateDeductionScore(
    presentationARawScores,
    requiredElementsRawScores
  );

  const requiredElementsScore = calculateRequiredElementsScore(
    requiredElementsRawScores
  );

  let repetitionScore = requiredElementsRawScores["Repeated Skills"];

  repetitionScore = difficultyScore > repetitionScore ? repetitionScore : 0;

  const routineScore = parseFloat(
    (
      (difficultyScore - repetitionScore) *
      presentationScore *
      deductionScore *
      requiredElementsScore
    ).toFixed(2)
  );
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
  // Level is found by extracing the level
  // number from the  name of the key
  Object.keys(difficultyRawScores)
    .filter((item) => item.includes("Level"))
    .forEach((scoreKey) => {
      const counter = difficultyRawScores[scoreKey];
      const level = parseFloat(scoreKey.split(" ")[1]);
      difficultyScore += (0.1 * 1.8 ** level).toFixed(2) * counter;
    });

  return parseFloat(difficultyScore.toFixed(2));
};

const calculatePresentationScore = (
  presentationARawScores,
  presentationRRawScores
) => {
  // Calculates form score
  const formScore =
    (0.5 * (-1 * presentationARawScores["-"] + presentationARawScores["+"])) /
    (presentationARawScores["-"] +
      presentationARawScores["✓"] +
      presentationARawScores["+"]);

  // calculates musicality score
  const musicalityScore =
    (0.25 *
      (-1 * presentationRRawScores["Musicality -"] +
        presentationRRawScores["Musicality +"])) /
    (presentationRRawScores["Musicality -"] +
      presentationRRawScores["Musicality ✓"] +
      presentationRRawScores["Musicality +"]);

  // calculates entertainment score
  const entertainmentScore =
    (0.25 *
      (-1 * presentationRRawScores["Entertainment -"] +
        presentationRRawScores["Entertainment +"])) /
    (presentationRRawScores["Entertainment -"] +
      presentationRRawScores["Entertainment ✓"] +
      presentationRRawScores["Entertainment +"]);

  // calculates presentation score
  let presentationScore = 1 + formScore + musicalityScore + entertainmentScore;

  // ensures the presentation score is within the
  // minimum and maximum value
  presentationScore = Math.min(Math.max(presentationScore, 0.4), 1.6);

  return parseFloat(presentationScore.toFixed(2));
};

const calculateDeductionScore = (
  presentationARawScores,
  requiredElementsRawScores
) => {
  // calculates average mistakes
  const averageMisses = Math.round(
    (presentationARawScores["Mistakes"] +
      requiredElementsRawScores["Mistakes"]) /
      2
  );

  // Calculates deduction score my multiplying number of
  // mistakes / violations by 0.025
  // Mathm.max() ensures that the value is not lower than 0
  const deductionScore = Math.max(
    0,
    1 -
      0.025 *
        (averageMisses +
          requiredElementsRawScores["Space Violations"] +
          requiredElementsRawScores["Time Violations"])
  );

  return deductionScore;
};

const calculateRequiredElementsScore = (requiredElementsRawScores) => {
  // Finds how many elements were missing from the routine
  const missingMultiples = Math.max(
    0,
    4 - requiredElementsRawScores["Multiples"]
  );
  const missingGymPower = Math.max(
    0,
    4 - requiredElementsRawScores["Gymnastics / Power"]
  );
  const missingWrapsReleases = Math.max(
    0,
    4 - requiredElementsRawScores["Wraps / Releases"]
  );
  // For each missing element, subtract 0.025 by 1
  const requiredElementsScore =
    1 - 0.025 * (missingMultiples + missingGymPower + missingWrapsReleases);

  return requiredElementsScore;
};
