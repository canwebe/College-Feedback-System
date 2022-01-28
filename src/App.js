import { AnimatePresence } from 'framer-motion'
import React, { useContext } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import useAuthListner from './hooks/useAuthListner'
import useUser from './hooks/useUser'
import Feedback from './pages/Feedback'
import Home from './pages/Home'
import Login from './pages/Login'
import SelectDept from './pages/SelectDept'
import RequireAuth from './components/requireAuth'
import Footer from './components/footer'

const App = () => {
  const { user } = useAuthListner()
  const location = useLocation()

  return (
    <>
      <nav>
        <Link to='/' className='logo'>
          <img src='logo.svg' alt='logo' />
          SaIT<span>FeedBack</span>
        </Link>
      </nav>
      <div className='navMargin'></div>
      <div className='mainBody'>
        <AnimatePresence exitBeforeEnter>
          <Routes location={location} key={location.pathname}>
            {/* <ProtectedRoute path="/" user={user} element={<Home />} /> */}
            <Route
              path='/'
              element={
                <RequireAuth user={user} redirectTo='/login'>
                  <SelectDept />
                </RequireAuth>
              }
            />
            <Route
              path=':id'
              element={
                <RequireAuth user={user} redirectTo='/login'>
                  <Home />
                </RequireAuth>
              }
            />

            <Route
              path='/:id/feedback'
              element={
                <RequireAuth user={user} redirectTo='/login'>
                  <Feedback />
                </RequireAuth>
              }
            />
            <Route path='/login' element={<Login />} />
          </Routes>
        </AnimatePresence>
      </div>
      <Footer />
    </>
  )
}

export default App
