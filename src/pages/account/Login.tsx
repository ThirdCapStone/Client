import "./Login.scss";

import { useState, ComponentProps, Dispatch } from "react";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { AccountInput, handleError } from "../ui/tools/Input";
import { AccountButton } from "../ui/tools/Button";
import Account from "../../utils/http/account";
import { validateID, validatePWD } from "../../utils/validator";
import { showToast } from "../../utils/toast";
import withReactContent from "sweetalert2-react-content";

const mySwal = withReactContent(Swal);

const Login = (props: {
  isSignupMount: boolean;
  isHomeMount: boolean;
  setIsSignup: Dispatch<boolean>;
  setIsSignupMount: Dispatch<boolean>;
  setIsHomeMount: Dispatch<boolean>;
  setIsLogined: Dispatch<boolean>;
}) => {
  const [userID, setUserID] = useState("");
  const [userPWD, setUserPWD] = useState("");
  const [clicked, setClicked] = useState(false);
  const [chatID, setChatID] = useState(false);
  const [chatPWD, setChatPWD] = useState(false);

  const detectEnter: ComponentProps<"form">["onKeyDown"] = (event) => {
    if (event.key === "Enter") {
      const btn = document.querySelector(
        "div.login-box > form.login-form > button.outline"
      ) as Element;
      const event = new Event("click", { bubbles: true });
      btn.dispatchEvent(event);
    }
  };

  const submitLogin: ComponentProps<"button">["onClick"] = async (event) => {
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

  const changeToSignup: ComponentProps<"button">["onClick"] = (event) => {
    props.setIsSignup(true);
    props.setIsSignupMount(true);
    setTimeout(() => {
      props.setIsSignupMount(false);
    }, 800);
  };

  const changeToHome = (message: string) => {
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
        props.isHomeMount ? `login-box-home` : ``
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
          validate={validateID}
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
          validate={validatePWD}
          onChange={(event) => {
            setUserPWD(event.target.value);
          }}
          onFocus={() => setChatPWD(true)}
          onBlur={() => setChatPWD(false)}
        />
        <div
          className="forgot"
          onClick={() => {
            mySwal.fire({
              html: <Custom />,
            });
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
