import { useCallback, useContext, useEffect, useRef, useState } from "react"
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
  const [isWheelStatic, setIsWheelStatic] = useState<boolean>(true)
  const [random, setRandom] = useState<number>(() => Math.floor(5000 + Math.random() * 5000))
  const [winners, setWinners] = useState<string[]>([])
  const [isWinnerVisible, setIsWinnerVisible] = useState<boolean>(false)
  const [wheelSpeed, setWheelSpeed] = useState<number>(5)
  const currentWinnerRef = useRef<any>(null)

  const [wheelLabel, setWheelLabel] = useState<string>("")

  // type defined in Google Sheet, uncontrollable
  const [participants, setParticipants] = useState<any[]>([])
  const [entries, setEntries] = useState<any[]>([])

  const headers = dataState.sheetHeaders
  const createSectors = () => {
    const sectorDegrees = 360 / participants.length
    return participants.map((wheelParticipant, index) => {
      const sectorRotateDegrees = sectorDegrees * index
      const sectorSkewDegrees = Math.abs(sectorDegrees - 90)
      const sectorTextRotateDegrees = 360 / participants.length / 2
      return (
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
    })
  }

  // When wheel starts spinning towards a random degree, get the winner by relative position of the person at the wheel
  const handleSpinning = useCallback(async () => {
    if (!isSpinning) {
      const actualDeg = random % 360
      const luckyEntry = Math.ceil(((360 - actualDeg) / 360) * participants.length)
      const luckyPerson = participants.find((_, index) => index === luckyEntry - 1)

      if (luckyPerson) {
        // trigger re-render: setWinners([...winners, luckyPerson[wheelLabel]])
        setWinners((prev) => [...prev, JSON.stringify(luckyPerson)])
      }
      currentWinnerRef.current = luckyPerson
      setIsWinnerVisible(false)
      setIsSpinning(true)
      setIsWheelStatic(false)

      setTimeout(() => {
        setIsWinnerVisible(true)
        setIsSpinning(false)
      }, wheelSpeed * 1000)
    }
  }, [isSpinning, participants, random, wheelSpeed])

  const handleRestart = () => {
    // setParticipants(participants.filter((participant) => participant !== currentWinner))
    setIsWheelStatic(true)
    setIsWinnerVisible(false)
    setParticipants((prev) =>
      prev.filter((parti) => JSON.stringify(parti) !== JSON.stringify(currentWinnerRef.current))
    )
    setRandom(Math.floor(5000 + Math.random() * 5000))
  }

  // Set lucky draw pool
  useEffect(() => {
    setEntries(dataState.sheetEntries)
    setParticipants(dataState.sheetEntries)
  }, [dataState.sheetEntries])

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
                isWheelStatic
                  ? { transform: `rotate(0deg)` }
                  : { transform: `rotate(${random}deg)`, transition: `all ${wheelSpeed}s ease-out` }
              }
            >
              {createSectors()}
            </ul>
            {isWheelStatic ? (
              <Button onClick={handleSpinning} disabled={isSpinning || participants.length < MIN_PARTICIPANTS}>
                SPIN!
              </Button>
            ) : (
              <Button onClick={handleRestart} disabled={isSpinning}>
                RETURN TO STARTING POINT
              </Button>
            )}
            <div>And the winner is ... {isWinnerVisible ? currentWinnerRef.current[wheelLabel] : ""} !</div>
          </div>
        </Grid>

        <Grid item xs={12} md={6}>
          {/* <WinnerList
            winners={winners}
            setWinners={setWinners}
            isWinnerVisible={isWinnerVisible}
            isSpinning={isSpinning}
          /> */}
        </Grid>
        <Grid item xs={12}>
          <CustomCondition isSpinning={isSpinning} setWheelLabel={setWheelLabel} setWheelSpeed={setWheelSpeed} />
        </Grid>
      </Grid>
    </>
  )
}
