import { useNavigate, useParams } from "react-router-dom";
import { useResultadoStore, useForm, useEquipoStore, useJugadorStore, useEstadisticaStore } from "../../../../hooks";
import '../../pages/ContenidoPages.css';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const resultadoInitialValue = {
  equipo_uno: '',
  goles_equipo_uno: 0,
  equipo_dos: '',
  goles_equipo_dos: 0,
  ronda: '',
  resultado: '',
  partido_id: '', 
  equipo_id: '',
  jugador_id: '',
  goles: '', 
  tarjetas_amarillas: '', 
  tarjetas_rojas: ''
};

export const ActualizarResultado = () => {
  const [jugadoresStats, setJugadoresStats] = useState({});

  // Funciones de contadores de goles, amarillas y rojas
  const onHandleGolesAdd = (jugadorId) => {
    setJugadoresStats((prevStats) => ({
      ...prevStats,
      [jugadorId]: {
        ...prevStats[jugadorId],
        goles: (prevStats[jugadorId]?.goles || 0) + 1,
      },
    }));
  };

  const onHandleGolesMinus = (jugadorId) => {
    setJugadoresStats((prevStats) => ({
      ...prevStats,
      [jugadorId]: {
        ...prevStats[jugadorId],
        goles: Math.max((prevStats[jugadorId]?.goles || 0) - 1, 0),  // Evita que los goles sean negativos
      },
    }));
  };

  const onHandleAmarillasAdd = (jugadorId) => {
    setJugadoresStats((prevStats) => ({
      ...prevStats,
      [jugadorId]: {
        ...prevStats[jugadorId],
        amarillas: (prevStats[jugadorId]?.amarillas || 0) + 1,
      },
    }));
  };

  const onHandleAmarillasMinus = (jugadorId) => {
    setJugadoresStats((prevStats) => ({
      ...prevStats,
      [jugadorId]: {
        ...prevStats[jugadorId],
        amarillas: Math.max((prevStats[jugadorId]?.amarillas || 0) - 1, 0),  // Evita que las amarillas sean negativas
      },
    }));
  };

  const onHandleRojasAdd = (jugadorId) => {
    setJugadoresStats((prevStats) => ({
      ...prevStats,
      [jugadorId]: {
        ...prevStats[jugadorId],
        rojas: (prevStats[jugadorId]?.rojas || 0) + 1,
      },
    }));
  };

  const onHandleRojasMinus = (jugadorId) => {
    setJugadoresStats((prevStats) => ({
      ...prevStats,
      [jugadorId]: {
        ...prevStats[jugadorId],
        rojas: Math.max((prevStats[jugadorId]?.rojas || 0) - 1, 0),  // Evita que las rojas sean negativas
      },
    }));
  };

  const { equipo_uno, goles_equipo_uno, equipo_dos, goles_equipo_dos, onInputChange } = useForm(resultadoInitialValue);

  const navigate = useNavigate();
  const { id } = useParams();
  const { startLoadOneResult, startUpdateResult, startSetActiveTeams, startSetActiveResult } = useResultadoStore();
  const { startLoadTeams, startUpdateTeam } = useEquipoStore();
  const { startLoadPlayers, startSetActivePlayer, startUpdatePlayer } = useJugadorStore();
  const { startAddNewStat, startLoadStats, startUpdateStat, startSetActiveStat } = useEstadisticaStore();

  const { equipos, equipoActivo } = useSelector(state => state.equipo);
  const { resultadoActivo } = useSelector(state => state.resultado);
  const { jugadores, jugadorActivo } = useSelector(state => state.jugador);
  const { estadisticas, estadisticaActivo } = useSelector(state => state.estadistica);

  const onNavigateBack = () => {
    navigate('/admin/resultados/listar');
  };

  const onForm = (e) => {
    e.preventDefault();
    const resultadoFinal = `${goles_equipo_uno}x${goles_equipo_dos}`;
    startUpdateResult({
      id: id, 
      equipo_uno: resultadoActivo?.equipo_uno, 
      goles_equipo_uno: goles_equipo_uno, 
      equipo_dos: resultadoActivo?.equipo_dos, 
      goles_equipo_dos: goles_equipo_dos, 
      ronda: resultadoActivo?.ronda, 
      resultado: resultadoFinal 
    });
    
    const puntosEquipoUno = goles_equipo_uno > goles_equipo_dos ? 3 : goles_equipo_uno === goles_equipo_dos ? 1 : 0;
    const puntosEquipoDos = goles_equipo_uno < goles_equipo_dos ? 3 : goles_equipo_uno === goles_equipo_dos ? 1 : 0;
    
    startUpdateTeam({
      id: equipoActivo[0]?.id,
      ganados: goles_equipo_uno > goles_equipo_dos ? 1 : 0,
      empatados: goles_equipo_uno === goles_equipo_dos ? 1 : 0,
      perdidos: goles_equipo_uno < goles_equipo_dos ? 1 : 0,
      goles_favor: goles_equipo_uno,
      goles_contra: goles_equipo_dos,
      puntos: puntosEquipoUno,
    });
    
    startUpdateTeam({
      id: equipoActivo[1]?.id,
      ganados: goles_equipo_uno < goles_equipo_dos ? 1 : 0,
      empatados: goles_equipo_uno === goles_equipo_dos ? 1 : 0,
      perdidos: goles_equipo_uno > goles_equipo_dos ? 1 : 0,
      goles_favor: goles_equipo_dos,
      goles_contra: goles_equipo_uno,
      puntos: puntosEquipoDos,
    });    

    jugadorActivo[0].forEach((jugador) => {
      if(estadisticaActivo){
        const stat = estadisticaActivo.find(stat => stat.jugador_id === jugador.id);
        if(stat){
          startUpdateStat({
            id: stat.id,
            goles: jugadoresStats[jugador.id]?.goles, 
            tarjetas_amarillas: jugadoresStats[jugador.id]?.amarillas, 
            tarjetas_rojas: jugadoresStats[jugador.id]?.rojas, 
          });
          startUpdatePlayer({
            id: jugador.id,
            goles: + (jugadoresStats[jugador.id]?.goles || 0),
            tarjetas_amarillas: + (jugadoresStats[jugador.id]?.amarillas || 0), 
            tarjetas_rojas: + (jugadoresStats[jugador.id]?.rojas || 0), 
            partidos_jugados: estadisticas.filter(s => s.jugador_id === jugador.id).length
          });
        };
      } else {
        startAddNewStat({
          partido_id: resultadoActivo?.id, 
          equipo_id: resultadoActivo?.equipo_uno, 
          jugador_id: jugador.id, 
          goles: jugadoresStats[jugador.id]?.goles || 0, 
          tarjetas_amarillas: jugadoresStats[jugador.id]?.amarillas || 0, 
          tarjetas_rojas: jugadoresStats[jugador.id]?.rojas || 0, 
        });
      }
    });

    jugadorActivo[1].forEach((jugador) => {
      if(estadisticaActivo){
        const stat = estadisticaActivo.find(stat => stat.jugador_id === jugador.id);
        if(stat){
          startUpdateStat({
            id: stat.id,
            goles: jugadoresStats[jugador.id]?.goles, 
            tarjetas_amarillas: jugadoresStats[jugador.id]?.amarillas, 
            tarjetas_rojas: jugadoresStats[jugador.id]?.rojas, 
          });
          startUpdatePlayer({
            id: jugador.id,
            goles: + (jugadoresStats[jugador.id]?.goles || 0),
            tarjetas_amarillas: + (jugadoresStats[jugador.id]?.amarillas || 0), 
            tarjetas_rojas: + (jugadoresStats[jugador.id]?.rojas || 0), 
            partidos_jugados: estadisticas.filter(s => s.jugador_id === jugador.id).length
          });
        };
      } else {
        startAddNewStat({
          partido_id: resultadoActivo?.id, 
          equipo_id: resultadoActivo?.equipo_dos, 
          jugador_id: jugador.id, 
          goles: jugadoresStats[jugador.id]?.goles || 0, 
          tarjetas_amarillas: jugadoresStats[jugador.id]?.amarillas || 0, 
          tarjetas_rojas: jugadoresStats[jugador.id]?.rojas || 0
        });
      };
    });

    navigate('/admin/resultados/listar');
  };

  useEffect(() => {
    startLoadTeams(); 
    startLoadPlayers();
    startLoadStats();
    const findActiveResult = startLoadOneResult(id);
    startSetActiveResult(findActiveResult);    
  }, []);

  useEffect(() => {
    const estadisticasActivas = estadisticas.filter(e => e.partido_id == id);
    startSetActiveStat(estadisticasActivas);
  }, [estadisticas, id]);

  useEffect(() => {
    if (equipoActivo && Array.isArray(equipoActivo) && equipoActivo.length > 0) {
      const jugadoresEquipo1 = jugadores.filter(j => j.EquipoId == equipoActivo[0]?.id);
      const jugadoresEquipo2 = jugadores.filter(j => j.EquipoId == equipoActivo[1]?.id);
      startSetActivePlayer([jugadoresEquipo1, jugadoresEquipo2]);
    }
  }, [jugadores, equipoActivo]);

  useEffect(() => {
    if(resultadoActivo && !equipoActivo){
      const equipoUno = equipos.find(e => e.id == resultadoActivo?.equipo_uno);
      const equipoDos = equipos.find(e => e.id == resultadoActivo?.equipo_dos);

      if (equipoUno && equipoDos) {
        startSetActiveTeams([equipoUno, equipoDos]);
      }
    }
  }, [resultadoActivo, equipos,  startSetActiveTeams]);

  const nombreEquipoUno = equipos.find(e => e.id === resultadoActivo?.equipo_uno);
  const nombreEquipoDos = equipos.find(e => e.id === resultadoActivo?.equipo_dos); 

  resultadoInitialValue.goles_equipo_uno = resultadoActivo?.goles_equipo_uno;
  resultadoInitialValue.goles_equipo_dos = resultadoActivo?.goles_equipo_dos;

  // Cargar las estadísticas de los jugadores ya existentes
  useEffect(() => {
    if (estadisticaActivo && estadisticaActivo.length > 0) {
      const newStats = {};
      estadisticaActivo.forEach(stat => {
        newStats[stat.jugador_id] = {
          goles: stat.goles,
          amarillas: stat.tarjetas_amarillas,
          rojas: stat.tarjetas_rojas,
        };
      });
      setJugadoresStats(newStats);
    }
  }, [estadisticaActivo]);

  return (
    <div id="Contenido">
      <div className="container">
        <div className="row p-3">
          <form onSubmit={onForm}>
            <div className="d-flex justify-content-between">
              <div onClick={onNavigateBack}>
                <i className="fa-solid fa-arrow-left btn btn-primary"></i>
              </div>
              <h3 className="text-center">ACTUALIZAR RESULTADO:</h3>
              <div></div>
            </div>

            <div className="row">
              <div className="col-md-6 form-group mb-1">
                <label>Equipo Uno:</label>
                <input
                  type="text"
                  className="form-control"
                  name="equipo_uno"
                  value={nombreEquipoUno?.nombre}
                  onChange={onInputChange}
                  disabled
                />
              </div>
              <div className="col-md-6 form-group mb-1">
                <label>Goles {nombreEquipoUno?.nombre}:</label>
                <input
                  type="number"
                  className="form-control"
                  name="goles_equipo_uno"
                  value={goles_equipo_uno}
                  onChange={onInputChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 form-group mb-1">
                <label>Equipo Dos:</label>
                <input
                  type="text"
                  className="form-control"
                  name="equipo_dos"
                  value={nombreEquipoDos?.nombre}
                  onChange={onInputChange}
                  disabled
                />
              </div>
              <div className="col-md-6 form-group mb-1">
                <label>Goles {nombreEquipoDos?.nombre}:</label>
                <input
                  type="number"
                  className="form-control"
                  name="goles_equipo_dos"
                  value={goles_equipo_dos}
                  onChange={onInputChange}
                />
              </div>
            </div>

            <div className="form-group mb-3 w-75 m-auto">
              <div className="list-group justify-self-center">
                <div className="text-center mb-3">
                  <img src={`http://localhost:3000/${nombreEquipoUno?.imagen}`} className="img-fluid w-50"/>
                </div>
                {jugadores && jugadores.filter(jugador => jugador.EquipoId == nombreEquipoUno?.id).map((jugador) => (
                  <div key={jugador.id} className="list-group-item">
                    <div className="row">
                      <div className="col-md-3 align-self-center text-center">
                        <img src={jugador.imagen} alt={`${jugador.nombre} ${jugador.apellido}`}/>
                        <div>
                          <label>{jugador.nombre} {jugador.apellido}</label>
                        </div>
                      </div>

                      {/* Estadísticas del jugador */}
                      <div className="col-md-9">
                        <div className="row">
                          <div className="col-md-4 d-flex align-items-center justify-content-center">
                            <span><strong>Goles:</strong></span>
                          </div>
                          <div className="col-md-8 d-flex align-items-center justify-content-center">
                            <button
                              className="btn btn-secondary btn-sm"
                              onClick={(e) => {e.preventDefault(); onHandleGolesMinus(jugador.id)}}
                              disabled={(jugadoresStats[jugador.id]?.goles || 0) <= 0}
                            >
                              -
                            </button>
                            <input
                              type="number"
                              className="form-control mx-2"
                              value={jugadoresStats[jugador.id]?.goles || 0}
                              onChange={() => {}}
                              min="0"
                              style={{ width: "50px", textAlign: "center" }}
                            />
                            <button
                              className="btn btn-secondary btn-sm"
                              onClick={(e) => {e.preventDefault(); onHandleGolesAdd(jugador.id)}}
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-4 d-flex align-items-center justify-content-center">
                            <span><strong>Tarjetas Amarillas:</strong></span>
                          </div>
                          <div className="col-md-8 d-flex align-items-center justify-content-center">
                            <button
                              className="btn btn-warning btn-sm"
                              onClick={(e) => {e.preventDefault(); onHandleAmarillasMinus(jugador.id)}}
                              disabled={(jugadoresStats[jugador.id]?.amarillas || 0) <= 0}
                            >
                              -
                            </button>
                            <input
                              type="number"
                              className="form-control mx-2"
                              value={jugadoresStats[jugador.id]?.amarillas || 0}
                              onChange={() => {}}
                              min="0"
                              style={{ width: "50px", textAlign: "center" }}
                            />
                            <button
                              className="btn btn-warning btn-sm"
                              onClick={(e) => {e.preventDefault(); onHandleAmarillasAdd(jugador.id)}}
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-4 d-flex align-items-center justify-content-center">
                            <span><strong>Tarjetas Rojas:</strong></span>
                          </div>
                          <div className="col-md-8 d-flex align-items-center justify-content-center">
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={(e) => {e.preventDefault(); onHandleRojasMinus(jugador.id)}}
                              disabled={(jugadoresStats[jugador.id]?.rojas || 0) <= 0}
                            >
                              -
                            </button>
                            <input
                              type="number"
                              className="form-control mx-2"
                              value={jugadoresStats[jugador.id]?.rojas || 0}
                              onChange={() => {}}
                              min="0"
                              style={{ width: "50px", textAlign: "center" }}
                            />
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={(e) => {e.preventDefault(); onHandleRojasAdd(jugador.id)}}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group mb-3 w-75 m-auto">
              <div className="list-group justify-self-center">
                <div className="text-center mb-3">
                  <img src={`http://localhost:3000/${nombreEquipoDos?.imagen}`} className="img-fluid w-50"/>
                </div>
                {jugadores && jugadores.filter(jugador => jugador.EquipoId == nombreEquipoDos?.id).map((jugador) => (
                  <div key={jugador.id} className="list-group-item">
                    <div className="row">
                      <div className="col-md-3 align-self-center text-center">
                        <img src={jugador.imagen} alt={`${jugador.nombre} ${jugador.apellido}`}/>
                        <div>
                          <label>{jugador.nombre} {jugador.apellido}</label>
                        </div>
                      </div>

                      {/* Estadísticas del jugador */}
                      <div className="col-md-9">
                        <div className="row">
                          <div className="col-md-4 d-flex align-items-center justify-content-center">
                            <span><strong>Goles:</strong></span>
                          </div>
                          <div className="col-md-8 d-flex align-items-center justify-content-center">
                            <button
                              className="btn btn-secondary btn-sm"
                              onClick={(e) => {e.preventDefault(); onHandleGolesMinus(jugador.id)}}
                              disabled={(jugadoresStats[jugador.id]?.goles || 0) <= 0}
                            >
                              -
                            </button>
                            <input
                              type="number"
                              className="form-control mx-2"
                              value={jugadoresStats[jugador.id]?.goles || 0}
                              onChange={() => {}}
                              min="0"
                              style={{ width: "50px", textAlign: "center" }}
                            />
                            <button
                              className="btn btn-secondary btn-sm"
                              onClick={(e) => {e.preventDefault(); onHandleGolesAdd(jugador.id)}}
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-4 d-flex align-items-center justify-content-center">
                            <span><strong>Tarjetas Amarillas:</strong></span>
                          </div>
                          <div className="col-md-8 d-flex align-items-center justify-content-center">
                            <button
                              className="btn btn-warning btn-sm"
                              onClick={(e) => {e.preventDefault(); onHandleAmarillasMinus(jugador.id)}}
                              disabled={(jugadoresStats[jugador.id]?.amarillas || 0) <= 0}
                            >
                              -
                            </button>
                            <input
                              type="number"
                              className="form-control mx-2"
                              value={jugadoresStats[jugador.id]?.amarillas || 0}
                              onChange={() => {}}
                              min="0"
                              style={{ width: "50px", textAlign: "center" }}
                            />
                            <button
                              className="btn btn-warning btn-sm"
                              onClick={(e) => {e.preventDefault(); onHandleAmarillasAdd(jugador.id)}}
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-4 d-flex align-items-center justify-content-center">
                            <span><strong>Tarjetas Rojas:</strong></span>
                          </div>
                          <div className="col-md-8 d-flex align-items-center justify-content-center">
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={(e) => {e.preventDefault(); onHandleRojasMinus(jugador.id)}}
                              disabled={(jugadoresStats[jugador.id]?.rojas || 0) <= 0}
                            >
                              -
                            </button>
                            <input
                              type="number"
                              className="form-control mx-2"
                              value={jugadoresStats[jugador.id]?.rojas || 0}
                              onChange={() => {}}
                              min="0"
                              style={{ width: "50px", textAlign: "center" }}
                            />
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={(e) => {e.preventDefault(); onHandleRojasAdd(jugador.id)}}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" className="btn btn-primary mt-3">
              Guardar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
