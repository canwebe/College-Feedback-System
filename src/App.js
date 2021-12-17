import { useState } from 'react'
import { auth, db } from './lib/firebase'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'

function App() {
  const [usn, setUsn] = useState('')
  const [final, setFinal] = useState()
  const [show, setShow] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    let verify = new RecaptchaVerifier('captcha', { size: 'invisible' }, auth)

    // signInWithPhoneNumber(auth, '+911111111111', verify)
    //   .then((confirm) => {
    //     console.log('sent', confirm)
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
  }

  return (
    <>
      <nav>
        <div className='logo'>
          SaiT<span>FeedBack</span>
        </div>
      </nav>
      <div className='app'>
        <h1>Welcome to SaITFeedBack</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor='usn'>Enter Your USN</label>
          <div id='captcha' className='captcha'></div>
          <input
            name='usn'
            id='usn'
            placeholder='Enter Your USN'
            value={usn}
            onChange={(e) => setUsn(e.target.value)}
          />
          <button type='submit'>Next</button>
        </form>
      </div>
    </>
  )
}

export default App
