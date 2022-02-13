import React, { useContext, useState } from "react"

import { Paper, InputLabel, TextField, Button } from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import "./index.css"
import { EDIT_SHEET_ID, EntryContext } from "../Hooks"

export const InputSession = () => {
  const entryContext = useContext(EntryContext)
  const [sheetId, setSheetId] = useState("")

  const fetchSheetEntries = () => {
    entryContext.dataDispatch({ type: EDIT_SHEET_ID, payload: sheetId })
  }

  return (
    <Paper elevation={3} className="input-container">
      <h1 style={{ textAlign: "center" }}> Google Sheet Widget</h1>
      {/* <InputLabel id="sheet-id">SHEET ID</InputLabel> */}
      <TextField
        fullWidth
        margin="dense"
        id="sheetId"
        label="Sheet Id"
        value={sheetId}
        onChange={(e) => setSheetId(e.target.value)}
      />
      <Button variant="contained" onClick={() => fetchSheetEntries()} endIcon={<SendIcon />}>
        submit
      </Button>
    </Paper>
  )
}
