import "./Login.scss";

import {
  useRef,
  useState,
  ComponentProps,
  LegacyRef,
  forwardRef,
  MutableRefObject,
} from "react";
import { Id } from "react-toastify";
import { AccountInput, handleError } from "../ui/tools/Input";
import { AccountButton } from "../ui/tools/Button";
import { AccountLogin } from "../../utils/requester";
import { validateID, validatePWD } from "../../utils/validator";
import { ShowAlram } from "../ui/Alram";
import { MiniLoading } from "../ui/Loading";

const Login = forwardRef((props, ref: LegacyRef<HTMLDivElement>) => {
  const [userID, setUserID] = useState("");
  const [userPWD, setUserPWD] = useState("");
  const [chatID, setChatID] = useState(false);
  const [chatPWD, setChatPWD] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [isAlram, setIsAlram] = useState(false);
  const toastId = useRef<Id>() as MutableRefObject<Id>;

  const submitLogin: ComponentProps<"button">["onClick"] = async (event) => {
    event.preventDefault();
    setClicked(true);

    if (validateID(userID) !== "") {
      handleError("id", setChatID);
    } else if (validatePWD(userPWD) !== "") {
      handleError("pwd", setChatPWD);
    } else {
      setTimeout(() => {
        setIsAlram(false);
      }, 1000);
      setIsAlram(true);

      const response = await AccountLogin(userID, userPWD);
      const message = response.data["message"];
      switch (response.status) {
        case 200:
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
    setClicked(false);
  };

  return (
    <div className="login-box" ref={ref}>
      <div className="login-title">로그인</div>
      <div className="login-subtitle">Movie's Combine</div>
      <form
        className="login-form"
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            const btn = document.querySelector("button.msc-button") as Element;
            const event = new Event("click", { bubbles: true });
            btn.dispatchEvent(event);
          }
        }}
      >
        <label className="id-field">
          <AccountInput
            type="text"
            placeholder="아이디"
            value={userID}
            onChange={(event) => {
              setUserID(event.target.value);
            }}
            onBlur={() => setChatID(false)}
            onFocus={() => setChatID(true)}
          />
          <MiniLoading typing={chatID} />
        </label>
        <label className="id-error error">
          {chatID ? validateID(userID) : ""}
        </label>
        <label className="pwd-field">
          <AccountInput
            type="password"
            placeholder="비밀번호"
            value={userPWD}
            onChange={(event) => {
              setUserPWD(event.target.value);
            }}
            onBlur={() => setChatPWD(false)}
            onFocus={() => setChatPWD(true)}
          />
          <MiniLoading typing={chatPWD} />
        </label>
        <label className="pwd-error error">
          {chatPWD ? validatePWD(userPWD) : ""}
        </label>
        <AccountButton
          type="button"
          text="로그인"
          className="block"
          onClick={submitLogin}
          disabled={clicked}
        />
      </form>
    </div>
  );
});

export default Login;
