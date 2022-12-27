import { ReactNode } from "react";

interface ConditionProps {
  children: ReactNode;
}

const Condition = ({ children }: ConditionProps) => {
  return <>{children}</>;
};

export default Condition;
