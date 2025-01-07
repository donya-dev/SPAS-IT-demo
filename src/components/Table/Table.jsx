import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import IconButton from "@mui/material/IconButton"; // Import IconButton
import DeleteIcon from "@mui/icons-material/Delete"; // Import Delete icon
import EditIcon from "@mui/icons-material/Edit"; // Import Edit icon
import Button from "@mui/material/Button"; // Import Button for Add Row
import MenuItem from "@mui/material/MenuItem"; // For dropdown items
import Select from "@mui/material/Select"; // For dropdown select
import InputLabel from "@mui/material/InputLabel"; // For Input Label
import FormControl from "@mui/material/FormControl"; // For FormControl wrapper
import TextField from "@mui/material/TextField"; // For text fields

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
  const [pageSize, setPageSize] = useState(5);
  const [editingRow, setEditingRow] = useState(null);
  const [newRow, setNewRow] = useState({
    projectName: "",
    teamSize: "",
    projectType: "",
    department: "",
    year: "",
  });
  const [showAddRowForm, setShowAddRowForm] = useState(false);

  const projectTypes = ["AI", "WEB", "MOBILE", "GIS"];
  const departments = ["CS", "MMT", "GIS"];

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "projectName",
      headerName: "Project Name",
      width: 200,
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
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <div>
          <IconButton color="primary" onClick={() => handleEditRow(params.id)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => handleDeleteRow(params.id)}>
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const handleDeleteRow = (id) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this row?"
    );
    if (confirmation) {
      const newRows = rows.filter((row) => row.id !== id);
      setRows(newRows);
    }
  };

  const handleEditRow = (id) => {
    const rowToEdit = rows.find((row) => row.id === id);
    setEditingRow(rowToEdit);
  };

  const handleEditingRowChange = (e) => {
    const { name, value } = e.target;
    setEditingRow((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateRow = () => {
    const confirmation = window.confirm(
      "Are you sure you want to apply the changes?"
    );
    if (confirmation) {
      const updatedRows = rows.map((row) =>
        row.id === editingRow.id ? { ...editingRow } : row
      );
      setRows(updatedRows);
      setEditingRow(null);
    }
  };

  const handleAddRowButtonClick = () => {
    setShowAddRowForm(true);
  };

  const handleNewRowInputChange = (e) => {
    const { name, value } = e.target;
    setNewRow((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddRow = () => {
    if (
      !newRow.projectName ||
      !newRow.teamSize ||
      !newRow.projectType ||
      !newRow.department ||
      !newRow.year
    ) {
      alert("Please fill out all fields before adding the row.");
      return;
    }

    const confirmation = window.confirm(
      "Are you sure you want to add this row?"
    );
    if (confirmation) {
      const newRowWithId = { id: rows.length + 1, ...newRow };
      setRows([...rows, newRowWithId]);
      setNewRow({
        projectName: "",
        teamSize: "",
        projectType: "",
        department: "",
        year: "",
      });
      setShowAddRowForm(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {!showAddRowForm && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddRowButtonClick}
        >
          Add Row
        </Button>
      )}

      {showAddRowForm && (
        <div>
          <h3>Add New Row</h3>
          <TextField
            label="Project Name"
            name="projectName"
            value={newRow.projectName}
            onChange={handleNewRowInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Team Size"
            name="teamSize"
            type="number"
            value={newRow.teamSize}
            onChange={handleNewRowInputChange}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Project Type</InputLabel>
            <Select
              name="projectType"
              value={newRow.projectType}
              onChange={handleNewRowInputChange}
              label="Project Type"
            >
              {projectTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Department</InputLabel>
            <Select
              name="department"
              value={newRow.department}
              onChange={handleNewRowInputChange}
              label="Department"
            >
              {departments.map((dept) => (
                <MenuItem key={dept} value={dept}>
                  {dept}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Year"
            name="year"
            type="number"
            value={newRow.year}
            onChange={handleNewRowInputChange}
            fullWidth
            margin="normal"
          />
          <div style={{ marginTop: "10px" }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleAddRow}
            >
              Confirm Add
            </Button>
            <Button
              variant="outlined"
              color="default"
              onClick={() => setShowAddRowForm(false)}
              style={{ marginLeft: "10px" }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {editingRow && (
        <div style={{ marginTop: "20px" }}>
          <h3>Edit Row</h3>
          <TextField
            label="Project Name"
            name="projectName"
            value={editingRow.projectName}
            onChange={handleEditingRowChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Team Size"
            name="teamSize"
            type="number"
            value={editingRow.teamSize}
            onChange={handleEditingRowChange}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Project Type</InputLabel>
            <Select
              name="projectType"
              value={editingRow.projectType}
              onChange={handleEditingRowChange}
              label="Project Type"
            >
              {projectTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Department</InputLabel>
            <Select
              name="department"
              value={editingRow.department}
              onChange={handleEditingRowChange}
              label="Department"
            >
              {departments.map((dept) => (
                <MenuItem key={dept} value={dept}>
                  {dept}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Year"
            name="year"
            type="number"
            value={editingRow.year}
            onChange={handleEditingRowChange}
            fullWidth
            margin="normal"
          />
          <div style={{ marginTop: "10px" }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleUpdateRow}
            >
              Update Row
            </Button>
            <Button
              variant="outlined"
              color="default"
              onClick={() => setEditingRow(null)}
              style={{ marginLeft: "10px" }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[5, 10, 15]}
          checkboxSelection
          sx={{ border: 0 }}
          onPageSizeChange={(newSize) => setPageSize(newSize)}
        />
      </div>
    </div>
  );
};

export default Table;
