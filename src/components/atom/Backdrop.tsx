import classNames from "classnames";
import React, { ReactNode } from "react";

type BackdropProps = {
  children: ReactNode;
  className?: string;
};

const Backdrop = ({ children, className }: BackdropProps) => {
  return <div className={classNames("absolute inset-0 bg-panels-background/50", className)}>{children}</div>;
};

export default Backdrop;
