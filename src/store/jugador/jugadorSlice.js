import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    jugadores: [],
    jugadorActivo: null,
    cargandoJugador: true,
  };
  
  export const jugadorSlice = createSlice({
    name: 'jugador',
    initialState,
    reducers: {
      onAddNewPlayer: (state, { payload }) => {
        state.jugadores.push(payload); 
        state.jugadorActivo = null;
        state.cargandoJugador = false;
      },
      onLoadPlayers: (state, { payload }) => {
        state.cargandoJugador = false;
        state.jugadores = payload;
        state.jugadorActivo = null;
      },
      onLoadOnePlayer: (state, { payload }) => {
        state.cargandoJugador = false,
        state.jugadorActivo = payload
      },
      onUpdatePlayer: (state, { payload }) => {
        state.jugadorActivo = payload,
        state.cargandoJugador = false
      },
      onDeletePlayer: (state) => {
        if(state.activeEvent) {
          state.jugadores = state.jugadores.filter( jugadores => jugadores.id !== state.jugadorActivo.id );
          state.cargandoJugador = true;
          state.jugadorActivo = null;
        }
      },
      onSetActivePlayer: (state, { payload }) => {
        state.jugadorActivo = payload
      }
    },
  });
  
  export const { onAddNewPlayer, onLoadPlayers, onLoadOnePlayer, onUpdatePlayer, onDeletePlayer, onSetActivePlayer } = jugadorSlice.actions;
  