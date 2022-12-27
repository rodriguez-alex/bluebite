import { useCallback, useEffect, useState, ReactNode } from "react";
import Weather from "../../components/weather";
import Image from "../../components/image";
import Button from "../../components/button";
import Condition from "../../components/condition";
import { api } from "../../shared/api";
import { Variable, Page, List } from "../../shared/interfaces";

interface PageProps {
  id?: string;
}
interface ComponentRenderProps {
  pageFormat: Page;
  listId: number;
  onSaveVariable: any;
  vars: Variable[];
}

const DynamicComponents = ({
  pageFormat,
  listId = 0,
  onSaveVariable,
  vars,
}: ComponentRenderProps) => {
  const { lists, components } = pageFormat;

  // We need to make an object that contains all the components via their ids.
  // Our lists use these IDs to select what components to render, so this is imperative
  const COMPONENT_MAP = components.reduce(
    (accumulator: any, currentVal: any) => {
      accumulator[currentVal.id] = currentVal;
      return accumulator;
    },
    {}
  );

  return (
    <>
      {BuildAndRenderComponent(
        lists,
        COMPONENT_MAP,
        pageFormat,
        onSaveVariable,
        vars,
        listId
      )}
    </>
  );
};

// A function that maps through our list, then creates the React component based on the type that is returned from the API
// Types of components that this renders (button, weather, image, condition). This function is re-used in the condition component since
// that component then displays a new list of children components
export const BuildAndRenderComponent = (
  lists: List[],
  componentMap: any, // NOTE: create an interface for this
  pageFormat: Page,
  onSaveVariable: any,
  vars: Variable[],
  listToRender: number
) => {
  return lists[listToRender].components.map((val: number, index: number) => {
    const currComponent = componentMap[val];

    const createComponent = (componentType: string) => {
      switch (componentType) {
        case "weather":
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
        case "image":
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
        case "condition":
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
                lists={lists}
                componentMap={componentMap}
                pageFormat={pageFormat}
                onSaveVariable={onSaveVariable}
              />
            </div>
          );

        case "button":
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

        default:
          return null;
      }
    };

    return createComponent(currComponent.type);
  });
};

const Dashboard = ({ id }: PageProps) => {
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

  // If the initial list doesn't exists, don't even try to render anything
  if (!pageFormat?.lists[0]) {
    return null;
  }

  return (
    <>
      <DynamicComponents
        pageFormat={pageFormat}
        listId={0}
        onSaveVariable={setVars}
        vars={vars}
      />
    </>
  );
};

export default Dashboard;
