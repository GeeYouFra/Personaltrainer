import "./App.css";
import Customerlist from "./components/Customerlist";
import Traininglist from "./components/Traininglist";
import CalendarTab from "./components/CalendarTab";
import Statistics from "./components/Statistics";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import React, { useState } from "react";

function App() {
  const [value, setValue] = useState(0);
  const handleChange = (event, value) => {
    setValue(value);
  };
  return (
    <div className="App">
      <AppBar className="centered" position="static" color="transparent">
        <Typography variant="h4">The New You : Personal Trainer</Typography>

        <Tabs value={value} onChange={handleChange}>
          <Tab label="TRAINEES" />
          <Tab label="SCHEDULES" />
          <Tab label="CALENDAR" />
          <Tab label="STATISTICS" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Customerlist />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Traininglist />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CalendarTab />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Statistics />
      </TabPanel>
    </div>
  );
}

function TabPanel(props) {
  const { children, value, index } = props;
  return <div>{value === index && <Typography>{children}</Typography>}</div>;
}
export default App;
