import { db } from "../firebase-config";
import { getDocs, collection, query, where } from "firebase/firestore";

export default async function generateTournamentId() {
  let unique = false;
  const minimum = 100000;
  const maximum = 999999;
  let tournamentId = undefined;

  while (unique == false) {
    unique = true;
    tournamentId =
      Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

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
