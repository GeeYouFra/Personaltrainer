import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import AddTraining from "./AddTraining";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { format } from "date-fns";

function Traininglist() {
  const [trainings, setTrainings] = useState([]);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const fullname = (trainings) => {
    return `${trainings.data.customer.firstname} ${trainings.data.customer.lastname}`;
  };
  const fulldate = (trainings) => {
    const formatDate = format(new Date(trainings.data.date), "dd.MM.yyy HH:mm");
    return formatDate;
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then((response) => response.json())
      .then((data) => setTrainings(data))
      .catch((err) => console.error(err));
  };

  const deleteTraining = (link) => {
    if (window.confirm("Sure to delete this one?")) {
      fetch(
        "https://customerrest.herokuapp.com/api/trainings/" + link.data.id,
        { method: "DELETE" }
      )
        .then((response) => {
          if (response.ok) {
            setMsg("Successful! See you next time");
            setOpen(true);
            fetchTrainings();
          } else {
            alert("Oops! Something went wrong");
          }
        })
        .catch((err) => console.error(err));
    }
  };

  const columns = [
    {
      valueGetter: fulldate,
      headerName: "Date",
      width: 150,
      sortable: true,
      filter: true,
    },
    { field: "activity", width: 150, sortable: true, filter: true },
    { field: "duration", width: 200, sortable: true, filter: true },
    {
      valueGetter: fullname,
      headerName: "Customer",
      width: 150,
      sortable: true,
      filter: true,
    },
    {
      headerName: " ",
      sortable: false,
      filter: false,
      width: 120,
      field: "links[1].href",
      cellRendererFramework: (params) => (
        <Button
          size="small"
          color="error"
          onClick={() => deleteTraining(params)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div>
      <AddTraining />
      <div
        className="ag-theme-material"
        style={{ height: 600, width: "90%", margin: "auto" }}
      >
        <AgGridReact
          rowData={trainings}
          columnDefs={columns}
          pagination={true}
          paginationPageSize={10}
          suppressCellSelection={true}
        />
        <Snackbar
          open={open}
          message={msg}
          autoHideDuration={3000}
          onClose={handleClose}
        />
      </div>
    </div>
  );
}

export default Traininglist;
