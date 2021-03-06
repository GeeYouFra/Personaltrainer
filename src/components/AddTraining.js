import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import Tooltip from "@mui/material/Tooltip";

function AddTraining(props) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(new Date());
  const [training, setTraining] = React.useState({
    date: "",
    activity: "",
    duration: "",
    customer: props.params.value,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    props.addTrainings(training);
    handleClose();
  };

  const modifyDate = (date) => {
    setDate(date);
    setTraining({ ...training, date: date.toISOString() });
  };

  const inputChanged = (event) => {
    setTraining({ ...training, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <Tooltip title="Add training">
        <AddCircleOutlinedIcon variant="outlined" onClick={handleClickOpen} />
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Yes! That's The Spirit!</DialogTitle>
        <DialogContent>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              style={{ margin: 5 }}
              label="Date"
              format="dd.MM.yyyy HH:mm"
              onChange={(date) => modifyDate(date)}
              value={date}
              id="date"
              name="date"
            />
          </MuiPickersUtilsProvider>

          <TextField
            margin="dense"
            name="activity"
            value={training.activity}
            onChange={inputChanged}
            label="Activity"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="duration"
            value={training.duration}
            onChange={inputChanged}
            label="Duration"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddTraining;
