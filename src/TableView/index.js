import { useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { EntryContext } from "../Hooks";

export const DataTable = () => {
  const entryContext = useContext(EntryContext);

  return (
    <div style={{ height: '40rem', width: "100%" }}>
      <DataGrid
        rows={entryContext.dataState.sheetEntries}
        columns={entryContext.dataState.sheetHeaders}
        rowsPerPageOptions={[10, 25, 100]}
        checkboxSelection
      />
    </div>
  );
};
