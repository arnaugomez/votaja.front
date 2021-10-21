import React from "react";

interface Props {
  fullWidth?: boolean;
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
  placeholder?: string;
  name?: string;
  label?: string;
  error?: string;
}

export default function TextArea({
  label,
  error,
  fullWidth = false,
  ...props
}: Props) {
  const borderColor = error
    ? "border-red-700"
    : "border-gray-300 focus-within:border-gray-500";
  return (
    <label className={"block pb-2 " + (!fullWidth ? "w-84" : "w-full flex-1")}>
      {label && <p className="text-sm pt-2 pb-1 font-medium">{label}</p>}
      <div
        className={
          "bg-white py-2 px-3.5 rounded-lg border w-full " + borderColor
        }
      >
        <textarea
          className="resize-y min-h-20 appearance-none outline-none w-full placeholder-gray-500 text-gray-700 font-light focus:text-black"
          {...props}
        />
      </div>
      {error && <p className="text-xs pt-2 text-red-700">{error}</p>}
    </label>
  );
}
