import React from "react";
import PageOne from "./pages/page-one";
import PageTwo from "./pages/page-two";
import PageThree from "./pages/page-three";
import { useParams } from "react-router";

interface PageProps {
  id: string;
}

const App = () => {
  const { id } = useParams<{ id: string }>();

  const PAGES: { [key: string]: React.ElementType } = {
    "page-one": PageOne,
    "page-two": PageOne,
    "page-three": PageOne,
  };

  const Page = ({ id }: PageProps): JSX.Element => {
    const Component: React.ElementType = PAGES[id];
    return <Component id={id} />;
  };

  return <Page id={id} />;
};

export default App;
