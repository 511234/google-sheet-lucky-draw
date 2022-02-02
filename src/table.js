import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import _ from "lodash";

export const StickyHeadTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [headers, setHeaders] = useState([]);
  const [labels, setLabels] = useState([]);
  const [people, setPeople] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getDataTest = async () => {
    const sheetId = "146TCK6K9przwo2oEIun0IDk7wKPmPzVeD335uSHuvAM";
    const link = "https://docs.google.com/spreadsheets/d/" + sheetId + "/gviz/tq?tqx=out:json";
    const res = await axios.get(link);
    console.log(res);
    const resObj = JSON.parse(res.data.substring(47).slice(0, -2));
    console.log(resObj);

    const test = resObj.table.rows;
    console.log(test);

    const resHeader = resObj.table.cols;
    console.log(resHeader);
    setHeaders(resHeader);

    const output1 = _.map(test, (item) => {
      return _.map(Object.values(item));
    });
    console.log(output1);

    const a = test[0];
    console.log(a);
    const b = Object.values(a);
    console.log(b);
    const c = b[0];
    console.log(c);
    let x = [];
    for (const item in c) {
      x.push(...Object.values(c[item]));
    }
    x.pop();
    console.log(x);

    console.log(Object.values(Object.values(test[0])[0][0]));

    const output2 = _.map(output1, (i) => {
      return _.values(...i, Object.values(i));
    });
    console.log(output2);

    const output3 = output2.map((item) => {
      let z = {};
      for (const key in item) {
        const label = resHeader[key].label;
        z[label] = Object.values(item[key]).toString();
        // const something = { [label]: Object.values(item[key]).toString() };
      }
      return z;
    });
    console.log(output3);
    setPeople(output3);

    // console.log(resHeader);
  };

  useEffect(() => {
    getDataTest();
  }, []);

  useEffect(() => {
    console.log(people);
  }, [people]);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {headers.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {console.log(people)}
            {people.map((person, index) => {
              console.log(person);
              console.log(headers);
              console.log(person.Name)
              console.log(person.key(0));
              return (
                <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell align="left">{person[headers[0].label] ?? ""}</TableCell>
                  <TableCell align="left">{person[headers[1].label] ?? ""}</TableCell>
                  <TableCell align="left">{person[headers[2].label] ?? ""}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={people.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
