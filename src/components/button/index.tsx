import { ReactNode } from "react";

interface ButtonProps {
  onSaveVariable: any;
  variables: any;
  opts: any;
}

const Button = ({ opts, variables, onSaveVariable }: ButtonProps) => {
  const controlsVariable = opts.variable;
  let newVariables = [...variables];
  console.log(controlsVariable, "=====controlsVariable======");
  console.log(opts, "<<<<<<<<-------opts");
  // console.log(
  //   {
  //     variables: {
  //       value: opts.value,
  //     },
  //     ...pageFormat,
  //   },
  //   " compleetED!!! < ======"
  // );
  const matchesVarName = (varOpts: any) => varOpts.name === controlsVariable;
  const findVarIndexToChange = newVariables.findIndex(matchesVarName);

  // console.log(newVariables[findVarIndexToChange], "findVarToChange----------");

  // console.log(newVariables, "NOW UPDATED?!>!>?>?!");

  return (
    <>
      <button
        onClick={() => {
          newVariables[findVarIndexToChange].value = opts.value;

          console.log(newVariables, "mew variables?!???!");
          onSaveVariable(newVariables);
        }}
      >
        {opts.text}
      </button>
    </>
  );
};

export default Button;
