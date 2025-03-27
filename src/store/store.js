import { configureStore } from "@reduxjs/toolkit";
import { estadisticaSlice } from "./estadistica/estadisticaSlice";
import { authSlice, equipoSlice, jugadorSlice, resultadoSlice} from "./index"

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    equipo: equipoSlice.reducer,
    jugador: jugadorSlice.reducer,
    resultado: resultadoSlice.reducer,
    estadistica: estadisticaSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});
