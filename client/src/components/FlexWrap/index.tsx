import { ReactNode } from "react";
import { cn } from "../../../utils";

const FlexWrap = ({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) => {
  return (
    <aside id={id} className={cn(
      "flex flex-wrap w-full justify-between",
      className
    )}>  
      {children}
    </aside>
  );
};

export default FlexWrap;
