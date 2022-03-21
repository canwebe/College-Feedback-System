import { useState, useRef } from 'react'
import useTitle from '../../hooks/useTitle'
import { generateRanking } from '../../utils/firebase'
import LoaderSvg from '../loaderSvg'
import './adminHome.style.css'
import { motion } from 'framer-motion'

const deptList = {
  cse: 'Computer Science',
  is: 'Information Science',
  me: 'Mechanical Engineering',
  ece: 'Electronics And Communication',
  civil: 'Civil Engineering',
}

const branchSelect = [
  { value: '', name: 'Select Branch' },
  { value: 'bs', name: 'BASIC' },
  { value: 'cse', name: 'CSE' },
  { value: 'is', name: 'IS' },
  { value: 'me', name: 'ME' },
  { value: 'ece', name: 'ECE' },
  { value: 'civil', name: 'CIVIL' },
]

const semSelect = [
  { value: '', name: 'Select Semester' },
  { value: '3', name: '3rd Sem' },
  { value: '4', name: '4th Sem' },
  { value: '5', name: '5th Sem' },
  { value: '6', name: '6th Sem' },
  { value: '7', name: '7th Sem' },
  { value: '8', name: '8th Sem' },
]

const basicSelect = [
  { value: '', name: 'Select Semester' },
  { value: '1', name: '1st Sem' },
  { value: '2', name: '2nd Sem' },
]

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
      duration: 0.35,
    },
  },
  exit: {
    y: 100,
    opacity: 0,
    transition: { ease: 'easeInOut' },
  },
}

const rankBoardVariants = {
  hidden: {
    y: 160,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      mass: 0.7,
      when: 'beforeChildren',
      staggerChildren: 0.4,
    },
  },

  exit: {
    y: 200,
    opacity: 0,
    transition: { ease: 'easeInOut' },
  },
}

const rankCardVariants = {
  hidden: { opacity: 0, rotateX: -180 },

  visible: {
    opacity: 1,
    rotateX: 0,
    transition: {
      duration: 0.4,
    },
  },
}

const AdminHome = () => {
  useTitle('Home | SaITFeedbackAdmin')
  // States
  const [classInfo, setClassInfo] = useState({
    branch: '',
    sem: '',
  })
  const { branch, sem } = classInfo
  const [isLoading, setIsLoading] = useState(false)
  const [rankList, setRankList] = useState([])
  const [isNoData, setIsNoData] = useState(false)
  const scrollRef = useRef()

  // Functions
  const handleGenerate = async (e) => {
    scrollRef.current.scrollIntoView()
    setIsLoading(true)
    e.preventDefault()
    const data = await generateRanking(branch, sem)
    if (data.length) {
      setIsLoading(false)
      setIsNoData(false)
      setRankList(data)
    } else {
      setIsLoading(false)
      setIsNoData(true)
      setRankList([])
    }
  }

  // Handling Inputs
  const handleChange = (e) => {
    if (rankList.length) setRankList([])
    const { name, value } = e.target
    setClassInfo((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <motion.div
      variants={wrapperVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
    >
      <h1 className='adminHeadline'>Home</h1>
      <p className='intro'>
        Here all classes review can be found and these are based on individual
        subject and semester .Simply select the branch and semester for
        generating the review.
      </p>
      <hr />
      <h2 ref={scrollRef}>Generate Review</h2>
      <div className='generateDiv'>
        <p>Select Department and Semester</p>
        <form onSubmit={handleGenerate}>
          <select required name='branch' value={branch} onChange={handleChange}>
            {branchSelect.map((branch, i) => (
              <option key={i} value={branch.value}>
                {branch.name}
              </option>
            ))}
          </select>
          {branch && (
            <select required name='sem' value={sem} onChange={handleChange}>
              {!(branch === 'bs')
                ? semSelect.map((semItem, i) => (
                    <option value={semItem.value} key={i}>
                      {semItem.name}
                    </option>
                  ))
                : basicSelect.map((semItem, i) => (
                    <option value={semItem.value} key={i}>
                      {semItem.name}
                    </option>
                  ))}
            </select>
          )}

          <button
            disabled={isLoading}
            className={isLoading ? 'loading' : ''}
            type='submit'
          >
            {isLoading ? <LoaderSvg /> : 'Generate'}
          </button>
        </form>
        {isNoData && <p className='noData'>No Data Found</p>}
        {rankList.length > 0 && (
          <>
            <div className='rankBoardDetails'>
              Rankings Generated for Semester :<span> {sem}</span> , Branch :
              <span> {deptList[branch]}</span>
            </div>
            <h3 className='rankingH3'>Rankings</h3>
            <motion.div variants={rankBoardVariants} className='rankBoardDiv'>
              {rankList.map((item, i) => (
                <motion.div
                  variants={rankCardVariants}
                  key={i}
                  className='rankCard'
                >
                  <p className='teacherName'>{item.teacherName}</p>
                  <p>
                    {item.subfull} ,
                    <span className='subCode'> {item.subcode}</span>
                  </p>
                  <p className='point'>
                    {Math.round((item.avgRating / 35) * 100)}%
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </div>
      {rankList.length > 0 && (
        <>
          <hr />
          <h2>Bar Chart</h2>
          <div className='barChart'></div>
        </>
      )}
    </motion.div>
  )
}

export default AdminHome
