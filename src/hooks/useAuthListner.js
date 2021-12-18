import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { auth } from '../lib/firebase'

export default function useAuthListner() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')))

  useEffect(() => {
    const listner = onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.setItem('authUser', JSON.stringify(user))
        setUser(user)
        console.log('Set localstorage')
      } else {
        localStorage.removeItem('authUser')
        setUser(null)
        console.log('User Signout')
      }
    })

    return () => listner()
  }, [auth])

  return { user }
}
