import React from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import "./index.css";

export const InputSession = () => {
  return (
    <Paper elevation={3} className="container">
      <Typography variant="h3" component="h3" align="center" gutterBottom="true">
        Google Sheet Lucky Draw
      </Typography>
      <div className="input-container">
        <TextField required id="outlined-required" label="Sheet ID" defaultValue="" />
      </div>
    </Paper>
  );
};
