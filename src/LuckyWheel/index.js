import React, { useContext, useState } from "react";
import { EntryContext } from "../Hooks";
import { Button } from "@mui/material";
import "./index.css";
import { COLORS } from "../Constants/colors";

export const LuckyWheel = () => {
  const entryContext = useContext(EntryContext);
  const [isSpinning, setIsSpinning] = useState(false);

  const headers = entryContext.dataState.sheetHeaders;

  const sectors = (entries) => {
    const sector = [];
    const sectorDegrees = 360 / entries.length;
    console.log(entries.length);
    console.log(sectorDegrees);
    // for (const key of entries) {
    //   sector.push(<li style={{ backgroundColor: COLORS[key] }}>{key[headers[0].headerName]}</li>);
    // }
    entries.map((entry, index) => {
      const sectorRotateDegrees = sectorDegrees * index;
      const sectorSkewDegrees = Math.abs(sectorDegrees - 90);
      const sectorTextRotateDegrees = 360 / entries.length / 2;

      sector.push(
        <li
          style={{ transform: `rotate(${sectorRotateDegrees}deg) skewY(-${sectorSkewDegrees}deg)` }}
        >
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
      );
    });
    return sector;
  };

  return (
    <div className="wheel-container">
      <ul className="wheel">{sectors(entryContext.dataState.sheetEntries)}</ul>
      <Button onClick={() => setIsSpinning(true)}>SPIN!</Button>
    </div>
  );
};
