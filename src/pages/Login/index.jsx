import React, { useState } from "react";
import { auth, db } from "../../lib/firebase";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut,
} from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import useAuthListner from "../../hooks/useAuthListner";
import "./login.style.css";
import { studentWithUid } from "../../utils/firebase";
import useUser from "../../hooks/useUser";

const Login = () => {
  const [usn, setUsn] = useState("");
  const [otp, setOtp] = useState("");
  const [final, setFinal] = useState();
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState({});
  const [error, setError] = useState("");
  const [succes, setSucces] = useState("");

  const { user } = useAuthListner();
  // const no = useUser();
  let pno = "";
  const isValid = usn === "" || usn.length < 10;

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(usn);
    const q = query(
      collection(db, "cse"),
      where("usn", "==", usn.trim().toUpperCase())
    );
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      // console.log(doc.data());
      setUserData(doc.data());
      pno = doc.data().number;
    });

    if (pno) {
      console.log("Phone Number Found");
      let verify = new RecaptchaVerifier(
        "captcha",
        { size: "invisible" },
        auth
      );
      signInWithPhoneNumber(auth, "+91" + pno, verify)
        .then((confirm) => {
          console.log("Otp Sent");
          setError("");
          setSucces(
            `OTP sent to the phone number ending with +91 ********${pno.slice(
              -2
            )}`
          );
          setFinal(confirm);
          setShow(true);
        })
        .catch((err) => {
          console.log(err);

          window.location.reload();
        });
    } else {
      console.log(userData, pno);
      setSucces("");
      setError("No info found USN incorrect , please try again");
    }
  };

  // Verify
  const handleVerify = (e) => {
    e.preventDefault();
    if (otp === null || final === null) return;
    final
      .confirm(otp)
      .then((result) => {
        console.log(result.user.uid);
        updateInfo(result.user.uid);
        window.grecaptcha = null;
        window.recaptcha = null;
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  };

  // SignOut
  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        console.log("Signout Succes");
      })
      .catch((err) => {
        console.log("Signout error", err);
      });
  };

  const updateInfo = async (uid) => {
    const q = query(
      collection(db, "cse"),
      where("usn", "==", usn.trim().toUpperCase())
    );
    const result = await getDocs(q);
    console.log(result.docs[0].ref);
    await updateDoc(result.docs[0].ref, {
      uid,
    });
  };

  return (
    <div className="wrapper login">
      <div className="app">
        <h1 className="welcome">Welcome to SaITFeedBack</h1>
        {user ? (
          <div className="userData">
            <p>
              USN: <strong>{userData.usn}</strong>,<br />
              Class: <strong>{userData.sec}</strong>
            </p>
          </div>
        ) : (
          <form>
            {error && <p className="errorMsg">{error}</p>}
            {succes && <p className="succesMsg">{succes}</p>}
            <h2>Authentication</h2>
            {show ? (
              <>
                <div className="formDiv">
                  <input
                    name="otp"
                    autoFocus
                    className="formInput"
                    placeholder=" "
                    value={otp}
                    maxLength="6"
                    required
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <label className="formLabel">Enter OTP</label>
                </div>

                <button
                  onClick={handleVerify}
                  className="btn"
                  disabled={isValid}
                >
                  Verify
                </button>
              </>
            ) : (
              <>
                <div className="formDiv">
                  <input
                    name="usn"
                    className="formInput"
                    placeholder=" "
                    value={usn}
                    required
                    maxLength="10"
                    onChange={(e) => setUsn(e.target.value)}
                  />
                  <label className="formLabel">Enter Your USN</label>
                </div>

                <div id="captcha" className="captcha"></div>

                <button
                  onClick={handleSubmit}
                  className={`btn ${isValid ? "disabled" : ""}`}
                  disabled={isValid}
                >
                  Next
                </button>
              </>
            )}
          </form>
        )}
      </div>
      {/* <button onClick={() => studentWithUid("abc")}>Update</button> */}
      <button className="signOut" onClick={handleSignout}>
        SignOut---Only for testing
      </button>
    </div>
  );
};

export default Login;
