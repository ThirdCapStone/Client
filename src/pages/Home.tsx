import { Dispatch } from "react";
import { Navigate } from "react-router-dom";
import "./Home.scss";

type PropsType = {
  isHomeMount: boolean;
  isLoginMount: boolean;
  isLogined: boolean;
  setIsHomeMount: Dispatch<boolean>;
  setIsLogined: Dispatch<boolean>;
  setIsLoginMount: Dispatch<boolean>;
};

const Home = (props: PropsType) => {
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
    </div>
  );
};

export default Home;
