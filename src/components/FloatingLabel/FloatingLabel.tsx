import { useState } from "react";

type Props = {
  name: string;
  label: string;
  value: string;
  onChange: (name: string, value: string) => void;
  type?: string;
  onFocus?: (name: string) => void;
  error: string;
};
export const FloatingLabel: React.FC<Props> = ({
  name,
  label,
  value,
  onChange,
  type,
  onFocus,
  error,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    if (onFocus) {
      onFocus(name);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="floatingLabel">
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`floatingLabel__input ${
          value || isFocused ? "floatingLabel__hasValue" : ""
        } ${error ? "floatingLabel__input--error" : ""}
          `}
      />
      <label
        htmlFor={name}
        className={`floatingLabel__label ${
          isFocused ? "floatingLabel__label--focus" : ""
        } ${value || isFocused ? "floatingLabel__label--active" : ""} ${
          error ? "floatingLabel__label--error" : ""
        }
          `}
      >
        {label}
      </label>
    </div>
  );
};
