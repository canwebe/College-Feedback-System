import { AnimatePresence } from "framer-motion";
import React, { useContext } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import useAuthListner from "./hooks/useAuthListner";
import useUser from "./hooks/useUser";
import Feedback from "./pages/Feedback";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RequireAuth from "./utils/requireAuth.route";

const App = () => {
  const { user } = useAuthListner();
  const location = useLocation();

  return (
    <>
      <nav>
        <Link to="/" className="logo">
          SaIT<span>FeedBack</span>
        </Link>
      </nav>
      <div className="navMargin"></div>
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          {/* <ProtectedRoute path="/" user={user} element={<Home />} /> */}
          <Route
            path="/"
            element={
              <RequireAuth user={user} redirectTo="/login">
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/feedback"
            element={
              <RequireAuth user={user} redirectTo="/login">
                <Feedback />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default App;
