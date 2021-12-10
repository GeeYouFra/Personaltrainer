import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import AddCustomer from "./AddCustomer";
import AddTraining from "./AddTraining";
import EditCustomer from "./EditCustomer";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

function Customerlist() {
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const fetchCustomers = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then((response) => response.json())
      .then((data) => setCustomers(data.content))
      .catch((err) => console.error(err));
  };

  const deleteCustomer = (url) => {
    if (window.confirm("Do you really want to DELETE me?")) {
      fetch(url, { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            setMsg("A tired trainee left the group");
            setOpen(true);
            fetchCustomers();
          } else {
            alert("Oops! Something went wrong");
          }
        })
        .catch((err) => console.error(err));
    }
  };

  const addTrainings = (training) => {
    fetch("https://customerrest.herokuapp.com/api/trainings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(training),
    }).then((response) => {
      if (response.ok) {
        setMsg("New raining added!");
        setOpen(true);
        fetchCustomers();
      } else {
        alert("Something went wrong");
      }
    });
  };

  const addCustomer = (customer) => {
    fetch("https://customerrest.herokuapp.com/api/customers", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(customer),
    })
      .then((response) => {
        if (response.ok) {
          setMsg("Car added!");
          setOpen(true);
          fetchCustomers();
        } else {
          alert("Something went wrong");
        }
      })
      .catch((err) => console.error(err));
  };

  const editCustomer = (link, updatedCustomer) => {
    fetch(link.data.links[0].href, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedCustomer),
    })
      .then((response) => {
        if (response.ok) {
          setMsg("Customer information edited!");
          setOpen(true);
          fetchCustomers();
        } else {
          alert("Something went wrong");
        }
      })
      .catch((err) => console.error(err));
  };

  const columns = [
    { field: "firstname", width: 150, sortable: true, filter: true },
    { field: "lastname", width: 150, sortable: true, filter: true },
    { field: "email", width: 200, sortable: true, filter: true },
    { field: "phone", width: 150, sortable: true, filter: true },
    { field: "streetaddress", sortable: true, filter: true },
    { field: "postcode", width: 150, sortable: true, filter: true },
    { field: "city", width: 150, sortable: true, filter: true },
    {
      headerName: " ",
      sortable: false,
      filter: false,
      width: 120,
      field: "links[1].href",
      cellRendererFramework: (params) => (
        <EditCustomer editCustomer={editCustomer} params={params} />
      ),
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
          onClick={() => deleteCustomer(params.data.links[1].href)}
        >
          Delete
        </Button>
      ),
    },
    {
      headerName: "",
      width: 190,
      field: "links.0.href",
      cellRendererFramework: (params) => (
        <AddTraining addTrainings={addTrainings} params={params} />
      ),
    },
  ];

  return (
    <div>
      <AddCustomer addCustomer={addCustomer} />
      <div
        className="ag-theme-material"
        style={{ height: 600, width: "90%", margin: "auto" }}
      >
        <AgGridReact
          rowData={customers}
          columnDefs={columns}
          pagination={true}
          paginationPageSize={10}
          suppressCellSelection={true}
        />
      </div>
      <Snackbar
        open={open}
        message={msg}
        autoHideDuration={3000}
        onClose={handleClose}
      />
    </div>
  );
}

export default Customerlist;
