import { useEquipoStore, useForm } from "../../../../hooks";

const equipoInitialValue = {
  equipoNombre: '',
  equipoImagen: null
};

export const AgregarEquipo = () => {

  const { equipoNombre, equipoImagen, onInputChange, onResetForm } = useForm(equipoInitialValue);

  const { startAddNewTeam } = useEquipoStore();

  const onForm = (e) => {
    e.preventDefault();
    startAddNewTeam({nombre: equipoNombre, imagen: equipoImagen});
  };

  const onHandleFile = (e) => {
    const file = e.target.files[0];
    onInputChange({ target: { name: 'equipoImagen', value: file } });
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <form onSubmit={onForm}>
            <h5 className="text-center">REGISTRA UN NUEVO EQUIPO</h5>
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
    </>
  )
}
