import { DataGrid } from "@mui/x-data-grid";
import React, { useState, useMemo } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./table.css";

const Table = () => {
  const initialRows = [
    {
      id: 1,
      projectName: "AI for Healthcare",
      teamSize: 4,
      projectType: "AI",
      department: "CS",
      year: "2023/2024",
      pdf: "",
    },
    {
      id: 2,
      projectName: "Web Portal for Students",
      teamSize: 4,
      projectType: "WEB",
      department: "CS",
      year: "2022/2023",
      pdf: "",
    },
    {
      id: 3,
      projectName: "Geospatial Data Analysis",
      teamSize: 3,
      projectType: "GIS",
      department: "GIS",
      year: "2021/2022",
      pdf: "",
    },
    {
      id: 4,
      projectName: "Mobile App for Events",
      teamSize: 4,
      projectType: "MOBILE",
      department: "MMT",
      year: "2020/2021",
      pdf: "",
    },
    {
      id: 5,
      projectName: "AI Chatbot for Support",
      teamSize: 4,
      projectType: "AI",
      department: "CS",
      year: "2024/2025",
      pdf: "",
    },
  ];

  const [rows, setRows] = useState(initialRows);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [deletingRowId, setDeletingRowId] = useState(null);

  const validationSchema = Yup.object({
    projectName: Yup.string().required("Project name is required"),
    teamSize: Yup.number().min(3).max(4).required("Team size is required"),
    year: Yup.string()
      .matches(/^(20\d{2}\/20\d{2})$/, "Year must be in format YYYY/YYYY")
      .test(
        "valid-range",
        "Year must be between 2008/2009 and 2024/2025",
        (value) => {
          const [start, end] = value.split("/").map(Number);
          return start >= 2008 && end <= 2025 && end === start + 1;
        }
      )
      .required("Year is required"),
    pdf: Yup.mixed()
      .test("fileType", "Only PDF files are allowed", (value) => {
        return value ? value.type === "application/pdf" : true;
      })
      .nullable(),
  });

  const handleEditRow = (row) => {
    setEditingRow(row);
    setShowEditModal(true);
  };

  const handleDeleteRow = (id) => {
    setDeletingRowId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== deletingRowId));
    setShowDeleteModal(false);
  };

  const handleAddProject = () => {
    setShowAddModal(true);
  };

  const formikEdit = useFormik({
    initialValues: {
      projectName: editingRow?.projectName || "",
      teamSize: editingRow?.teamSize || "",
      year: editingRow?.year || "",
      pdf: editingRow?.pdf || "",
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      setRows((prevRows) =>
        prevRows.map((row) =>
          row.id === editingRow.id ? { ...row, ...values } : row
        )
      );
      setShowEditModal(false);
    },
  });

  const formikAdd = useFormik({
    initialValues: {
      projectName: "",
      teamSize: "",
      year: "",
      pdf: null,
    },
    validationSchema,
    onSubmit: (values) => {
      const newRow = {
        id: rows.length + 1,
        ...values,
        projectType: "NEW",
        department: "NEW",
      };
      setRows((prevRows) => [...prevRows, newRow]);
      setShowAddModal(false);
    },
  });

  const columns = useMemo(
    () => [
      { field: "id", headerName: "ID", width: 70 },
      { field: "projectName", headerName: "Project Name", width: 200 },
      { field: "teamSize", headerName: "Team Size", width: 130 },
      { field: "projectType", headerName: "Project Type", width: 130 },
      { field: "department", headerName: "Department", width: 150 },
      { field: "year", headerName: "Year", width: 130 },
      {
        field: "pdf",
        headerName: "PDF",
        width: 130,
        renderCell: (params) =>
          params.value ? (
            <a href={params.value} target="_blank" rel="noopener noreferrer">
              View PDF
            </a>
          ) : (
            "No File"
          ),
      },
      {
        field: "action",
        headerName: "Action",
        width: 150,
        renderCell: (params) => (
          <div>
            <IconButton
              color="primary"
              onClick={() => handleEditRow(params.row)}
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

  return (
    <div style={{ padding: "20px" }}>
      {/* Add Project Button */}
      <Button
        className="add-button"
        onClick={handleAddProject}
        variant="contained"
        color="primary"
      >
        Add Project
      </Button>

      {/* DataGrid */}
      <div
        style={{ height: 400, width: "100%" }}
        className="data-grid-container"
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 15]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </div>

      {/* Edit Modal */}
      <Modal open={showEditModal} onClose={() => setShowEditModal(false)}>
        <Box className="modal-box">
          <Typography className="modal-header">Edit Row</Typography>
          <form onSubmit={formikEdit.handleSubmit}>
            <TextField
              label={
                <span>
                  Project Name <span style={{ color: "red" }}>*</span>
                </span>
              }
              name="projectName"
              value={formikEdit.values.projectName}
              onChange={formikEdit.handleChange}
              onBlur={formikEdit.handleBlur}
              fullWidth
              margin="normal"
              error={
                formikEdit.touched.projectName &&
                Boolean(formikEdit.errors.projectName)
              }
              helperText={
                formikEdit.touched.projectName && formikEdit.errors.projectName
              }
            />
            <TextField
              label={
                <span>
                  Team Size <span style={{ color: "red" }}>*</span>
                </span>
              }
              name="teamSize"
              type="number"
              value={formikEdit.values.teamSize}
              onChange={formikEdit.handleChange}
              onBlur={formikEdit.handleBlur}
              fullWidth
              margin="normal"
              error={
                formikEdit.touched.teamSize &&
                Boolean(formikEdit.errors.teamSize)
              }
              helperText={
                formikEdit.touched.teamSize && formikEdit.errors.teamSize
              }
            />
            <TextField
              label={
                <span>
                  Year <span style={{ color: "red" }}>*</span>
                </span>
              }
              name="year"
              value={formikEdit.values.year}
              onChange={formikEdit.handleChange}
              onBlur={formikEdit.handleBlur}
              fullWidth
              margin="normal"
              error={formikEdit.touched.year && Boolean(formikEdit.errors.year)}
              helperText={formikEdit.touched.year && formikEdit.errors.year}
            />
            <TextField
              label="Upload PDF"
              name="pdf"
              type="file"
              fullWidth
              margin="normal"
              onChange={(event) =>
                formikEdit.setFieldValue("pdf", event.target.files[0])
              }
              InputLabelProps={{ shrink: true }}
            />
            {formikEdit.errors.pdf && (
              <Typography color="error">{formikEdit.errors.pdf}</Typography>
            )}
            <div style={{ marginTop: "10px" }}>
              <Button className="modal-button save-button" type="submit">
                Save Changes
              </Button>
              <Button
                className="modal-button cancel-button"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Box>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <Box className="modal-box">
          <Typography className="modal-header">Confirm Delete</Typography>
          <Typography>Are you sure you want to delete this row?</Typography>
          <div style={{ marginTop: "10px" }}>
            <Button
              className="modal-button delete-button"
              onClick={handleConfirmDelete}
            >
              Confirm
            </Button>
            <Button
              className="modal-button cancel-button"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>

      {/* Add Project Modal */}
      <Modal open={showAddModal} onClose={() => setShowAddModal(false)}>
        <Box className="modal-box">
          <Typography className="modal-header">Add New Project</Typography>
          <form onSubmit={formikAdd.handleSubmit}>
            <TextField
              label={
                <span>
                  Project Name <span style={{ color: "red" }}>*</span>
                </span>
              }
              name="projectName"
              value={formikAdd.values.projectName}
              onChange={formikAdd.handleChange}
              onBlur={formikAdd.handleBlur}
              fullWidth
              margin="normal"
              error={
                formikAdd.touched.projectName &&
                Boolean(formikAdd.errors.projectName)
              }
              helperText={
                formikAdd.touched.projectName && formikAdd.errors.projectName
              }
            />
            <TextField
              label={
                <span>
                  Team Size <span style={{ color: "red" }}>*</span>
                </span>
              }
              name="teamSize"
              type="number"
              value={formikAdd.values.teamSize}
              onChange={formikAdd.handleChange}
              onBlur={formikAdd.handleBlur}
              fullWidth
              margin="normal"
              error={
                formikAdd.touched.teamSize && Boolean(formikAdd.errors.teamSize)
              }
              helperText={
                formikAdd.touched.teamSize && formikAdd.errors.teamSize
              }
            />
            <TextField
              label={
                <span>
                  Year <span style={{ color: "red" }}>*</span>
                </span>
              }
              name="year"
              value={formikAdd.values.year}
              onChange={formikAdd.handleChange}
              onBlur={formikAdd.handleBlur}
              fullWidth
              margin="normal"
              error={formikAdd.touched.year && Boolean(formikAdd.errors.year)}
              helperText={formikAdd.touched.year && formikAdd.errors.year}
            />
            <TextField
              label="Upload PDF"
              name="pdf"
              type="file"
              fullWidth
              margin="normal"
              onChange={(event) =>
                formikAdd.setFieldValue("pdf", event.target.files[0])
              }
              InputLabelProps={{ shrink: true }}
            />
            {formikAdd.errors.pdf && (
              <Typography color="error">{formikAdd.errors.pdf}</Typography>
            )}
            <div style={{ marginTop: "10px" }}>
              <Button className="modal-button save-button" type="submit">
                Add Project
              </Button>
              <Button
                className="modal-button cancel-button"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default Table;
