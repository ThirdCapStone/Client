import { useState } from "react";
import "./styles/MovieComponent.scss";

const MovieComponent = (props) => {
  const [entered, setEntered] = useState(false);
  return (
    <div
      className={`movie movie-${props.idx} ${entered ? "movie-active" : ""}`}
    >
      <div className={`rank ${props.idx < 4 ? "high-rank" : ""}`}>
        {props.idx}
      </div>
      <img
        src={props.imgUrl}
        className="movie-img"
        alt={props.title}
        onMouseEnter={() => {
          setEntered(true);
        }}
        onMouseLeave={() => {
          setEntered(false);
        }}
        onTransitionEnd={(event) => {
          console.log(event);
        }}
      />
      <div
        className={`title ${entered ? "title-active" : ""}`}
        style={{ width: "100%" }}
      >
        {props.title}
      </div>
    </div>
  );
};

export default MovieComponent;
