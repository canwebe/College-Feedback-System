import { useEffect, useState } from 'react'
import { studentWithUid } from '../utils/firebase'
import useAuthListner from './useAuthListner'

const useUser = () => {
  const [activeUser, setActiveUser] = useState({})
  const { user } = useAuthListner()
  const uid = user?.uid
  const getUser = async (uid) => {
    const response = await studentWithUid(uid)
    setActiveUser(response)
  }

  useEffect(() => {
    getUser(uid)
  }, [uid])
  return activeUser
}

export default useUser
