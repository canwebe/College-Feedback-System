import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { FaInfo, FaUserShield } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.webp'
import InfoModal from '../modal/infoModal'
const Nav = () => {
  const [isModal, setIsModal] = useState(false)
  return (
    <nav>
      <div className='wrapper nav'>
        {!navigator.onLine && <p className='offlineP'>Offline</p>}
        <Link to='/' className='logo'>
          <img src={logo} alt='logo' />
        </Link>

        <FaInfo
          className='infoBtn'
          onClick={() => setIsModal((prev) => !prev)}
        />

        <a className='adminLink' href='https://saitdashboard.netlify.app'>
          <FaUserShield />
          Admin
        </a>
      </div>
      <AnimatePresence>
        {isModal && <InfoModal setIsModal={setIsModal} />}{' '}
      </AnimatePresence>
    </nav>
  )
}

export default Nav
