import './bottombar.style.css'
import { NavLink, useLocation } from 'react-router-dom'
export default function Bottombar() {
  return (
    <div className='bottombar'>
      <NavLink to='/'>Subjects</NavLink>
      <NavLink to='/webniar'>Webniar</NavLink>
    </div>
  )
}
