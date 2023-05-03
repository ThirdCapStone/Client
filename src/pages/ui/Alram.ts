import "react-toastify/dist/ReactToastify.css";
import { Id } from "react-toastify";
import { MutableRefObject } from "react";
import { toast, ToastOptions } from "react-toastify";

const toastOptions: ToastOptions = {
  position: "top-center",
  autoClose: 1000,
  hideProgressBar: true,
  closeOnClick: true,
  isLoading: false,
};

const ShowAlram = (
  type: "success" | "info" | "warning" | "error",
  message: string,
  toastId: MutableRefObject<Id>,
  isActive?: boolean
) => {
  if (isActive) {
    switch (type) {
      case "success":
        toast.update(toastId.current, {
          render: message,
          type: toast.TYPE.SUCCESS,
        });
        break;
      case "info":
        toast.update(toastId.current, {
          render: message,
          type: toast.TYPE.INFO,
        });
        break;
      case "warning":
        toast.update(toastId.current, {
          render: message,
          type: toast.TYPE.WARNING,
        });
        break;
      case "error":
        toast.update(toastId.current, {
          render: message,
          type: toast.TYPE.ERROR,
        });
        break;
    }
  } else {
    switch (type) {
      case "success":
        toastId.current = toast.success(message, { ...toastOptions });
        break;
      case "info":
        toastId.current = toast.info(message, { ...toastOptions });
        break;
      case "warning":
        toastId.current = toast.warning(message, { ...toastOptions });
        break;
      case "error":
        toastId.current = toast.error(message, { ...toastOptions });
        break;
    }
  }
};
export { ShowAlram };
