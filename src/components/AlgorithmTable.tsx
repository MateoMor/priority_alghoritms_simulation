import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import type {
  GridColDef,
  GridRowsProp,
} from "@mui/x-data-grid";
import { Paper, Button, Box, Typography, ThemeProvider } from "@mui/material";
import { Add, PlayArrow, Clear } from "@mui/icons-material";
import theme from "../styles/materialStyles";

interface ProcessData {
  id: number;
  proceso: string;
  tiempoEjecucion: number;
  prioridad: number;
  tiempoLlegada: number;
}

const AlgorithmTable: React.FC = () => {
  
  const [rows, setRows] = useState<GridRowsProp<ProcessData>>([
    {
      id: 1,
      proceso: "P1",
      tiempoEjecucion: 5,
      prioridad: 3,
      tiempoLlegada: 0,
    },
    {
      id: 2,
      proceso: "P2",
      tiempoEjecucion: 3,
      prioridad: 1,
      tiempoLlegada: 1,
    },
    {
      id: 3,
      proceso: "P3",
      tiempoEjecucion: 8,
      prioridad: 2,
      tiempoLlegada: 2,
    },
  ]);


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

  // Función para agregar una nueva fila
  const handleAddRow = () => {
    console.log(rows.length);
    if (rows.length != 0) {
      const newId = Math.max(...rows.map((row) => row.id)) + 1;
      const newRow: ProcessData = {
        id: newId,
        proceso: `P${newId}`,
        tiempoEjecucion: 0,
        prioridad: 1,
        tiempoLlegada: 0,
      };
      setRows([...rows, newRow]);
    } else {
      const newRow: ProcessData = {
        id: 1,
        proceso: `P1`,
        tiempoEjecucion: 0,
        prioridad: 1,
        tiempoLlegada: 0,
      };
      setRows([newRow]);
    }
  };

  // Función para limpiar todos los datos
  const handleClearAll = () => {
    setRows([]);
  };

  // Función para ejecutar el algoritmo
  const handleExecuteAlgorithm = () => {
    console.log("Datos de los procesos:", rows);
    // Aquí puedes implementar la lógica del algoritmo de prioridad
    alert("Ejecutando algoritmo de prioridad con los datos ingresados!");
  };

  // Función para manejar la actualización de celdas
  const handleProcessRowUpdate = (newRow: ProcessData) => {
    setRows(rows.map((row) => (row.id === newRow.id ? newRow : row)));
    return newRow;
  };

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
            onClick={handleAddRow}
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
            onClick={handleClearAll} 
            color="warning"
          >
            Limpiar Todo
          </Button>

          <Button
            variant="contained"
            startIcon={<PlayArrow />}
            onClick={handleExecuteAlgorithm}
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
            processRowUpdate={handleProcessRowUpdate}
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
