import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../lib/firebase";

export const studentWithUid = async (uid) => {
  const q = query(collection(db, "cse"), where("uid", "==", uid));
  const snapshot = await getDocs(q);
  let result;
  snapshot.forEach((doc) => (result = doc.data()));
  console.log(result);
  return result;
};

export const updateInfo = async (uid, usn) => {
  const q = query(
    collection(db, "cse"),
    where("usn", "==", usn.trim().toUpperCase())
  );
  const result = await getDocs(q);
  console.log(result.docs[0].ref);
  await updateDoc(result.docs[0].ref, {
    uid,
  });
};

export const fetchTechers = async () => {
  const q = collection(db, "teachers");
  const result = await getDocs(q);
  const data = result.docs.map((item) => item.data());
  return data;
};
