import { useSelector } from "react-redux";
import { useEquipoStore, useJugadorStore } from "../../../hooks";
import { useEffect, useState } from "react";
import "../style/style.css";
import { getEnvVariables } from "../../../helpers";
import Pagination from "react-bootstrap/Pagination";

export const GoleadoresPage = () => {
  const { jugadores } = useSelector((state) => state.jugador);
  const { equipos } = useSelector((state) => state.equipo);

  const { startLoadPlayers } = useJugadorStore();
  const { startLoadTeams } = useEquipoStore();

  const { VITE_URL } = getEnvVariables();

  useEffect(() => {
    startLoadPlayers();
    startLoadTeams();
  }, []);

  // Filtramos jugadores con goles y los ordenamos
  const goleadores = jugadores.filter((j) => j.goles > 0);
  const ordenarGoleadores = goleadores.sort((a, b) => b.goles - a.goles);

  // Paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 6;

  const indexUltimoGoleador = paginaActual * itemsPorPagina;
  const indexPrimerGoleador = indexUltimoGoleador - itemsPorPagina;
  const itemActual = ordenarGoleadores.slice(indexPrimerGoleador, indexUltimoGoleador);

  const totalPage = Math.ceil(ordenarGoleadores.length / itemsPorPagina);

  return (
    <div className="container">
      <div className="pt-4">
        <h1 className="text-center text-warning" style={{ fontFamily: "campus" }}>
          Goleadores
        </h1>
      </div>
      <div className="row">
        <div className="col-md-10 mx-auto">
          <div>
            <table className="table table-bordered mt-4 stylish-table">
              <thead className="table-dark">
                <tr>
                  <th className="text-center">Jugador</th>
                  <th className="text-center">Goles</th>
                </tr>
              </thead>
              <tbody>
                {ordenarGoleadores.length > 0 ? (
                  itemActual.map((goleador) => (
                    <tr key={goleador.id} className="table-light">
                      <td className="text-center">
                        <img
                          src={`${VITE_URL}/${goleador.imagen}`}
                          className="img-fluid rounded-circle me-2"
                          alt={goleador.nombre}
                          width={40}
                          height={40}
                        />
                        {goleador.nombre} {goleador.apellido}
                      </td>
                      <td className="text-center">{goleador.goles}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="text-center">
                      <p>Aún no hay goleadores.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Paginación */}
            {totalPage > 1 && (
              <Pagination className="justify-content-center">
                <Pagination.First onClick={() => setPaginaActual(1)} disabled={paginaActual === 1} />
                <Pagination.Prev onClick={() => setPaginaActual((prev) => Math.max(prev - 1, 1))} disabled={paginaActual === 1} />

                {[...Array(totalPage)].map((_, index) => (
                  <Pagination.Item key={index + 1} active={index + 1 === paginaActual} onClick={() => setPaginaActual(index + 1)}>
                    {index + 1}
                  </Pagination.Item>
                ))}

                <Pagination.Next onClick={() => setPaginaActual((prev) => Math.min(prev + 1, totalPage))} disabled={paginaActual === totalPage} />
                <Pagination.Last onClick={() => setPaginaActual(totalPage)} disabled={paginaActual === totalPage} />
              </Pagination>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
