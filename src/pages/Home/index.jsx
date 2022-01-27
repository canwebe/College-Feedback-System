import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useUser from '../../hooks/useUser'
import { checkMarking, fetchTechers } from '../../utils/firebase'
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

const teachercardVariants = {
  hidden: { opacity: 0, rotateX: -180 },

  visible: {
    opacity: 1,
    rotateX: 0,
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

const Home = () => {
  //-----States-------
  //Teacher List Data
  const [teacherList, setTeacherList] = useState()
  // const user = useUser();
  const user = useUser()
  console.log('My user', user)
  const fetchData = async () => {
    const data = await fetchTechers()
    setTeacherList(data)
  }

  const checkColor = async (uid, name) => {
    const result = await checkMarking(uid, name)
    if (!result) return
    return 'done'
  }

  const loading = user && teacherList?.length

  useEffect(() => {
    fetchData()

    console.log('Users', user)
  }, [])

  return loading ? (
    <div className='wrapper home'>
      {console.log('Loading', loading)}
      <motion.div
        variants={usncardVariants}
        initial='hidden'
        animate='visible'
        exit='exit'
        className='usnCard'
      >
        <p className='deptName'>DEPERTMENT OF COMPUTER SCIENCE</p>
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
          {teacherList &&
            teacherList.map((teacher, i) => (
              <TeacherCard
                key={i}
                name={teacher.name}
                subfull={teacher.subfull}
                subshort={teacher.subshort}
                uid={user.uid}
              />
              // <motion.div variants={teachercardVariants} key={i}>
              //   <Link
              //     to="feedback"
              //     state={{
              //       name: teacher.name,
              //       sub: teacher.subfull,
              //       uid: user.uid,
              //     }}
              //     className={`teacherCard ${checkColor(
              //       user.uid,
              //       teacher.name
              //     )}`}
              //   >
              //     <div className="img"></div>
              //     <div className="right">
              //       <p className="teacherName">{teacher.name}</p>
              //       <p className="subName">
              //         <strong>Subject : </strong>
              //         {teacher.subshort}
              //       </p>
              //       <p className="subFull">{teacher.subfull}</p>
              //     </div>
              //   </Link>
              // </motion.div>
            ))}
        </div>
      </motion.div>
    </div>
  ) : (
    <Loader />
  )
}

export default Home
