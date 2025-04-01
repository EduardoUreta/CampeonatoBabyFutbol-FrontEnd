import { useSelector } from "react-redux";
import { useEquipoStore, useEstadisticaStore, useJugadorStore, useResultadoStore } from "../../../hooks";
import { CampeonatoNavbar } from "../../components/CampeonatoNavbar";
import '../style/style.css'
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getEnvVariables } from "../../../helpers";

export const EquiposPage = () => {

  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { startLoadResults, startLoadOneResult, startSetActiveTeams, startSetActiveResult } = useResultadoStore();
  const { startLoadTeams, startActiveTeam } = useEquipoStore();
  const { startLoadPlayers, startSetActivePlayer } = useJugadorStore();
  const { startLoadStats, startSetActiveStat } = useEstadisticaStore();

  const { equipos, equipoActivo } = useSelector(state => state.equipo);
  const { resultadoActivo } = useSelector(state => state.resultado);
  const { jugadores, jugadorActivo } = useSelector(state => state.jugador);
  const { estadisticas, estadisticaActivo } = useSelector(state => state.estadistica);

  const { VITE_API_URL, VITE_URL } = getEnvVariables();

  const onClickCardTeam = (teamId) => {
    const equipo  = equipos.find(e => e.id === teamId);
    startActiveTeam(equipo);
  };

  useEffect(() => {
    startLoadTeams();
    startLoadPlayers();
    startLoadStats();
    startLoadResults();

    window.AOS.init({
      duration: 2000,
      easing: 'ease-in-out',
    });

  }, []);

  return (
    <>
        <CampeonatoNavbar/>
        
        <div id="ContenedorPrincipal" style={{ fontFamily: 'campus'}}>
          <div className="pt-3 text-center">
            <h1 style={{ color: '#fff307'}} data-aos="fade-up">Equipos</h1>
          </div>
          <div className="row">
            {
              equipos ? 
              (
                equipos.map((equipo, index) => {
                  return (
                    <div key={equipo.id} className="col-md-6 d-flex justify-content-center" data-aos="fade-up" data-aos-delay={index*150}>
                      <div className="card w-50 mb-3 mt-3" onClick={() => {onClickCardTeam(equipo.id); handleShow()} }>
                        <img 
                          src={`${VITE_URL}/${equipo.imagen}`} 
                          className="card-img-top img-fluid img-thumbnail" 
                          alt={equipo.nombre} 
                        />
                        <div className="card-text">
                          <h5 className="text-center">{equipo.nombre}</h5>
                        </div>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="col-12 text-center">
                  <p>No hay equipos disponibles.</p>
                </div>
              )
            }
          </div>
        </div>

        <Modal show={show} onHide={handleClose} style={{ fontFamily: "campus", backgroundColor: 'rgba(0, 0, 0, 0.7)'}} className="neon-modal"> 
          <Modal.Header closeButton style={{ backgroundColor: 'slategrey'}}>
            <Modal.Title className="text-center" style={{ color: 'black'}}>{equipoActivo?.nombre}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: 'slategrey' }}>
          <table className="table custom-futuristic-table">
            <thead>
              <tr>
                <th colSpan="2" className="text-center text-black">
                  Estadísticas
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ganados</td>
                <td>{equipoActivo?.ganados}</td>
              </tr>
              <tr>
                <td>Empatados</td>
                <td>{equipoActivo?.empatados}</td>
              </tr>
              <tr>
                <td>Perdidos</td>
                <td>{equipoActivo?.perdidos}</td>
              </tr>
              <tr>
                <td>Puntos</td>
                <td>{equipoActivo?.puntos}</td>
              </tr>
              <tr>
                <td>Goles a favor</td>
                <td>{equipoActivo?.goles_favor}</td>
              </tr>
              <tr>
                <td>Goles en contra</td>
                <td>{equipoActivo?.goles_contra}</td>
              </tr>
            </tbody>
          </table>

          </Modal.Body>
        </Modal>
    </>
  )
}
