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
const AdminTeachers = () => {
  useTitle('Teachers | SaITFeedbackAdmin')
  return (
    <motion.div
      variants={wrapperVariants}
      animate='visible'
      initial='hidden'
      exit='exit'
    >
      <h1 className='adminHeadline'>Teachers</h1>
      <p className='intro'>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione
        quaerat dolore soluta ullam natus, debitis illo fuga similique fugiat
        eaque eveniet quod ad, excepturi quasi quam quae magni ipsa architecto.
      </p>
    </motion.div>
  )
}

export default AdminTeachers
