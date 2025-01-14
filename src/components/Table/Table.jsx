import { DataGrid } from "@mui/x-data-grid";
import React, { useState, useMemo } from "react";
import {
  IconButton,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TextField,
  Modal,
  Box,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useFormik } from "formik";
import * as Yup from "yup";

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
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteRowId, setDeleteRowId] = useState(null);

  const projectTypes = useMemo(() => ["AI", "WEB", "MOBILE", "GIS"], []);
  const departments = useMemo(() => ["CS", "MMT", "GIS"], []);

  const columns = useMemo(
    () => [
      { field: "id", headerName: "ID", width: 70 },
      { field: "projectName", headerName: "Project Name", width: 200 },
      { field: "teamSize", headerName: "Team Size", width: 130 },
      { field: "projectType", headerName: "Project Type", width: 130 },
      { field: "department", headerName: "Department", width: 150 },
      { field: "year", headerName: "Year", width: 100 },
      {
        field: "action",
        headerName: "Action",
        width: 150,
        renderCell: (params) => (
          <div>
            <IconButton
              color="primary"
              onClick={() => handleEditRow(params.id)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => handleOpenDeleteModal(params.id)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        ),
      },
    ],
    [rows]
  );

  const handleOpenDeleteModal = (id) => {
    setDeleteRowId(id);
    setShowDeleteModal(true);
  };

  const handleDeleteRow = () => {
    setRows(rows.filter((row) => row.id !== deleteRowId));
    setShowDeleteModal(false);
  };

  const handleEditRow = (id) => {
    const rowToEdit = rows.find((row) => row.id === id);
    setEditingRow(rowToEdit);
    setShowEditModal(true);
  };

  const handleEditingRowChange = (e) => {
    const { name, value } = e.target;
    setEditingRow((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateRow = () => {
    setRows(rows.map((row) => (row.id === editingRow.id ? editingRow : row)));
    setShowEditModal(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[5, 10, 15]}
          checkboxSelection
          onPageSizeChange={(newSize) => setPageSize(newSize)}
        />
      </div>

      {/* Edit Modal */}
      <Modal open={showEditModal} onClose={() => setShowEditModal(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6">Edit Row</Typography>
          <TextField
            label="Project Name"
            name="projectName"
            value={editingRow?.projectName || ""}
            onChange={handleEditingRowChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Team Size"
            name="teamSize"
            type="number"
            value={editingRow?.teamSize || ""}
            onChange={handleEditingRowChange}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Project Type</InputLabel>
            <Select
              name="projectType"
              value={editingRow?.projectType || ""}
              onChange={handleEditingRowChange}
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
              value={editingRow?.department || ""}
              onChange={handleEditingRowChange}
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
            value={editingRow?.year || ""}
            onChange={handleEditingRowChange}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateRow}
            style={{ marginTop: "10px" }}
          >
            Save Changes
          </Button>
        </Box>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6">Confirm Delete</Typography>
          <Typography>Are you sure you want to delete this row?</Typography>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteRow}
            style={{ marginTop: "10px" }}
          >
            Delete
          </Button>
          <Button
            variant="outlined"
            onClick={() => setShowDeleteModal(false)}
            style={{ marginLeft: "10px", marginTop: "10px" }}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default Table;
