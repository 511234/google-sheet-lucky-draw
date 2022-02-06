import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { EDIT_SHEET_HEADERS, EDIT_SHEET_ENTRIES, EntryContext } from "../Hooks";

export const SheetData = () => {
  const entryContext = useContext(EntryContext);
  const [openSheetPeople, setOpenSheetPeople] = useState([]);
  const [openSheetHeaders, setOpenSheetHeaders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getDataFromOpenSheet = async () => {
    const sheetId = entryContext.dataState.sheetId;
    const sheetName = entryContext.dataState.sheetName;
    const link = `https://opensheet.elk.sh/${sheetId}/${sheetName}`;

    try {
      const res = await axios.get(link);
      setOpenSheetPeople(() => {
        res.data.forEach((entry, i) => {
          entry.id = entry.hasOwnProperty("id") ? entry.id : i + 1;
        });
        return res.data;
      });
      setOpenSheetHeaders(() => {
        const columnHeaders = Object.keys(res.data[0]);
        const headers = [];
        for (const value of columnHeaders) {
          headers.push({ field: value, headerName: value });
        }
        return headers;
      });
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDataFromOpenSheet();
  }, [entryContext.dataState.sheetId, entryContext.dataState.sheetName]);

  useEffect(() => {
    entryContext.dataDispatch({ type: EDIT_SHEET_HEADERS, payload: openSheetHeaders });
    entryContext.dataDispatch({ type: EDIT_SHEET_ENTRIES, payload: openSheetPeople });
  }, [openSheetHeaders]);

  return <></>;
};
