import { useDispatch } from "react-redux";
import { getEnvVariables } from "../helpers"
import Swal from "sweetalert2";
import { onAddNewTeam, onLoadOneTeam, onLoadTeams, onUpdateTeam } from "../store/equipo/equipoSlice";

const { VITE_API_URL } = getEnvVariables();

export const useEquipoStore = () => {
    
  const dispatch = useDispatch();

  const startAddNewTeam = async({nombre, imagen}) => {
    try {
      const formData = new FormData();
      formData.append('nombre', nombre);
      formData.append('imagen', imagen);
      formData.append('tipo', 'equipo'); 

      const response = await fetch(`${VITE_API_URL}/equipo/`, {
        method: "POST",
        body: formData, 
        credentials: 'include', 
      });

      if (!response.ok) {
        throw new Error('Error al crear el equipo');
      }
        
      if(response.ok) {
        dispatch(onAddNewTeam({ nombre: nombre, imagen: imagen }));
        console.log(imagen);
        
        Swal.fire({
            icon: "success",
            title: "Has creado el equipo correctamente",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error al crear un equipo",
        });
      }
    } catch (error) {
      console.error("Error creando un equipo: ", error);
    }
  };

  const startLoadTeams = async() => {
    try {
      const response = await fetch(`${VITE_API_URL}/equipo`, {
        method: "GET",
        credentials: 'include',
      });
      
      if(response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch(onLoadTeams(data));
      }

    } catch (error) {
      console.error("Error cargando equipos: ", error);
    }
  };

  const startLoadOneTeam = async (id) => {
    try {
      const response = await fetch(`${VITE_API_URL}/equipo/${id}`, {
        method: "GET",
        credentials: 'include',
      });
      
      if(response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch(onLoadOneTeam(data));
      }
    } catch (error) {
      console.error("Error cargando equipos: ", error);
    }
  };

  const startUpdateTeam = async ({id, nombre, ganados, empatados, perdidos, goles_favor, goles_contra, puntos, imagen}) => {
    try {
      const responseGet = await fetch(`${VITE_API_URL}/equipo/${id}`, {
        method: "GET",
        credentials: 'include',
      });

      const dataGet = await responseGet.json();
      
      const formData = new FormData();
      formData.append('nombre', nombre || dataGet.nombre);
      formData.append('ganados', ganados || dataGet.ganados);
      formData.append('empatados', empatados || dataGet.empatados);
      formData.append('perdidos', perdidos || dataGet.perdidos);
      formData.append('goles_favor', goles_favor || dataGet.goles_favor);
      formData.append('goles_contra', goles_contra || dataGet.goles_contra);
      formData.append('puntos', puntos || dataGet.puntos);
      formData.append('tipo', 'equipo');

      if (imagen) {
        formData.append("imagen", imagen);
      } else {
        formData.append('imagen', dataGet.imagen);
      };
     

      try {
        const responsePut = await fetch(`${VITE_API_URL}/equipo/${id}`, {
          method: "PUT",
          body: formData,
          credentials: 'include',
        });     
        
        if(responsePut.ok) {
          const data = await responsePut.json();
          console.log(data);
          dispatch(onUpdateTeam(data));
        }
      } catch (error) {
        console.error("Error actualizando equipo: ", error);
      }

    } catch (error) {
      console.error("Error cargando equipo: ", error);
    }
  };

  const startDeleteTeam = async(id) => {
    try {
      await fetch(`${VITE_API_URL}/equipo/${id}`, {
        method: "DELETE",
        credentials: 'include',
      });

    } catch (error) {
      console.error("Error eliminado al equipo: ", error);
    }
  };


  return {
    startAddNewTeam,
    startLoadTeams,
    startLoadOneTeam,
    startUpdateTeam,
    startDeleteTeam
  }
}
