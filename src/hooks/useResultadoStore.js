import { useDispatch } from "react-redux";
import { getEnvVariables } from "../helpers"
import Swal from "sweetalert2";
import { onAddNewResult, onLoadOneResult, onLoadResults, onSetActiveResult, onUpdateResult } from "../store/resultado/resultadoSlice";
import { onSetActiveTeam } from "../store/equipo/equipoSlice";
import { useNavigate } from "react-router-dom";

const { VITE_API_URL } = getEnvVariables();

export const useResultadoStore = () => {
    
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const startAddNewResult = async({equipo_uno, goles_equipo_uno, equipo_dos, goles_equipo_dos, fecha, ronda, resultado}) => {
    try {

      const response = await fetch(`${VITE_API_URL}/partido/crear`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({equipo_uno, goles_equipo_uno, equipo_dos, goles_equipo_dos, fecha, ronda, resultado}), 
        credentials: 'include', 
      });

      if (!response.ok) {
        throw new Error('Error al crear el resultado');
      }
        
      if(response.ok) {
        dispatch(onAddNewResult(equipo_uno, goles_equipo_uno, equipo_dos, goles_equipo_dos, fecha, ronda, resultado));        
        Swal.fire({
            icon: "success",
            title: "Has creado el resultado correctamente",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error al crear un resultado",
        });
      }
    } catch (error) {
      console.error("Error creando un resultado: ", error);
    }
  };

  const startLoadResults = async() => {
    try {
      const response = await fetch(`${VITE_API_URL}/partido`, {
        method: "GET",
        credentials: 'include',
      });
      
      if(response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch(onLoadResults(data));
      }

    } catch (error) {
      console.error("Error cargando resultados: ", error);
    }
  };

  const startLoadOneResult = async (id) => {
    try {
      const response = await fetch(`${VITE_API_URL}/partido/${id}`, {
        method: "GET",
        credentials: 'include',
      });
      
      if(response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch(onLoadOneResult(data));
      }
    } catch (error) {
      console.error("Error cargando resultados: ", error);
    }
  };

  const startUpdateResult = async ({id, equipo_uno, goles_equipo_uno, equipo_dos, goles_equipo_dos, ronda, resultado}) => {
    try {
      const responseGet = await fetch(`${VITE_API_URL}/partido/${id}`, {
        method: "GET",
        credentials: 'include',
      });

      const dataGet = await responseGet.json();    

      try {
        const responsePut = await fetch(`${VITE_API_URL}/partido/${id}`, {
          method: "PUT",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({equipo_uno, goles_equipo_uno, equipo_dos, goles_equipo_dos, ronda, resultado}), 
          credentials: 'include',
        });     
        
        if(responsePut.ok) {
          const data = await responsePut.json();
          console.log(data);
          dispatch(onUpdateResult(data));
          Swal.fire({
            icon: "success",
            title: "Has actualizado el resultado correctamente",
          });
          navigate('/admin/resultados/listar');
        } else {
          Swal.fire({
            icon: "error",
            title: "Error actualizando el resultado",
            text: "Por favor, intentelo más tarde",
          });
        }
      } catch (error) {
        console.error("Error actualizando resultado: ", error);
      }

    } catch (error) {
      console.error("Error cargando resultado: ", error);
    }
  };

  const startDeleteResult = async(id) => {
    try {
      await fetch(`${VITE_API_URL}/partido/${id}`, {
        method: "DELETE",
        credentials: 'include',
      });

    } catch (error) {
      console.error("Error eliminado al resultado: ", error);
    }
  };

  const startSetActiveResult = (id) => {
    dispatch(onSetActiveResult(id));
  };  

  const startSetActiveTeams = async([teamOne, teamTwo]) => {
    dispatch(onSetActiveTeam([teamOne, teamTwo]));
  };


  return {
    startAddNewResult,
    startLoadResults,
    startLoadOneResult,
    startUpdateResult,
    startDeleteResult,
    startSetActiveTeams,
    startSetActiveResult
  }
}
