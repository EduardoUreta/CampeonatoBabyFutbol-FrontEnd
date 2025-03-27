import { useDispatch } from "react-redux";
import { getEnvVariables } from "../helpers"
import Swal from "sweetalert2";
import { onAddNewPlayer, onLoadOnePlayer, onLoadPlayers, onSetActivePlayer, onUpdatePlayer } from "../store/jugador/jugadorSlice";
import { useNavigate } from "react-router-dom";

const { VITE_API_URL } = getEnvVariables();

export const useJugadorStore = () => {
    
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const startAddNewPlayer = async({nombre, apellido, EquipoId, instagram, imagen}) => {
    try {
      const formData = new FormData();
      formData.append('nombre', nombre);
      formData.append('apellido', apellido);
      formData.append('EquipoId', EquipoId);
      formData.append('instagram', instagram);
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
        dispatch(onAddNewPlayer({ nombre: nombre, apellido: apellido, EquipoId: EquipoId, instagram: instagram, imagen: imagen }));

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

  const startUpdatePlayer = async ({id, nombre, apellido, edad, apodo, instagram, goles, tarjetas_amarillas, tarjetas_rojas, partidos_jugados, imagen}) => {
    
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
        formData.append('apodo', apodo || dataGet.apodo);
        formData.append('instagram', instagram || dataGet.instagram);
        formData.append('goles', goles || dataGet.goles);
        formData.append('tarjetas_amarillas', tarjetas_amarillas || dataGet.tarjetas_amarillas);
        formData.append('tarjetas_rojas', tarjetas_rojas || dataGet.tarjetas_rojas);
        formData.append('partidos_jugados', partidos_jugados || dataGet.partidos_jugados);
        formData.append('tipo', 'jugador');

        if (imagen) {
            formData.append("imagen", imagen);
        } else {
            formData.append('imagen', dataGet.imagen);
        };

        formData.forEach((value, key) => {
          console.log(`${key}: ${value}`);
        });

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
                // navigate('/admin/jugadores/listar');
                
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

  const startSetActivePlayer = async(jugador) => {
    dispatch(onSetActivePlayer(jugador));
  };

  return {
    startAddNewPlayer,
    startLoadPlayers,
    startLoadOnePlayer,
    startUpdatePlayer,
    startDeletePlayer,
    startSetActivePlayer
  }
}
