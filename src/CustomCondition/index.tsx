import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Grid,
  Slider,
  FormLabel,
} from "@mui/material"
import Typography from "@mui/material/Typography"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

import { useContext } from "react"
import { EntryContext } from "../Hooks"

export const CustomCondition = ({ isSpinning, setWheelSpeed, setWheelLabel }) => {
  const { dataState } = useContext(EntryContext)

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
        <Typography>Lucky Wheel Custom Options</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormLabel>Seconds to Roll: </FormLabel>
            <Slider
              min={0}
              max={10}
              defaultValue={5}
              onChange={(e: any) => {
                setWheelSpeed(e.target.value)
              }}
              valueLabelDisplay="auto"
              disabled={isSpinning}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Wheel Label</InputLabel>
              <Select
                defaultValue=""
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
                onChange={(e) => setWheelLabel(e.target.value)}
                disabled={isSpinning}
              >
                {dataState.sheetHeaders.map((key, index) => {
                  return (
                    <MenuItem key={key.headerName} value={key.headerName}>
                      {key.headerName}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}
