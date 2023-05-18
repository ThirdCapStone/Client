import "./styles/Button.scss";

import { ComponentProps, FC, PropsWithChildren } from "react";

const AccountButton = ({
  type,
  className,
  onClick,
  text,
  display = "inline",
  width = "70%",
  height = "6vh",
  marginTop = "0%",
  marginBottom = "0%",
  marginLeft = "0%",
  fontSize = "0.8em",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      className={`msc-button ${className}`}
      onClick={onClick}
      disabled={disabled}
      style={{
        fontSize: fontSize,
        width: `calc(${width} - 7px)`,
        height: height,
        marginTop: marginTop,
        marginBottom: marginBottom,
        marginLeft: marginLeft,
        display: display,
      }}
    >
      {text}
    </button>
  );
};

export { AccountButton };
