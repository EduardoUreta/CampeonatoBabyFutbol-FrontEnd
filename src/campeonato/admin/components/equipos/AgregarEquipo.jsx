import { useNavigate } from "react-router-dom";
import { useEquipoStore, useForm } from "../../../../hooks";
import '../../pages/ContenidoPages.css';

const equipoInitialValue = {
  equipoNombre: '',
  equipoImagen: null
};

export const AgregarEquipo = () => {

  const { equipoNombre, equipoImagen, onInputChange, onResetForm } = useForm(equipoInitialValue);

  const { startAddNewTeam } = useEquipoStore();

  const navigate = useNavigate();

  const onNavigateBack = () => {
    navigate(-1);
  };

  const onForm = (e) => {
    e.preventDefault();
    startAddNewTeam({nombre: equipoNombre, imagen: equipoImagen});
    navigate('/admin/equipos');
  };

  const onHandleFile = (e) => {
    const file = e.target.files[0];
    onInputChange({ target: { name: 'equipoImagen', value: file } });
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
              <h3 className="text-center">REGISTRA UN NUEVO EQUIPO</h3>
              <div></div>
            </div>
            <div className="form-group mb-2">
              <label>Nombre: </label>
              <input
                type="text"
                className="form-control"
                placeholder="Ingresa el nombre del equipo"
                name='equipoNombre'
                minLength={5}
                value={equipoNombre}
                onChange={onInputChange}
                required
              />
            </div>

            <div className="form-group mb-2">
              <label>Imagen: </label>
              <input
                type="file"
                className="form-control"
                name='equipoImagen'
                minLength={5}
                onChange={onHandleFile}
              />
            </div>
            
            <div className="form-group mb-2 text-center">
              <input
                type="submit"
                className="btnSubmit"
                value="Crear Equipo"
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
