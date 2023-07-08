import { Header } from "./components/Header/Header";
import { CreateTask } from "./components/CreateTask/CreateTask";
import "./global.css";

function App() {
  const content = "";
  return (
    <>
      <Header />
      <CreateTask content={content} />
    </>
  );
}

export default App;
