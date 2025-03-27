import { Link, useNavigate, useParams } from 'react-router-dom';
import '../../pages/ContenidoPages.css';
import { useEquipoStore, useResultadoStore } from '../../../../hooks';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';

export const UnResultado = () => {

    const {id} = useParams();

    const { resultadoActivo, cargandoResultado } = useSelector(state => state.resultado);
    const { startLoadOneResult } = useResultadoStore();
    const { equipos } = useSelector(state => state.equipo);
    const { startLoadTeams } = useEquipoStore();

    const navigate = useNavigate();

    const onNavigateBack = () => {
        navigate(-1);
    };

    const [ equipoUno, setEquipoUno] = useState(null);
    const [ equipoDos, setEquipoDos] = useState(null);

    useEffect(() => {
        startLoadOneResult(id);
        startLoadTeams();
    }, [id]);

    useEffect(() => {
        setEquipoUno(equipos.find(e => e.id === resultadoActivo?.equipo_uno));
        setEquipoDos(equipos.find(e => e.id === resultadoActivo?.equipo_dos));
    },[resultadoActivo, equipos]);
    
  return (
    <div id="Contenido">

      <div className='container'>
        <div className="d-flex justify-content-between">
            <div onClick={onNavigateBack}>
                <i className="fa-solid fa-arrow-left btn btn-primary"></i>
            </div>
            <div></div>
        </div>

        {cargandoResultado || !resultadoActivo ? ( 
        <div className="text-center">
            <Spinner animation="border" />
            <p>Cargando resultado...</p>
        </div>
        ) : (
        <div className="row">
            <div className="col-md-6">
                <div className="card">
                    <div className="card-body text-center">
                        <div className="card-text">
                            <h1>{resultadoActivo.nombre}</h1>
                            <br />
                        </div>
                        <table className="table table-bordered">
                            <thead className="table-primary">
                                <tr>
                                    <th colSpan="4" className="text-center">
                                    Estadísticas
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr className="table-light">
                                    <td>{equipoUno?.nombre}</td>
                                    <td>{resultadoActivo.goles_equipo_uno}</td>
                                </tr>
                                <tr className="table-light">
                                    <td>{equipoDos?.nombre}</td>
                                    <td>{resultadoActivo.goles_equipo_dos}</td>
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
