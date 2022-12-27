import { useCallback, useEffect, useState, ReactNode } from "react";
import Weather from "../../components/weather";
import Image from "../../components/image";
import Button from "../../components/button";
import { api } from "../../shared/api";

interface PageProps {
  id?: string;
}

interface List {
  id: number;
  components: number[];
}

interface ComponentOptions {
  text: string;
  variable: string;
  value: string;
}

interface Component {
  id: number;
  type: string;
  options: ComponentOptions;
}

interface Variable {
  name: string;
  type: string;
  initialValue: string;
  value?: string;
}

interface Page {
  lists: List[];
  components: Component[];
  variables?: Variable[];
}

interface ComponentRenderProps {
  pageFormat: Page;
  listId: number;
  onSaveVariable: any;
  vars: Variable[];
}
const ComponentsRenders = ({
  pageFormat,
  listId = 0,
  onSaveVariable,
  vars,
}: ComponentRenderProps) => {
  const { lists, components } = pageFormat;
  const [listToRender, setListToRender] = useState<number>(listId);

  const COMPONENT_MAP = components.reduce(
    (accumulator: any, currentVal: any) => {
      accumulator[currentVal.id] = currentVal;
      return accumulator;
    },
    {}
  );

  interface ConditionProps {
    opts: any;
    listChildId: number;
    vars: Variable[];
  }

  const Condition = ({ opts, listChildId, vars }: ConditionProps) => {
    console.log(vars, "in condition");
    const variableRule = vars.find(
      (singleVar) => singleVar.name === opts.variable
    );
    console.log(variableRule, "========variableRule========");
    console.log(opts.value, "========opts.value========");
    // console.log(listChildId, "listChildId");
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
      console.log(COMPONENT_MAP, "LIST RENDER!!!!");
      const currComponent = COMPONENT_MAP[val];
      const createComponent = (val: number) => {
        if (currComponent.type === "weather") {
          return (
            <Weather
              key={index}
              lat={currComponent.options.lat}
              lon={currComponent.options.lon}
            />
          );
        } else if (currComponent.type === "image") {
          return (
            <Image
              key={index}
              src={currComponent.options.src}
              alt={currComponent.options.alt}
            />
          );
        } else if (currComponent.type === "condition") {
          console.log(vars, "wtf------");
          return (
            <Condition
              key={index}
              opts={currComponent.options}
              listChildId={currComponent.children}
              vars={vars}
            />
          );
        } else if (currComponent.type === "button") {
          return (
            <div>
              <Button
                key={index}
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

  return <>{Comps(listToRender)}</>;
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
