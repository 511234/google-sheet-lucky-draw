import { useContext, useEffect, useState } from "react"
import { EntryContext } from "../Hooks"
import { Button, Grid } from "@mui/material"
import "./index.css"
import { COLORS } from "../Constants/colors"
import { CustomCondition } from "../CustomCondition"
import { WinnerList } from "../WinnerList"

export const LuckyWheel = () => {
  const MIN_PARTICIPANTS = 4

  const { dataState } = useContext<any>(EntryContext)
  const [isSpinning, setIsSpinning] = useState<boolean>(false)
  const [isNewStart, setIsNewStart] = useState<boolean>(true)
  const [random, setRandom] = useState<number>(0)
  const [winners, setWinners] = useState<any>([])
  const [currentWinner, setCurrentWinner] = useState({})
  const [isWinnerVisible, setIsWinnerVisible] = useState<boolean>(false)
  const [wheelSpeed, setWheelSpeed] = useState<number>(5)
  const [wheelLabel, setWheelLabel] = useState<string>("")
  const [participants, setParticipants] = useState([])

  const headers = dataState.sheetHeaders
  const createSectors = (wheelParticipants) => {
    const sectors: any = []

    const sectorDegrees = 360 / wheelParticipants.length
    wheelParticipants.map((wheelParticipant, index) => {
      const sectorRotateDegrees = sectorDegrees * index
      const sectorSkewDegrees = Math.abs(sectorDegrees - 90)
      const sectorTextRotateDegrees = 360 / wheelParticipants.length / 2

      sectors.push(
        <li key={index} style={{ transform: `rotate(${sectorRotateDegrees}deg) skewY(-${sectorSkewDegrees}deg)` }}>
          <div
            className="colored-sector"
            style={{
              backgroundColor: COLORS[index % 10],
              transform: `skewY(${sectorSkewDegrees}deg) rotate(${sectorTextRotateDegrees}deg)`,
            }}
          >
            {wheelParticipant[wheelLabel]}
          </div>
        </li>
      )
      return sectors
    })
    return sectors
  }

  const handleSpinning = async () => {
    setRandom(Math.floor(5000 + Math.random() * 5000))
    setIsWinnerVisible(false)
    setIsSpinning(true)
    setIsNewStart(false)

    setTimeout(() => {
      setIsWinnerVisible(true)
      setIsSpinning(false)
    }, wheelSpeed * 1000)
  }

  const handleRestart = () => {
    setParticipants(participants.filter((participant) => participant !== currentWinner))
    setIsNewStart(true)
    setIsWinnerVisible(false)
  }

  // Set lucky draw pool
  useEffect(() => {
    setParticipants(dataState.sheetEntries)
  }, [dataState.sheetEntries])

  // When wheel starts spinning towards a random degree, get the winner by relative position of the person at the wheel
  useEffect(() => {
    const actualDeg = random % 360
    const luckyEntry = Math.ceil(((360 - actualDeg) / 360) * participants.length)
    const luckyPerson: any = participants.find((entry, index) => index === luckyEntry - 1)
    if (luckyPerson) {
      // trigger re-render: setWinners([...winners, luckyPerson[wheelLabel]])
      setWinners((prev) => [...prev, luckyPerson[wheelLabel]])
    }
    setCurrentWinner(luckyPerson)
  }, [participants, random, wheelLabel])

  useEffect(() => {
    if (headers.length) {
      setWheelLabel(headers[0].headerName)
    }
  }, [headers])

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <div className="wheel-container">
            <div className="arrow"></div>
            <ul
              className="wheel"
              style={
                isNewStart
                  ? { transform: `rotate(0deg)` }
                  : { transform: `rotate(${random}deg)`, transition: `all ${wheelSpeed}s ease-out` }
              }
            >
              {createSectors(participants)}
            </ul>
            {isNewStart ? (
              <Button onClick={handleSpinning} disabled={isSpinning || participants.length < MIN_PARTICIPANTS}>
                SPIN!
              </Button>
            ) : (
              <Button onClick={handleRestart} disabled={isSpinning}>
                RETURN TO STARTING POINT
              </Button>
            )}
            <div>And the winner is ... {isWinnerVisible ? winners[winners.length - 1] : ""} !</div>
          </div>
        </Grid>

        <Grid item xs={12} md={6}>
          <WinnerList
            winners={winners}
            setWinners={setWinners}
            isWinnerVisible={isWinnerVisible}
            isSpinning={isSpinning}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomCondition isSpinning={isSpinning} setWheelSpeed={setWheelSpeed} setWheelLabel={setWheelLabel} />
        </Grid>
      </Grid>
    </>
  )
}
