import { createContext } from "react";

// UseContext

export const EntryContext = createContext(null);

// UseReducer

export const EDIT_SHEET_ID = "EDIT_SHEET_ID";
export const EDIT_SHEET_NAME = "EDIT_SHEET_NAME";
export const GET_SHEET_ENTRIES = "GET_SHEET_ENTRIES";

export const dataInitialState = {
  sheetId: "",
  sheetName: "Sheet 1",
  sheetEntries: [],
};

export const dataReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case EDIT_SHEET_ID:
      return { ...state, sheetId: payload };

    case EDIT_SHEET_NAME:
      return { ...state, sheetName: payload };

    case GET_SHEET_ENTRIES:
      return { ...state, sheetEntries: payload };
  }
};
