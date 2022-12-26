import { useCallback, useEffect, useState } from "react";
import Weather from "../../components/weather";
import Image from "../../components/image";
import { api } from "../../shared/api";

interface PageProps {
  id?: string;
}

interface List {
  id: number;
  components: number[];
}

interface Component {
  id: number;
  type: string;
  options: any;
}

interface Variable {
  name: string;
  type: string;
  initialValue: string;
}

interface Page {
  lists: List[];
  components: Component[];
  variables?: Variable[];
}

const PageOne = ({ id }: PageProps) => {
  const [pageFormat, setPageFormat] = useState<Page>({
    lists: [],
    components: [],
  });
  const getPageInfo = useCallback(() => {
    return api.get(`/page/${id}`).then((res) => {
      const { data: pageProps } = res.data;
      setPageFormat(pageProps);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getPageInfo();
  }, [getPageInfo]);

  interface ComponentRenderProps {
    pageFormat: Page;
  }

  if (!pageFormat?.lists[0]) {
    return null;
  }

  const ComponentsRenders = ({ pageFormat }: ComponentRenderProps) => {
    const { lists, components } = pageFormat;

    const COMPONENT_MAP = components.reduce(
      (accumulator: any, currentVal: any) => {
        accumulator[currentVal.id] = currentVal;
        return accumulator;
      },
      {}
    );

    const Comps = lists[0].components.map((val, index) => {
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
              src={currComponent.options.src}
              alt={currComponent.options.alt}
            />
          );
        } else {
          return null;
        }
      };

      return createComponent(val);
    });

    return <>{Comps}</>;
  };

  return (
    <>
      <ComponentsRenders pageFormat={pageFormat} />
    </>
  );
};

export default PageOne;
