import { ReactNode } from "react";
import classNames from "classnames";

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  variant?: string;
  children?: ReactNode;
  type: "button" | "submit" | "reset" | undefined;
}

const Button = (props: ButtonProps) => {
  return (
    <button
      className={classNames(
        "rounded-2xl bg-action-primary py-3 text-white [box-shadow:0px_20px_50px_0px_rgba(54,114,233,0.41)] hover:[box-shadow:none] active:[box-shadow:none] disabled:bg-action-disabled disabled:[box-shadow:none]",
        props.className
      )}
      onClick={props.onClick}
      type={props.type}
      name={props.name}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
