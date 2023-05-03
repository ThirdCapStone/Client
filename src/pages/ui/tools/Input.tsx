import "./Input.scss";

import { ComponentProps, Dispatch } from "react";

interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  className?: string;
  pattern?: string;
  onChange: ComponentProps<"input">["onChange"];
  onKeyDown?: ComponentProps<"input">["onKeyDown"];
  onKeyUp?: ComponentProps<"input">["onKeyUp"];
  onFocus?: ComponentProps<"input">["onFocus"];
  onBlur?: ComponentProps<"input">["onBlur"];
}

const AccountInput = ({
  type,
  placeholder,
  value,
  className,
  pattern,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  onKeyUp,
}: InputProps) => {
  return (
    <input
      type={type}
      className={`msc-input ${className}`}
      placeholder={placeholder}
      value={value}
      pattern={pattern}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
    />
  );
};

const handleError = (className: string, setVisible: Dispatch<boolean>) => {
  const error_label = document.querySelector(`label.${className}-error`);
  setTimeout(() => {
    error_label?.classList.add("error-animation");
    setVisible(true);
  }, 400);
  setVisible(false);
  error_label?.classList.remove("error-animation");
};
export { AccountInput, handleError };
