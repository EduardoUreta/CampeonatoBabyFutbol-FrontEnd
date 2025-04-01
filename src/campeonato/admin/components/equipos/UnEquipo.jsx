import { Link, useNavigate, useParams } from 'react-router-dom';
import '../../pages/ContenidoPages.css';
import { useEquipoStore, useJugadorStore, useResultadoStore } from '../../../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { onNullActivePlayer } from '../../../../store/jugador/jugadorSlice';
import { getEnvVariables } from '../../../../helpers';

export const UnEquipo = () => {

    const {id} = useParams();

    const { equipoActivo, cargandoEquipo } = useSelector(state => state.equipo);
    const { jugadores, jugadorActivo } = useSelector(state => state.jugador);
    const { resultados } = useSelector(state => state.resultado);
    const { startLoadOneTeam } = useEquipoStore();
    const { startLoadPlayers, startSetActivePlayer } = useJugadorStore();
    const { startLoadResults } = useResultadoStore();

    const navigate = useNavigate();
    const { VITE_API_URL } = getEnvVariables();

    const onNavigateBack = () => {
        navigate('/admin/equipos/listar');
    };

    useEffect(() => {
        startLoadOneTeam(id);
        startLoadPlayers();
        startLoadResults(); 
    }, [id]);
    
    useEffect(() => {
        const jugadoresEquipo = jugadores.filter(j => j.EquipoId == equipoActivo?.id);
        startSetActivePlayer(jugadoresEquipo);
    }, [jugadores]);
    
  return (
    <div id="Contenido">

      <div className='container'>
        <div className="d-flex justify-content-between">
            <div onClick={onNavigateBack}>
                <i className="fa-solid fa-arrow-left btn btn-primary"></i>
            </div>
            <div></div>
        </div>

        {cargandoEquipo || !equipoActivo ? ( 
        <div className="text-center">
            <Spinner animation="border" />
            <p>Cargando equipo...</p>
        </div>
        ) : (
        <>
            <div className="row">
                <div className="col-md-7">
                    <div className="card">
                        <div className="card-body text-center">
                        <img
                            src={`${VITE_API_URL}/${equipoActivo.imagen}`}
                            className="card-img-top img-fluid img-thumbnail w-75"
                            alt={equipoActivo.nombre}
                        />
                        <div className="card-text">
                            <h1>{equipoActivo.nombre}</h1>
                            <br />
                        </div>
                        <table className="table table-bordered table-striped">
                            <thead className="table-primary">
                            <tr>
                                <th colSpan="2" className="text-center">
                                Estadísticas
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr className="table-light">
                                <td>Ganados</td>
                                <td>{equipoActivo.ganados}</td>
                            </tr>
                            <tr className="table-light">
                                <td>Empatados</td>
                                <td>{equipoActivo.empatados}</td>
                            </tr>
                            <tr className="table-light">
                                <td>Perdidos</td>
                                <td>{equipoActivo.perdidos}</td>
                            </tr>
                            <tr className="table-light">
                                <td>Puntos</td>
                                <td>{equipoActivo.puntos}</td>
                            </tr>
                            <tr className="table-light">
                                <td>Goles a favor</td>
                                <td>{equipoActivo.goles_favor}</td>
                            </tr>
                            <tr className="table-light">
                                <td>Goles en contra</td>
                                <td>{equipoActivo.goles_contra}</td>
                            </tr>
                            <tr className="table-light">
                                <td>Capitán</td>
                                <td>{equipoActivo.capitan_id}</td>
                            </tr>
                            </tbody>
                        </table>
                        </div>
                        <div className='table-responsive p-3'>
                            <table className="table table-bordered table-striped">
                                <thead className="table-primary text-center">
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Apellido</th>
                                        <th>Edad</th>
                                    </tr>
                                </thead>
                                <tbody className='text-center'>
                                    {jugadorActivo && Array.isArray(jugadorActivo) && jugadorActivo.length > 0 ? (
                                        jugadorActivo.map((jugador) => {
                                            return (
                                                <tr key={jugador.id}>
                                                    <td>{jugador.nombre}</td>
                                                    <td>{jugador.apellido}</td>
                                                    <td>{jugador.edad}</td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="text-center">No hay jugadores disponibles para este equipo.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>

        </>
        )}
      </div>
    </div>
  )
}
