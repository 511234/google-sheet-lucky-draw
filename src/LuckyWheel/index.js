import React, { useContext, useState } from "react";
import { EntryContext } from "../Hooks";
import { Button } from "@mui/material";

export const LuckyWheel = () => {
  const entryContext = useContext(EntryContext);
  const [isSpinning, setIsSpinning] = useState(false);

  return (
    <div className="container">
      <div>Hi Lucky Wheel World @.@ Under Construction</div>
      {console.log(entryContext.dataState.sheetHeaders)}
      <Button>SPIN!</Button>
    </div>
  );
};
