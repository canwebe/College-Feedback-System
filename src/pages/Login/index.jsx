import React, { useRef, useState, useEffect } from "react";
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
import { updateInfo } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [usn, setUsn] = useState("");
  const [otp, setOtp] = useState("");
  const [final, setFinal] = useState();
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState({});
  const [error, setError] = useState("");
  const [succes, setSucces] = useState("");
  const [loading, setLoading] = useState(false);

  const inputRef = useRef();

  const { user } = useAuthListner();
  const navigate = useNavigate();
  // const no = useUser();
  let pno = "";
  const isValid = usn === "" || usn.length < 10;
  const otpInvalid = otp === "" || otp.length < 6;

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
          setLoading(false);
          console.log("Otp Sent");
          setError("");
          setSucces(
            `OTP sent to the phone number ending with +91 ********${pno.slice(
              -2
            )}`
          );
          setFinal(confirm);
          setShow(true);
          inputRef.current.focus();
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          alert(err);
          window.location.reload();
        });
    } else {
      setLoading(false);
      console.log(userData, pno);
      setSucces("");
      setError("No info found USN incorrect , please try again");
    }
  };

  // Verify
  const handleVerify = (e) => {
    e.preventDefault();
    setLoading(true);
    if (otp === null || final === null) return;
    final
      .confirm(otp)
      .then((result) => {
        console.log(result.user.uid);
        updateInfo(result.user.uid, usn);
        setLoading(false);
        navigate("/");
        window.grecaptcha = null;
        window.recaptcha = null;
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);

        setOtp("");
        setSucces("");
        setError("Verification failed OTP did not matched Try Again !!");
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

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="wrapper login">
      <div className="app">
        <form>
          {error && <p className="errorMsg">{error}</p>}
          {succes && <p className="succesMsg">{succes}</p>}
          <h2>Authentication</h2>
          {show ? (
            <>
              <div className="formDiv">
                <input
                  name="otp"
                  ref={inputRef}
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
                className={`btn ${otpInvalid ? "disabled" : ""}`}
                disabled={otpInvalid || loading}
              >
                {loading ? "loading..." : "Verify"}
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
                disabled={isValid || loading}
              >
                {loading ? "loading..." : "Next"}
              </button>
            </>
          )}
        </form>
      </div>
      {/* <button onClick={() => studentWithUid("abc")}>Update</button> */}
      {/* <button className="signOut" onClick={handleSignout}>
        SignOut---Only for testing
      </button> */}
    </div>
  );
};

export default Login;
