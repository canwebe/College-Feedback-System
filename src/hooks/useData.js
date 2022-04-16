import { collection, doc, onSnapshot, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../lib/firebase'
import useAuthListner from './useAuthListner'

const useData = () => {
  const { user } = useAuthListner()
  const uid = user?.uid

  const [userData, setUserData] = useState({})
  const [subLists, setSubLists] = useState([])
  const userQ = query(collection(db, 'students'), where('uid', '==', uid))

  useEffect(() => {
    const unsub = onSnapshot(userQ, (snapshot) => {
      if (!snapshot.empty) {
        setUserData(snapshot.docs[0].data())
      }
    })
    return () => unsub()
  }, [user])

  useEffect(() => {
    let unsub
    if (userData) {
      const classStr = `${userData.branch}_${userData.sem}_${userData.sec}`
      unsub = onSnapshot(doc(db, 'classes', classStr), (snapshot) => {
        if (snapshot.exists()) {
          setSubLists(snapshot.data().sub)
        }
      })
    }

    return () => unsub()
  }, [userData])

  return { userData, subLists }
}

export default useData
