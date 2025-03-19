import { useEffect } from "react";
import { useJugadorStore } from "../../../../hooks";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import '../../pages/ContenidoPages.css';
import Swal from "sweetalert2";
import { onSetActivePlayer } from "../../../../store/jugador/jugadorSlice";

export const MostrarJugadores = () => {

    const { startLoadPlayers, startDeletePlayer, cargandoJugador } = useJugadorStore();
    const { jugadores } = useSelector(state => state.jugador);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onNavigateBack = () => {
      navigate(-1);
    };
  
    useEffect(() => {
        startLoadPlayers();
    }, []);

    const onHandleEliminar = (id) => {
        dispatch(onSetActivePlayer(id));
        Swal.fire({
            title: '¿Estás seguro de eliminar este jugador?',
            text: "¡Esta acción no se puede deshacer!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
        }).then((result) => {
            if (result.isConfirmed) {

                startDeletePlayer(id);    

                startLoadPlayers();
      
                navigate('/admin/jugadores');
            }
        });
    };
    
    if (cargandoJugador) {
        return <Spinner animation="border" />;
    }

    return (
        <div id="Contenido">
            <div className="container">
                <div className="d-flex justify-content-between">
                    <div onClick={onNavigateBack}>
                        <i className="fa-solid fa-arrow-left btn btn-primary"></i>
                    </div>
                    <h3 className="text-center">LISTA DE JUGADORES</h3>
                    <div></div>
                </div>
                <div className="row p-5">
                    {jugadores.length != 0 ? (
                        jugadores.map((jugador) => (
                            <div key={jugador.id} className="col-lg-4 col-md-4 col-sm-6 mb-4" style={ {flexWrap: "wrap" }}>
                                <div className="card">
                                    <img 
                                        src={`http://localhost:3000/${jugador.imagen}`} 
                                        className="card-img-top img-fluid img-thumbnail" 
                                        alt={jugador.nombre} 
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title text-center">{jugador.nombre}</h5>
                                        <div>
                                            <Link to={`/admin/jugadores/${jugador.id}`} className=" botonesDetalleEquipo btn btn-primary text-light mb-1" style={{ background: "#95957d"}}>
                                                Ver Detalles
                                            </Link>
                                            <Link to={`/admin/jugadores/actualizar/${jugador.id}`} className="botonesDetalleEquipo btn text-light mb-1" >
                                                Actualizar
                                            </Link>
                                            <button onClick={() => onHandleEliminar(jugador.id)} className=" botonesDetalleEquipo btn btn-primary text-light mb-1" style={{ background: "red"}}>
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-12 text-center">
                            <p>No hay jugadores disponibles.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
