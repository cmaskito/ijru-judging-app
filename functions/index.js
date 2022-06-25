const functions = require("firebase-functions");

const admin = require("firebase-admin");

admin.initializeApp();

exports.sayHello = functions.https.onCall(() => {
  return "Hello World!";
});

exports.addMessage = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into Firestore using the Firebase Admin SDK.
  const writeResult = await admin
    .firestore()
    .collection("messages")
    .add({ original: original });
  // Send back a message that we've successfully written the message
  res.json({ result: `Message with ID: ${writeResult.id} added.` });
});

exports.countScoreUploads = functions.firestore
  .document("/tournaments/{tournamentId}/scores/{documentId}")
  .onCreate(async (snap, context) => {
    const scoreData = snap.data();

    const writeJudgingtype = await admin
      .firestore()
      .collection("tournaments/{tournamentId}/scoreCounter")
      .add({ skipperId: scoreData.skipperId });

    functions.logger.log("Uppercasing", context.params.documentId, judgingType);

    const uppercase = original.toUpperCase();

    return snap.ref.set({ uppercase }, { merge: true });
  });
