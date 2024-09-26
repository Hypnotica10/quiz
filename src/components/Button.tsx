import React from "react";
import { ButtonProps } from "../types/componentType";

const Button: React.FC<ButtonProps> = (props) => {
  const { type, buttonClass, children, handleClick } = props;
  return (
    <button type={type} className={buttonClass} onClick={handleClick}>
      {children}
    </button>
  );
};

export default Button;
