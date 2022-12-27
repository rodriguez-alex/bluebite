import { useCallback, useEffect, useState, ReactNode } from "react";
import Weather from "../../components/weather";
import Image from "../../components/image";
import Button from "../../components/button";
import { api } from "../../shared/api";

import { Variable, Page } from "../../shared/interfaces";

interface PageProps {
  id?: string;
}
interface ComponentRenderProps {
  pageFormat: Page;
  listId: number;
  onSaveVariable: any;
  vars: Variable[];
}

interface ConditionProps {
  opts: any;
  listChildId: number;
  vars: Variable[];
}

const ComponentsRenders = ({
  pageFormat,
  listId = 0,
  onSaveVariable,
  vars,
}: ComponentRenderProps) => {
  const { lists, components } = pageFormat;

  const COMPONENT_MAP = components.reduce(
    (accumulator: any, currentVal: any) => {
      accumulator[currentVal.id] = currentVal;
      return accumulator;
    },
    {}
  );

  const Condition = ({ opts, listChildId, vars }: ConditionProps) => {
    const variableRule = vars.find(
      (singleVar) => singleVar.name === opts.variable
    );
    const shouldShowChild = (varRule: any, optsValue: any) => {
      if (varRule?.value) {
        return varRule.value === optsValue;
      }
      return varRule.initialValue === optsValue;
    };
    return (
      <>
        {variableRule && shouldShowChild(variableRule, opts.value)
          ? Comps(listChildId)
          : null}
        {}
      </>
    );
  };

  const Comps = (listToRender: number) => {
    return lists[listToRender].components.map((val, index) => {
      const currComponent = COMPONENT_MAP[val];
      const createComponent = (val: number) => {
        if (currComponent.type === "weather") {
          return (
            <div
              key={index}
              style={{
                marginBottom: "10px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Weather
                lat={currComponent.options.lat}
                lon={currComponent.options.lon}
              />
            </div>
          );
        } else if (currComponent.type === "image") {
          return (
            <div
              key={index}
              style={{
                marginBottom: "10px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Image
                src={currComponent.options.src}
                alt={currComponent.options.alt}
              />
            </div>
          );
        } else if (currComponent.type === "condition") {
          return (
            <div
              key={index}
              style={{
                marginBottom: "10px",
              }}
            >
              <Condition
                opts={currComponent.options}
                listChildId={currComponent.children}
                vars={vars}
              />
            </div>
          );
        } else if (currComponent.type === "button") {
          return (
            <div
              key={index}
              style={{
                marginBottom: "10px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                opts={currComponent.options}
                variables={pageFormat.variables}
                onSaveVariable={onSaveVariable}
              />
            </div>
          );
        } else {
          return null;
        }
      };

      return createComponent(val);
    });
  };

  return <>{Comps(listId)}</>;
};

const PageOne = ({ id }: PageProps) => {
  const [pageFormat, setPageFormat] = useState<Page>({
    lists: [],
    components: [],
    variables: [],
  });
  const [vars, setVars] = useState<Variable[]>([]);
  const getPageInfo = useCallback(() => {
    return api.get(`/page/${id}`).then((res) => {
      const { data: pageProps } = res.data;
      setPageFormat(pageProps);
      setVars(pageProps.variables);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getPageInfo();
  }, [getPageInfo]);

  if (!pageFormat?.lists[0]) {
    return null;
  }

  return (
    <>
      <ComponentsRenders
        pageFormat={pageFormat}
        listId={0}
        onSaveVariable={setVars}
        vars={vars}
      />
    </>
  );
};

export default PageOne;
