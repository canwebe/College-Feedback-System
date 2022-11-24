import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'

//Getting Student Data with UID
export const studentWithUsn = async (usn) => {
  const docref = doc(db, 'students', usn.trim().toLowerCase())

  const snapshot = await getDoc(docref)
  if (snapshot.exists) {
    return snapshot.data()
  }
}

// Update Student Data with UID
export const updateInfo = async (uid, usn) => {
  const docref = doc(db, 'students', usn.trim().toLowerCase())
  const result = await getDoc(docref)
  if (result.exists) {
    await updateDoc(docref, {
      uid,
    })
  }
}

// Submiting Review
export const submitReview = async (teacherid, point) => {
  // Getting Ref of teacher
  const teacherRef = doc(db, `teachers/${teacherid}`)
  const teacherData = await getDoc(teacherRef)

  // Getting Prev Data
  const { avgRating, total } = teacherData.data()
  // Incrementing Total User
  const newTotal = total + 1
  // Algorithm for new Average
  const newAvg = (total * avgRating + point) / newTotal
  await setDoc(
    teacherData.ref,
    {
      avgRating: parseInt(newAvg.toFixed(4)),
      total: newTotal,
    },
    {
      merge: true,
    }
  ).catch((err) => console.error(err))
}

// Marking Review of Students
export const markComplete = async (usn, subcode) => {
  const docref = doc(db, 'students', usn.trim().toLowerCase())

  await setDoc(
    docref,
    {
      complete: arrayUnion(subcode),
    },
    {
      merge: true,
    }
  )
}

// Making STatus is true
export const completeStatus = async (usn) => {
  const docref = doc(db, 'students', usn.trim().toLowerCase())
  const snapshot = await getDoc(docref)

  if (snapshot.exists) {
    await updateDoc(docref, {
      status: true,
    })
  }
}
