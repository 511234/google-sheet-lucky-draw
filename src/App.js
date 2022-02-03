import "./App.css";
import { InputSession } from "./InputSession";
import { FunctionalTab } from "./FunctionalTab";
import { TableView } from "./TableView/TableView.js";

const App = () => {

  return (
    <>
      <InputSession />
      <FunctionalTab tab1={<TableView />} />
    </>
  );
};

export default App;
