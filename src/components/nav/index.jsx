import { Link } from 'react-router-dom'
import logo from '../../assets/logo.webp'
import { FaUserShield } from 'react-icons/fa'

const Nav = () => {
  return (
    <nav>
      <div className='wrapper nav'>
        <Link to='/' className='logo'>
          <img src={logo} alt='logo' />
        </Link>
        <a className='adminLink' href='https://saitdashboard.netlify.app'>
          <FaUserShield />
          Admin
        </a>
      </div>
    </nav>
  )
}

export default Nav
