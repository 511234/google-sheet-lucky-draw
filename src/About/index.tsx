import { Paper } from "@mui/material"
import "./index.css"

export const About = () => {
  return (
    <div className="about-container">
      <h1 style={{ textAlign: "center" }}> About</h1>
      <div className="about-box-container">
        <Paper elevation={3} className="about-box">
          <h2 className="title">Table View</h2>
          <p className="description">
            Easy-to-use platform without export and import.
            <br />
            View, sort and filter data and not having to worry about tampering with the existing document!
            <br />
            Enjoy better viewing experience by changing number of records shown per page.
          </p>
        </Paper>
        <Paper elevation={3} className="about-box">
          <h2 className="title">Lucky Draw</h2>
          <p className="description">
            Pick a handful of people by this handy tool! You can set wheel speed and label used on your discretion.
            People who are drawn will be removed from the available pool. Retrieve your list right next to the wheel.
            Only support drawing no less than 4 people at the moment.
          </p>
        </Paper>
      </div>
    </div>
  )
}
