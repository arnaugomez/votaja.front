import React from "react";
import Checkbox from "../atoms/Checkbox";
import { Option } from "../view-models/Option";

interface Props<T> {
  options: Option<T>[];
  values: Option<T>[];
  onChange: (o: Option<T>[]) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  label?: string;
  error?: string;
}

export default function CheckboxSelect<T = string>({
  label,
  error,
  options,
  values,
  onBlur,
  onChange,
}: Props<T>) {
  function addValue(o: Option<T>) {
    onChange([...values, o]);
  }

  function removeValue(o: Option<T>) {
    onChange(values.filter((v) => v.value !== o.value));
  }

  return (
    <label className="block pb-4">
      {label && <p className="text-sm pb-4 font-medium">{label}</p>}
      <ul>
        {options.map((o) => {
          const isSelected = values.some((v) => v.value === o.value);
          return (
            <li key={`${o.value}`}>
              <Checkbox
                label={o.label}
                value={isSelected}
                onBlur={onBlur}
                onChange={isSelected ? () => removeValue(o) : () => addValue(o)}
              />
            </li>
          );
        })}
      </ul>
      {error && <p className="text-xs pt-2 text-red-700">{error}</p>}
    </label>
  );
}
