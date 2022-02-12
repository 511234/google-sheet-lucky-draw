import { Accordion, AccordionSummary, AccordionDetails, ListItem, ListItemText } from "@mui/material"
import Typography from "@mui/material/Typography"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"

export const WinnerList = ({ winners, setWinners, isWinnerVisible, isSpinning }) => {
  const showWinnerList = () => {
    const list = []
    winners
      .filter((winner, index) => index != winners.length - 1)
      .map((winner, index) => {
        list.push(
          <ListItem
            key={index}
            onClick={() => {
              const newWinners = winners.filter((element, key) => key !== index)
              setWinners(newWinners)
            }}
            secondaryAction={
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText primary={winner} />
          </ListItem>
        )
      })
    return list
  }
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
        <Typography>Winner's List</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {showWinnerList()}

        {/* If the wheel stops spinning for the current winner or the wheel awaits spinning, show current winner */}
        {(isWinnerVisible || !isSpinning) && (
          <ListItem
            key={winners.length - 1}
            onClick={() => {
              const newWinners = winners.filter((element, key) => key !== winners.length - 1)
              setWinners(newWinners)
            }}
            secondaryAction={
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText primary={winners[winners.length - 1]} />
          </ListItem>
        )}
      </AccordionDetails>
    </Accordion>
  )
}
