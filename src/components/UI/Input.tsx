import { memo } from "react";
import "../../styles/Input.sass";
import clsx from "clsx";

type InputProps = {
  InputClassName?: string;
  BoxClassName?: string;
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  helperText?: string;
  type?: React.HTMLInputTypeAttribute;
};

const Input = memo(
  ({
    InputClassName,
    BoxClassName,
    id,
    label,
    value,
    onChange,
    error,
    helperText,
    type,
  }: InputProps) => {
    return (
      <div className={clsx("input__box", BoxClassName)}>
        <input
          className={clsx(InputClassName, error ? "error" : undefined)}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          id={id}
          placeholder=" "
          type={type || "text"}
        />
        <label htmlFor={id}>{label}</label>
        {(helperText || error) && <p>{error || helperText}</p>}
      </div>
    );
  }
);

export default Input;
