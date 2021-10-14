import React from "react";
import { CCnProps } from "../view-models/CProps";

interface Props extends CCnProps {
  onClick?: React.MouseEventHandler;
  fullWidth?: boolean;
  color?: "primary" | "success" | "warning" | "error";
  variant?: "primary" | "subtle";
  isSubmit?: boolean
}

type ColorMap = Record<Props["color"], string>;

const colorMap: ColorMap = {
  primary: "bg-primary-600 hover:bg-primary-700",
  success: "bg-success-600 hover:bg-success-700",
  warning: "bg-warning-600 hover:bg-warning-700",
  error: "bg-red-600 hover:bg-red-700",
};
const colorMapSubtle: ColorMap = {
  primary: "bg-primary-100 font-medium text-primary ring-1 hover:ring-2 ring-primary-300",
  success: "bg-success-100 font-medium text-success ring-1 hover:ring-2 ring-success-300",
  warning: "bg-warning-100 font-medium text-warning ring-1 hover:ring-2 ring-warning-300",
  error: "bg-red-100 font-medium text-red-700 ring-1 hover:ring-2 ring-red-300",
};

const variantMap: Record<Props["variant"], ColorMap> = {
  primary: colorMap,
  subtle: colorMapSubtle,
};

export default function Button({
  variant = "primary",
  fullWidth,
  color = "primary",
  className,
  isSubmit,
  ...props
}: Props) {
  const fwClass = fullWidth ? "block w-full grid place-items-center " : "";
  return (
    <button
      className={
        "pb-2 py-1.5 px-3.5 rounded-lg text-white " + fwClass + variantMap[variant][color] + " " + className
      }
      type={isSubmit ? 'submit' : 'button'}
      {...props}
    />
  );
}
