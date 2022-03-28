import { AnimatePresence } from 'framer-motion'
import React, { Suspense, lazy, useRef } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import useAuthListner from './hooks/useAuthListner'
import RequireAuth from './components/requireAuth'
import LoaderPage from './components/loaderPage'

// import Feedback from './pages/Feedback'
// import Home from './pages/Home'
// import Login from './pages/Login'
// import Admin from './pages/Admin'
// import AdminStudents from './components/adminStudents'
// import AdminHome from './components/adminHome'
// import AdminClasses from './components/adminClasses'
// import AdminTeachers from './components/adminTeachers'
const AdminLayout = lazy(() => import('./layout/AdminLayout'))
const MainLayout = lazy(() => import('./layout/mainLayout'))
const Feedback = lazy(() => import('./pages/Feedback'))
const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const AdminStudents = lazy(() => import('./components/adminStudents'))
const AdminHome = lazy(() => import('./components/adminHome'))
const AdminClasses = lazy(() => import('./components/adminClasses'))
const AdminTeachers = lazy(() => import('./components/adminTeachers'))

const App = () => {
  const { user } = useAuthListner()
  const location = useLocation()
  const scrollRef = useRef()

  return (
    <Suspense fallback={<LoaderPage />}>
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={<MainLayout scrollRef={scrollRef} />}>
            <Route
              path=''
              element={
                <RequireAuth user={user} redirectTo='/login'>
                  <Home />
                </RequireAuth>
              }
            />

            <Route
              path='feedback'
              element={
                <RequireAuth user={user} redirectTo='/login'>
                  <Feedback scrollRef={scrollRef} />
                </RequireAuth>
              }
            />
            <Route path='login' element={<Login />} />
          </Route>

          <Route path='/admin' element={<AdminLayout />}>
            <Route path='' element={<AdminHome />} />
            <Route path='students' element={<AdminStudents />} />
            <Route path='teachers' element={<AdminTeachers />} />
            <Route path='classes' element={<AdminClasses />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </Suspense>
  )
}

export default App
