import React from "react";
import Badge from "./Badge";

interface Props {
  value: string;
  options: string[];
  onChange: (v: string) => void;
}

export default function BadgeTextSelector({ value, options, onChange }: Props) {
  const valueExists = options.some((o) => o === value);
  return (
    <ul className="flex flex-wrap gap-2">
      {options.map((o) => {
        const isActive = value === o;
        return (
          <li className={valueExists && !isActive ? "opacity-50" : ""} key={o}>
            <button
              type="button"
              onClick={() => onChange(o)}
              className="appearance-none"
            >
              <Badge>{o}</Badge>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
