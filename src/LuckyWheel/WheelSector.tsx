import { COLORS } from "../Constants/colors"

interface IWheelSector {
  cannotSpin: boolean
  handleSpinning: any
  participants: any[]
  wheelLabel: string
}

export const WheelSector = ({ cannotSpin, handleSpinning, participants, wheelLabel }: any) => {
  const sectorDegrees = 360 / participants.length
  return participants.map((wheelParticipant, index) => {
    const sectorRotateDegrees = sectorDegrees * index
    const sectorSkewDegrees = Math.abs(sectorDegrees - 90)
    const sectorTextRotateDegrees = 360 / participants.length / 2
    return (
      <li key={index} style={{ transform: `rotate(${sectorRotateDegrees}deg) skewY(-${sectorSkewDegrees}deg)` }}>
        <div
          className="colored-sector"
          onClick={cannotSpin ? undefined : handleSpinning}
          style={{
            backgroundColor: COLORS[index % 10],
            cursor: cannotSpin ? "default" : "pointer",
            transform: `skewY(${sectorSkewDegrees}deg) rotate(${sectorTextRotateDegrees}deg)`,
          }}
        >
          {wheelParticipant[wheelLabel]}
        </div>
      </li>
    )
  })
}
