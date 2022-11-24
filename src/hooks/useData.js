import { collection, limit, onSnapshot, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../lib/firebase'

const useData = (uid) => {
  const [userData, setUserData] = useState({})
  const [subLists, setSubLists] = useState()

  useEffect(() => {
    const q = query(
      collection(db, 'students'),
      where('uid', '==', uid),
      limit(1)
    )
    const unsub = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        setUserData(snapshot.docs[0].data())
      }
    })
    return () => unsub && unsub()
  }, [uid])

  useEffect(() => {
    let unsub
    if (userData?.branch) {
      const { branch, sem, sec } = userData
      const q = query(
        collection(db, 'teachers'),
        where('branch', '==', branch),
        where('sem', '==', sem),
        where('sections', 'array-contains', sec)
      )

      unsub = onSnapshot(q, (snapshot) => {
        if (!snapshot.empty) {
          setSubLists(
            snapshot.docs?.map((item) => ({ ...item.data(), id: item.id }))
          )
        } else {
          setSubLists([])
        }
      })
    }

    return () => unsub && unsub()
  }, [userData?.branch, userData?.sem, userData?.sec])

  return { userData, subLists }
}

export default useData
