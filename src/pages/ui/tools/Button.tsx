import "./Button.scss";

import { ComponentProps, Dispatch } from "react";

interface AccountButtonProps {
  type: "button" | "submit" | "reset" | undefined;
  className?: string;
  text: string;
  disabled?: boolean;
  onClick: ComponentProps<"button">["onClick"];
}

const AccountButton = ({
  type,
  onClick,
  text,
  className,
  disabled,
}: AccountButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`msc-button ${className}`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

interface ToggleLoginButtonProps {
  isSignup: boolean;
  setIsSignup: Dispatch<boolean>;
  setIsMount: Dispatch<boolean>;
}

const ToggleLoginButton = ({
  isSignup,
  setIsSignup,
  setIsMount,
}: ToggleLoginButtonProps) => {
  return (
    <div className="toggle-box">
      <span
        className={`toggle-button login ${isSignup ? "" : "active"}`}
        onClick={() => {
          setIsSignup(false);
          setIsMount(true);
        }}
      >
        <span className="toggle-button-box" />
        로그인
      </span>
      <span className="space"></span>
      <span
        className={`toggle-button signup ${isSignup ? "active" : ""}`}
        onClick={() => {
          setIsSignup(true);
          setIsMount(true);
        }}
      >
        회원가입
      </span>
    </div>
  );
};

export { AccountButton, ToggleLoginButton };
