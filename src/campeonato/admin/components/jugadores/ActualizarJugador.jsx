import { useNavigate, useParams } from "react-router-dom";
import { useJugadorStore, useForm } from "../../../../hooks";
import '../../pages/ContenidoPages.css';
import { useSelector } from "react-redux";
import { useEffect } from "react";

const jugadorInitialValue = {
  jugadorNombre: '',
  jugadorApellido: '',
  jugadorEdad: '',
  jugadorApodo: '',
  jugadorInstagram: '',
  jugadorImagen: null
};

export const ActualizarJugador = () => {
  const { jugadorNombre, jugadorApellido, jugadorEdad, jugadorApodo, jugadorInstagram, jugadorImagen, setFormState, onInputChange } = useForm(jugadorInitialValue);
  const { startUpdatePlayer, startLoadOnePlayer, startSetActivePlayer } = useJugadorStore();
  const { jugadorActivo } = useSelector(state => state.jugador);
  const { id } = useParams();
  const navigate = useNavigate();

  const onNavigateBack = () => {
    navigate('/admin/jugadores/listar');
  };

  const onForm = (e) => {
    e.preventDefault();
    if (!jugadorNombre && !jugadorApellido && !jugadorEdad && !jugadorApodo && !jugadorInstagram && jugadorImagen == null) return;
    startUpdatePlayer({ id, nombre: jugadorNombre, apellido: jugadorApellido, edad: jugadorEdad, apodo: jugadorApodo, instagram: jugadorInstagram, imagen: jugadorImagen });
  };

  const onHandleFile = (e) => {
    const file = e.target.files[0];
    onInputChange({ target: { name: 'jugadorImagen', value: file } });
  };

  useEffect(() => {
    if (!jugadorActivo) {
      startLoadOnePlayer(id);
      startSetActivePlayer(jugadorActivo);
    }
  }, [id]);

  useEffect(() => {
    if (jugadorActivo) {
      setFormState({
        jugadorNombre: jugadorActivo?.nombre,
        jugadorApellido: jugadorActivo?.apellido,
        jugadorEdad: jugadorActivo?.edad,
        jugadorApodo: jugadorActivo?.apodo,
        jugadorInstagram: jugadorActivo?.instagram,
        jugadorImagen: null,
      });

    }
  }, [jugadorActivo, setFormState]);

  if (!jugadorActivo) return <p>Cargando jugador...</p>;

  return (
    <div id="Contenido">
      <div className="container">
        <div className="row p-3">
          <form onSubmit={onForm} encType="multipart/form-data">
            <div className="d-flex justify-content-between">
              <div onClick={onNavigateBack}>
                <i className="fa-solid fa-arrow-left btn btn-primary"></i>
              </div>
              <h3 className="text-center">ACTUALIZAR JUGADOR:</h3>
              <div></div>
            </div>

            <div className="row">
              <div className="col-md-6 form-group mb-2">
                <label>Nombre: </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ingresa el nombre del jugador"
                  name="jugadorNombre"
                  minLength={5}
                  value={jugadorNombre}
                  onChange={onInputChange}
                />
              </div>

              <div className="col-md-6 form-group mb-2">
                <label>Apellido: </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ingresa el apellido del jugador"
                  name="jugadorApellido"
                  minLength={5}
                  value={jugadorApellido}
                  onChange={onInputChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 form-group mb-2">
                <label>Edad: </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Ingresa la edad del jugador"
                  name="jugadorEdad"
                  min={15}
                  max={60}
                  value={jugadorEdad}
                  onChange={onInputChange}
                />
              </div>

              <div className="col-md-6 form-group mb-2">
                <label>Apodo: </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ingresa el apodo del jugador"
                  name="jugadorApodo"
                  minLength={5}
                  value={jugadorApodo}
                  onChange={onInputChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 form-group mb-2">
                <label>Instagram: </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ingresa el instagram del jugador"
                  name="jugadorInstagram"
                  minLength={5}
                  value={jugadorInstagram}
                  onChange={onInputChange}
                />
              </div>

              <div className="col-md-6 form-group mb-2">
                <label>Imagen: </label>
                <input
                  type="file"
                  className="form-control"
                  name="jugadorImagen"
                  onChange={onHandleFile}
                />
              </div>
            </div>

            <div className="form-group mb-2 text-center">
              <input type="submit" className="btnSubmit" value="Actualizar" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
