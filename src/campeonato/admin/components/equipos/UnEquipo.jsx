import { Link, useNavigate, useParams } from 'react-router-dom';
import '../../pages/ContenidoPages.css';
import { useEquipoStore } from '../../../../hooks';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';

export const UnEquipo = () => {

    const {id} = useParams();

    const { startLoadOneTeam } = useEquipoStore();
    const { equipoActivo, cargandoEquipo } = useSelector(state => state.equipo);

    const navigate = useNavigate();

    const onNavigateBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        startLoadOneTeam(id);
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

        {cargandoEquipo || !equipoActivo ? ( 
        <div className="text-center">
            <Spinner animation="border" />
            <p>Cargando equipo...</p>
        </div>
        ) : (
        <div className="row">
            <div className="col-md-6">
            <div className="card">
                <div className="card-body text-center">
                <img
                    src={`http://localhost:3000/${equipoActivo.imagen}`}
                    className="card-img-top img-fluid img-thumbnail"
                    alt={equipoActivo.nombre}
                />
                <div className="card-text">
                    <h1>{equipoActivo.nombre}</h1>
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
            </div>
            </div>
        </div>
        )}
      </div>
    </div>
  )
}
