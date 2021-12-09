import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';


function Customerlist() {
    const [customers, setCustomers] = useState([]);
    useEffect(() => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content))
            .catch(err => console.error(err))
    }, [])

    const columns = [
        { field: 'firstname', width: 150, sortable: true, filter: true },
        { field: 'lastname', width: 150, sortable: true, filter: true },
        { field: 'email', width: 200, sortable: true, filter: true },
        { field: 'phone', width: 150, sortable: true, filter: true },
        { field: 'streetaddress', sortable: true, filter: true },
        { field: 'postcode', width: 150, sortable: true, filter: true },
        { field: 'city', width: 150, sortable: true, filter: true },
    ]

    return (
        <div className="ag-theme-material" style={{ height: 600, width: '90%', margin: 'auto' }}>
            <AgGridReact
                rowData={customers}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={10}
            />

        </div>
    )
}

export default Customerlist;