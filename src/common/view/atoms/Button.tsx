import React from "react";
import { CProps } from "../view-models/CProps";

interface Props extends CProps {
  color?: "primary" | "success" | "warning" | "error";
}

const colorMap: Record<Props["color"], string> = {
  primary: "bg-primary-600 hover:bg-primary-700",
  success: "bg-success-600 hover:bg-success-700",
  warning: "bg-warning-600 hover:bg-warning-700",
  error: "bg-red-600 hover:bg-red-700"
};


export default function Button({ children, color = "primary" }: Props) {
  return <button className={"pb-2 py-1.5 px-3.5 rounded-lg text-white " + colorMap[color]}>{children}</button>;
}
