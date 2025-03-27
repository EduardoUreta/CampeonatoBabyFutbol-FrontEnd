import { useEffect } from "react";
import { useEquipoStore } from "../../../../hooks";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import '../../pages/ContenidoPages.css';
import Swal from "sweetalert2";
import { onSetActiveTeam } from "../../../../store/equipo/equipoSlice";
import { onNullActivePlayer } from "../../../../store/jugador/jugadorSlice";

export const MostrarEquipos = () => {

    const { startLoadTeams, startDeleteTeam, cargandoEquipo } = useEquipoStore();
    const { equipos } = useSelector(state => state.equipo);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onNavigateBack = () => {
      navigate('/admin/equipos');
    };
  
    useEffect(() => {
        startLoadTeams();
        dispatch(onNullActivePlayer());
    }, []);

    const onHandleEliminar = (id) => {
        dispatch(onSetActiveTeam(id));
        Swal.fire({
            title: '¿Estás seguro de eliminar este equipo?',
            text: "¡Esta acción no se puede deshacer!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
        }).then((result) => {
            if (result.isConfirmed) {

                startDeleteTeam(id);    

                startLoadTeams();
      
                navigate('/admin/equipos');
            }
        });
    };
    
    if (cargandoEquipo) {
        return <Spinner animation="border" />;
    }

    return (
        <div id="Contenido">
            <div className="container">
                <div className="d-flex justify-content-between">
                    <div onClick={onNavigateBack}>
                        <i className="fa-solid fa-arrow-left btn btn-primary"></i>
                    </div>
                    <h3 className="text-center">LISTA DE EQUIPOS</h3>
                    <div></div>
                </div>
                <div className="row">
                    {equipos.length != 0 ? (
                        equipos.map((equipo) => (
                            <div key={equipo.id} className="col-lg-6 col-md-6 col-sm-6 mb-4" style={ {flexWrap: "wrap" }}>
                                <div className="card">
                                    <img 
                                        src={`http://localhost:3000/${equipo.imagen}`} 
                                        className="card-img-top img-fluid img-thumbnail" 
                                        alt={equipo.nombre} 
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title text-center">{equipo.nombre}</h5>
                                        <div>
                                            <Link to={`/admin/equipos/${equipo.id}`} className=" botonesDetalleEquipo btn btn-primary text-light mb-1" style={{ background: "#95957d"}}>
                                                Ver Detalles
                                            </Link>
                                            <Link to={`/admin/equipos/actualizar/${equipo.id}`} className="botonesDetalleEquipo btn text-light mb-1" >
                                                Actualizar
                                            </Link>
                                            <button onClick={() => onHandleEliminar(equipo.id)} className=" botonesDetalleEquipo btn btn-primary text-light mb-1" style={{ background: "red"}}>
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-12 text-center">
                            <p>No hay equipos disponibles.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
