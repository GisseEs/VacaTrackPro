import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  nombre: null,
  email: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  empleado: null,
};

export const fetchEmpleadoData = createAsyncThunk(
  "user/fetchEmpleadoData",
  async (empleadoId, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3001/api/empleados-con-vacaciones/empleado/${empleadoId}`);
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Error al obtener información del empleado");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Error de conexión al obtener información del empleado");
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.nombre = action.payload.nombre;
      state.email = action.payload.email;
      state.isAuthenticated = true;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.token = null;
      state.nombre = null;
      state.email = null;
      state.isAuthenticated = false;
      state.empleado = null;
    },
    logout: (state) => {
      state.token = null;
      state.nombre = null;
      state.email = null;
      state.isAuthenticated = false;
      state.error = null;
      state.loading = false;
      state.empleado = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setEmpleadoData: (state, action) => {
      state.empleado = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmpleadoData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmpleadoData.fulfilled, (state, action) => {
        state.loading = false;
        state.empleado = action.payload;
      })
      .addCase(fetchEmpleadoData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.empleado = null;
      });
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, clearError, setEmpleadoData } = userSlice.actions;

export default userSlice.reducer;