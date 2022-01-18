import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useUser from "../../hooks/useUser";
import { fetchTechers } from "../../utils/firebase";
import "./home.style.css";
import { motion } from "framer-motion";
const downloadCardVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.7 } },
  hover: {
    backgroundColor: "#2a305c",
    x: 5,
    boxShadow: "2px 3px 6px 0px  rgba(51, 51, 51, 0.226)",
    transition: {
      type: "spring",
      stiffness: 150,
    },
  },
};

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

      <div className="teacherListCard">
        <h1>Teachers</h1>
        <hr />
        <div layout className="teacherListWrapper">
          {teacherList ? (
            teacherList.map((teacher, i) => (
              <div
                layout
                variants={downloadCardVariants}
                initial="hidden"
                animate="visible"
                key={i}
              >
                <Link
                  to="feedback"
                  state={{
                    name: teacher.name,
                    sub: teacher.subfull,
                    uid: user.uid,
                  }}
                  className="teacherCard"
                >
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
              </div>
            ))
          ) : (
            <h2>Loading...</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
