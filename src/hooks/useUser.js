import { collection, doc, onSnapshot, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../lib/firebase'
import useAuthListner from './useAuthListner'

const useUser = () => {
  const { user } = useAuthListner()
  const uid = user?.uid
  const [userData, setUserData] = useState({})
  const userQ = query(collection(db, 'students'), where('uid', '==', uid))

  useEffect(() => {
    const unsub = onSnapshot(userQ, (snapshot) => {
      if (!snapshot.empty) {
        setUserData(snapshot.docs[0].data())
      }
    })
    return () => unsub()
  }, [user])

  return userData
}

export default useUser
