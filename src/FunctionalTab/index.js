import { useState } from "react"
import { Typography, Box, Tab, Tabs } from "@mui/material"

// TabPanel can be another component / library

const TabPanel = (props) => {
  const { children, value, index, ...other } = props

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
  )
}

// a11yProps can also be another component / library

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}

export const FunctionalTab = ({ views }) => {
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="About" {...a11yProps(0)} />
          <Tab label="Table View" {...a11yProps(1)} />
          <Tab label="Lucky Draw" {...a11yProps(2)} />
          {/* <Tab label="Raffle Draw" {...a11yProps(3)} /> */}
        </Tabs>
      </Box>
      {views.map((item, key) => {
        return <TabPanel value={value} key={key} index={key} children={item} style={{ height: "92vh" }} />
      })}
    </Box>
  )
}
