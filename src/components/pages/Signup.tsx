import "../styles/Signup.scss";

import { useState, ComponentProps, Dispatch } from "react";
import {
  validateID,
  validatePWD,
  validatePWDCheck,
  validateNickname,
  validateEmail,
  validatePhone,
} from "../../utils/validator";
import { showToast } from "../../utils/toast";
import { showEmailALert } from "../../utils/alert";
import Account from "../../utils/http/account";
import { AccountInput, handleError } from "../tools/Input";
import { AccountButton } from "../tools/Button";
import {
  faUser,
  faLock,
  faUserTag,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

const Signup = (props: {
  isMount: boolean;
  setIsSignup: Dispatch<boolean>;
  setIsMount: Dispatch<boolean>;
}) => {
  const [userID, setUserID] = useState("");
  const [userPWD, setUserPWD] = useState("");
  const [userPWDCheck, setUserPWDCheck] = useState("");
  const [userNickname, setUserNickname] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [chatID, setChatID] = useState(false);
  const [chatPWD, setChatPWD] = useState(false);
  const [chatPWDCheck, setChatPWDCheck] = useState(false);
  const [chatNickname, setChatNickname] = useState(false);
  const [chatEmail, setChatEmail] = useState(false);
  const [chatPhone, setChatPhone] = useState(false);
  const [verifiedID, setVerifiedID] = useState(false);
  const [verifiedNickname, setVerifiedNickname] = useState(false);

  const toLogin = () => {
    props.setIsSignup(false);
    props.setIsMount(true);
    setTimeout(() => {
      props.setIsMount(false);
    }, 800);
  };

  const submitSignup: ComponentProps<"button">["onClick"] = async (event) => {
    event.preventDefault();
    if (validateID(userID) !== "") {
      handleError("id", setChatID);
    } else if (validatePWD(userPWD) !== "") {
      handleError("pwd", setChatPWD);
    } else if (validatePWDCheck(userPWD, userPWDCheck) !== "") {
      handleError("pwd-check", setChatPWDCheck);
    } else if (validateNickname(userNickname) !== "") {
      handleError("nickname", setChatNickname);
    } else if (validateEmail(userEmail) !== "") {
      handleError("email", setChatEmail);
    } else if (validatePhone(userPhone) !== "") {
      handleError("phone", setChatPhone);
    } else if (!verifiedID) {
      showToast("warning", "아이디 중복확인을 해주세요");
    } else if (!verifiedNickname) {
      showToast("warning", "닉네임 중복확인을 해주세요");
    } else {
      const response = await Account.signup(
        userID,
        userPWD,
        userNickname,
        userEmail,
        userPhone
      );
      const message = response.data["message"];
      switch (response.status) {
        case 201:
          showToast("success", message);
          toLogin();
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
  };

  const checkDuplicate = async (
    inputUserID: string = "",
    inputUserEmail: string = ""
  ) => {
    const response = await Account.checkDuplicate(inputUserID, inputUserEmail);
    const message = response.data["message"];
    console.log(response);
    switch (response.status) {
      case 200:
        showToast("success", message);
        break;
      case 409:
        showToast("warning", message);
        break;
      case 500:
        showToast("error", message);
        break;
      default:
        showToast("error", message);
        break;
    }

    return response.status;
  };

  return (
    <div className={`signup-box ${props.isMount ? `signup-box-active` : ``}`}>
      <form
        className="signup-form"
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            const btn = document.querySelector("button.msc-button") as Element;
            const event = new Event("click", { bubbles: true });
            btn.dispatchEvent(event);
          }
        }}
      >
        <AccountInput
          type="text"
          className="id"
          icon={faUser}
          placeholder="아이디"
          VerifyButton={
            <AccountButton
              type="button"
              className="outline"
              text="중복확인"
              width="15%"
              marginLeft="5%"
              onClick={async (e) => {
                e.preventDefault();
                if (validateID(userID) === "") {
                  const status = await checkDuplicate(userID);
                  if (status === 200) {
                    setVerifiedID(true);
                  }
                } else {
                  handleError("id", setChatID);
                }
              }}
            />
          }
          value={userID}
          isChat={chatID}
          validate={validateID(userID)}
          onChange={(event) => setUserID(event.target.value)}
          onBlur={() => setChatID(false)}
          onFocus={() => setChatID(true)}
          width="40%"
          disabled={verifiedID}
        />

        <AccountInput
          type="password"
          className="pwd"
          icon={faLock}
          placeholder="비밀번호"
          value={userPWD}
          isChat={chatPWD}
          validate={validatePWD(userPWD)}
          onChange={(event) => setUserPWD(event.target.value)}
          onBlur={() => setChatPWD(false)}
          onFocus={() => setChatPWD(true)}
        />

        <AccountInput
          type="password"
          className="pwd-check"
          icon={faLock}
          placeholder="비밀번호 재입력"
          value={userPWDCheck}
          isChat={chatPWDCheck}
          validate={validatePWDCheck(userPWD, userPWDCheck)}
          onChange={(event) => setUserPWDCheck(event.target.value)}
          onBlur={() => setChatPWDCheck(false)}
          onFocus={() => setChatPWDCheck(true)}
        />

        <AccountInput
          type="text"
          className="nickname"
          icon={faUserTag}
          placeholder="닉네임"
          value={userNickname}
          isChat={chatNickname}
          validate={validateNickname(userNickname)}
          VerifyButton={
            <AccountButton
              type="button"
              className="outline"
              text="중복확인"
              width="15%"
              marginLeft="5%"
              onClick={async (e) => {
                e.preventDefault();
                if (validateNickname(userNickname) === "") {
                  const status = await checkDuplicate(userNickname);
                  if (status === 200) {
                    setVerifiedNickname(true);
                  }
                } else {
                  handleError("nickname", setChatNickname);
                }
              }}
            />
          }
          onChange={(event) => setUserNickname(event.target.value)}
          onBlur={() => setChatNickname(false)}
          onFocus={() => setChatNickname(true)}
          width="40%"
          disabled={verifiedNickname}
        />

        <AccountInput
          type="email"
          className="email"
          icon={faEnvelope}
          placeholder="이메일 (someone@example.com)"
          value={userEmail}
          isChat={chatEmail}
          validate={validateEmail(userEmail)}
          VerifyButton={
            <AccountButton
              type="button"
              className="outline"
              text="이메일 확인"
              width="15%"
              marginLeft="5%"
              onClick={async (e) => {
                let leftTime = 1000 * 60 * 3;
                e.preventDefault();
                if (validateEmail(userEmail) == "") {
                  await Account.sendEmail(userEmail);
                  const response = await showEmailALert(
                    userEmail,
                    "이메일확인",
                    "이메일을 입력해주세요",
                    "question",
                    "제출하기",
                    leftTime,
                    false
                  );
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
                  }
                } else {
                  handleError("email", setChatEmail);
                }
              }}
            />
          }
          onChange={(event) => setUserEmail(event.target.value)}
          onBlur={() => setChatEmail(false)}
          onFocus={() => setChatEmail(true)}
          width="40%"
        />

        <AccountInput
          type="tel"
          className="phone"
          icon={faPhone}
          placeholder="전화번호 (000-0000-0000)"
          value={userPhone}
          isChat={chatPhone}
          validate={validatePhone(userPhone)}
          onChange={(event) => setUserPhone(event.target.value)}
          onBlur={() => setChatPhone(false)}
          onFocus={() => setChatPhone(true)}
        />

        <AccountButton
          type="submit"
          className="outline"
          text="회원가입"
          display="block"
          width="50%"
          height="8vh"
          marginLeft="25%"
          fontSize="1.6em"
          onClick={submitSignup}
        />
      </form>
      <div onClick={() => toLogin()}> Back </div>
    </div>
  );
};
export default Signup;
