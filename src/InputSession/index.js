import React, { useContext } from "react"

import { Paper, Divider, TextField, Typography, Box, Button } from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import "./index.css"
import { EDIT_SHEET_ID, EDIT_SHEET_NAME, EntryContext } from "../Hooks"

export const InputSession = () => {
  const entryContext = useContext(EntryContext)

  return (
    <Paper elevation={3} className="input-container">
      <h1 style={{ textAlign: "center" }}> Google Sheet Widget</h1>
      <h3>A handly application for you to view Google Sheet and draw Random People!</h3>
      <ul>
        <li>Copy Sheet ID from URL (the text between /d/ and /edit)</li>
        <li>Paste it in the field on the right</li>
        <li>Type in Sheet Name on the right</li>
        <li>Switch between different tabs to play around!</li>
      </ul>

      {/* <Divider sx={{ display: { xs: "none", md: "block" } }} /> */}
      <TextField
        fullWidth
        margin="dense"
        id="sheetId"
        label="Sheet ID"
        onChange={(e) => entryContext.dataDispatch({ type: EDIT_SHEET_ID, payload: e.target.value })}
      />
      <TextField
        fullWidth
        margin="dense"
        id="sheetName"
        label="Sheet Name (Default: Sheet 1)"
        onChange={(e) => entryContext.dataDispatch({ type: EDIT_SHEET_NAME, payload: e.target.value })}
      />
      {/* <Button variant="contained" endIcon={<SendIcon />}>
          Go!
        </Button> */}
    </Paper>
  )
}
