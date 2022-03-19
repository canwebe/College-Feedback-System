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

export const addRating = async (name, rating) => {
  const q = query(collection(db, 'teachers'), where('name', '==', name))
  const result = await getDocs(q)
  const singleData = result.docs[0]
  const { avgRating, total } = singleData.data()
  const newTotal = total + 1
  const newAvg = (total * avgRating + parseInt(rating)) / newTotal
  console.log(newAvg)
  await setDoc(
    singleData.ref,
    {
      avgRating: newAvg,
      total: newTotal,
    },
    {
      merge: true,
    }
  ).catch((er) => console.log(er))
  console.log('Ratting done')
}

export const markComplete = async (uid, name) => {
  const q = query(collection(db, 'students'), where('uid', '==', uid))
  const snapshot = await getDocs(q)
  await setDoc(
    snapshot.docs[0].ref,
    {
      complete: arrayUnion(name),
    },
    {
      merge: true,
    }
  ).catch((er) => console.log(er))
  console.log('done')
}

export const checkMarking = async (uid, name) => {
  const q = query(collection(db, 'students'), where('uid', '==', uid))
  const snapshot = await getDocs(q)
  const result = snapshot.docs[0].data().complete
  if (result) {
    return result.includes(name)
  } else {
    return false
  }
}
