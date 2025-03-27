import { useSelector } from "react-redux";
import { useEquipoStore, useEstadisticaStore, useJugadorStore, useResultadoStore } from "../../../hooks";
import { Banner } from "../../components/Banner"
import { CampeonatoNavbar } from "../../components/CampeonatoNavbar"
import { useEffect } from "react";

export const HomePage = () => {

  const { startLoadResults, startLoadOneResult, startSetActiveTeams, startSetActiveResult } = useResultadoStore();
  const { startLoadTeams } = useEquipoStore();
  const { startLoadPlayers, startSetActivePlayer } = useJugadorStore();
  const { startLoadStats, startSetActiveStat } = useEstadisticaStore();

  const { equipos, equipoActivo } = useSelector(state => state.equipo);
  const { resultadoActivo } = useSelector(state => state.resultado);
  const { jugadores, jugadorActivo } = useSelector(state => state.jugador);
  const { estadisticas, estadisticaActivo } = useSelector(state => state.estadistica);

  useEffect(() => {
    startLoadTeams();
    startLoadPlayers();
    startLoadStats();
    startLoadResults();
  }, []);

  return (
    <>
        <CampeonatoNavbar/>
        <Banner/>
        <h1>HomePage</h1>
    </>
  )
}
