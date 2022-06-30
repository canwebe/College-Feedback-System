import { Link } from 'react-router-dom'
import logo from '../../assets/logo.webp'
const Nav = () => {
  return (
    <nav>
      <div className='wrapper nav'>
        {!navigator.onLine && <p className='offlineP'>Offline</p>}
        <Link to='/' className='logo'>
          <img src={logo} alt='logo' />
        </Link>
        {/* <a className='adminLink' href='https://saitdashboard.netlify.app'>
          <FaUserShield />
          Admin
        </a> */}
      </div>
    </nav>
  )
}

export default Nav
