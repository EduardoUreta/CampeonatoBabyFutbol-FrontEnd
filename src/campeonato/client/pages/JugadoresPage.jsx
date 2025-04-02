import { useSelector } from "react-redux"
import { CampeonatoNavbar } from "../../components/CampeonatoNavbar"
import { useEffect, useState } from "react";
import { useEquipoStore, useJugadorStore } from "../../../hooks";
import bannerImage from '../../../assets/img/bannerFondoJugadoresCard.webp';
import { getEnvVariables } from "../../../helpers";

export const JugadoresPage = () => {

    const [ busqueda, setBusqueda ] = useState('');

    const { jugadores } = useSelector(state => state.jugador);
    const { equipos } = useSelector(state => state.equipo);
    const { startLoadPlayers } = useJugadorStore();
    const { startLoadTeams } = useEquipoStore();

    const { VITE_API_URL, VITE_URL  } = getEnvVariables();

    const handleChangeNombre = (e) => {
        setBusqueda(e.target.value)
    };

    const filtroBusquedaNombre = jugadores.filter((jugador) => {
        return jugador?.nombre?.toLowerCase().includes(busqueda.toLowerCase());
    });

    useEffect(() => {
        startLoadTeams();
        startLoadPlayers();

        window.AOS.init({
            duration: 2000,
            easing: 'ease-in-out',
        });

    }, []);

    return (
        <>
            <CampeonatoNavbar/>

            <div id="ContenedorPrincipal">
                <div className="container">
                    <div className="d-flex justify-content-between">
                        <div>
                        </div>
                        <div></div>
                        <div className="mt-2 mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Busca un jugador"
                                value={busqueda}
                                onChange={handleChangeNombre}
                            />
                        </div>
                    </div>
                </div>

                <div className="text-center" style={{ fontFamily: 'campus'}}>
                    <h1>Jugadores</h1>
                </div>
            {
                (filtroBusquedaNombre.length > 0) 
                ? 
                (
                    filtroBusquedaNombre.map((jugador, index) => {
                        return (
                            <div key={jugador.id} className="row" style={{ fontFamily: 'Pitcher' }} data-aos="fade-up" data-aos-delay={index * 100}>
                                <div className="col-md-8 mt-3 mb-3 w-75">
                                    <div className="card">
                                        <div className="card-body" style={{ backgroundImage: `url(${bannerImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

                                            <div className="row">
                                                <div className="col-md-4 col-sm-12 text-center">
                                                    <img
                                                        src={(!jugador.imagen) ? `${VITE_URL}/${jugador.imagen}` : 'https://png.pngtree.com/png-vector/20220807/ourmid/pngtree-man-avatar-wearing-gray-suit-png-image_6102786.png'}
                                                        alt={jugador.nombre}
                                                        className="img-fluid card-img img-thumbnail w-50"
                                                    />
                                                    <h4 className="text-warning mt-1">{jugador.nombre} <br /> {jugador.apellido}</h4>
                                                </div>
                                                <div className="col-md-4 col-sm-12 text-center text-light">
                                                    <h5>Equipo: {equipos.find(e => e.id === jugador.EquipoId)?.nombre}</h5>
                                                    <h5>Apodo: {jugador.apodo}</h5>
                                                    <h5>Edad: {jugador.edad} años</h5>
                                                </div>
                                                <div className="col-md-4 col-sm-12 text-center text-light">
                                                    <h5>Goles: {jugador.goles}</h5>
                                                    <h5>Amarillas: {jugador.tarjetas_amarillas}</h5>
                                                    <h5>Rojas: {jugador.tarjetas_rojas}</h5>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )
                : 
                (filtroBusquedaNombre.length == 0) 
                ? 
                (
                    <div className="container text-center mt-5 text-warning" style={{ fontFamily: 'Pitcher' }} data-aos="fade-up" data-aos-delay="1000">
                        <h1>No hay jugadores <br/>que incluyan <br/>{busqueda}</h1>
                    </div>
                )
                :
                (
                    jugadores.map((jugador, index) => {
                        return (
                        <div key={jugador.id} className="row" style={{ fontFamily: 'Pitcher'}} data-aos="fade-up" data-aos-delay={index * 100}>
                            <div className="col-md-8 mt-3 mb-3 w-75">
                                <div className="card">
                                    <div className="card-body" style={{ backgroundImage: `url(${bannerImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                        
                                        <div className="row">
                                            <div className="col-md-4 col-sm-12 text-center">
                                                <img
                                                    src={(!jugador.imagen) ? `${VITE_API_URL}/${jugador.imagen}` : 'https://png.pngtree.com/png-vector/20220807/ourmid/pngtree-man-avatar-wearing-gray-suit-png-image_6102786.png'}
                                                    alt={jugador.nombre}
                                                    className="img-fluid card-img img-thumbnail w-50"
                                                />
                                                <h4 className="text-warning mt-1">{jugador.nombre} <br /> {jugador.apellido}</h4>
                                            </div>
                                            <div className="col-md-4 col-sm-12 text-center text-light">
                                                <h5>Equipo: {equipos.find(e => e.id === jugador.EquipoId)?.nombre}</h5>
                                                <h5>Apodo: {jugador.apodo}</h5>
                                                <h5>Edad: {jugador.edad} años</h5>
                                            </div>
                                            <div className="col-md-4 col-sm-12 text-center text-light">
                                                <h5>Goles: {jugador.goles}</h5>
                                                <h5>Amarillas: {jugador.tarjetas_amarillas}</h5>
                                                <h5>Rojas: {jugador.tarjetas_rojas}</h5>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    )})
                )
            }
            </div>
        </>
    )
}
