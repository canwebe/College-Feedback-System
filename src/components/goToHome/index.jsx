import { Link } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'
export default function GoToHome() {
  return (
    <Link className='homeBtn' to='/'>
      <FaHome />
    </Link>
  )
}
