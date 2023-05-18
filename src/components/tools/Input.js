import "./styles/Input.scss";

import { ComponentProps, Dispatch, ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

const AccountInput = ({
  type,
  placeholder,
  value,
  icon,
  isChat,
  validate,
  disabled,
  VerifyButton,
  marginTop,
  className,
  pattern,
  onChange,
  onFocus,
  onBlur,
  width = "80%",
  height = "8vh",
}) => {
  return (
    <div>
      <div
        className={`container ${className}-container`}
        style={{ width: width, height: height, marginTop: marginTop }}
      >
        <FontAwesomeIcon icon={icon} className="icon" />
        <input
          type={type}
          className={`msc-input ${className}`}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          pattern={pattern}
          onChange={onChange ? onChange : undefined}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>
      {VerifyButton !== null ? VerifyButton : ""}
      <label className={`error ${className}-error`}>
        {isChat && validate !== "" && validate !== undefined ? validate : ""}
      </label>
    </div>
  );
};

const handleError = (className, setVisible) => {
  const error_label = document.querySelector(`label.${className}-error`);
  error_label?.classList.add("error-animation");
  setVisible(true);
  setTimeout(() => {
    error_label?.classList.remove("error-animation");
    setVisible(false);
  }, 1000);
};

export { AccountInput, handleError };
