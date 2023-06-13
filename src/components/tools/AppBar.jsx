import "./styles/AppBar.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

const AppBar = (props) => {
  return (
    <div className="app-bar">
      <div style={{ marginLeft: "30%" }}></div>
      <Link
        className={`item ${
          window.location.href.includes("home") ? "active" : ""
        }`}
        to="/home"
      >
        홈
      </Link>
      <Link
        className={`item ${
          window.location.href.includes("movie") ? "active" : ""
        }`}
        to="/movie"
      >
        영화
      </Link>
      <Link
        className={`item ${
          window.location.href.includes("map") ? "active" : ""
        }`}
        to="/map"
      >
        맵
      </Link>
      <Link
        className={`item ${
          window.location.href.includes("book") ? "active" : ""
        }`}
        to="/book"
      >
        예매
      </Link>
    </div>
  );
};

export default AppBar;
