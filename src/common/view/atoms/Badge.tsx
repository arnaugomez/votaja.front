import React from "react";
import { CProps } from "../view-models/CProps";

interface Props extends CProps {
  color?: "primary" | "success" | "warning";
}

const colorMap: Record<Props["color"], string> = {
  primary: "bg-primary-50 text-primary ring-primary-200",
  success: "bg-success-50 text-success ring-success-200",
  warning: "bg-warning-50 text-warning ring-warning-200",
};

export default function Badge({ children, color = "primary" }: Props) {
  return (
    <div
      className={
        "py-0.5 px-2 rounded-full text-sm font-medium cursor-pointer hover:ring-2 " +
        colorMap[color]
      }
    >
      {children}
    </div>
  );
}
