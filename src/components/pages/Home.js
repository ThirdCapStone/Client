import { Navigate } from "react-router-dom";
import "./styles/Home.scss";
import MoviePoster from "../tools/Movie/MoviePoster";

const Home = (props) => {
  const toLogin = () => {
    props.setIsLoginMount(true);
    setTimeout(() => {
      props.setIsLoginMount(false);
    }, 800);
  };

  return (
    <div className={`home-box ${props.isHomeMount ? `home-box-login` : ``}`}>
      {props.isLoginMount ? <Navigate to="/login" replace /> : ""}
      <div onClick={() => toLogin()}>
        {props.isLogined ? "hello" : "please login"}
      </div>
      <MoviePoster />
    </div>
  );
};

export default Home;
