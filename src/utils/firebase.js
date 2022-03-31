import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db } from '../lib/firebase'

// Getting Student Data with UID
export const studentWithUid = async (uid) => {
  const q = query(collection(db, 'students'), where('uid', '==', uid))
  const snapshot = await getDocs(q)
  if (!snapshot.empty) {
    return snapshot.docs[0].data()
  } else {
    return null
  }
}

// Update Student Data with UID
export const updateInfo = async (uid, usn) => {
  const q = query(
    collection(db, 'students'),
    where('usn', '==', usn.trim().toUpperCase())
  )
  const result = await getDocs(q)

  await updateDoc(result.docs[0].ref, {
    uid,
  })
}

// Getting Subject List of Each Class
export const fetchSubList = async (classStr) => {
  const docRef = doc(db, 'classes', classStr)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return docSnap.data()
  } else {
    return []
  }
}

// Submiting Review
export const submitReview = async (teacherid, point) => {
  // Getting Ref of teacher
  const teacherRef = collection(db, `teachers/${teacherid}/subs`)
  const teacherData = await getDocs(teacherRef)
  const docRef = teacherData.docs[0]

  // Getting Prev Data
  const { avgRating, total } = docRef.data()

  // Incrementing Total User
  const newTotal = total + 1

  // Algorithm for new Average
  const newAvg = (total * avgRating + point) / newTotal
  await setDoc(
    docRef.ref,
    {
      avgRating: parseInt(newAvg.toFixed(4)),
      total: newTotal,
    },
    {
      merge: true,
    }
  ).catch((err) => console.log('Submit Failed', err))
}

// Marking Review of Students
export const markComplete = async (uid, subcode) => {
  const q = query(collection(db, 'students'), where('uid', '==', uid))
  const snapshot = await getDocs(q)
  await setDoc(
    snapshot.docs[0].ref,
    {
      complete: arrayUnion(subcode),
    },
    {
      merge: true,
    }
  ).catch((err) => console.log('Completion Update Failed', err))
}

// Making STatus is true
export const completeStatus = async (uid) => {
  const q = query(collection(db, 'students'), where('uid', '==', uid))
  const snapshot = await getDocs(q)
  if (!snapshot.empty) {
    await updateDoc(snapshot.docs[0].ref, {
      status: true,
    })
  }
}
