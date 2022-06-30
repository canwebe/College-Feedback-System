import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { auth, firebaseApp } from '../lib/firebase'

export default function useAuthListner() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')))

  useEffect(() => {
    const listner = onAuthStateChanged(auth, (authuser) => {
      if (authuser) {
        // Have authuser
        localStorage.setItem('authUser', JSON.stringify(authuser))
        setUser(authuser)
        console.count('Set localstorage')
      } else {
        // not have authuser means logout
        localStorage.removeItem('authUser')
        setUser(null)
      }
    })

    return () => listner()
  }, [firebaseApp])

  return { user }
}
