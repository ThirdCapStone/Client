import "./Login.scss";

import { useState, ComponentProps, Dispatch } from "react";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { AccountInput, handleError } from "../ui/tools/Input";
import { AccountButton } from "../ui/tools/Button";
import { AccountLogin } from "../../utils/requester";
import { validateID, validatePWD } from "../../utils/validator";
import { showToast } from "../../utils/toast";
import { forgotPassword } from "../../utils/alert";

const Login = (props: {
  isMount: boolean;
  setIsSignup: Dispatch<boolean>;
  setIsMount: Dispatch<boolean>;
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
      const response = await AccountLogin(userID, userPWD);
      const message = response.data["message"];
      switch (response.status) {
        case 200:
          showToast("success", message);
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
    props.setIsMount(true);
    setTimeout(() => {
      props.setIsMount(false);
    }, 800);
  };

  return (
    <div className={`login-box ${props.isMount ? `login-box-active` : ``}`}>
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
            forgotPassword();
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
export default Login;
