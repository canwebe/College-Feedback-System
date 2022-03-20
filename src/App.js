import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import useAuthListner from './hooks/useAuthListner'
import Feedback from './pages/Feedback'
import Home from './pages/Home'
import Login from './pages/Login'
import RequireAuth from './components/requireAuth'
import Footer from './components/footer'
import Admin from './pages/Admin'
import AdminStudents from './components/adminStudents'
import AdminHome from './components/adminHome'
import AdminClasses from './components/adminClasses'
import AdminTeachers from './components/adminTeachers'

const App = () => {
  const { user } = useAuthListner()
  const location = useLocation()

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route
          path='/'
          element={
            <RequireAuth user={user} redirectTo='/login'>
              <Home />
            </RequireAuth>
          }
        />

        <Route
          path='/feedback'
          element={
            <RequireAuth user={user} redirectTo='/login'>
              <Feedback />
            </RequireAuth>
          }
        />
        <Route path='/login' element={<Login />} />
        <Route path='/admin' element={<Admin />}>
          <Route path='' element={<AdminHome />} />
          <Route path='students' element={<AdminStudents />} />
          <Route path='teachers' element={<AdminTeachers />} />
          <Route path='classes' element={<AdminClasses />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

export default App
