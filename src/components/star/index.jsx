import { FaStar } from "react-icons/fa";
import "./star.style.css";

const Star = ({ rating }) => {
  return (
    <>
      {[...Array(5)].map((item, i) => (
        <FaStar className={i < rating ? "fill" : ""} key={i} />
      ))}
    </>
  );
};

export default Star;
