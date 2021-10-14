import React from "react";

interface Props {
  fullWidth?: boolean;
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
}

export default function Input({ fullWidth = false, ...props }: Props) {
  return (
    <div
      className={
        "pb-2 pt-1.5 px-3.5 rounded-lg border border-gray-300 focus-within:border-gray-500 " +
        (!fullWidth && "w-64")
      }
    >
      <input
        className="appearance-none outline-none w-full text-sm placeholder-gray-500 text-gray-800 focus:text-black"
        type="text"
        {...props}
      />
    </div>
  );
}
