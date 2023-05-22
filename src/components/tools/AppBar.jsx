import "./styles/AppBar.scss";
import { Link } from "react-router-dom";

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
        홈 화면
      </Link>
      <Link
        className={`item ${
          window.location.href.includes("maps") ? "active" : ""
        }`}
        to="/maps"
      >
        맵 보기
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
