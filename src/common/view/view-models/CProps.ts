import { ReactNode } from "react";

/** React component props with children */
export interface CProps {
  children: ReactNode;
}

/** React component props with className */
export interface CnProps {
  className?: string
}

/** React component props with children & className */
export interface CCnProps extends CProps, CnProps {}