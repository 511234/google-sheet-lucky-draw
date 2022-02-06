import React, { useContext, useEffect, useState, useRef } from "react"
import { EntryContext } from "../Hooks"
import { Button } from "@mui/material"
import "./index.css"
import { COLORS } from "../Constants/colors"

export const LuckyWheel = () => {
  const entryContext = useContext(EntryContext)

  const [canSpin, setCanSpin] = useState(true)
  const [isNewStart, setIsNewStart] = useState(true)
  const [random, setRandom] = useState(0)
  const [winners, setWinners] = useState([])
  const [isWinnerVisible, setIsWinnerVisible] = useState(false)

  const headers = entryContext.dataState.sheetHeaders

  const createSectors = (entries) => {
    const sectors = []
    const sectorDegrees = 360 / entries.length
    entries.map((entry, index) => {
      const sectorRotateDegrees = sectorDegrees * index
      const sectorSkewDegrees = Math.abs(sectorDegrees - 90)
      const sectorTextRotateDegrees = 360 / entries.length / 2

      sectors.push(
        <li style={{ transform: `rotate(${sectorRotateDegrees}deg) skewY(-${sectorSkewDegrees}deg)` }}>
          <div
            className="colored-sector"
            style={{
              backgroundColor: COLORS[index % 10],
              transform: `skewY(${sectorSkewDegrees}deg) rotate(${sectorTextRotateDegrees}deg)`,
            }}
          >
            {entry[headers[0].headerName]}
          </div>
        </li>
      )
    })
    return sectors
  }

  const handleSpinning = () => {
    setRandom(Math.floor(5000 + Math.random() * 5000))
    setIsWinnerVisible(false)
    setCanSpin(false)
    setIsNewStart(false)

    setTimeout(() => {
      setIsWinnerVisible(true)
    }, 5000)
  }

  const handleRestart = () => {
    setIsNewStart(true)
    setCanSpin(true)
  }

  useEffect(() => {
    const actualDeg = random % 360
    const luckyEntry = Math.ceil(((360 - actualDeg) / 360) * entryContext.dataState.sheetEntries.length)
    const luckyPerson = entryContext.dataState.sheetEntries.find((entry) => entry.id == luckyEntry)
    if (luckyPerson) {
      setWinners([...winners, luckyPerson[headers[0].headerName]])
    }
  }, [random])

  return (
    <div className="wheel-container">
      <div className="arrow"></div>
      <ul
        className="wheel"
        style={
          isNewStart
            ? { transform: `rotate(0deg)` }
            : { transform: `rotate(${random}deg)`, transition: "all 5s ease-out" }
        }
      >
        {createSectors(entryContext.dataState.sheetEntries)}
      </ul>
      {isNewStart ? (
        <Button onClick={() => handleSpinning()} disabled={!canSpin}>
          SPIN!
        </Button>
      ) : (
        <Button onClick={() => handleRestart()}>RESTART</Button>
      )}
      <div>And the winner is ... {isWinnerVisible ? winners[winners.length - 1] : ""} !</div>
    </div>
  )
}
