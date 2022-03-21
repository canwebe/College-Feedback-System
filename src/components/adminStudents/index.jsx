import { motion } from 'framer-motion'
import useTitle from '../../hooks/useTitle'
const wrapperVariants = {
  hidden: {
    opacity: 0,
    y: -70,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      opacity: { duration: 0.7, ease: 'easeInOut' },
      duration: 0.3,
    },
  },
  exit: {
    y: 100,
    opacity: 0,
    transition: { ease: 'easeInOut' },
  },
}
const AdminStudents = () => {
  useTitle('Students | SaITFeedbackAdmin')
  return (
    <motion.div
      variants={wrapperVariants}
      animate='visible'
      initial='hidden'
      exit='exit'
    >
      <h1 className='adminHeadline'>Students</h1>
      <p className='intro'>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum
        modi odit aperiam quod. Velit ad illum reprehenderit ratione culpa?
        Pariatur omnis aliquid minima? Modi, sed culpa ipsam fugit beatae rerum?
      </p>
    </motion.div>
  )
}

export default AdminStudents
