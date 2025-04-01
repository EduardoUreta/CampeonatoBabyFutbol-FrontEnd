import { useEffect } from "react";
import { useEquipoStore, useJugadorStore } from "../../../../hooks";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import '../../pages/ContenidoPages.css';
import Swal from "sweetalert2";
import { onSetActivePlayer } from "../../../../store/jugador/jugadorSlice";
import { findNonSerializableValue } from "@reduxjs/toolkit";
import { getEnvVariables } from "../../../../helpers";

export const MostrarJugadores = () => {

    const { jugadores } = useSelector(state => state.jugador);
    const { equipos } = useSelector(state => state.equipo);
    const { startLoadPlayers, startDeletePlayer, startSetActivePlayer, cargandoJugador } = useJugadorStore();
    const { startLoadTeams } = useEquipoStore();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { VITE_URL } = getEnvVariables();

    const onNavigateBack = () => {
      navigate('/admin/jugadores');
    };
  
    useEffect(() => {
        startLoadPlayers();
        startLoadTeams();
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

    const onHandleActivePlayer = (jugador) => {
        startSetActivePlayer(jugador);
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
                <div className="row justify-content-center">
                    {jugadores.length != 0 ? (
                        jugadores.map((jugador) => {
                            const equipoDeJugador = equipos.find(e => e.id === jugador.EquipoId);
                            let fondoColor = '';
                            if(equipoDeJugador?.id == 47) fondoColor = '#3d3d05';
                            if(equipoDeJugador?.id == 48) fondoColor = '#0a0a46';
                            if(equipoDeJugador?.id == 49) fondoColor = '#0e420e';
                            if(equipoDeJugador?.id == 46) fondoColor = '#4c1111';

                            return (
                                <div key={jugador.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                                    <div className="card" style={{ backgroundImage: `url('${VITE_URL}/${equipoDeJugador?.imagen}`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'multiply', backgroundColor: fondoColor}}>
                                        <img 
                                            src={`${VITE_URL}/${jugador.imagen}`} 
                                            className="card-img-top img-fluid img-thumbnail" 
                                            alt={jugador.nombre} 
                                        />
                                        <div className="card-body text-light">
                                            <h5 className="card-title text-center">{jugador.nombre} {jugador.apellido}</h5>
                                            <p className="text-center">{equipoDeJugador?.nombre}</p>
                                            <div className="d-flex justify-content-evenly mt-1">
                                                <Link to={`/admin/jugadores/${jugador.id}`} className="btn btn-warning btn-sm text-light mb-1">
                                                    <i className="fa-solid fa-eye"></i>
                                                </Link>
                                                <Link to={`/admin/jugadores/actualizar/${jugador.id}`} onClick={() => onHandleActivePlayer(jugador)} className="btn btn-primary btn-sm text-light mb-1" >
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                </Link>
                                                <button onClick={() => onHandleEliminar(jugador.id)} className="btn btn-danger btn-sm text-light mb-1">
                                                    <i className="fa-solid fa-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
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
