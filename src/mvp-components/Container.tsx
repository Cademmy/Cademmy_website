import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export function Container({ children, className = "", id }: Props) {
  return (
    <div className={`container ${className}`.trim()} id={id}>
      {children}
    </div>
  );
}
