import "./Input.scss";

import { ComponentProps, Dispatch, ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface InputProps {
  type: string;
  icon: IconDefinition;
  placeholder: string;
  disabled?: boolean;
  value?: string;
  isChat: boolean;
  validate?: string;
  marginTop?: string;
  VerifyButton?: ReactNode;
  width?: string;
  height?: string;
  className?: string;
  pattern?: string;
  onChange?: ComponentProps<"input">["onChange"];
  onFocus?: ComponentProps<"input">["onFocus"];
  onBlur?: ComponentProps<"input">["onBlur"];
}

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
}: InputProps) => {
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

const handleError = (className: string, setVisible: Dispatch<boolean>) => {
  const error_label = document.querySelector(`label.${className}-error`);
  error_label?.classList.add("error-animation");
  setVisible(true);
  setTimeout(() => {
    error_label?.classList.remove("error-animation");
    setVisible(false);
  }, 1000);
};

export { AccountInput, handleError };
