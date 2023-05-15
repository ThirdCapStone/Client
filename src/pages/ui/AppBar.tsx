import "./AppBar.scss";
import { Link } from "react-router-dom";

const AppBar = () => {
  console.log(window.location.href.includes("home"));
  return (
    <div className="app-bar">
      <Link
        className={`item ${
          window.location.href.includes("home") ? "active" : ""
        }`}
        to="/home"
      >
        홈 화면
      </Link>
      <Link className="item" to="/maps">
        맵 보기
      </Link>
      <Link className="item" to="/book">
        예매
      </Link>
      <Link className="item" to="/profile">
        프로필
      </Link>
    </div>
  );
};

export default AppBar;
