import { Link, useNavigate, useParams } from 'react-router-dom';
import '../../pages/ContenidoPages.css';
import { useJugadorStore } from '../../../../hooks';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';

export const UnJugador = () => {

    const {id} = useParams();

    const { startLoadOnePlayer } = useJugadorStore();
    const { jugadorActivo, cargandoJugador } = useSelector(state => state.jugador);

    const navigate = useNavigate();

    const onNavigateBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        startLoadOnePlayer(id);
    }, [id]);
    
  return (
    <div id="Contenido">

      <div className='container'>
        <div className="d-flex justify-content-between">
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
                    <h1>{jugadorActivo.nombre}</h1>
                    <br />
                </div>
                <table className="table table-bordered">
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
                        <td>{jugadorActivo.ganados}</td>
                    </tr>
                    <tr className="table-light">
                        <td>Empatados</td>
                        <td>{jugadorActivo.empatados}</td>
                    </tr>
                    <tr className="table-light">
                        <td>Perdidos</td>
                        <td>{jugadorActivo.perdidos}</td>
                    </tr>
                    <tr className="table-light">
                        <td>Puntos</td>
                        <td>{jugadorActivo.puntos}</td>
                    </tr>
                    <tr className="table-light">
                        <td>Goles a favor</td>
                        <td>{jugadorActivo.goles_favor}</td>
                    </tr>
                    <tr className="table-light">
                        <td>Goles en contra</td>
                        <td>{jugadorActivo.goles_contra}</td>
                    </tr>
                    <tr className="table-light">
                        <td>Capitán</td>
                        <td>{jugadorActivo.capitan_id}</td>
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
