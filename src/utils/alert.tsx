import "./alert.scss";
import Swal from "sweetalert2";

type iconType = "success" | "warning" | "error" | "info" | "question";

const showAlert = (
  title: string,
  text: string,
  icon: iconType,
  confirmButtonText: string,
  width: number = 600,
  timer: number = 1000,
  timerProgressBar: boolean = false
) => {
  Swal.fire({
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

const showInputAlert = (
  title: string,
  text: string,
  icon: iconType,
  confirmButtonText: string,
  timer: number,
  width: number = 600,
  timerProgressBar: boolean = false,
  inputPlaceholder: string = "인증코드"
) => {
  let timerInterval: string | number | NodeJS.Timer | undefined;
  console.log(timer);
  Swal.fire({
    title: `${title}`,
    icon: icon,
    html: `<hr /><p>${text}<div>남은 시간: <b class="left-time">${inputAlertTimer(
      timer
    )}</b></div>`,
    confirmButtonText: confirmButtonText,
    input: "text",
    width: width,
    inputPlaceholder: inputPlaceholder,
    inputAutoFocus: true,
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
};

const minTwoDigits = (n: number) => {
  return (n < 10 ? "0" : "") + n;
};

const inputAlertTimer = (miliseconds: number) => {
  const seconds = Number(Math.floor(miliseconds / 1000).toFixed(0));
  const minutes = Number(Math.floor(seconds / 60).toFixed(0));

  return `${minutes}: ${minTwoDigits(seconds % 60)}`;
};

const forgotPassword = () => {
  Swal.fire({
    html: `<div>hello world</div>`,
  });
};

export { showAlert, showInputAlert, inputAlertTimer, forgotPassword };
