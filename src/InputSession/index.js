import React, { useContext, useState } from "react"

import { Paper, Divider, TextField, Button } from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import "./index.css"
import { EDIT_SHEET_ID, EDIT_SHEET_NAME, EntryContext } from "../Hooks"

export const InputSession = () => {
  const entryContext = useContext(EntryContext)
  const [sheetId, setSheetId] = useState("")

  const fetchSheetEntries = () => {
    entryContext.dataDispatch({ type: EDIT_SHEET_ID, payload: sheetId })
  }

  return (
    <Paper elevation={3} className="input-container">
      <h1 style={{ textAlign: "center" }}> Google Sheet Widget</h1>
      <h3>A handly application for you to view Google Sheet and draw Random People!</h3>
      <ul>
        <li>Copy Sheet ID from URL</li>
        <li>Paste it in the field</li>
        <li>Switch between different tabs to play around!</li>
      </ul>

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
