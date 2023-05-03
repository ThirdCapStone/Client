import "./Signup.scss";

import {
  useRef,
  forwardRef,
  LegacyRef,
  useState,
  ComponentProps,
  MutableRefObject,
} from "react";
import { Id } from "react-toastify";
import {
  validateID,
  validatePWD,
  validatePWDCheck,
  validateNickname,
  validateEmail,
  validatePhone,
} from "../../utils/validator";
import { ShowAlram } from "../ui/Alram";
import { AccountSignup } from "../../utils/requester";
import { AccountInput, handleError } from "../ui/tools/Input";
import { AccountButton } from "../ui/tools/Button";
import { MiniLoading } from "../ui/Loading";

const Signup = forwardRef((props, ref: LegacyRef<HTMLDivElement>) => {
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
  const [isAlram, setIsAlram] = useState(false);
  const toastId = useRef<Id>() as MutableRefObject<Id>;

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
    } else {
      setTimeout(() => {
        setIsAlram(true);
      }, 1000);
      setIsAlram(false);

      const response = await AccountSignup(
        userID,
        userPWD,
        userNickname,
        userEmail,
        userPhone
      );
      const message = response.data["message"];
      switch (response.status) {
        case 201:
          ShowAlram("success", message, toastId, isAlram);
          break;
        case 401:
          ShowAlram("warning", message, toastId, isAlram);
          break;
        case 500:
          ShowAlram("error", message, toastId, isAlram);
          break;
        default:
          ShowAlram(
            "error",
            "오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
            toastId,
            isAlram
          );
      }
    }
  };

  return (
    <div className="signup-box" ref={ref}>
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
          placeholder="아이디"
          value={userID}
          onChange={(event) => setUserID(event.target.value)}
          onBlur={() => setChatID(false)}
          onFocus={() => setChatID(true)}
        />
        <MiniLoading typing={chatID} />
        <label className="id-error error">
          {chatID ? validateID(userID) : ""}
        </label>
        <AccountInput
          type="password"
          placeholder="비밀번호"
          value={userPWD}
          onChange={(event) => setUserPWD(event.target.value)}
          onBlur={() => setChatPWD(false)}
          onFocus={() => setChatPWD(true)}
        />
        <MiniLoading typing={chatPWD} />
        <label className="pwd-error error">
          {chatPWD ? validatePWD(userPWD) : ""}
        </label>

        <AccountInput
          type="password"
          placeholder="비밀번호 재입력"
          value={userPWDCheck}
          onChange={(event) => setUserPWDCheck(event.target.value)}
          onBlur={() => setChatPWDCheck(false)}
          onFocus={() => setChatPWDCheck(true)}
        />
        <MiniLoading typing={chatPWDCheck} />
        <label className="pwd-check-error error">
          {chatPWDCheck ? validatePWDCheck(userPWD, userPWDCheck) : ""}
        </label>

        <AccountInput
          type="text"
          placeholder="닉네임"
          value={userNickname}
          onChange={(event) => setUserNickname(event.target.value)}
          onBlur={() => setChatNickname(false)}
          onFocus={() => setChatNickname(true)}
        />
        <MiniLoading typing={chatNickname} />
        <label className="nickname-error error">
          {chatNickname ? validateNickname(userNickname) : ""}
        </label>

        <AccountInput
          type="email"
          placeholder="이메일"
          value={userEmail}
          pattern="["
          onChange={(event) => setUserEmail(event.target.value)}
          onBlur={() => setChatEmail(false)}
          onFocus={() => setChatEmail(true)}
        />
        <MiniLoading typing={chatEmail} />
        <label className="email-error error">
          {chatEmail ? validateEmail(userEmail) : ""}
        </label>

        <AccountInput
          type="tel"
          placeholder="전화번호"
          value={userPhone}
          onChange={(event) => setUserPhone(event.target.value)}
          onBlur={() => setChatPhone(false)}
          onFocus={() => setChatPhone(true)}
        />
        <MiniLoading typing={chatPhone} />

        <label className="phone-error error">
          {chatPhone ? validatePhone(userPhone) : ""}
        </label>

        <AccountButton
          type="submit"
          text="회원가입"
          className="block"
          onClick={submitSignup}
        />
      </form>
    </div>
  );
});

export default Signup;
