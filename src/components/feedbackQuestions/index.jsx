import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { markComplete, submitReview } from '../../utils/firebase'
import Options from '../options'
import { FaCaretLeft, FaVoteYea, FaHourglassStart } from 'react-icons/fa'
import toast from 'react-hot-toast'

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
  hidden: (direction) => ({
    x: direction > 0 ? '50vw' : '-50vw',
    opacity: 0,
  }),
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      mass: 0.5,
      damping: 8,
    },
  },

  exit: (direction) => ({
    x: direction > 0 ? '-100vw' : '100vw',
    transition: { ease: 'easeInOut' },
  }),
}

export default function FeedbackQuestions({ teacherid, usn, subcode }) {
  const navigate = useNavigate()
  //----States----
  //Question Ans records
  const [records, setRecords] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  })
  //Pagination state
  const [[page, direction], setPage] = useState([0, 0])
  //Last question flag
  const [isFinish, setIsFinish] = useState(false)
  //Loading State
  const [isLoading, setIsLoading] = useState(false)

  // Click fxn for options
  const handleClick = async (point) => {
    setRecords((prev) => ({
      ...prev,
      [page]: point,
    }))
    //For last question
    if (page >= questions.length - 1) {
      //Enabling the finish boolean
      setIsFinish(true)
      return
    }
    handlePage(1)
  }

  //Pagination
  const handlePage = (dir) => {
    setPage([page + dir, dir])
  }

  // Submiting the points
  const handleSubmit = () => {
    setIsLoading(true)
    const toastId = toast.loading('Submitting please wait...')
    if (!navigator.onLine) {
      setIsLoading(false)
      toast.error(
        <b>You need to turn on Your Internet Connection for Submiting Review</b>
      )
      navigate('/')
      return
    }
    let result = 0
    for (const x in records) {
      result += records[x]
    }
    try {
      if (teacherid && result && usn && subcode) {
        submitReview(teacherid, result).then(() => {
          markComplete(usn, subcode).then(() => {
            setIsLoading(false)
            toast.success(<b>Submitted successfuly</b>, {
              id: toastId,
            })
            navigate('/')
          })
        })
      } else {
        setIsLoading(false)
        toast.error(<b>Please try again something went wrong</b>, {
          id: toastId,
        })
        navigate('/')
      }
    } catch (error) {
      console.error(error)
      setIsLoading(false)
      toast.error(<b>Please try again something went wrong</b>, {
        id: toastId,
      })
      navigate('/')
    }
  }

  return (
    <>
      <div className='topBtnDiv'>
        {page !== 0 && (
          <button onClick={() => handlePage(-1)}>
            <FaCaretLeft />
            Prev
          </button>
        )}
        <p>{page + 1} / 7</p>
        {isFinish && page === 6 && (
          <button
            disabled={isLoading}
            onClick={handleSubmit}
            className='submit'
          >
            {isLoading ? (
              <FaHourglassStart />
            ) : (
              <>
                {' '}
                <FaVoteYea /> Submit
              </>
            )}
          </button>
        )}
      </div>
      <AnimatePresence exitBeforeEnter custom={direction}>
        <motion.div
          className='feedbackSection'
          variants={feedbackVariants}
          initial='hidden'
          animate='visible'
          exit='exit'
          custom={direction}
          key={page}
        >
          <p className='question'>{questions[page]}</p>
          <div className='answers'>
            {labels.map((item, i) => (
              <Options
                label={item.label}
                flag={records[page] === item.value}
                value={item.value}
                clickFxn={handleClick}
                key={item.value}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
      {/* <div className='feedbackBtnDiv'>
        {page !== 0 && <button onClick={() => handlePage(-1)}>Prev</button>}
        {isFinish && page === 6 && (
          <button
            disabled={isLoading}
            onClick={handleSubmit}
            className='submit'
          >
            {isLoading ? 'Loading..' : 'Submit'}
          </button>
        )}
      </div> */}
    </>
  )
}
