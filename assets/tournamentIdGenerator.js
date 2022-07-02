// this function will generate a unique 6 digit code for the tournaments
import { db } from "../firebase-config";
import { getDocs, collection, query, where } from "firebase/firestore";

export default async function generateTournamentId() {
  let unique = false;
  const minimum = 100000;
  const maximum = 999999;
  let tournamentId = undefined;

  while (unique == false) {
    unique = true;
    // Generates a random 6 digit number
    tournamentId =
      Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

    // Checks if the 6 digit number is already being used on the database
    const q = query(
      collection(db, "tournaments"),
      where("tournamentId", "==", tournamentId)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.data().tournamentId == tournamentId) unique = false;
    });
  }
  console.log("tostring", tournamentId.toString());
  return tournamentId;
}
