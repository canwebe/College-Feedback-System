import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const teachercardVariants = {
  hidden: { opacity: 0, rotateX: -180 },

  visible: {
    opacity: 1,
    rotateX: 0,
    transition: {
      duration: 0.5,
    },
  },
  // tap: {
  //   boxShadow: "none",
  //   scale: 0.98,
  // },
  // hover: {
  //   backgroundColor: "#2a305c",
  //   x: 5,
  //   boxShadow: "2px 3px 6px 0px  rgba(51, 51, 51, 0.226)",
  //   transition: {
  //     type: "spring",
  //     stiffness: 150,
  //   },
  // },
}

const TeacherCard = ({ subjectData, uid, mark }) => {
  // Object Destruction subjectData
  const { teacherName, subfull, subshort, subcode, teacherid } = subjectData

  return (
    <motion.div variants={teachercardVariants}>
      <Link
        to='feedback'
        onClick={(e) => mark && e.preventDefault()}
        state={{
          teacherName,
          teacherid,
          subcode,
          subfull,
          uid,
        }}
        className={`teacherCard ${mark && 'done'}`}
      >
        <div className='img'></div>
        <div className='right'>
          <p className='teacherName'>{teacherName}</p>
          <p className='subName'>
            <strong>Subject : </strong>
            {subshort}
          </p>
          <p className='subFull'>{subfull}</p>
        </div>
      </Link>
    </motion.div>
  )
}

export default TeacherCard
