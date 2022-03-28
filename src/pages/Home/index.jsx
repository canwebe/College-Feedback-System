import React, { useEffect, useState } from 'react'
import useUser from '../../hooks/useUser'
import { fetchSubList } from '../../utils/firebase'
import './home.style.css'
import { motion } from 'framer-motion'
import Loader from '../../components/loader'
import TeacherCard from '../../components/teacherCard'
import useTitle from '../../hooks/useTitle'

const usncardVariants = {
  hidden: {
    y: -60,
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
    y: -200,
    opacity: 0,
    transition: { ease: 'easeInOut' },
  },
}

const wrappercardVariants = {
  hidden: {
    y: 160,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      mass: 0.5,
      damping: 8,
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

const deptList = {
  cse: 'COMPUTER SCIENCE',
  is: 'INFORMATION SCIENCE',
  me: 'MECHANICAL ENGINEERING',
  ece: 'ELECTRONICS AND COMMUNICATION',
  civil: 'CIVIL ENGINEERING',
}

const Home = () => {
  //-----States-------
  //Teacher List Data
  const [subjectList, setSubjectList] = useState([])
  const [completed, setCompleted] = useState([])
  // Getting User Data
  const user = useUser()
  console.log(user)
  // Setting Title
  useTitle('Home | SaITFeedback')

  // Loading state true means no loading
  const loading = user && subjectList.length

  // Pending Status
  const status = subjectList.length - completed.length

  // Function
  const fetchData = async () => {
    if (user?.branch) {
      const classStr = `${user.branch}_${user.sem}_${user.sec}`
      console.log(classStr)
      const data = await fetchSubList(classStr)
      setSubjectList(data.sub)
    }
  }

  // Side Effect
  useEffect(() => {
    if (user?.branch) {
      fetchData()
      if (user?.complete) {
        setCompleted(user.complete)
      }
    }
  }, [user])

  return loading ? (
    <div className='wrapper home'>
      {console.log('List', completed)}
      <motion.div
        variants={usncardVariants}
        initial='hidden'
        animate='visible'
        exit='exit'
        className='usnCard'
      >
        <p className='deptName'>DEPARTMENT OF {deptList[user.branch]}</p>
        <p className='usnNumber'>
          <strong>USN :</strong> <span className='usn'>{user.usn}</span>
        </p>
        <hr />
        <div className='semSec'>
          <p>
            <strong>Sem :</strong> {user.sem} ,
          </p>
          <p>
            <strong>Sec :</strong> {user.sec} ,
          </p>
          <p>
            <strong> Branch :</strong> CSE
          </p>
        </div>
        {status === 0 ? (
          <p>
            <strong>Feedback Status :</strong>{' '}
            <span className='status completed'>Completed</span>
          </p>
        ) : (
          <p>
            <strong>Pending Feedback :</strong>{' '}
            <span className='status'>{status}</span>
          </p>
        )}
      </motion.div>
      <motion.div
        variants={wrappercardVariants}
        animate='visible'
        initial='hidden'
        exit='exit'
        className='teacherListCard'
      >
        <h1>Teachers</h1>
        <hr />
        <div className='teacherListWrapper'>
          {subjectList.map((subject, i) => (
            <TeacherCard
              key={i}
              mark={completed.includes(subject.subcode)}
              subjectData={subject}
              uid={user.uid}
            />
          ))}
        </div>
      </motion.div>
    </div>
  ) : (
    <Loader />
  )
}

export default Home
