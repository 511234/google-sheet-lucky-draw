import { useContext, useEffect } from "react"
import axios from "axios"
import { EDIT_SHEET_HEADERS, EDIT_SHEET_ENTRIES, EntryContext } from "../Hooks"

export const SheetData = () => {
  const entryContext = useContext(EntryContext)

  const getDataFromOpenSheet = async () => {
    const sheetId = entryContext.dataState.sheetId
    const sheetLink = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`

    try {
      const res = await axios.get(sheetLink)
      const resObj = JSON.parse(res.data.substring(47).slice(0, -2))

      // Set Headers
      const cols = resObj.table.cols
      const colsArray = []
      for (const key of cols) {
        colsArray.push(key.label)
      }
      const headers = []
      for (const value of colsArray) {
        headers.push({ field: value, headerName: value })
      }
      entryContext.dataDispatch({ type: EDIT_SHEET_HEADERS, payload: headers })

      // Set People
      const rows = resObj.table.rows
      const getRows = () => {
        const rowsArray = []
        rows.map((row, index) => {
          const obj = {}
          Object.values(row)[0].map((record, index) => {
            const label = colsArray[index]
            obj[label] = record.v
            return obj
          })
          rowsArray.push(obj)
          return rowsArray
        })
        return rowsArray
      }
      const people = getRows()
      people.forEach((entry, i) => {
        entry.id = entry.hasOwnProperty("id") ? entry.id : i + 1
      })
      entryContext.dataDispatch({ type: EDIT_SHEET_ENTRIES, payload: people })
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (entryContext.dataState.sheetId) {
      getDataFromOpenSheet()
    }
  }, [entryContext.dataState.sheetId])

  return <></>
}
