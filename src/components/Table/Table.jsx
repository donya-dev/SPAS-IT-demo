import { DataGrid } from "@mui/x-data-grid";
import React, { useState, useMemo } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
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
  const [showAddRowForm, setShowAddRowForm] = useState(false);

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
              onClick={() => handleDeleteRow(params.id)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        ),
      },
    ],
    []
  );

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

  const formik = useFormik({
    initialValues: {
      projectName: "",
      teamSize: "",
      projectType: "",
      department: "",
      year: "",
    },
    validationSchema: Yup.object({
      projectName: Yup.string().required("Project name is required"),
      teamSize: Yup.number()
        .required("Team size is required")
        .positive()
        .integer(),
      projectType: Yup.string().required("Project type is required"),
      department: Yup.string().required("Department is required"),
      year: Yup.number()
        .required("Year is required")
        .min(2020, "Year must be 2020 or later")
        .max(2025, "Year can't be later than 2025"),
    }),
    onSubmit: (values) => {
      const confirmation = window.confirm(
        "Are you sure you want to add this row?"
      );
      if (confirmation) {
        const newRowWithId = { id: rows.length + 1, ...values };
        setRows([...rows, newRowWithId]);
        formik.resetForm();
        setShowAddRowForm(false);
      }
    },
  });

  return (
    <div style={{ padding: "20px" }}>
      {!showAddRowForm && (
        <Button
          variant="contained"
          onClick={() => setShowAddRowForm(true)}
          color="primary"
        >
          Add Project
        </Button>
      )}

      {showAddRowForm && (
        <div>
          <h3>Add New Row</h3>
          {formik.errors.projectName ||
          formik.errors.year ||
          formik.errors.teamSize ? (
            <Alert severity="error">
              {Object.values(formik.errors).join(", ")}
            </Alert>
          ) : null}
          <form onSubmit={formik.handleSubmit}>
            <TextField
              label="Project Name"
              name="projectName"
              value={formik.values.projectName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              margin="normal"
              error={
                formik.touched.projectName && Boolean(formik.errors.projectName)
              }
              helperText={
                formik.touched.projectName && formik.errors.projectName
              }
            />
            <TextField
              label="Team Size"
              name="teamSize"
              type="number"
              value={formik.values.teamSize}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              margin="normal"
              error={formik.touched.teamSize && Boolean(formik.errors.teamSize)}
              helperText={formik.touched.teamSize && formik.errors.teamSize}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Project Type</InputLabel>
              <Select
                name="projectType"
                value={formik.values.projectType}
                onChange={formik.handleChange}
                label="Project Type"
                onBlur={formik.handleBlur}
                error={
                  formik.touched.projectType &&
                  Boolean(formik.errors.projectType)
                }
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
                value={formik.values.department}
                onChange={formik.handleChange}
                label="Department"
                onBlur={formik.handleBlur}
                error={
                  formik.touched.department && Boolean(formik.errors.department)
                }
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
              value={formik.values.year}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              margin="normal"
              error={formik.touched.year && Boolean(formik.errors.year)}
              helperText={formik.touched.year && formik.errors.year}
            />
            <div style={{ marginTop: "10px" }}>
              <Button variant="contained" color="secondary" type="submit">
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
          </form>
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
