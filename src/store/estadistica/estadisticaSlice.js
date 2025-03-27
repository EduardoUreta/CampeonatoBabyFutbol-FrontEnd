import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    estadisticas: [],
    estadisticaActivo: null,
    cargandoEstadistica: true,
  };
  
export const estadisticaSlice = createSlice({
  name: 'estadistica',
  initialState,
  reducers: {
    onAddNewStat: (state, { payload }) => {
      state.estadisticas.push(payload); 
      state.estadisticaActivo = null;
      state.cargandoEstadistica = false;
    },
    onLoadStats: (state, { payload }) => {
      state.cargandoEstadistica = false;
      state.estadisticas = payload;
      state.estadisticaActivo = null;
    },
    onLoadOneStat: (state, { payload }) => {
      state.cargandoEstadistica = false,
      state.estadisticaActivo = payload
    },
    onUpdateStat: (state, { payload }) => {
      state.estadisticaActivo = payload,
      state.cargandoEstadistica = false
    },
    onDeleteStat: (state) => {
      if(state.activeEvent) {
        state.estadisticas = state.estadisticas.filter( estadisticas => estadisticas.id !== state.estadisticaActivo.id );
        state.cargandoEstadistica = true;
        state.estadisticaActivo = null;
      }
    },
    onSetActiveStat: (state, { payload }) => {
      state.estadisticaActivo = payload
    }
  },
});

export const { onAddNewStat, onLoadStats, onLoadOneStat, onUpdateStat, onDeleteStat, onSetActiveStat } = estadisticaSlice.actions;
