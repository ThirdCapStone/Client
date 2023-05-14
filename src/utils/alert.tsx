import "./alert.scss";
import { AccountInput } from "../pages/ui/tools/Input";
import { AccountButton } from "../pages/ui/tools/Button";
import withReactContent from "sweetalert2-react-content";
import { faCertificate } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import Account from "./http/account";

type iconType = "success" | "warning" | "error" | "info" | "question";

const MySwal = withReactContent(Swal);

const showAlert = (
  title: string,
  text: string,
  icon: iconType,
  confirmButtonText: string,
  width: number = 600,
  timer: number = 1000,
  timerProgressBar: boolean = false
) => {
  MySwal.fire({
    html: `<hr /><p>${text}`,
    title: title,
    icon: icon,
    width: width,
    confirmButtonText: confirmButtonText,
    showCancelButton: true,
    showDenyButton: true,
    timer: timer,
    timerProgressBar: timerProgressBar,
  });
};

const showForgotPWDAlert = async (
  title: string,
  text: string,
  icon: iconType,
  confirmButtonText: string,
  timer: number,
  width: number = 600,
  timerProgressBar: boolean = false
) => {};

const showEmailALert = async (
  email: string,
  title: string,
  text: string,
  icon: iconType,
  confirmButtonText: string,
  timer: number,
  width: number = 600,
  timerProgressBar: boolean = false
) => {
  let timerInterval: string | number | NodeJS.Timer | undefined;
  let isChat: boolean = false;
  let verifyCode: string = "";

  await MySwal.fire({
    icon: icon,
    html: (
      <div>
        <h1 style={{ color: "white" }}>{title}</h1>
        <hr style={{ backgroundColor: "white" }} />
        {text}
        {
          <AccountInput
            type="text"
            className="verifyCode"
            icon={faCertificate}
            placeholder="인증코드 (6자리)"
            marginTop="5%"
            onChange={(event) => {
              verifyCode = event.target.value;
            }}
            isChat={isChat}
            onBlur={() => (isChat = false)}
            onFocus={() => (isChat = true)}
          />
        }
        남은 시간: <b className="left-time">{inputAlertTimer(timer)}</b>
        <AccountButton
          display="block"
          marginLeft="15%"
          type="submit"
          marginTop="5%"
          text={confirmButtonText}
          onClick={() => MySwal.close()}
        />
      </div>
    ),
    showCloseButton: true,
    showConfirmButton: false,
    width: width,
    timer: timer,
    timerProgressBar: timerProgressBar,
    didOpen: () => {
      timerInterval = setInterval(() => {
        const b = document.querySelector("b.left-time") as Element;
        timer -= 1000;
        b.textContent = inputAlertTimer(timer);
      }, 1000);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  });

  console.log("detected");

  return await Account.verifyEmail(email, verifyCode);
};

const minTwoDigits = (n: number) => {
  return (n < 10 ? "0" : "") + n;
};

const inputAlertTimer = (miliseconds: number) => {
  const seconds = Number(Math.floor(miliseconds / 1000).toFixed(0));
  const minutes = Number(Math.floor(seconds / 60).toFixed(0));

  return `${minutes}:${minTwoDigits(seconds % 60)}`;
};

export { showAlert, showEmailALert, inputAlertTimer };
