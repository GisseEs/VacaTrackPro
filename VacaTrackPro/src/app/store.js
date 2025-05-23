import { configureStore } from "@reduxjs/toolkit";
import transaccionesReducer from "../features/transacciones/transaccionesSlice";
import userReducer from "../features/user/userSlice";
import empleadosVacacionesReducer from '../features/empleadosVacaciones/empleadosVacacionesSlice'; // Importa el nuevo reducer
import { persistReducer, persistStore } from "redux-persist";
import storageSession from 'redux-persist/lib/storage/session';

const persistConfig = {
  key: 'user',
  storage: storageSession, // uses sessionStorage
  whitelist: ['user', 'token', 'isAuthenticated'] // only persist these
};

const persistReducerUser = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    transacciones: transaccionesReducer,
    user: persistReducerUser,
    empleadosVacaciones: empleadosVacacionesReducer, // Agrega el nuevo reducer al store
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
        ignoredPaths: ["register"],
      },
    }),
});

export const persistor = persistStore(store);