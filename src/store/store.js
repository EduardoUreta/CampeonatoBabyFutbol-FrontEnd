import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { equipoSlice } from "./equipo/equipoSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    equipo: equipoSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});
