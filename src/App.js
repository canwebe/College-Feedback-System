import { AnimatePresence } from 'framer-motion'
import React, { Suspense, lazy, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import useAuthListner from './hooks/useAuthListner'
import RequireAuth from './components/requireAuth'
import LoaderPage from './components/loaderPage'
import Nav from './components/nav'
import { Toaster } from 'react-hot-toast'
import Bottombar from './components/bottombar'
import Webniar from './pages/Webniar'

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
      <Toaster />
      <div ref={scrollRef} className="navMargin"></div>
      <div className="mainBody">
        <Suspense fallback={<LoaderPage />}>
          <AnimatePresence exitBeforeEnter>
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <RequireAuth user={user} redirectTo="/login">
                    <Home user={user} />
                  </RequireAuth>
                }
              />
              <Route
                path="/feedback"
                element={
                  <RequireAuth user={user} redirectTo="/login">
                    <Feedback scrollRef={scrollRef} />
                  </RequireAuth>
                }
              />
              <Route
                path="/webniar"
                element={
                  <RequireAuth user={user} redirectTo="/login">
                    <Webniar user={user} />
                  </RequireAuth>
                }
              />
              <Route path="/login" element={<Login user={user} />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </div>
      {(location.pathname === '/' || location.pathname === '/webniar') && (
        <Bottombar />
      )}
    </>
  )
}

export default App
