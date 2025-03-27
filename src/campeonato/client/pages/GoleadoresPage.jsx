import { useSelector } from "react-redux";
import { useEquipoStore, useJugadorStore } from "../../../hooks";
import { useEffect } from "react";
import '../style/style.css';

export const GoleadoresPage = () => {

    const { jugadores } = useSelector(state => state.jugador);
    const { equipos } = useSelector(state => state.equipo);

    const { startLoadPlayers } = useJugadorStore();
    const { startLoadTeams } = useEquipoStore();

    useEffect(() => {
        startLoadPlayers();
        startLoadTeams();
    }, []);

    const goleadores = jugadores.filter(j => j.goles > 0);
    const ordenarGoleadores = goleadores.sort((a, b) => b.goles - a.goles);

    return (
        <>
            <div className="container">
                <div className="pt-4">
                    <h1 className="text-center text-warning" style={{ fontFamily: 'campus '}}>Goleadores</h1>
                </div>
                <div className="row">
                    <div className="col-md-10 mx-auto">
                        <div>
                            <table className="table table-bordered mt-4 stylish-table">
                                <thead className="table-dark">
                                    <tr>
                                        <th className="text-center">Nombre</th>
                                        <th className="text-center">Goles</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    ordenarGoleadores.map((goleador) => {
                                        return (
                                        <tr key={goleador.id} className="table-light">
                                            <td className="text-center"><img src={`http://localhost:3000/${goleador.imagen}`} className="img-fluid rounded-circle" alt={goleador.nombre}/>{goleador.nombre} {goleador.apellido}</td>
                                            <td className="text-center">{goleador.goles}</td>
                                        </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
