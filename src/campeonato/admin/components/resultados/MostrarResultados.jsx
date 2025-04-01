import { useEffect } from "react";
import { useEquipoStore, useEstadisticaStore, useJugadorStore, useResultadoStore } from "../../../../hooks";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import '../../pages/ContenidoPages.css';
import Swal from "sweetalert2";
import { onSetActiveResult } from "../../../../store/resultado/resultadoSlice";
import { getEnvVariables } from "../../../../helpers";

export const MostrarResultados = () => {

    const { resultados } = useSelector(state => state.resultado);
    const { equipos } = useSelector(state => state.equipo);
    const { estadisticaActivo } = useSelector(state => state.estadistica);
    const { jugadores } = useSelector(state => state.jugador);

    const { startLoadResults, startDeleteResult, startSetActiveTeams, startSetActiveResult, cargandoResultado } = useResultadoStore();
    const { startLoadTeams } = useEquipoStore();
    const { startSetActiveStat } = useEstadisticaStore();
    const { startLoadPlayers } = useJugadorStore();

    const navigate = useNavigate();
    const dispatch = useDispatch();   
    const { VITE_URL } = getEnvVariables();

    const onNavigateBack = () => {
      navigate('/admin/resultados');
    };

    useEffect(() => {
        startLoadResults();
        startLoadTeams();
        startSetActiveStat(null);
    }, []);

    const onHandleEliminar = (id) => {
        dispatch(onSetActiveResult(id));
        Swal.fire({
            title: '¿Estás seguro de eliminar este resultado?',
            text: "¡Esta acción no se puede deshacer!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
        }).then((result) => {
            if (result.isConfirmed) {

                startDeleteResult(id);    

                startLoadResults();
      
                navigate('/admin/resultados');
            }
        });
    };

    const onHandleActiveTeams = ([equipoUno, equipoDos]) => {
        startSetActiveTeams([equipoUno, equipoDos]);
        startSetActiveResult([equipoUno, equipoDos])
    };
    
    if (cargandoResultado) {
        return <Spinner animation="border" />;
    }

    return (
        <div id="Contenido">
            <div className="container">
                <div className="d-flex justify-content-between">
                    <div onClick={onNavigateBack}>
                        <i className="fa-solid fa-arrow-left btn btn-primary"></i>
                    </div>
                    <h3 className="text-center">LISTA DE RESULTADOS</h3>
                    <div></div>
                </div>
                    {resultados.length != 0 ? (
                        resultados.map((resultado) => {
                            const equipoUno = equipos.find(equipo => equipo.id === resultado.equipo_uno);
                            const equipoDos = equipos.find(equipo => equipo.id === resultado.equipo_dos);

                            return (
                            <div key={resultado.id} className="row p-3">
                                <div  className="col-lg-12 col-md-12 col-sm-12 mx-auto mb-4">
                                    <div className="card shadow-lg border-0 rounded-4 p-4">
                                        <div className="d-flex flex-column flex-md-row justify-content-around align-items-center text-center">

                                            <div className="mb-3 mb-md-0">
                                                <img 
                                                    src={`${VITE_URL}/${equipoUno?.imagen}`} 
                                                    alt={equipoUno?.nombre} 
                                                    className="img-fluid rounded-circle shadow"
                                                    style={{ width: "100px", height: "100px", objectFit: "cover", border: "4px solid #ddd" }}
                                                />
                                                <p className="fs-5 fw-bold text-dark mt-2">{equipoUno?.nombre}</p>
                                            </div>

                                            <div className="d-flex flex-column align-items-center">
                                                <h5 className="text-primary fw-bold mb-2">{resultado.ronda}</h5>
                                                <h6>{new Date(resultado.fecha).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}</h6>
                                                <div 
                                                    className="d-flex justify-content-center align-items-center px-5 py-2 rounded-3 shadow-lg"
                                                    style={{ fontSize: '2rem', fontWeight: 'bold', backgroundColor: '#f8f9fa', color: '#212529' }}
                                                >
                                                    <span className="mx-3">{resultado.goles_equipo_uno}</span> 
                                                    <span className="mx-3">:</span> 
                                                    <span className="mx-3">{resultado.goles_equipo_dos}</span>
                                                </div>
                                            </div>

                                            <div className="mb-3 mb-md-0">
                                                <img 
                                                    src={`${VITE_URL}/${equipoDos?.imagen}`} 
                                                    alt={equipoDos?.nombre} 
                                                    className="img-fluid rounded-circle shadow"
                                                    style={{ width: "100px", height: "100px", objectFit: "cover", border: "4px solid #ddd" }}
                                                />
                                                <p className="fs-5 fw-bold text-dark mt-2">{equipoDos?.nombre}</p>
                                            </div>

                                        </div>

                                        <div className="card-body text-center">
                                            <h5 className="card-title text-secondary">{resultado.nombre}</h5>
                                            <div className="mt-3 d-flex justify-content-center flex-wrap gap-2">
                                                <Link to={`/admin/resultados/${resultado.id}`}  className="btn btn-secondary btn-sm">
                                                    Ver Detalles
                                                </Link>
                                                <Link to={`/admin/estadisticas/${resultado.id}`} onClick={ () => onHandleActiveTeams([equipoUno, equipoDos])} className="btn btn-success btn-sm">
                                                    Añadir Estadísticas
                                                </Link>
                                                <Link to={`/admin/resultados/actualizar/${resultado.id}`} onClick={() => onHandleActiveTeams([equipoUno, equipoDos])} className="btn btn-primary btn-sm text-white">
                                                    Actualizar Marcador
                                                </Link>
                                                <button 
                                                    onClick={() => onHandleEliminar(resultado.id)} 
                                                    className="btn btn-danger btn-sm"
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )})
                    ) : (
                        <div className="col-12 text-center">
                            <p>No hay resultados disponibles.</p>
                        </div>
                    )}
                </div>
            </div>
    );
}
