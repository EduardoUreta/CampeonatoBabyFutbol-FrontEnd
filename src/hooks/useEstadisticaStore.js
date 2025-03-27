import { useDispatch } from "react-redux";
import { getEnvVariables } from "../helpers"
import Swal from "sweetalert2";
import { onAddNewStat, onLoadOneStat, onLoadStats, onSetActiveStat, onUpdateStat } from "../store/estadistica/estadisticaSlice";

const { VITE_API_URL } = getEnvVariables();

export const useEstadisticaStore = () => {
    
  const dispatch = useDispatch();

  const startAddNewStat = async({partido_id, equipo_id, jugador_id, goles, tarjetas_amarillas, tarjetas_rojas}) => {
    try {

      const response = await fetch(`${VITE_API_URL}/estadistica/crear-varias`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify([{partido_id, equipo_id, jugador_id, goles, tarjetas_amarillas, tarjetas_rojas}]), 
        credentials: 'include', 
      });

      if (!response.ok) {
        throw new Error('Error al crear el estadistica, error Fetch');
      }
        
      if(response.ok) {
        dispatch(onAddNewStat(partido_id, equipo_id, jugador_id, goles, tarjetas_amarillas, tarjetas_rojas)); 
        console.log('Estadistica Creada');       
      } else {
        console.log('Error al crear estadistica');
      }
    } catch (error) {
      console.error("Error creando un estadistica: ", error);
    }
  };

  const startLoadStats = async() => {
    try {
      const response = await fetch(`${VITE_API_URL}/estadistica`, {
        method: "GET",
        credentials: 'include',
      });
      
      if(response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch(onLoadStats(data));
      }

    } catch (error) {
      console.error("Error cargando estadisticas: ", error);
    }
  };

  const startLoadOneStat = async (id) => {
    try {
      const response = await fetch(`${VITE_API_URL}/estadistica/${id}`, {
        method: "GET",
        credentials: 'include',
      });
      
      if(response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch(onLoadOneStat(data));
      }
    } catch (error) {
      console.error("Error cargando estadisticas: ", error);
    }
  };

  const startUpdateStat = async ({id, partido_id, equipo_id, jugador_id, goles, tarjetas_amarillas, tarjetas_rojas}) => {
    try {
      const responseGet = await fetch(`${VITE_API_URL}/estadistica/${id}`, {
        method: "GET",
        credentials: 'include',
      });

      const dataGet = await responseGet.json();    

      try {
        const responsePut = await fetch(`${VITE_API_URL}/estadistica/${id}`, {
          method: "PUT",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({partido_id, equipo_id, jugador_id, goles, tarjetas_amarillas, tarjetas_rojas}), 
          credentials: 'include',
        });     
        
        if(responsePut.ok) {
          const data = await responsePut.json();
          console.log(data);
          dispatch(onUpdateStat(data));
          Swal.fire({
            icon: "success",
            title: "Has actualizado el estadistica correctamente",
          });
        }
      } catch (error) {
        console.error("Error actualizando estadistica: ", error);
      }

    } catch (error) {
      console.error("Error cargando estadistica: ", error);
    }
  };

  const startDeleteStat = async(id) => {
    try {
      await fetch(`${VITE_API_URL}/estadistica/${id}`, {
        method: "DELETE",
        credentials: 'include',
      });

    } catch (error) {
      console.error("Error eliminado al estadistica: ", error);
    }
  };

  const startSetActiveStat = async(stat) => {
    dispatch(onSetActiveStat(stat));
  };


  return {
    startAddNewStat,
    startLoadStats,
    startLoadOneStat,
    startUpdateStat,
    startDeleteStat,
    startSetActiveStat
  }
}
