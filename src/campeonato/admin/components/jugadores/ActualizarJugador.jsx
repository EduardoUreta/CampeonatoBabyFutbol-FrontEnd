import { useNavigate, useParams } from "react-router-dom";
import { useJugadorStore, useForm } from "../../../../hooks";
import '../../pages/ContenidoPages.css';

const jugadorInitialValue = {
  jugadorNombre: '',
  jugadorApellido: '',
  jugadorEdad: '',
  jugadorImagen: null
};

export const ActualizarJugador = () => {

  const { jugadorNombre, jugadorApellido, jugadorEdad, jugadorImagen, onInputChange } = useForm(jugadorInitialValue);

  const { startUpdatePlayer } = useJugadorStore();

  const { id } = useParams();

  const navigate = useNavigate();

  const onNavigateBack = () => {
    navigate(-1);
  };

  const onForm = (e) => {
    e.preventDefault();
    if(!jugadorNombre && !jugadorApellido && !jugadorEdad && jugadorImagen == null) return;
    startUpdatePlayer({id: id, nombre: jugadorNombre, apellido: jugadorApellido, edad: jugadorEdad, imagen: jugadorImagen});
  };

  const onHandleFile = (e) => {
    const file = e.target.files[0];
    onInputChange({ target: { name: 'jugadorImagen', value: file } });   
  };
  
  return (
    <div id ="Contenido">
      <div className="container">
        <div className="row p-3">
          <form onSubmit={onForm} encType="multipart/form-data">
            <div className="d-flex justify-content-between">
              <div onClick={onNavigateBack}>
                <i className="fa-solid fa-arrow-left btn btn-primary"></i>
              </div>
              <h3 className="text-center">ACTUALIZAR JUGADOR: </h3>
              <div></div>
            </div>
            <div className="form-group mb-2">
              <label>Nombre: </label>
              <input
                type="text"
                className="form-control"
                placeholder="Ingresa el nombre del jugador"
                name='jugadorNombre'
                minLength={5}
                value={jugadorNombre}
                onChange={onInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <label>Apellido: </label>
              <input
                type="text"
                className="form-control"
                placeholder="Ingresa el apellido del jugador"
                name='jugadorApellido'
                minLength={5}
                value={jugadorApellido}
                onChange={onInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <label>Edad: </label>
              <input
                type="number"
                className="form-control"
                placeholder="Ingresa la edad del jugador"
                name='jugadorEdad'
                min={15}
                max={60}
                value={jugadorEdad}
                onChange={onInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <label>Imagen: </label>
              <input
                type="file"
                className="form-control"
                name='jugadorImagen'
                minLength={5}
                onChange={onHandleFile}
              />
            </div>
            
            <div className="form-group mb-2 text-center">
              <input
                type="submit"
                className="btnSubmit"
                value="Actualizar"
              />
            </div>
            
          </form>
        </div>
      </div>
    </div>
  )
}
