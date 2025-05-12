import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transacciones: [],
  isLoading: false,
  error: null,
};

export const transaccionesSlice = createSlice({
  name: "transacciones",
  initialState,
  reducers: {
    // Acción para iniciar la carga de transacciones
    fetchTransaccionesStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    // Acción para manejar el éxito de la carga de transacciones
    fetchTransaccionesSuccess: (state, action) => {
      state.isLoading = false;
      state.transacciones = action.payload;
    },
    // Acción para manejar el error en la carga de transacciones
    fetchTransaccionesFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // Acción para agregar una nueva transacción
    agregarTransaccion: (state, action) => {
      state.transacciones.push(action.payload);
    },
    // Acción para eliminar una transacción por su ID
    eliminarTransaccion: (state, action) => {
      state.transacciones = state.transacciones.filter(
        (transaccion) => transaccion.id !== action.payload
      );
    },
    // Acción para actualizar una transacción existente
    actualizarTransaccion: (state, action) => {
      const index = state.transacciones.findIndex(
        (transaccion) => transaccion.id === action.payload.id
      );
      if (index !== -1) {
        state.transacciones[index] = action.payload;
      }
    },
    // Puedes agregar más reducers según las necesidades de tu aplicación
  },
});

// Exporta las acciones
export const {
  fetchTransaccionesStart,
  fetchTransaccionesSuccess,
  fetchTransaccionesFailure,
  agregarTransaccion,
  eliminarTransaccion,
  actualizarTransaccion,
} = transaccionesSlice.actions;

// Exporta el reducer
export default transaccionesSlice.reducer;