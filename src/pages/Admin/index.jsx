import { NavLink, Outlet, Route, Routes } from 'react-router-dom'
import AdminHome from '../../components/adminHome'
import AdminStudents from '../../components/adminStudents'
import useTitle from '../../hooks/useTitle'
import {
  FaUserGraduate,
  FaUserTie,
  FaUniversity,
  FaBook,
  FaHome,
  FaSignOutAlt,
} from 'react-icons/fa'
import './admin.style.css'
const Admin = () => {
  useTitle('Admin | SaITFeedback')

  return (
    <div className='admin'>
      <div className='adminGrid'>
        <div className='sideMenu'>
          <div className='sideLogo'>
            <span>SaITFeedback</span> Admin
          </div>
          <div className='menuItemsWrapper'>
            <NavLink to='' end={true}>
              <FaHome /> Home
            </NavLink>

            <NavLink to='students' end={true}>
              <FaUserGraduate />
              Students
            </NavLink>

            <NavLink to='teachers' end={true}>
              <FaUserTie />
              Teacher
            </NavLink>

            <NavLink to='classes' end={true}>
              <FaBook /> Classes
            </NavLink>
          </div>
          <div className='logOutDiv'>
            <button>
              Logout <FaSignOutAlt />
            </button>
          </div>
        </div>
        <div className='mainContent'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Admin
