import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { auth } from '../lib/firebase'

export default function useAuthListner(branch = '') {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')))

  useEffect(() => {
    const listner = onAuthStateChanged(auth, (authuser) => {
      if (authuser) {
        // Have authuser
        console.log(authuser, branch)
        localStorage.setItem('authUser', JSON.stringify(authuser))
        setUser(user)
        console.log('Set localstorage')
      } else {
        // not have authuser means logout
        localStorage.removeItem('authUser')
        setUser(null)
        console.log('User Signout')
      }
    })

    return () => listner()
  }, [auth])

  return { user }
}
