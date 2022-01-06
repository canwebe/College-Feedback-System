import React from "react";
import { Link } from "react-router-dom";
import useUser from "../../hooks/useUser";
import "./home.style.css";

const Home = () => {
  const user = useUser();
  return (
    <div className="wrapper home">
      <div className="usnCard">
        {console.log(user)}
        <p className="usnNumber">
          <strong>USN :</strong> <span className="usn">{user.usn}</span>
        </p>
        <hr />
        <div className="semSec">
          <p>
            <strong>Sem :</strong> {user.sem} ,
          </p>
          <p>
            <strong>Sec :</strong> {user.sec} ,
          </p>
          <p>
            <strong> Branch :</strong> CSE
          </p>
        </div>

        <p>
          <strong>Feedback Status :</strong>{" "}
          <span className="status">Pending</span>
        </p>
      </div>
    </div>
  );
};

export default Home;
