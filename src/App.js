import "./App.css";
import { InputSession } from "./InputSession";
import { FunctionalTab } from "./FunctionalTab";
import { TableView } from "./TableView/index.js";
import { LuckyWheel } from "./LuckyWheel";
import { useState, useReducer } from "react";
import { dataInitialState, dataReducer, EntryContext } from "./Hooks";
import { RaffleDraw } from "./RaffleDraw";

const App = () => {
  const [state, dispatch] = useReducer(dataReducer, dataInitialState);

  return (
    <>
      <EntryContext.Provider value={{ dataState: state, dataDispatch: dispatch }}>
        <InputSession />
        <FunctionalTab views={[<TableView />, <LuckyWheel />, <RaffleDraw />]} />
      </EntryContext.Provider>
    </>
  );
};

export default App;
