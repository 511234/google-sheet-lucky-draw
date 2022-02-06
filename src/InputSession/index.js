import React, { useContext } from "react";

import { Paper, Divider, TextField, Typography, Box, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import "./index.css";
import { EDIT_SHEET_ID, EDIT_SHEET_NAME, EntryContext } from "../Hooks";

export const InputSession = () => {
  const entryContext = useContext(EntryContext);

  return (
    <Paper elevation={3} className="container">
      <Typography variant="h3" component="h3" align="center" gutterBottom={true}>
        Google Sheet Widget
      </Typography>
      <div className="input-container">
        <Box
          sx={{
            width: "28rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <Typography variant="h5" align="center">
            A handly application for you to view Google Sheet and draw Random People!
          </Typography>
          <ul>
            <li>Copy Sheet ID from URL (the text between /d/ and /edit)</li>
            <li>Paste it in the field on the right</li>
            <li>Type in Sheet Name on the right</li>
            <li>Switch between different tabs to play around!</li>
          </ul>
          <Typography variant="caption" align="left">
            Sheet ID for testing: 146TCK6K9przwo2oEIun0IDk7wKPmPzVeD335uSHuvAM
          </Typography>
          <Typography variant="caption" align="left">
            Sheet Name for testing: Sheet 1
          </Typography>
        </Box>
        <Divider
          sx={{ display: { xs: "none", md: "block" } }}
          orientation="vertical"
          variant="middle"
          flexItem
        />
        <div className="input-field">
          <TextField
            fullWidth
            id="sheetId"
            label="Sheet ID"
            onChange={(e) =>
              entryContext.dataDispatch({ type: EDIT_SHEET_ID, payload: e.target.value })
            }
          />
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <TextField
            fullWidth
            id="sheetName"
            label="Sheet Name (Default: Sheet 1)"
            onChange={(e) =>
              entryContext.dataDispatch({ type: EDIT_SHEET_NAME, payload: e.target.value })
            }
          />
        </div>
        {/* <Button variant="contained" endIcon={<SendIcon />}>
          Go!
        </Button> */}
      </div>
    </Paper>
  );
};
