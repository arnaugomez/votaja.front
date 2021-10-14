import React from "react";
import CheckIcon from "../../../../public/assets/icons/check.svg";

interface Props {
  value: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  name?: string;
  label?: React.ReactNode;
  error?: string;
}

export default function Checkbox({
  label,
  error,
  value: checked,
  ...props
}: Props) {
  return (
    <label className="block pb-2">
      <div className="relative flex gap-2 pl-1">
        <input
          className="absolute h-4 w-4 opacity-0"
          type="checkbox"
          checked={checked}
          {...props}
        />
        <div className="h-5 w-5 border border-gray-400 rounded grid place-items-center">
          {checked && <CheckIcon />}
        </div>
        <p className="text-sm leading-loos3 text-gray-700">{label}</p>
      </div>
      {error && <p className="text-xs pt-1 text-red">{label}</p>}
    </label>
  );
}
