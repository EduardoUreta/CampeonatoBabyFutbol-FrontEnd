import { useNavigate, useParams } from "react-router-dom";
import { useEquipoStore, useForm } from "../../../../hooks";
import '../../pages/ContenidoPages.css';

const equipoInitialValue = {
  equipoNombre: '',
  equipoImagen: null
};

export const ActualizarEquipo = () => {

  const { equipoNombre, equipoImagen, onInputChange } = useForm(equipoInitialValue);

  const { startUpdateTeam } = useEquipoStore();

  const { id } = useParams();

  const navigate = useNavigate();

  const onNavigateBack = () => {
    navigate('/admin/equipos/listar');
  };

  const onForm = (e) => {
    e.preventDefault();
    startUpdateTeam({id: id, nombre: equipoNombre, imagen: equipoImagen});
    setTimeout(() => {
      navigate('/admin/equipos');
    }, 2000);
  };

  const onHandleFile = (e) => {
    const file = e.target.files[0];
    onInputChange({ target: { name: 'equipoImagen', value: file } });   
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
              <h3 className="text-center">ACTUALIZA EQUIPO: </h3>
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
                value="Actualizar"
              />
            </div>
            
          </form>
        </div>
      </div>
    </div>
  )
}
