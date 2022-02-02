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
  const [testPeople, setTestPeople] = useState([]);
  const [testHeaders, setTestHeaders] = useState([]);

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
      const y = [];
      const z = [];
      for (const key of item) {
        if (key.hasOwnProperty("v")) {
          //   console.log(Object.values(key)[0].toString());
        }
      }
      //   z.push(Object.values(key)[0].toString());
      console.log("break");
      console.log(z);

      return z;
    });
    console.log(output3);
  };

  const getDataTest2 = async () => {
    const sheetId = "146TCK6K9przwo2oEIun0IDk7wKPmPzVeD335uSHuvAM";
    const sheetName = "Sheet1";
    const link = "https://opensheet.elk.sh/" + sheetId + "/" + sheetName;
    const res = await axios.get(link);
    console.log(res);
    setTestPeople(res.data);
    setTestHeaders(Object.keys(res.data[0]));
  };

  useEffect(() => {
    getDataTest();
    getDataTest2();
  }, []);

  useEffect(() => {
    console.log(people);
  }, [people]);

  useEffect(() => {
    console.log(testPeople);
  }, [testPeople]);

  useEffect(() => {
    console.log(testHeaders);
  }, [testHeaders]);

  const rowArray = (entry) => {
    // for (const key in testHeaders) {
    const hihihi = [];
    for (let i = 0; i < testHeaders.length; i++) {
      hihihi.push(
        <TableCell key={entry[testHeaders[i]]} align="left">
          {entry[testHeaders[i]]}
        </TableCell>
      );
    }
    return hihihi;
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {testHeaders.map((column) => (
                <TableCell
                  key={column}
                  //   align={column.align}
                  //   style={{ minWidth: column.minWidth }}
                >
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {console.log(people)}
            {testPeople.map((person, index) => {
              return (
                <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  {/* <TableCell align="left">{person[testHeaders[0]] ?? ""}</TableCell>
                  <TableCell align="left">{person[testHeaders[1]] ?? ""}</TableCell>
                  <TableCell align="left">{person[testHeaders[2]] ?? ""}</TableCell> */}
                  {rowArray(person)}
                  {/* <TableCell align="left">{person ?? ""}</TableCell> */}
                  {/* <TableCell align="left">{person[headers[2].label] ?? ""}</TableCell> */}
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
