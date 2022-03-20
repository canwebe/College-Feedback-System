import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './feedback.style.css'
import { AnimatePresence, motion } from 'framer-motion'
import Options from '../../components/options'
import { markComplete, submitReview } from '../../utils/firebase'
import useTitle from '../../hooks/useTitle'

const questions = [
  'Faculty preparation for the class',
  "Faculty's clarity in explaining the subject",
  "Faculty's answer to your queries/question",
  "Faculty's guidance for preparation of exam",
  'Faculty provides relevant and usefull course material',
  "Faculty's motivation towards extra curricular and technical activity",
  'Overall perfomance',
]

const labels = [
  { label: 'Excelent', value: 5 },
  { label: 'Good', value: 4 },
  { label: 'Average', value: 3 },
  { label: 'Poor', value: 2 },
  { label: 'Very Poor', value: 1 },
]

const feedbackVariants = {
  hidden: {
    x: '100vw',
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      mass: 0.5,
      damping: 8,
    },
  },

  exit: {
    x: '-100vw',
    transition: { ease: 'easeInOut' },
  },
}

const finishcardVariants = {
  hidden: {
    x: '100vw',
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      mass: 0.5,
      damping: 10,
      delay: 0.6,
    },
  },
}

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

const Feedback = () => {
  //React Router tools
  const location = useLocation()
  const navigate = useNavigate()

  // const { name, sub, uid } = location.state;
  // ------States-------
  //For question number
  const [question, setQuestion] = useState(0)

  //For Storing points
  const [points, setPoints] = useState(0)

  //Name and Sub for teacher
  const [subject, setSubject] = useState({
    teacherName: '',
    subfull: '',
    subcode: '',
    teacherid: '',
    uid: '',
  })

  //Checking last question
  const [isFinish, setIsFinish] = useState(false)
  //Mounting and dismounting feedback card
  const [isToggled, setIsToggled] = useState(false)
  //Loading State
  const [isLoading, setIsLoading] = useState(false)

  useTitle(
    subject.teacherName
      ? `${subject.teacherName} | SaITFeedback`
      : 'Feedback | SaITFeedback'
  )

  //-------Functions-----
  //Click Function to update question and points

  const handleClick = async (point) => {
    console.log('Point is', point, typeof point)
    setIsToggled(false)
    //For last question
    if (question >= questions.length - 1) {
      setPoints((prev) => prev + point)
      //Enabling the finish boolean for thanks card
      setIsFinish(true)
      return
    }
    setQuestion((prev) => prev + 1)
    setPoints((prev) => prev + point)
    setTimeout(() => setIsToggled(true), 370)
  }

  // Submit button click function for submitting rating
  const handleBtnClick = () => {
    setIsLoading(true)
    console.log('Points added to DB', points, typeof points)
    try {
      submitReview(subject.teacherid, points).then(() => {
        markComplete(subject.uid, subject.subcode).then(() => {
          setIsLoading(false)
          navigate('/')
        })
      })
    } catch (error) {
      console.log('Submit Failed', error)
      setIsLoading(false)
      alert('Something Went Wrong , Please Try Again ')
      navigate('/')
    }
  }

  // Side Effect
  useEffect(() => {
    // If Location State is there
    if (location.state) {
      //Getting teacher data
      const { teacherName, subfull, subcode, teacherid, uid } = location.state
      setSubject({ teacherName, subfull, subcode, teacherid, uid })

      // Delaying first animation load on feedback card
      setTimeout(() => {
        setIsToggled(true)
      }, 400)
    } else {
      //Otherwise Navigate back to home
      navigate('/')
    }
  }, [])

  useEffect(() => {
    // Scroll to Top
    window.scrollTo(0, 0)
  }, [])

  return (
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

      <div className='wrapper'>
        <AnimatePresence exitBeforeEnter>
          {isToggled && (
            <motion.div
              className='feedbackSection'
              variants={feedbackVariants}
              initial='hidden'
              animate='visible'
              exit='exit'
            >
              <p>{question + 1} / 7</p>
              <p className='question'>{questions[question]}</p>
              <div className='answers'>
                {labels.map((item) => (
                  <Options
                    label={item.label}
                    value={item.value}
                    clickFxn={handleClick}
                    key={item.value}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {isFinish && (
          <motion.div
            className='finishCard'
            variants={finishcardVariants}
            animate='visible'
            initial='hidden'
            exit='exit'
          >
            <p>Thanks for the Review</p>
            <button
              disabled={isLoading}
              onClick={handleBtnClick}
              className='btn continue'
            >
              {isLoading ? 'Loading..' : 'Submit'}
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default Feedback
