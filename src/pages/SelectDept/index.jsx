import { Link } from 'react-router-dom'
import './selectDept.style.css'

const SelectDept = () => {
  return (
    <div className='selectDept'>
      <h1>Select your Department</h1>
      <div className='deptList'>
        <Link to='/cse'>CSE</Link>
        <Link to='/is'>IS</Link>
        <Link to='/me'>ME</Link>
        <Link to='/civil'>CIVIL</Link>
        <Link to='/ece'>ECE</Link>
      </div>
    </div>
  )
}

export default SelectDept
