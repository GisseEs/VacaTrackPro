import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  lista: [],
  loading: false,
  error: null,
};

// Acción asíncrona para obtener la lista de empleados con vacaciones
export const fetchEmpleadosVacaciones = createAsyncThunk(
  "empleadosVacaciones/fetch",
  async () => {
    const response = await fetch("http://localhost:3001/api/empleados-con-vacaciones");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }
);

// Nueva acción asíncrona para obtener empleados por departamento
export const fetchEmpleadosVacacionesPorDepartamento = createAsyncThunk(
  "empleadosVacaciones/fetchPorDepartamento",
  async (departamentoId) => {
    const response = await fetch(`http://localhost:3001/api/empleados-con-vacaciones/departamento/${departamentoId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }
);

// Nueva acción asíncrona para obtener por empleado
export const fetchEmpleadoVacaciones = createAsyncThunk(
  "empleadosVacaciones/fetchPorEmpleado",
  async (empleadoId) => {
    const response = await fetch(`http://localhost:3001/api/empleados-con-vacaciones/empleado/${empleadoId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }
);

export const empleadosVacacionesSlice = createSlice({
  name: "empleadosVacaciones",
  initialState,
  reducers: {
    // Aquí puedes agregar reducers síncronos si necesitas manipular el estado directamente
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmpleadosVacaciones.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmpleadosVacaciones.fulfilled, (state, action) => {
        state.loading = false;
        state.lista = action.payload;
      })
      .addCase(fetchEmpleadosVacaciones.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchEmpleadosVacacionesPorDepartamento.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmpleadosVacacionesPorDepartamento.fulfilled, (state, action) => {
        state.loading = false;
        state.lista = action.payload;  
      })
      .addCase(fetchEmpleadosVacacionesPorDepartamento.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      }) 
      .addCase(fetchEmpleadoVacaciones.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmpleadoVacaciones.fulfilled, (state, action) => {
        state.loading = false;
        state.lista = action.payload;  
      })
      .addCase(fetchEmpleadoVacaciones.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});


export default empleadosVacacionesSlice.reducer;