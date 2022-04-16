import { AnimatePresence } from 'framer-motion'
import React, { Suspense, lazy, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import useAuthListner from './hooks/useAuthListner'
import RequireAuth from './components/requireAuth'
import LoaderPage from './components/loaderPage'
import Nav from './components/nav'
import Footer from './components/footer'

const Feedback = lazy(() => import('./pages/Feedback'))
const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))

const App = () => {
  const { user } = useAuthListner()
  const location = useLocation()
  const scrollRef = useRef()

  return (
    <>
      <Nav />
      <div ref={scrollRef} className='navMargin'></div>
      <div className='mainBody'>
        <Suspense fallback={<LoaderPage />}>
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
                    <Feedback scrollRef={scrollRef} />
                  </RequireAuth>
                }
              />
              <Route path='/login' element={<Login />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </div>
      <Footer />
    </>
  )
}

export default App
