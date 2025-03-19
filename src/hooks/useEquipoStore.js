import { useDispatch } from "react-redux";
import { getEnvVariables } from "../helpers"
import Swal from "sweetalert2";
import { onAddNewTeam, onLoadTeams } from "../store/equipo/equipoSlice";

const { VITE_API_URL } = getEnvVariables();

export const useEquipoStore = () => {
    
  const dispatch = useDispatch();

  const startAddNewTeam = async({nombre, imagen}) => {
    try {
      const formData = new FormData();
      formData.append('nombre', nombre);
      formData.append('imagen', imagen); 

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

  return {
    startAddNewTeam,
    startLoadTeams
  }
}
