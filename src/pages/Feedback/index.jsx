import { useEffect, useState, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './feedback.style.css'
import { AnimatePresence, motion } from 'framer-motion'
import Options from '../../components/options'
import { markComplete, submitReview } from '../../utils/firebase'
import useTitle from '../../hooks/useTitle'
import Footer from '../../components/footer'
import Nav from '../../components/nav'
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

  // ------States-------
  //Name and Sub for teacher
  const [subject, setSubject] = useState({
    teacherName: '',
    subfull: '',
    subcode: '',
    teacherid: '',
    uid: '',
  })

  useTitle(
    subject.teacherName
      ? `${subject.teacherName} | SaITFeedback`
      : 'Feedback | SaITFeedback'
  )

  // Side Effect
  useEffect(() => {
    // If Location State is there
    if (location.state) {
      //Getting teacher data
      const { teacherName, subfull, subcode, teacherid, uid } = location.state

      setSubject({ teacherName, subfull, subcode, teacherid, uid })
    } else {
      //Otherwise Navigate back to home
      navigate('/')
    }
  }, [])

  useEffect(() => {
    // Scroll to Top
    scrollRef.current.scrollIntoView()
  }, [])

  return (
    <>
      <GoToHome />
      {/* <Nav />
      <div ref={scrollRef} className='navMargin'></div>
      <div className='mainBody'> */}
      <motion.div className='feedback' variants={mainvariants} exit='exit'>
        <motion.div
          variants={teachercardVariants}
          initial='hidden'
          animate='visible'
          exit='exit'
          className='wrapper teacherInfo'
        >
          <p className='teacherName'>{subject.teacherName}</p>
          <p className='sub'>{subject.subfull}</p>
        </motion.div>
        <div className='wrapper questionHeight'>
          <FeedbackQuestions
            teacherid={subject.teacherid}
            uid={subject.uid}
            subcode={subject.subcode}
          />
        </div>
      </motion.div>
      {/* </div>
      <Footer desktop={true} /> */}
    </>
  )
}

export default Feedback
