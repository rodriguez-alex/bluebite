import { ComponentOptions } from "../../shared/interfaces";

interface ButtonProps {
  onSaveVariable: any;
  variables: any; // NOTE: Update with correct type
  opts: ComponentOptions;
}

const Button = ({ opts, variables, onSaveVariable }: ButtonProps) => {
  const controlsVariable = opts.variable;
  let newVariables = [...variables];
  const matchesVarName = (varOpts: any) => varOpts.name === controlsVariable;
  const findVarIndexToChange = newVariables.findIndex(matchesVarName);

  return (
    <>
      <button
        style={{
          backgroundColor: "#4162e7",
          color: "#fff",
          border: "none",
          borderRadius: 10,
          padding: "20px",
          minWidth: "330px",
          minHeight: "150px",
          display: "flex",
        }}
        onClick={() => {
          newVariables[findVarIndexToChange].value = opts.value;

          onSaveVariable(newVariables);
        }}
      >
        <span
          style={{
            fontSize: "20px",
          }}
        >
          {opts.text}
        </span>
      </button>
    </>
  );
};

export default Button;
