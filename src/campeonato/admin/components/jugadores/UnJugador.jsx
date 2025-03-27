import { Link, useNavigate, useParams } from 'react-router-dom';
import '../../pages/ContenidoPages.css';
import { useJugadorStore } from '../../../../hooks';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';

export const UnJugador = () => {

    const {id} = useParams();

    const { jugadorActivo, cargandoJugador } = useSelector(state => state.jugador);
    const { estadisticas } = useSelector(state => state.estadistica);

    const { startLoadOnePlayer } = useJugadorStore();

    const navigate = useNavigate();

    const onNavigateBack = () => {
        navigate('/admin/jugadores/listar');
    };

    useEffect(() => {
        startLoadOnePlayer(id);
    }, [id]);

    useEffect(() => {
        const goles = estadisticas.filter(e => e.jugador_id == id);
        console.log(goles);
        
    }, estadisticas);
    
  return (
    <div id="Contenido">

      <div className='container'>
        <div className="d-flex justify-content-between mb-2">
            <div onClick={onNavigateBack}>
                <i className="fa-solid fa-arrow-left btn btn-primary"></i>
            </div>
            <div></div>
        </div>

        {cargandoJugador || !jugadorActivo ? ( 
        <div className="text-center">
            <Spinner animation="border" />
            <p>Cargando jugador...</p>
        </div>
        ) : (
        <div className="row">
            <div className="col-md-6">
                <div className="card">
                    <div className="card-body text-center">
                    <img
                        src={`http://localhost:3000/${jugadorActivo.imagen}`}
                        className="card-img-top img-fluid img-thumbnail"
                        alt={jugadorActivo.nombre}
                    />
                    <div className="card-text">
                        <h1>{jugadorActivo.nombre} {jugadorActivo.apellido}</h1>
                        <br />
                    </div>
                    <table className="table table-bordered">
                        <thead className="table-primary">
                        <tr>
                            <th colSpan="2" className="text-center">
                            INFORMACIÓN DEL JUGADOR
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className="table-light">
                            <td>Apodo</td>
                            <td>{jugadorActivo.apodo}</td>
                        </tr>
                        <tr className="table-light">
                            <td>Edad</td>
                            <td>{jugadorActivo.edad}</td>
                        </tr>
                        <tr className="table-light">
                            <td>Partidos Jugados</td>
                            <td>{jugadorActivo.partidos_jugados}</td>
                        </tr>
                        <tr className="table-light">
                            <td>Goles</td>
                            <td>{jugadorActivo.goles}</td>
                        </tr>
                        <tr className="table-light">
                            <td>Tarjetas Amarillas</td>
                            <td>{jugadorActivo.tarjetas_amarillas}</td>
                        </tr>
                        <tr className="table-light">
                            <td>Tarjetas Rojas</td>
                            <td>{jugadorActivo.tarjetas_rojas}</td>
                        </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </div>
        )}
      </div>
    </div>
  )
}
