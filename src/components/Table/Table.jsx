import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import IconButton from "@mui/material/IconButton"; // Import IconButton
import DeleteIcon from "@mui/icons-material/Delete"; // Import Delete icon
import EditIcon from "@mui/icons-material/Edit"; // Import Edit icon

const Table = () => {
  const initialRows = [
    {
      id: 1,
      projectName: "AI for Healthcare",
      teamSize: 4,
      projectType: "AI",
      department: "CS",
      year: 2023,
    },
    {
      id: 2,
      projectName: "Web Portal for Students",
      teamSize: 5,
      projectType: "WEB",
      department: "CS",
      year: 2024,
    },
    {
      id: 3,
      projectName: "Geospatial Data Analysis",
      teamSize: 3,
      projectType: "GIS",
      department: "GIS",
      year: 2022,
    },
    {
      id: 4,
      projectName: "Mobile App for Events",
      teamSize: 6,
      projectType: "MOBILE",
      department: "MMT",
      year: 2021,
    },
    {
      id: 5,
      projectName: "AI Chatbot for Support",
      teamSize: 4,
      projectType: "AI",
      department: "CS",
      year: 2020,
    },
  ];

  const [rows, setRows] = useState(initialRows);
  const [pageSize, setPageSize] = useState(5); // Set the default page size to 5
  const [editingRow, setEditingRow] = useState(null); // Track the row being edited

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "projectName",
      headerName: "Project Name",
      width: 200,
      editable: editingRow ? editingRow.id === "projectName" : false, // Only editable when in edit mode
    },
    { field: "teamSize", headerName: "Team Size", width: 130 },
    {
      field: "projectType",
      headerName: "Project Type",
      width: 130,
    },
    {
      field: "department",
      headerName: "Department",
      width: 150,
    },
    { field: "year", headerName: "Year", width: 100 },
    {
      field: "action", // Action column to hold the delete and edit icons
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <div>
          <IconButton
            color="primary"
            onClick={() => handleEditRow(params.id)} // Call edit on button click
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDeleteRow(params.id)} // Call delete on button click
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  // Handle deleting a row when the delete icon is clicked
  const handleDeleteRow = (id) => {
    // Display confirmation dialog before deletion
    const confirmation = window.confirm(
      "Are you sure you want to delete this row?"
    );

    if (confirmation) {
      // Filter out the row with the given id
      const newRows = rows.filter((row) => row.id !== id);
      setRows(newRows); // Update the rows state without the deleted row
    }
  };

  // Handle editing a row when the edit icon is clicked
  const handleEditRow = (id) => {
    const rowToEdit = rows.find((row) => row.id === id);
    const confirmation = window.confirm(
      "Are you sure you want to edit this row?"
    );

    if (confirmation) {
      // Start editing mode for the selected row
      setEditingRow(rowToEdit);
    }
  };

  // Handle updating the row after editing
  const handleUpdateRow = () => {
    const updatedRows = rows.map((row) =>
      row.id === editingRow.id ? { ...row, ...editingRow } : row
    );
    setRows(updatedRows); // Update the rows state with the edited row
    setEditingRow(null); // Exit the edit mode
  };

  // Handle input change for the editing row
  const handleInputChange = (field, value) => {
    setEditingRow((prevRow) => ({
      ...prevRow,
      [field]: value,
    }));
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={pageSize} // Control the page size
          rowsPerPageOptions={[5, 10, 15]} // Rows per page options
          checkboxSelection
          sx={{ border: 0 }}
          onPageSizeChange={(newSize) => setPageSize(newSize)} // Handle page size change
        />
      </div>

      {editingRow && (
        <div>
          <h3>Edit Row</h3>
          <div>
            <input
              type="text"
              value={editingRow.projectName}
              onChange={(e) => handleInputChange("projectName", e.target.value)}
              placeholder="Project Name"
            />
            <input
              type="number"
              value={editingRow.teamSize}
              onChange={(e) => handleInputChange("teamSize", e.target.value)}
              placeholder="Team Size"
            />
            <input
              type="text"
              value={editingRow.projectType}
              onChange={(e) => handleInputChange("projectType", e.target.value)}
              placeholder="Project Type"
            />
            <input
              type="text"
              value={editingRow.department}
              onChange={(e) => handleInputChange("department", e.target.value)}
              placeholder="Department"
            />
            <input
              type="number"
              value={editingRow.year}
              onChange={(e) => handleInputChange("year", e.target.value)}
              placeholder="Year"
            />
            <button onClick={handleUpdateRow}>Confirm Update</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
