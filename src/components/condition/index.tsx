import { Variable } from "../../shared/interfaces";
import { BuildAndRenderComponent } from "../../pages/dashboard";

interface ConditionProps {
  opts: any; // NOTE: Let's be more specific here in the future
  listChildId: number;
  vars: Variable[];
  lists?: any; // NOTE: Updated with correct list type
  componentMap?: any; // NOTE: use a same interface between components/pages
  pageFormat?: any; // NOTE: Set to correct PAGE type
  onSaveVariable?: any;
}

const Condition = ({
  opts,
  listChildId,
  lists,
  componentMap,
  pageFormat,
  onSaveVariable,
  vars,
}: ConditionProps) => {
  // Ensure our component is dependent on the correct variable
  const variableRule = vars.find(
    (singleVar) => singleVar.name === opts.variable
  );

  // If the buttons influenced the value of our variable, used that value,
  // otherwise use the initial value that came back from the api
  const shouldShowChild = (varRule: any, optsValue: any) => {
    if (varRule?.value) {
      return varRule.value === optsValue;
    }
    return varRule.initialValue === optsValue;
  };

  return (
    <>
      {variableRule && shouldShowChild(variableRule, opts.value)
        ? BuildAndRenderComponent(
            lists,
            componentMap,
            pageFormat,
            onSaveVariable,
            vars,
            listChildId
          )
        : null}
      {}
    </>
  );
};

export default Condition;
