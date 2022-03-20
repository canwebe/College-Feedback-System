import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useUser from '../../hooks/useUser'
import { checkMarking, fetchSubList } from '../../utils/firebase'
import './home.style.css'
import { motion } from 'framer-motion'
import Loader from '../../components/loader'
import TeacherCard from '../../components/teacherCard'

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

  // Getting User Data
  const user = useUser()

  // Loading state true means no loading
  const loading = user && subjectList.length

  // Function
  const fetchData = async () => {
    if (user?.branch) {
      const classStr = `${user.branch}_${user.sem}_${user.sec}`
      console.log(classStr)
      const data = await fetchSubList(classStr)
      setSubjectList(data.sub)
    }
  }

  const checkColor = async (uid, name) => {
    const result = await checkMarking(uid, name)
    if (!result) return
    return 'done'
  }

  // Side Effect
  useEffect(() => {
    fetchData()
  }, [user])

  return loading ? (
    <div className='wrapper home'>
      {console.log('List', subjectList)}
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

        <p>
          <strong>Feedback Status :</strong>{' '}
          <span className='status'>Pending</span>
        </p>
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
            <TeacherCard key={i} subjectData={subject} uid={user.uid} />
          ))}
        </div>
      </motion.div>
    </div>
  ) : (
    <Loader />
  )
}

export default Home
