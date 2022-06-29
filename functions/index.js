const functions = require("firebase-functions");

const admin = require("firebase-admin");

admin.initializeApp();

// exports.sayHello = functions.https.onCall(() => {
//   return "Hello World!";
// });

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

exports.countScoreUploads = functions.firestore
  .document("/tournaments/{tournamentId}/scores")
  .onWrite(async (change, context) => {
    const scoreData = change.after.data();
    const tournamentId = context.params.tournamentId;
    functions.logger.log(scoreData);
    functions.logger.debug(tournamentId);

    // const writeJudgingtype = await admin
    //   .firestore()
    //   .collection("tournaments/{tournamentId}/scoreCounter")
    //   .add({ skipperId: scoreData.skipperId });

    // const skipperScores = admin
    //   .firestore()
    //   .collection("tournaments/{tournamentId}/scores")
    //   .where("skipperId", "==", scoreData.skipperId)
    //   .get()
    //   .then((querySnashot) => {
    //     querySnashot.forEach((doc) => {
    //       functions.logger.log(doc.data());
    //     });
    //   })
    //   .catch((e) => {
    //     functions.logger.error(e);
    //   });

    // const data = admin
    //   .firestore()
    //   .collection("tournaments")
    //   .doc("")
    //   .where("skipperId", "==", scoreData.skipperId)
    //   .get()
    //   .then((result) => {
    //     if (result.size > 0) {
    //       result.forEach((doc) => {
    //         functions.logger.log(doc.data());
    //       });
    //     }
    //   });

    return data;
  });
