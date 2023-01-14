import React, { createContext } from "react"

export const EDIT_SHEET_ID = "EDIT_SHEET_ID"
export const EDIT_SHEET_NAME = "EDIT_SHEET_NAME"
export const EDIT_SHEET_HEADERS = "EDIT_SHEET_HEADERS"
export const EDIT_SHEET_ENTRIES = "EDIT_SHEET_ENTRIES"

interface IDataInitialState {
  sheetId: string
  sheetHeaders: any[]
  sheetEntries: any[]
}

export const dataInitialState: IDataInitialState = {
  sheetId: "",
  sheetHeaders: [],
  sheetEntries: [],
}

export const dataReducer = (dataState, action) => {
  const { type, payload } = action
  switch (type) {
    case EDIT_SHEET_ID:
      return { ...dataState, sheetId: payload }

    case EDIT_SHEET_HEADERS:
      return { ...dataState, sheetHeaders: payload }

    case EDIT_SHEET_ENTRIES:
      return { ...dataState, sheetEntries: payload }

    default:
      break
  }
}

export const EntryContext = createContext<{ dataState: IDataInitialState; dataDispatch: React.Dispatch<any> }>({
  dataState: dataInitialState,
  dataDispatch: () => null,
})
