import { Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const RequireAuth = ({ children, redirectTo, user }) => {
  return user ? (
    children
  ) : (
    <motion.div exit='undefined'>
      <Navigate to={redirectTo} replace />
    </motion.div>
  )
}

export default RequireAuth
