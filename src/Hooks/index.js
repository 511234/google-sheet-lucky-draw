import { createContext } from "react"

// UseContext

export const EntryContext = createContext(null)

// UseReducer

export const EDIT_SHEET_ID = "EDIT_SHEET_ID"
export const EDIT_SHEET_NAME = "EDIT_SHEET_NAME"
export const EDIT_SHEET_HEADERS = "EDIT_SHEET_HEADERS"
export const EDIT_SHEET_ENTRIES = "EDIT_SHEET_ENTRIES"

export const dataInitialState = {
  sheetId: "",
  sheetHeaders: [],
  sheetEntries: [],
}

export const dataReducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case EDIT_SHEET_ID:
      return { ...state, sheetId: payload }

    case EDIT_SHEET_HEADERS:
      return { ...state, sheetHeaders: payload }

    case EDIT_SHEET_ENTRIES:
      return { ...state, sheetEntries: payload }

    default:
      break
  }
}
