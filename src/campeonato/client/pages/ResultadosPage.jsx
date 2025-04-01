import { CampeonatoNavbar } from "../../components/CampeonatoNavbar";
import { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEquipoStore, useEstadisticaStore, useJugadorStore, useResultadoStore } from "../../../hooks";
import { getEnvVariables } from "../../../helpers";

export const ResultadosPage = () => {

    const { resultados } = useSelector(state => state.resultado);
    const { equipos } = useSelector(state => state.equipo);
    const { estadisticas } = useSelector(state => state.estadistica);
    const { jugadores } = useSelector(state => state.jugador);

    const { startLoadResults, startDeleteResult, startSetActiveTeams, startSetActiveResult, cargandoResultado } = useResultadoStore();
    const { startLoadTeams } = useEquipoStore();
    const { startLoadStats, startSetActiveStat } = useEstadisticaStore();
    const { startLoadPlayers } = useJugadorStore();

    const { VITE_API_URL, VITE_URL } = getEnvVariables();

    useEffect(() => {
        startLoadResults();
        startLoadTeams();
        startLoadStats();
        startLoadPlayers();

        window.AOS.init({
            duration: 2000,
            easing: 'ease-in-out',
        });

    }, []);

    const onHandleActiveTeams = ([equipoUno, equipoDos]) => {
        startSetActiveTeams([equipoUno, equipoDos]);
        startSetActiveResult([equipoUno, equipoDos]);
    };

    if (cargandoResultado) {
        return <Spinner animation="border" />;
    }

    const resultadosOrdenados = [...resultados].sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

    return (
        <>
            <CampeonatoNavbar />

            <div id="ContenedorPrincipal">
                <div className="container">
                    <h1 className="text-center p-3" style={{ fontFamily: 'campus' }}>RESULTADOS</h1>
                    {resultados.length !== 0 ? (
                        resultadosOrdenados.map((resultado, index) => {
                            const equipoUno = equipos.find(equipo => equipo.id === resultado.equipo_uno);
                            const equipoDos = equipos.find(equipo => equipo.id === resultado.equipo_dos);

                            // Filtramos las estadísticas para obtener los goles de cada equipo
                            const estadisticasEquipoUno = estadisticas.filter((estadistica) => 
                                estadistica.partido_id === resultado.id && estadistica.equipo_id === resultado.equipo_uno);
                            const estadisticasEquipoDos = estadisticas.filter((estadistica) => 
                                estadistica.partido_id === resultado.id && estadistica.equipo_id === resultado.equipo_dos);

                            // Filtramos los jugadores que hicieron goles
                            const jugadoresGolesEquipoUno = estadisticasEquipoUno
                                .flatMap((estadistica) => {
                                    const jugador = jugadores.find(jugador => jugador.id === estadistica.jugador_id);
                                    // Si el jugador hizo goles, repetimos su nombre tantas veces como goles haya hecho
                                    return Array(estadistica.goles).fill(
                                        <span><br/><i className="fa-solid fa-futbol"></i> {jugador?.nombre} {jugador?.apellido}</span>
                                    );
                                });

                            const jugadoresGolesEquipoDos = estadisticasEquipoDos
                                .flatMap((estadistica) => {
                                    const jugador = jugadores.find(jugador => jugador.id === estadistica.jugador_id);
                                    // Repetimos el nombre del jugador tantas veces como goles haya hecho
                                    return Array(estadistica.goles).fill(
                                        <span><br/><i className="fa-solid fa-futbol"></i> {jugador?.nombre} {jugador?.apellido}</span>
                                    );
                                });

                            return (
                                <div key={resultado.id} className="row p-3" data-aos="fade-up" data-aos-delay={index*100} >
                                    <div className="col-lg-12 col-md-12 col-sm-12 mx-auto mb-4">
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
                                                    <p>{jugadoresGolesEquipoUno}</p>
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
                                                    <p>{jugadoresGolesEquipoDos}</p>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="col-12 text-center">
                            <p>No hay resultados disponibles.</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
