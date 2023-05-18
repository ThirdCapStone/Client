import "./styles/Login.scss";

import { useState } from "react";
import { Navigate } from "react-router-dom";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { showForgotPWDAlert } from "../../utils/alert";
import { AccountInput, handleError } from "../tools/Input";
import { AccountButton } from "../tools/Button";
import Account from "../../utils/http/account";
import { validateID, validatePWD } from "../../utils/validator";
import { showToast } from "../../utils/toast";

const Login = (props) => {
  const [userID, setUserID] = useState("");
  const [userPWD, setUserPWD] = useState("");
  const [clicked, setClicked] = useState(false);
  const [chatID, setChatID] = useState(false);
  const [chatPWD, setChatPWD] = useState(false);

  const detectEnter = (event) => {
    if (event.key === "Enter") {
      const btn = document.querySelector(
        "div.login-box > form.login-form > button.outline"
      );
      const event = new Event("click", { bubbles: true });
      btn.dispatchEvent(event);
    }
  };

  const submitLogin = async (event) => {
    event.preventDefault();
    setClicked(true);

    if (validateID(userID) !== "") {
      handleError("id", setChatID);
    } else if (validatePWD(userPWD) !== "") {
      handleError("pwd", setChatPWD);
    } else {
      const response = await Account.login(userID, userPWD);
      const message = response.data["message"];
      switch (response.status) {
        case 200:
          changeToHome(message);
          break;
        case 401:
          showToast("warning", message);
          break;
        case 500:
          showToast("error", message);
          break;
        default:
          showToast("error", "오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    }
    setClicked(false);
  };

  const changeToSignup = (event) => {
    props.setIsSignup(true);
    props.setIsSignupMount(true);
    setTimeout(() => {
      props.setIsSignupMount(false);
    }, 800);
  };

  const changeToHome = (message) => {
    showToast("success", message);
    props.setIsHomeMount(true);
    props.setIsLogined(true);
    setTimeout(() => {
      props.setIsHomeMount(false);
    }, 800);
  };

  return (
    <div
      className={`login-box ${props.isSignupMount ? `login-box-signup` : ``} ${
        props.isLoginMount ? `login-box-home` : ``
      }`}
    >
      {props.isHomeMount ? <Navigate to="/home" replace /> : null}
      <div className="login-title">Login</div>
      <form className="login-form" onKeyDown={detectEnter}>
        <AccountInput
          type="text"
          icon={faUser}
          placeholder="아이디"
          className="id"
          value={userID}
          isChat={chatID}
          validate={validateID(userID)}
          onChange={(event) => {
            setUserID(event.target.value);
          }}
          onFocus={() => setChatID(true)}
          onBlur={() => setChatID(false)}
        />
        <AccountInput
          type="password"
          icon={faLock}
          placeholder="비밀번호"
          className="pwd"
          value={userPWD}
          isChat={chatPWD}
          validate={validatePWD(userPWD)}
          onChange={(event) => {
            setUserPWD(event.target.value);
          }}
          onFocus={() => setChatPWD(true)}
          onBlur={() => setChatPWD(false)}
        />
        <div
          className="forgot"
          onClick={async () => {
            await showForgotPWDAlert(
              "비밀번호 찾기",
              "비밀번호를 변경하세요.",
              "question",
              "변경하기"
            );
          }}
        >
          비밀번호를 잊으셨나요?
        </div>

        <AccountButton
          type="submit"
          className="outline"
          text="로그인"
          display="block"
          fontSize="1.6em"
          height="8vh"
          marginLeft="15%"
          onClick={submitLogin}
          disabled={clicked}
        />
        <br />
        <div>
          계정이 아직 없으신가요? &nbsp;
          <span className="signup" onClick={changeToSignup}>
            회원가입
          </span>
        </div>
      </form>
    </div>
  );
};

const Custom = () => {
  return <div>Hello World</div>;
};
export default Login;
