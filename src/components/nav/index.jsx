import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <nav>
      <Link to='/' className='logo'>
        <img src='logo.svg' alt='logo' />
        SaIT<span>FeedBack</span>
      </Link>
    </nav>
  )
}

export default Nav
