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
    <ul className="flex flex-wrap">
      {options.map((o) => {
        const isActive = value === o;
        return (
          <li className={valueExists && !isActive ? "opacity-50" : ""} key={o}>
            <button
              type="button"
              onClick={() => onChange(o)}
              className="appearance-none pr-2 pb-2"
            >
              <Badge>{o}</Badge>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
