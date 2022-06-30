import React, { useRef, useState, useEffect } from 'react'
import { auth, db } from '../../lib/firebase'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { collection, query, where, getDocs } from 'firebase/firestore'
import useAuthListner from '../../hooks/useAuthListner'
import './login.style.css'
import { studentWithUsn, updateInfo } from '../../utils/firebase'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Modal from '../../components/modal'
import useTitle from '../../hooks/useTitle'
import toast from 'react-hot-toast'

const containerVariants = {
  hidden: {
    y: '-80vh',
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      mass: 0.5,
      damping: 9,
    },
  },

  exit: {
    y: '80vh',
    transition: { ease: 'easeInOut' },
  },
}

const Login = ({ user }) => {
  // Setting Title
  useTitle('Home | SaITFeedback')

  //States
  const [inputData, setInputData] = useState({
    usn: '',
    otp: '',
  })
  const [final, setFinal] = useState()
  const [show, setShow] = useState(false)
  // const [userData, setUserData] = useState({})
  const [error, setError] = useState('')
  const [succes, setSucces] = useState('')
  const [loading, setLoading] = useState(false)
  const [isModal, setIsModal] = useState(false)
  const [isNew, setIsNew] = useState(true)

  const inputRef = useRef()
  const { usn, otp } = inputData
  // const { user } = useAuthListner()
  const navigate = useNavigate()
  let pno = ''

  const isValid = usn === '' || usn.length < 10
  const otpInvalid = otp === '' || otp.length < 6

  //Handling Inputs
  const handleChange = (e) => {
    const { name, value } = e.target
    setError('')
    setInputData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Give Notice Modal
  const handleModal = (e) => {
    e.preventDefault()
    setIsModal(true)
  }

  // const handleSubmitToast = async () => {
  //   toast.promise(await handleSubmit(), {
  //     loading: 'Checking the database for information',
  //     success: 'Fpund the data',
  //     error: 'Not found any data',
  //   })
  // }

  //asubmit promis

  // Submit
  const handleSubmit = async (e) => {
    // e.preventDefault()
    setLoading(true)
    const toastId = toast.loading('Collecting data from the database')
    const data = await studentWithUsn(usn)

    if (data) {
      pno = data.number
      if (data?.uid) {
        setIsNew(false)
        console.log('Not a new user')
      }
    }

    // If Phone Number Found
    if (pno) {
      console.log('Phone Number Found')
      let verify = new RecaptchaVerifier('captcha', { size: 'invisible' }, auth)
      toast.success(<b>Student information found</b>, {
        id: toastId,
      })
      const toastId2 = toast.loading('Sending the otp...')
      signInWithPhoneNumber(auth, '+91' + pno, verify)
        .then((confirm) => {
          setLoading(false)
          console.log('Otp Sent')
          setError('')
          setSucces(
            `OTP sent to the phone number ending with +91 XXXXXXXX${pno.slice(
              -2
            )}`
          )
          setFinal(confirm)
          setShow(true)
          toast.success(<b>OTP sent to the registered number</b>, {
            id: toastId2,
          })
          inputRef.current.focus()
        })
        .catch((err) => {
          setLoading(false)
          toast.error(<b>OTP sending failed, Try again</b>, {
            id: toastId2,
          })
          console.log(err)
          setInputData({
            usn: '',
            otp: '',
          })
          setSucces('')
          setError('Something went wrong , Try Again!')
          window.location.reload()
        })
    } else {
      setLoading(false)
      setSucces('')
      toast.error(<b>No data found for USN: {usn.trim().toUpperCase()}</b>, {
        id: toastId,
      })
      setError('No info found USN incorrect , Please contact department')
    }
  }

  // Verify
  const handleVerify = (e) => {
    e.preventDefault()
    const toastId3 = toast.loading('Verifying...')
    setLoading(true)
    if (otp === null || final === null) return
    final
      .confirm(otp)
      .then(async (result) => {
        window.grecaptcha = null
        window.recaptcha = null
        if (isNew) {
          // New User
          await updateInfo(result.user.uid, usn)
          setLoading(false)
          toast.success(<b>Verification Complete</b>, {
            id: toastId3,
          })
          navigate('/')
        } else {
          setLoading(false)
          toast.success(<b>Verification Complete</b>, {
            id: toastId3,
          })
          navigate('/')
        }
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
        setInputData((prev) => ({
          ...prev,
          otp: '',
        }))
        setSucces('')
        setError('OTP did not matched Try Again !!')
        toast.error(<b>Verification Failed</b>, {
          id: toastId3,
        })
      })
  }

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user])

  return (
    <div className='loginDiv'>
      <motion.div
        variants={containerVariants}
        animate='visible'
        initial='hidden'
        exit='exit'
        className='wrapper login'
      >
        <form>
          {error && <p className='errorMsg'>{error}</p>}
          {succes && <p className='succesMsg'>{succes}</p>}
          <h2>Authentication</h2>
          {show ? (
            <>
              <div className='formDiv'>
                <input
                  name='otp'
                  ref={inputRef}
                  className='formInput'
                  placeholder=' '
                  value={otp}
                  maxLength='6'
                  required
                  onChange={handleChange}
                />
                <label className='formLabel'>Enter OTP</label>
              </div>

              <button
                onClick={handleVerify}
                className={`btn ${otpInvalid ? 'disabled' : ''}`}
                disabled={otpInvalid || loading}
              >
                {loading ? 'loading...' : 'Verify'}
              </button>
              <p className='captchaText'>Hidden Auto ReCaptcha Verifier</p>
            </>
          ) : (
            <>
              <div className='formDiv'>
                <input
                  name='usn'
                  className='formInput'
                  placeholder=' '
                  value={usn}
                  required
                  maxLength='10'
                  autoComplete='off'
                  onChange={handleChange}
                />
                <label className='formLabel'>Enter Your USN</label>
              </div>

              <div id='captcha' className='captcha'></div>

              <button
                onClick={handleModal}
                className={`btn ${isValid ? 'disabled' : ''}`}
                disabled={isValid || loading}
              >
                {loading ? 'Please Wait...' : 'Next'}
              </button>
              <p className='captchaText'>Hidden Auto ReCaptcha Verifier</p>
            </>
          )}
        </form>

        {/* <button onClick={() => studentWithUid("abc")}>Update</button> */}
        {/* <button className="signOut" onClick={handleSignout}>
        SignOut---Only for testing
      </button> */}
      </motion.div>
      <AnimatePresence>
        {isModal && (
          <Modal setIsModal={setIsModal} handleSubmit={handleSubmit} />
        )}
      </AnimatePresence>
    </div>
  )
}

export default Login
