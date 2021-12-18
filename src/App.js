import { useState } from 'react'
import { auth, db } from './lib/firebase'
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut,
} from 'firebase/auth'
import { collection, query, where, getDocs } from 'firebase/firestore'
import useAuthListner from './hooks/useAuthListner'

function App() {
  const [usn, setUsn] = useState('')
  const [otp, setOtp] = useState('')
  const [final, setFinal] = useState()
  const [show, setShow] = useState(false)
  const [userData, setUserData] = useState({})
  const [error, setError] = useState('')
  const [succes, setSucces] = useState('')

  const { user } = useAuthListner()

  let pno = ''
  const isValid = usn === ''
  const handleSubmit = async (e) => {
    e.preventDefault()

    const q = query(
      collection(db, 'students'),
      where('usn', '==', usn.trim().toLowerCase())
    )
    const snapshot = await getDocs(q)
    snapshot.forEach((doc) => {
      setUserData(doc.data())
      pno = doc.data().number
    })

    if (pno) {
      console.log('Phone Number Found')
      let verify = new RecaptchaVerifier('captcha', { size: 'invisible' }, auth)
      signInWithPhoneNumber(auth, '+91' + pno, verify)
        .then((confirm) => {
          console.log('Otp Sent')
          setSucces(
            `OTP sent to the phone ending with +91********${pno.slice(-2)}`
          )
          setFinal(confirm)
          setShow(true)
        })
        .catch((err) => {
          console.log(err)

          window.location.reload()
        })
    } else {
      console.log(userData, pno)
      setError('No info found USN incorrect , please try again')
    }
  }

  const handleVerify = (e) => {
    e.preventDefault()
    if (otp === null || final === null) return
    final
      .confirm(otp)
      .then((result) => {
        console.log(result)
      })
      .catch((err) => {
        console.log(err)
        setError(err)
      })
  }

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        console.log('Signout Succes')
      })
      .catch((err) => {
        console.log('Signout error', err)
      })
  }

  return (
    <>
      {console.log('User', user)}
      <nav>
        <div className='logo'>
          SaiT<span>FeedBack</span>
        </div>
      </nav>
      <div className='wrapper'>
        <div className='app'>
          <h1>Welcome to SaITFeedBack</h1>
          {user ? (
            <div className='userData'>
              <p>
                USN: <strong>{userData.usn}</strong>,<br />
                Class: <strong>{userData.sec}</strong>
              </p>
            </div>
          ) : (
            <form>
              {error && <p className='errorMsg'>{error}</p>}
              {succes && <p className='succesMsg'>{succes}</p>}
              {show ? (
                <>
                  <label htmlFor='otp'>Enter The OTP</label>
                  <input
                    name='otp'
                    id='otp'
                    placeholder='Enter OTP'
                    value={otp}
                    required
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <button
                    onClick={handleVerify}
                    className='btn'
                    disabled={isValid}
                  >
                    Verify
                  </button>
                </>
              ) : (
                <>
                  <label htmlFor='usn'>Enter Your USN</label>
                  <div id='captcha' className='captcha'></div>
                  <input
                    name='usn'
                    id='usn'
                    placeholder='Enter Your USN'
                    value={usn}
                    required
                    onChange={(e) => setUsn(e.target.value)}
                  />
                  <button
                    onClick={handleSubmit}
                    className='btn'
                    disabled={isValid}
                  >
                    Next
                  </button>
                </>
              )}
            </form>
          )}
        </div>
        <button className='signOut' onClick={handleSignout}>
          SignOut---Only for testing
        </button>
      </div>
    </>
  )
}

export default App
