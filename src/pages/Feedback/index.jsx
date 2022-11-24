import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './feedback.style.css'
import { motion } from 'framer-motion'
import useTitle from '../../hooks/useTitle'
import FeedbackQuestions from '../../components/feedbackQuestions'
import GoToHome from '../../components/goToHome'

const teachercardVariants = {
  hidden: {
    y: -50,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      mass: 0.5,
      damping: 8,
    },
  },

  exit: {
    x: '100vw',
    transition: { ease: 'easeInOut' },
  },
}

const mainvariants = {
  exit: {
    x: '100vw',
    transition: { ease: 'easeInOut' },
  },
}

const Feedback = ({ scrollRef }) => {
  //React Router tools
  const location = useLocation()
  const navigate = useNavigate()

  // const { name, sub, uid } = location.state;

  //Name and Sub for teacher
  const { teacherName, subfull, subcode, id, usn } = location?.state || {}

  useTitle(
    teacherName ? `${teacherName} | SaITFeedback` : 'Feedback | SaITFeedback'
  )

  //Sideeffects
  useEffect(() => {
    // If Location State is not there
    if (!location?.state) {
      navigate('/')
    }
  }, [navigate, location?.state])

  useEffect(() => {
    // Scroll to Top
    scrollRef.current.scrollIntoView()
  }, [])

  return !location?.state ? null : (
    <>
      <GoToHome />
      {/* <Nav />
      <div ref={scrollRef} className='navMargin'></div>
      <div className='mainBody'> */}
      <motion.div className="feedback" variants={mainvariants} exit="exit">
        <motion.div
          variants={teachercardVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="wrapper teacherInfo"
        >
          <p className="teacherName">{teacherName}</p>
          <p className="sub">{subfull}</p>
        </motion.div>
        <div className="wrapper questionHeight">
          <FeedbackQuestions teacherid={id} usn={usn} subcode={subcode} />
        </div>
      </motion.div>
      {/* </div>
      <Footer desktop={true} /> */}
    </>
  )
}

export default Feedback
