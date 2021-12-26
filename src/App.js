import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'

const App = () => {
  return (
    <>
      <div className='wrapper'>
        <nav>
          <div className='logo'>
            SaiT<span>FeedBack</span>
          </div>
        </nav>
      </div>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  )
}

export default App
