import { useState, useContext } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { EntryContext } from "../Hooks";

// TabPanel can be another component / library

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={"div"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

// a11yProps can also be another component / library

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

export const FunctionalTab = ({ views }) => {
  const [value, setValue] = useState(0);
  const entryContext = useContext(EntryContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Table View" {...a11yProps(0)} />
          <Tab label="Lucky Wheel View" {...a11yProps(1)} />
          <Tab label="Raffle Draw View" {...a11yProps(2)} />
          {/* <Tab label="Backup" {...a11yProps(2)} /> */}
        </Tabs>
      </Box>
      {console.log(entryContext.dataState)}
      {views.map((item, key) => {
        return <TabPanel value={value} key={key} index={key} children={item} />;
      })}
    </Box>
  );
};
