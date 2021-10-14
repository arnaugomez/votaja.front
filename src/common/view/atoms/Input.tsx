import React from "react";

interface Props {
  fullWidth?: boolean;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  placeholder?: string;
  name?: string;
  label?: string;
  error?: string;
}

export default function Input({
  label,
  error,
  fullWidth = false,
  ...props
}: Props) {
  const borderColor = error
    ? "border-red"
    : "border-gray-300 focus-within:border-gray-500";
  return (
    <label className={"block pb-4 " + (!fullWidth ? "w-84" : 'flex-1')}>
      {label && <p className="text-small pb-1 font-medium">{label}</p>}
      <div className={"pb-2 pt-1.5 px-3.5 rounded-lg border w-full " + borderColor}>
        <input
          className="appearance-none outline-none w-full text-sm placeholder-gray-500 text-gray-800 focus:text-black"
          type="text"
          {...props}
        />
      </div>
      {error && <p className="text-xs pt-1 text-red">{label}</p>}
    </label>
  );
}
