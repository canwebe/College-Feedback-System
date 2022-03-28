import { Link } from 'react-router-dom'
import logo from '../../assets/logo.webp'

const Nav = () => {
  return (
    <nav>
      <Link to='/' className='logo'>
        <img src={logo} alt='logo' />
      </Link>
    </nav>
  )
}

export default Nav
