import React, { useContext } from "react";
import { EntryContext } from "../Hooks";

export const LuckyWheel = () => {
  const entryContext = useContext(EntryContext);

  return (
    <>
      <div>Hi Lucky Wheel World @.@</div>
      <div>{entryContext.dataState.sheetId}</div>
    </>
  );
};
