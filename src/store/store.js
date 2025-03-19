import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { equipoSlice } from "./equipo/equipoSlice";
import { jugadorSlice } from "./jugador/jugadorSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    equipo: equipoSlice.reducer,
    jugador: jugadorSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});
