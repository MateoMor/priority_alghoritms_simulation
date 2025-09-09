import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { Paper, Button, Box, Typography, ThemeProvider } from "@mui/material";
import { Add, PlayArrow, Clear } from "@mui/icons-material";
import theme from "../styles/materialStyles";
import { useProcessStore } from "../store/processStore";

const AlgorithmTable: React.FC = () => {
  // Usar Zustand en lugar del estado local
  const { rows, addRow, clearAll, updateRow, executeAlgorithm } = useProcessStore();

  // Definir las columnas de la tabla
  const columns: GridColDef[] = [
    {
      field: "proceso",
      headerName: "Proceso",
      width: 120,
      editable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "tiempoEjecucion",
      headerName: "Raf",
      type: "number",
      width: 180,
      editable: true,
      headerAlign: "center",
      align: "center",
      valueFormatter: (value: number) => `${value} ms`,
    },
    {
      field: "prioridad",
      headerName: "Prioridad",
      type: "number",
      width: 120,
      editable: true,
      headerAlign: "center",
      align: "center",
      description: "Menor número = Mayor prioridad",
    },
    {
      field: "tiempoLlegada",
      headerName: "Tiempo de Llegada",
      type: "number",
      width: 160,
      editable: true,
      headerAlign: "center",
      align: "center",
      valueFormatter: (value: number) => `${value} ms`,
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={3} className="p-6 max-w-5xl mx-auto">
        <Typography
          variant="h4"
          component="h2"
          className="mb-6 text-center font-bold"
        >
          Planificador de Procesos por Prioridad
        </Typography>

        <Box className="mb-4 flex flex-wrap gap-3 justify-center">
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={addRow}
            sx={{
              backgroundColor: "#2563eb",
              "&:hover": { backgroundColor: "#1d4ed8" },
            }}
          >
            Agregar Proceso
          </Button>

          <Button 
            variant="outlined" 
            startIcon={<Clear />}
            onClick={clearAll} 
            color="warning"
          >
            Limpiar Todo
          </Button>

          <Button
            variant="contained"
            startIcon={<PlayArrow />}
            onClick={executeAlgorithm}
            disabled={rows.length === 0}
            sx={{
              backgroundColor: "#16a34a",
              "&:hover": { backgroundColor: "#15803d" },
            }}
          >
            Ejecutar Algoritmo
          </Button>
        </Box>

        <Box style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            disableRowSelectionOnClick
            processRowUpdate={updateRow}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10, 20]}
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "1px solid #f0f0f0",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#f8fafc",
                color: "#374151",
                fontSize: 16,
                fontWeight: "bold",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: "#ffffff",
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: "#f8fafc",
              },
            }}
          />
        </Box>

      </Paper>
    </ThemeProvider>
  );
};

export default AlgorithmTable;
