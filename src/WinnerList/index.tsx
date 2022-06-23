import { Accordion, AccordionSummary, AccordionDetails, ListItem, ListItemText } from "@mui/material"
import Typography from "@mui/material/Typography"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import { ReactChild, ReactFragment, ReactPortal, Key } from "react"

export const WinnerList = ({ winners, setWinners, isWinnerVisible, isSpinning }) => {
  const showWinnerList = () => {
    const list: any[] = []
    winners
      .filter((_: any, index: number) => index !== winners.length - 1)
      .map(
        (
          winner: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined,
          index: Key | null | undefined
        ) => {
          list.push(
            <ListItem
              key={index}
              onClick={() => {
                const newWinners = winners.filter((_element: any, key: any) => key !== index)
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
          return list
        }
      )
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
              const newWinners = winners.filter((_element: any, key: number) => key !== winners.length - 1)
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
