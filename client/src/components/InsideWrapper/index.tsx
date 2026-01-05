import { ReactNode } from "react";
import { cn } from "../../../utils";

const InsideWidthWrapper = ({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) => {
  return (
    <section
      id={id}
      className={cn("mx-auto w-full", className)}
    >
      {children}
    </section>
  );
};

export default InsideWidthWrapper;
