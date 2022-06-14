import React, { useContext, useState } from "react"

import { Paper, TextField, Button, Divider, Typography } from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import GitHubIcon from "@mui/icons-material/GitHub"
import EmailIcon from "@mui/icons-material/Email"
import "./index.css"
import { EDIT_SHEET_ID, EntryContext } from "../Hooks"

export const InputSession = () => {
  const pointerStyle = {
    cursor: "pointer",
  }
  const entryContext = useContext(EntryContext)
  const [sheetId, setSheetId] = useState("146TCK6K9przwo2oEIun0IDk7wKPmPzVeD335uSHuvAM")

  const fetchSheetEntries = () => {
    entryContext.dataDispatch({ type: EDIT_SHEET_ID, payload: sheetId })
  }

  return (
    <Paper elevation={3} className="input-container">
      <h1 style={{ textAlign: "center" }}> Google Sheet Widget</h1>
      <div className="contact-me-container">
        <div>Created by Lulu TUNG</div>
        <Divider orientation="vertical" flexItem />
        <GitHubIcon sx={pointerStyle} onClick={() => window.open("https://github.com/511234", "_blank")} />
        <Divider orientation="vertical" flexItem />
        <EmailIcon sx={pointerStyle} onClick={() => (window.location = "mailto:lulutheflaneur@gmail.com")} />
      </div>
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
      test7
    </Paper>
  )
}
