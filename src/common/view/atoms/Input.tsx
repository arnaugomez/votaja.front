import React from "react";

interface Props {
  fullWidth?: boolean;
  type?: "text" | "number";
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
  type = "text",
  fullWidth = false,
  ...props
}: Props) {
  const borderColor = error
    ? "border-red-700"
    : "border-gray-300 focus-within:border-gray-500";
  return (
    <label className={"block pb-2 " + (!fullWidth ? "w-84" : "flex-1")}>
      {label && <p className="text-sm pt-2 pb-1 font-medium">{label}</p>}
      <div
        className={
          "bg-white pb-2 pt-1.5 px-3.5 rounded-lg border w-full " + borderColor
        }
      >
        <input
          className="appearance-none outline-none w-full text-sm placeholder-gray-500 text-gray-800 focus:text-black"
          type={type}
          {...props}
        />
      </div>
      {error && <p className="text-xs pt-2 text-red-700">{error}</p>}
    </label>
  );
}
