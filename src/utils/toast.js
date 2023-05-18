import "./toast.scss";
import "animate.css";
import Swal from "sweetalert2/src/sweetalert2.js";

const Toast = Swal.mixin({
  toast: true,
  position: "top",
  width: 400,
  showConfirmButton: false,
  iconColor: "white",
  timer: 2000,
  grow: "row",
  timerProgressBar: true,
  customClass: {
    popup: "colored-toast min-toast",
  },
  showClass: {
    popup: "animate__animated animate__fadeInDown",
  },
  hideClass: {
    popup: "animate__animated animate__fadeOutUp",
  },
  didOpen: (toast) => {
    toast.removeEventListener("mouseover", Swal.stopTimer);
    toast.removeEventListener("mouseenter", Swal.stopTimer);
  },
});

const showToast = (iconType, text) => {
  Toast.fire({
    icon: iconType,
    text: text,
  });
};

export { showToast };
