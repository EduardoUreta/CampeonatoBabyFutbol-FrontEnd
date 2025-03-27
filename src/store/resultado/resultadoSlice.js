import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    resultados: [],
    resultadoActivo: null,
    cargandoResultado: true,
  };
  
  export const resultadoSlice = createSlice({
    name: 'resultado',
    initialState,
    reducers: {
      onAddNewResult: (state, { payload }) => {
        state.resultados.push(payload); 
        state.resultadoActivo = null;
        state.cargandoResultado = false;
      },
      onLoadResults: (state, { payload }) => {
        state.cargandoResultado = false;
        state.resultados = payload;
        state.resultadoActivo = null;
      },
      onLoadOneResult: (state, { payload }) => {
        state.cargandoResultado = false,
        state.resultadoActivo = payload
      },
      onUpdateResult: (state, { payload }) => {
        state.resultadoActivo = payload,
        state.cargandoResultado = false
      },
      onDeleteResult: (state) => {
        if(state.activeEvent) {
          state.resultados = state.resultados.filter( resultados => resultados.id !== state.resultadoActivo.id );
          state.cargandoResultado = true;
          state.resultadoActivo = null;
        }
      },
      onSetActiveResult: (state, { payload }) => {
        state.resultadoActivo = payload
      }
    },
  });
  
  export const { onAddNewResult, onLoadResults, onLoadOneResult, onUpdateResult, onDeleteResult, onSetActiveResult } = resultadoSlice.actions;
  