import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const Table = () => {
  const rows = [
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

  const columns = [
    { field: "id", headerName: "ID", width: 70, editable: true },
    {
      field: "projectName",
      headerName: "Project Name",
      width: 200,
      editable: true,
    },
    { field: "teamSize", headerName: "Team Size", width: 130, editable: true },
    {
      field: "projectType",
      headerName: "Project Type",
      width: 130,
      editable: true,
    },
    {
      field: "department",
      headerName: "Department",
      width: 150,
      editable: true,
    },
    { field: "year", headerName: "Year", width: 100, editable: true },
  ];

  // Function to handle row edit
  const handleRowEdit = (newRow) => {
    const updatedRows = rows.map((row) =>
      row.id === newRow.id ? { ...row, ...newRow } : row
    );
    return updatedRows;
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: { page: 0, pageSize: 5 },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
          processRowUpdate={handleRowEdit} // Attach your row edit handler
        />
      </div>
    </div>
  );
};

export default Table;
