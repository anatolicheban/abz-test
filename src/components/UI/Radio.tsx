import { memo, useRef } from "react";
import "../../styles/Radio.sass";
import clsx from "clsx";

type RadioProps = {
  checked: boolean;
  onChange: (value: number) => void;
  value: number;
  RadioClassName?: string;
  BoxClassName?: string;
  id: string;
  label: string;
};

const Radio = memo(({ checked, label, onChange, value, RadioClassName, id }: RadioProps) => {
  const radioRef = useRef<HTMLInputElement>(null);

  return (
    <div className="radio__box">
      <input
        ref={radioRef}
        className={clsx("radio", RadioClassName)}
        type={"radio"}
        onChange={(e) => onChange(+e.target.value)}
        checked={checked}
        value={value}
        id={id}
      />
      <span onClick={() => radioRef.current?.click()}></span>
      <label htmlFor={id}>{label}</label>
    </div>
  );
});

export default Radio;
