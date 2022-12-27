import Dashboard from "./pages/dashboard";
import { useParams } from "react-router";

const App = () => {
  const { id } = useParams<{ id: string }>();

  return <Dashboard id={id} />;
};

export default App;
