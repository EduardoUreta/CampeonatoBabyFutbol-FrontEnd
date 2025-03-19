import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    equipos: [],
    equipoActivo: null,
    cargandoEquipo: true,
  };
  
  export const equipoSlice = createSlice({
    name: 'equipo',
    initialState,
    reducers: {
      onAddNewTeam: (state, { payload }) => {
        state.equipos.push(payload); 
        state.equipoActivo = null;
        state.cargandoEquipo = false;
      },
      onLoadTeams: (state, { payload }) => {
        state.cargandoEquipo = false;
        state.equipos = payload;
      },
    },
  });
  
  export const { onAddNewTeam, onLoadTeams } = equipoSlice.actions;
  