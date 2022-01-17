import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useUser from "../../hooks/useUser";
import { fetchTechers } from "../../utils/firebase";
import "./home.style.css";

const Home = () => {
  const [teacherList, setTeacherList] = useState();
  const user = useUser();

  const fetchData = async () => {
    const data = await fetchTechers();
    setTeacherList(data);
  };

  useEffect(() => {
    fetchData();
  }, []);
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

      <div className="teacherListWrapper">
        <h1>Teachers</h1>
        <hr />
        {teacherList ? (
          teacherList.map((teacher, i) => (
            <Link to="feedback" key={i} className="teacherCard">
              <div className="img"></div>
              <div className="right">
                <p className="teacherName">{teacher.name}</p>
                <p className="subName">
                  <strong>Subject : </strong>
                  {teacher.subshort}
                </p>
                <p className="subFull">{teacher.subfull}</p>
              </div>
            </Link>
          ))
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </div>
  );
};

export default Home;
