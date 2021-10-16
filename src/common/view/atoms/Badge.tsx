import React from "react";
import { CProps } from "../view-models/CProps";

interface Props extends CProps {
  color?: "primary" | "success" | "warning";
}

const colorMap: Record<Props["color"], string> = {
  primary: "bg-primary-50 text-primary hover:border-primary-200",
  success: "bg-success-50 text-success hover:border-success-200",
  warning: "bg-warning-50 text-warning hover:border-warning-200",
};

export default function Badge({ children, color = "primary" }: Props) {
  return (
    <div
      className={
        "py-0.5 px-2 rounded-full text-sm font-medium cursor-pointer border-2 border-white " +
        colorMap[color]
      }
    >
      {children}
    </div>
  );
}
