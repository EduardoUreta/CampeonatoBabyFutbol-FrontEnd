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
        state.equipoActivo = null;
      },
      onLoadOneTeam: (state, { payload }) => {
        state.cargandoEquipo = false,
        state.equipoActivo = payload
      },
      onUpdateTeam: (state, { payload }) => {
        state.equipoActivo = payload,
        state.cargandoEquipo = false
      },
      onDeleteTeam: (state) => {
        if(state.activeEvent) {
          state.equipos = state.equipos.filter( equipos => equipos.id !== state.equipoActivo.id );
          state.cargandoEquipo = true;
          state.equipoActivo = null;
        }
      },
      onSetActiveTeam: (state, { payload }) => {
        state.equipoActivo = payload
      }
    },
  });
  
  export const { onAddNewTeam, onLoadTeams, onLoadOneTeam, onUpdateTeam, onDeleteTeam, onSetActiveTeam } = equipoSlice.actions;
  