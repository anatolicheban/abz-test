import React from "react";
import "../../styles/Button.sass";
import clsx from "clsx";

type ButtonProps = {
  label: string;
  disabled?: boolean;
  onClick?: (() => void) | ((e: React.MouseEvent) => void);
  className?: string;
};

const Button = ({ disabled, label, onClick, className }: ButtonProps) => {
  return (
    <button onClick={onClick} className={clsx("button", className)} disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;
