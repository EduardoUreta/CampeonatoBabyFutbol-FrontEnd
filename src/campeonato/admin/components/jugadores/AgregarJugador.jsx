import { useNavigate } from "react-router-dom";
import { useJugadorStore, useForm } from "../../../../hooks";
import '../../pages/ContenidoPages.css';

const jugadorInitialValue = {
  jugadorNombre: '',
  jugadorApellido: '',
  jugadorEdad: '',
  jugadorImagen: null
};

export const AgregarJugador = () => {

  const { jugadorNombre, jugadorApellido, jugadorEdad, jugadorImagen, onInputChange, onResetForm } = useForm(jugadorInitialValue);

  const { startAddNewPlayer } = useJugadorStore();

  const navigate = useNavigate();

  const onNavigateBack = () => {
    navigate(-1);
  };

  const onForm = (e) => {
    e.preventDefault();
    startAddNewPlayer({nombre: jugadorNombre, apellido: jugadorApellido, edad: jugadorEdad, imagen: jugadorImagen});
  };

  const onHandleFile = (e) => {
    const file = e.target.files[0];
    onInputChange({ target: { name: 'jugadorImagen', value: file } });
  };

  return (
    <div id ="Contenido">
      <div className="container">
        <div className="row p-3">
          <form onSubmit={onForm}>
            <div className="d-flex justify-content-between">
              <div onClick={onNavigateBack}>
                <i className="fa-solid fa-arrow-left btn btn-primary"></i>
              </div>
              <h3 className="text-center">REGISTRA UN NUEVO JUGADOR</h3>
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
                required
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
                required
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
                required
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
                value="Crear Jugador"
              />
            </div>
            
            <div className="form-group mb-2 text-center ">
              <input
                  type="submit"
                  className="btnSubmit"
                  value="Limpiar"
                  onClick={onResetForm}
                  style={{ background: 'gray'}}
              />
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}
