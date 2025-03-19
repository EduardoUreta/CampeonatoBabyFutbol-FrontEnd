import { useDispatch } from "react-redux";
import { getEnvVariables } from "../helpers"
import Swal from "sweetalert2";
import { onAddNewPlayer, onLoadOnePlayer, onLoadPlayers, onUpdatePlayer } from "../store/jugador/jugadorSlice";

const { VITE_API_URL } = getEnvVariables();

export const useJugadorStore = () => {
    
  const dispatch = useDispatch();

  const startAddNewPlayer = async({nombre, apellido, edad, imagen}) => {
    try {
      const formData = new FormData();
      formData.append('nombre', nombre);
      formData.append('apellido', apellido);
      formData.append('edad', edad);
      formData.append('imagen', imagen); 

      const response = await fetch(`${VITE_API_URL}/jugador/crear`, {
        method: "POST",
        body: formData, 
        credentials: 'include', 
      });    

      if (!response.ok) {
        throw new Error('Error al crear el jugador');
      }
        
      if(response.ok) {
        dispatch(onAddNewPlayer({ nombre: nombre, imagen: imagen }));

        Swal.fire({
            icon: "success",
            title: "Has creado el jugador correctamente",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error al crear un jugador",
        });
      }
    } catch (error) {
      console.error("Error creando un jugador: ", error);
      Swal.fire({
        icon: "error",
        title: "Error creando un jugador",
      });
    }
  };

  const startLoadPlayers = async() => {
    try {
      const response = await fetch(`${VITE_API_URL}/jugador`, {
        method: "GET",
        credentials: 'include',
      });
      
      if(response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch(onLoadPlayers(data));
      }

    } catch (error) {
      console.error("Error cargando jugadors: ", error);
    }
  };

  const startLoadOnePlayer = async (id) => {
    try {
      const response = await fetch(`${VITE_API_URL}/jugador/${id}`, {
        method: "GET",
        credentials: 'include',
      });
      
      if(response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch(onLoadOnePlayer(data));
      }
    } catch (error) {
      console.error("Error cargando jugadors: ", error);
    }
  };

  const startUpdatePlayer = async ({id, nombre, apellido, edad, imagen}) => {
    
    try {
        const responseGet = await fetch(`${VITE_API_URL}/jugador/${id}`, {
            method: "GET",
            credentials: 'include',
        });

        const dataGet = await responseGet.json();
        
        const formData = new FormData();
        formData.append('nombre', nombre || dataGet.nombre);
        formData.append('apellido', apellido || dataGet.apellido);
        formData.append('edad', edad || dataGet.edad);
        formData.append('tipo', 'jugador');

        if (imagen) {
            formData.append("imagen", imagen);
        } else {
            formData.append('imagen', dataGet.imagen);
        };

        try {
            const responsePut = await fetch(`${VITE_API_URL}/jugador/${id}`, {
            method: "PUT",
            body: formData,
            credentials: 'include',
            });     
            
            if(responsePut.ok) {
                const data = await responsePut.json();
                console.log(data);
                dispatch(onUpdatePlayer(data));
                Swal.fire({
                    icon: "success",
                    title: "Has actualizado al jugador correctamente",
                });
            }
        } catch (error) {
            console.error("Error actualizando jugador: ", error);
        };

    } catch (error) {
      console.error("Error cargando jugador: ", error);
    }
  };

  const startDeletePlayer = async(id) => {
    try {
      await fetch(`${VITE_API_URL}/jugador/${id}`, {
        method: "DELETE",
        credentials: 'include',
      });

    } catch (error) {
      console.error("Error eliminado al jugador: ", error);
    }
  };

  return {
    startAddNewPlayer,
    startLoadPlayers,
    startLoadOnePlayer,
    startUpdatePlayer,
    startDeletePlayer
  }
}
