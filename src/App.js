import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import useAuthListner from "./hooks/useAuthListner";
import useUser from "./hooks/useUser";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoute from "./utils/protected.route";
import RequireAuth from "./utils/requireAuth.route";

const App = () => {
  const { user } = useAuthListner();
  return (
    <>
      <div className="wrapper">
        <nav>
          <div className="logo">
            SaiT<span>FeedBack</span>
          </div>
        </nav>
      </div>
      {console.log(user)}
      <Routes>
        {/* <ProtectedRoute path="/" user={user} element={<Home />} /> */}
        <Route
          path="/"
          element={
            <RequireAuth user={user} redirectTo="/login">
              <Home />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
