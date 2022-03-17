import { useState, useEffect } from 'react'

const useBranch = (branch = '') => {
  const [userBranch, setUserBranch] = useState(
    JSON.parse(localStorage.getItem('branch'))
  )

  useEffect(() => {
    if (!userBranch) {
      localStorage.setItem('branch', JSON.stringify(branch))
      setUserBranch(branch)
    }
  }, [])

  return userBranch
}

export default useBranch
