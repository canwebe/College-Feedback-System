import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../lib/firebase";

export const studentWithUid = async (uid) => {
  const q = query(collection(db, "cse"), where("uid", "==", uid));
  const snapshot = await getDocs(q);
  let result;
  snapshot.forEach((doc) => (result = doc.data()));
  console.log(result);
  return result;
};
