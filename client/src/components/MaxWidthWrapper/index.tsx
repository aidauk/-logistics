import { ReactNode } from "react";
import { cn } from "../../../utils";

const MaxWidthWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <section
      className={cn(
        "mx-auto w-full",
        className
      )}
    >
      {children}
    </section>
  );
};

export default MaxWidthWrapper;