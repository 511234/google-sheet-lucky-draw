import { ChangeEvent, useCallback, useContext, useState } from "react"

import { Paper, TextField, Button, Divider } from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import GitHubIcon from "@mui/icons-material/GitHub"
import EmailIcon from "@mui/icons-material/Email"
import "./index.css"
import { EDIT_SHEET_ID, EntryContext } from "../Hooks"

export const InputSession = () => {
  const pointerStyle = {
    cursor: "pointer",
  }
  const { dataDispatch } = useContext(EntryContext)
  const [sheetId, setSheetId] = useState<string>("146TCK6K9przwo2oEIun0IDk7wKPmPzVeD335uSHuvAM")

  const handleSheetIdChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSheetId(e.target.value)
  }

  const fetchSheetEntries = useCallback(() => {
    dataDispatch({ type: EDIT_SHEET_ID, payload: sheetId })
  }, [])

  const handleOpenGithub = useCallback(() => {
    window.open("https://github.com/511234", "_blank")
  }, [])

  const handleOpenMailbox = useCallback(() => {
    window.location.href = "mailto:lulutheflaneur@gmail.com"
  }, [])

  return (
    <Paper elevation={3} className="input-container">
      <h1 style={{ textAlign: "center" }}> Google Sheet Widget</h1>
      <div className="contact-me-container">
        <div>Created by Lulu TUNG</div>
        <Divider orientation="vertical" flexItem />
        <GitHubIcon sx={pointerStyle} onClick={handleOpenGithub} />
        <Divider orientation="vertical" flexItem />
        <EmailIcon sx={pointerStyle} onClick={handleOpenMailbox} />
      </div>
      <TextField
        fullWidth
        margin="dense"
        id="sheetId"
        label="Sheet Id"
        value={sheetId}
        onChange={handleSheetIdChange}
      />
      <Button variant="contained" onClick={fetchSheetEntries} endIcon={<SendIcon />}>
        submit
      </Button>
    </Paper>
  )
}
