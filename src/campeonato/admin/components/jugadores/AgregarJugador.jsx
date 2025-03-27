import { useNavigate } from "react-router-dom";
import { useJugadorStore, useForm, useEquipoStore } from "../../../../hooks";
import '../../pages/ContenidoPages.css';
import { useSelector } from "react-redux";
import { useEffect } from "react";

const jugadorInitialValue = {
  jugadorNombre: '',
  jugadorApellido: '',
  jugadorInstagram: '',
  jugadorEquipo: '',
  jugadorImagen: null
};

export const AgregarJugador = () => {
  
  const navigate = useNavigate();
  const { jugadorNombre, jugadorApellido, jugadorInstagram, jugadorEquipo, jugadorImagen, onInputChange, onResetForm } = useForm(jugadorInitialValue);

  const { startAddNewPlayer } = useJugadorStore();
  const { startLoadTeams } = useEquipoStore();

  const { equipos } = useSelector(state => state.equipo);
  
  useEffect(() => {
    startLoadTeams();
  }, []);
  
  const onForm = (e) => {
    e.preventDefault();
    startAddNewPlayer({nombre: jugadorNombre, apellido: jugadorApellido, EquipoId: jugadorEquipo, instagram: jugadorInstagram, imagen: jugadorImagen});
    navigate('/admin/jugadores');
  };
  
  const onHandleFile = (e) => {
    const file = e.target.files[0];
    onInputChange({ target: { name: 'jugadorImagen', value: file } });
  };
  
  const onNavigateBack = () => {
    navigate(-1);
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

            {
              (equipos.length > 0 ) &&
              <div className="form-group mb-2">
                <label>Equipo: </label>
                <select
                  className="form-control"
                  name="jugadorEquipo"
                  value={jugadorEquipo}
                  onChange={onInputChange}
                  required
                >
                  <option value="" disabled>Selecciona equipo del jugador</option>
                  {equipos.map((equipo) => (
                    <option key={equipo.id} value={equipo.id}>
                      {equipo.nombre}
                    </option>
                  ))}
                </select>
              </div>
            }
            
            <div className="form-group mb-2">
              <label>Instagram: </label>
              <input
                type="text"
                className="form-control"
                placeholder="Ingresa el instagram del jugador"
                name='jugadorInstagram'
                value={jugadorInstagram}
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
