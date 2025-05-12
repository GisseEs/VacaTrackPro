import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    nombre: null,
    email: null,
    isAuthenticated: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.token = action.payload.token;
            state.nombre = action.payload.nombre;
            state.email = action.payload.email;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.token = null;
            state.nombre = null;
            state.email = null;
            state.isAuthenticated = false;
        },
        actualizarPerfil: (state, action) => {
            state.nombre = action.payload.nombre; 
        },
    },
});

export const { loginSuccess, logout, actualizarPerfil } = userSlice.actions;

export default userSlice.reducer;