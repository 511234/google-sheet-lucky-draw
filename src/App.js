import "./App.css";
import { InputSession } from "./InputSession";
import { FunctionalTab } from "./FunctionalTab";
import { DataTable } from "./TableView/index.js";
import { LuckyWheel } from "./LuckyWheel";
import { useReducer } from "react";
import { dataInitialState, dataReducer, EntryContext } from "./Hooks";
import { RaffleDraw } from "./RaffleDraw";
import { SheetData } from "./Hooks/sheetData";

const App = () => {
  const [state, dispatch] = useReducer(dataReducer, dataInitialState);

  return (
    <>
      <EntryContext.Provider value={{ dataState: state, dataDispatch: dispatch }}>
        <InputSession />
        <FunctionalTab views={[<DataTable />, <LuckyWheel />, <RaffleDraw />]} />
        <SheetData />
      </EntryContext.Provider>
    </>
  );
};

export default App;
