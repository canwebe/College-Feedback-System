import { useState } from "react";
import { Link } from "react-router-dom";
import Star from "../../components/star";
import "./feedback.style.css";

const questions = [
  "Faculty preparation for the class",
  "Faculty's clarity in explaining the subject",
  "Faculty's answer to your queries/question",
  "Faculty's guidance for preparation of exam",
  "Faculty provides relevant and usefull course material",
  "Faculty's motivation towards extra curricular and technical activity",
  "Overall perfomance",
];

const Feedback = () => {
  // ------States-------
  //For question number
  const [question, setQuestion] = useState(0);

  //For Storing points
  const [points, setPoints] = useState(0);

  //Checking last question
  const [isFinish, setIsFinish] = useState(false);

  //-------Functions-----
  //Click Function to update question and points

  const handleClick = (point) => {
    //For last question
    if (question >= questions.length - 1) {
      setPoints((prev) => prev + point);
      //Enabling the finish boolean for thanks card
      setIsFinish(true);
      return;
    }
    setQuestion((prev) => prev + 1);
    setPoints((prev) => prev + point);
  };

  return (
    <div className="feedback">
      <h2>Feedback</h2>
      <hr />
      <p>SRIKANT SP</p>
      <div className="wrapper">
        {isFinish ? (
          <div className="finishCard">
            <p>Thanks for the Review</p>
            <Link className="btn continue" to="/">
              Continue
            </Link>
          </div>
        ) : (
          <div className="feedbackSection">
            <p>{question + 1} / 7</p>
            <p className="question">{questions[question]}</p>
            <div className="answers">
              <button onClick={() => handleClick(5)}>
                Excelent
                <span className="star">
                  <Star rating={5} />
                </span>
              </button>
              <button onClick={() => handleClick(4)}>
                Good
                <span className="star">
                  <Star rating={4} />
                </span>
              </button>
              <button onClick={() => handleClick(3)}>
                Average
                <span className="star">
                  <Star rating={3} />
                </span>
              </button>
              <button onClick={() => handleClick(2)}>
                Poor
                <span className="star">
                  <Star rating={2} />
                </span>
              </button>
              <button onClick={() => handleClick(1)}>
                Very Poor
                <span className="star">
                  <Star rating={1} />
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feedback;
