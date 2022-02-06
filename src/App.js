import "./App.css"
import { InputSession } from "./InputSession"
import { FunctionalTab } from "./FunctionalTab"
import { DataTable } from "./TableView/index.js"
import { LuckyWheel } from "./LuckyWheel"
import { useReducer } from "react"
import { dataInitialState, dataReducer, EntryContext } from "./Hooks"
import { RaffleDraw } from "./RaffleDraw"
import { SheetData } from "./Hooks/sheetData"
import Grid from "@mui/material/Grid"

const App = () => {
  const [state, dispatch] = useReducer(dataReducer, dataInitialState)

  return (
    <EntryContext.Provider value={{ dataState: state, dataDispatch: dispatch }}>
      <Grid container spacing={10}>
        <Grid item xs={12} md={4}>
          <InputSession />
        </Grid>
        <Grid item xs={12} md={8}>
          <FunctionalTab views={[<DataTable />, <LuckyWheel />, <RaffleDraw />]} />
        </Grid>
      </Grid>
      <SheetData />
    </EntryContext.Provider>
  )
}

export default App