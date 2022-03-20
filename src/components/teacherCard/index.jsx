import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { checkMarking } from '../../utils/firebase'

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

const TeacherCard = ({ subjectData, uid }) => {
  // State Checking Is Review Done
  const [classList, setClassList] = useState('')

  // Object Destruction subjectData
  const { teacherName, subfull, subshort, subcode, teacherid } = subjectData

  // Side Effect
  useEffect(() => {
    const checkColor = async () => {
      const result = await checkMarking(uid, teacherName)
      if (result) return setClassList('done')
    }
    checkColor()
  }, [])

  return (
    <motion.div variants={teachercardVariants}>
      <Link
        to='feedback'
        onClick={(e) => classList && e.preventDefault()}
        state={{
          teacherName,
          teacherid,
          subcode,
          subfull,
          uid,
        }}
        className={`teacherCard ${classList}`}
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
