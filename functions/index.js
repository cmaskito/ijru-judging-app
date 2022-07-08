const functions = require("firebase-functions");

const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// exports.addMessage = functions.https.onRequest(async (req, res) => {
//   // Grab the text parameter.
//   const original = req.query.text;
//   // Push the new message into Firestore using the Firebase Admin SDK.
//   const writeResult = await admin
//     .firestore()
//     .collection("messages")
//     .add({ original: original });
//   // Send back a message that we've successfully written the message
//   res.json({ result: `Message with ID: ${writeResult.id} added.` });
// });

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

    let difficultyUploaded = false;
    let requiredElementsUploaded = false;
    let presentationAUploaded = false;
    let presentationRUploaded = false;

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
          }
        });
        if (
          difficultyUploaded &&
          requiredElementsUploaded &&
          presentationAUploaded &&
          presentationRUploaded
        ) {
          calculateRoutineScore(
            difficultyRawScores,
            presentationRRawScores,
            presentationARawScores,
            requiredElementsRawScores
          );
        }
      });
  });

const calculateRoutineScore = (
  difficultyRawScores,
  presentationRRawScores,
  presentationARawScores,
  requiredElementsRawScores
) => {
  console.log("calculating routine score...");
  console.log(difficultyRawScores);
  console.log(presentationARawScores);
  console.log(presentationRRawScores);
  console.log(requiredElementsRawScores);
  console.log(calculateDifficultyScore(difficultyRawScores));
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
  return parseInt(difficultyScore.toFixed(2));
};
