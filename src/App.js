import "./App.css";
import Customerlist from "./components/Customerlist";
import Traininglist from "./components/Traininglist";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
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
      <AppBar position="static" color="transparent">
        <Typography variant="h5">Personal Trainer</Typography>

        <Tabs value={value} onChange={handleChange}>
          <Tab label="TRAINEES" />
          <Tab label="SCHEDULES" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Customerlist />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Traininglist />
      </TabPanel>
    </div>
  );
}

function TabPanel(props) {
  const { children, value, index } = props;
  return <div>{value === index && <Typography>{children}</Typography>}</div>;
}
export default App;
