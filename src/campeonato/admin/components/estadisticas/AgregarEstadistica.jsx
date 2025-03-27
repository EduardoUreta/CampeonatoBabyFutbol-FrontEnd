import { useNavigate, useParams } from "react-router-dom";
import { useResultadoStore, useForm, useEquipoStore, useJugadorStore } from "../../../../hooks";
import '../../pages/ContenidoPages.css';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const estadisticaInitialValue = {
  equipo_id: '',
  partido_id: '',
  jugador_id: '',
  goles: 0,
  tarjetas_amarillas: 0,
  tarjetas_rojas: 0
};

export const AgregarEstadistica = () => {

  const { id } = useParams();
  const { equipo_id, partido_id, jugador_id, goles, tarjetas_amarillas, tarjetas_rojas, onInputChange } = useForm(estadisticaInitialValue);

  const { startAddNewResult, startLoadResults, startLoadOneResult, startSetActiveTeams, startSetActiveResult } = useResultadoStore();
  const { startLoadTeams } = useEquipoStore();
  const { startLoadPlayers } = useJugadorStore();

  const { equipos, equipoActivo } = useSelector(state => state.equipo);
  const { resultados, resultadoActivo } = useSelector(state => state.resultado);
  const { jugadores } = useSelector(state => state.jugador);

  const navigate = useNavigate();

  const onNavigateBack = () => {
    navigate('/admin/resultados/listar');
  };

  const onForm = (e) => {
    e.preventDefault();
    startAddNewResult({equipo_id, partido_id: id, jugador_id, goles, tarjetas_amarillas, tarjetas_rojas });
    navigate('/admin/resultados/listar');
  };

  useEffect(() => {
    if(resultados.length == 0 && equipos.length == 0){
      startLoadResults();
      startLoadTeams();
    }
    startLoadPlayers();
  }, []);

  useEffect(() => {
    if(!resultadoActivo){
      const buscarResultado = startLoadOneResult(id);
      startSetActiveResult(buscarResultado);
    }

  }, [resultadoActivo, equipoActivo, startSetActiveTeams]);

  useEffect(() => {
    if(resultadoActivo && !equipoActivo){
      const equipoUno = equipos.find(e => e.id == resultadoActivo?.equipo_uno);
      const equipoDos = equipos.find(e => e.id == resultadoActivo?.equipo_dos);

      if (equipoUno && equipoDos) {
        startSetActiveTeams([equipoUno, equipoDos]);
      }
    }
  }, [resultadoActivo, equipos,  startSetActiveTeams]);

  return (
    <div id ="Contenido">
      <div className="container">
        <div className="row p-3">
          <form onSubmit={onForm}>
            <div className="d-flex justify-content-between">
              <div onClick={onNavigateBack}>
                <i className="fa-solid fa-arrow-left btn btn-primary"></i>
              </div>
              <h3 className="text-center">AÑADIR ESTADÍSTICAS DEL PARTIDO </h3>
              <div></div>
            </div>
            <div className="row">
              <div className="col-md-6 form-group mb-3">
                <label>Equipo:</label>
                <input
                  type="text"
                  className="form-control"
                  value={(equipoActivo) ? equipoActivo[0].nombre : ''}
                  onChange={onInputChange}
                  disabled
                />
              </div>
              <div className="col-md-6 form-group mb-2">
                <label>Goles Equipo Uno: </label>
                <select
                  className="form-control"
                  name="goles_equipo_uno"
                  onChange={onInputChange}
                  required
                >
                  <option value="" disabled>Cantidad de Goles</option>
                  {Array.from({ length: 21 }, (_, index) => (
                    <option key={index} value={index}>
                      {index}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 form-group mb-2">
                <label>Equipo Dos: </label>
                <input
                  type="text"
                  className="form-control"
                  value={(equipoActivo) ? equipoActivo[1].nombre : ''}
                  onChange={onInputChange}
                  disabled
                />
              </div>

              <div className="col-md-6 form-group mb-2">
                <label>Goles Equipo Dos: </label>
                <select
                  className="form-control"
                  name="goles_equipo_dos"
                  onChange={onInputChange}
                  required
                >
                  <option value="" disabled>Cantidad de Goles</option>
                  {Array.from({ length: 21 }, (_, index) => (
                    <option key={index} value={index}>
                      {index}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <input
              type="text"
              name="resultado"
              onChange={onInputChange}
              hidden
            />
           
            <div className="form-group mt-2 mb-2 text-center">
              <input
                type="submit"
                className="btnSubmit"
                value="Crear Resultado"
              />
            </div>
            
          </form>
        </div>

      </div>
    </div>
  );
};
