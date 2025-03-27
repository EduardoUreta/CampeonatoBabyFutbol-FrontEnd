import { useNavigate } from "react-router-dom";
import { useResultadoStore, useForm, useEquipoStore } from "../../../../hooks";
import '../../pages/ContenidoPages.css';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const resultadoInitialValue = {
  equipo_uno: '',
  goles_equipo_uno: '',
  equipo_dos: '',
  goles_equipo_dos: '',
  fecha: '',
  ronda: '',
  resultado: ''
};

export const AgregarResultado = () => {

  const { equipo_uno, goles_equipo_uno, equipo_dos, goles_equipo_dos, fecha, ronda, resultado, onInputChange } = useForm(resultadoInitialValue);

  const [marcador, setMarcador] = useState({
    equipo_uno: '',
    goles_equipo_uno: '',
    imagen_equipo_uno: '',
    equipo_dos: '',
    goles_equipo_dos: '',
    imagen_equipo_dos: ''
  });

  const { startAddNewResult } = useResultadoStore();
  const { startLoadTeams } = useEquipoStore();

  const { equipos } = useSelector(state => state.equipo);

  const navigate = useNavigate();

  const onNavigateBack = () => {
    navigate(-1);
  };

  const onForm = (e) => {
    e.preventDefault();
    const resultadoFinal = `${marcador.goles_equipo_uno}x${marcador.goles_equipo_dos}`;
    startAddNewResult({equipo_uno, goles_equipo_uno, equipo_dos, goles_equipo_dos, fecha, ronda, resultado: resultadoFinal });
    navigate(-1);
  };

  useEffect(() => {
    startLoadTeams();
  }, []);

  useEffect(() => {
    if (equipos.length > 0) {
      const equipoUno = equipos.find(equipo => equipo.id === Number(equipo_uno)); 
      const equipoDos = equipos.find(equipo => equipo.id === Number(equipo_dos)); 

      setMarcador({
        equipo_uno: equipoUno?.nombre,
        goles_equipo_uno: goles_equipo_uno,
        imagen_equipo_uno: equipoUno?.imagen,
        equipo_dos: equipoDos?.nombre,
        goles_equipo_dos: goles_equipo_dos,
        imagen_equipo_dos: equipoDos?.imagen
      });
    }
  }, [equipo_uno, goles_equipo_uno, equipo_dos, goles_equipo_dos, equipos]);

  const rondas = ['Fecha 1', 'Fecha 2', 'Fecha 3', 'Fecha 4', 'Fecha 5', 'Fecha 6'];

  return (
    <div id ="Contenido">
      <div className="container">
        <div className="row p-3">
          <form onSubmit={onForm}>
            <div className="d-flex justify-content-between">
              <div onClick={onNavigateBack}>
                <i className="fa-solid fa-arrow-left btn btn-primary"></i>
              </div>
              <h3 className="text-center">REGISTRA UN NUEVO RESULTADO</h3>
              <div></div>
            </div>
            <div className="row">
              <div className="col-md-6 form-group mb-2">
                <label>Equipo Uno: </label>
                <select
                  className="form-control"
                  name="equipo_uno"
                  value={equipo_uno}
                  onChange={onInputChange}
                  required
                >
                  <option value="" disabled>Selecciona el primer equipo</option>
                  {equipos.map((equipo) => (
                    <option key={equipo.id} value={equipo.id}>
                      {equipo.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6 form-group mb-2">
                <label>Goles Equipo Uno: </label>
                <select
                  className="form-control"
                  name="goles_equipo_uno"
                  value={goles_equipo_uno}
                  onChange={onInputChange}
                  required
                >
                  <option value="" disabled>Cantidad de Goles</option>
                  {Array.from({ length: 21 }, (_, index) => (
                    <option key={index} value={index}>
                      {index}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 form-group mb-2">
                <label>Equipo Dos: </label>
                <select
                  className="form-control"
                  name="equipo_dos"
                  value={equipo_dos}
                  onChange={onInputChange}
                  required
                >
                  <option value="" disabled>Selecciona el segundo equipo</option>
                  {equipos.map((equipo) => (
                    <option key={equipo.id} value={equipo.id}>
                      {equipo.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6 form-group mb-2">
                <label>Goles Equipo Dos: </label>
                <select
                  className="form-control"
                  name="goles_equipo_dos"
                  value={goles_equipo_dos}
                  onChange={onInputChange}
                  required
                >
                  <option value="" disabled>Cantidad de Goles</option>
                  {Array.from({ length: 21 }, (_, index) => (
                    <option key={index} value={index}>
                      {index}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 form-group mb-2">
                <label>Ronda:</label>
                <select
                  className="form-control"
                  name="ronda"
                  value={ronda}
                  onChange={onInputChange}
                  required
                >
                  <option value="" disabled>Escoga una ronda:</option>
                  {rondas.map((ronda, index) => (
                    <option key={index} value={ronda}>
                      {ronda}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6 form-group mb-2">
                <label>Fecha:</label>
                <div>
                  <input 
                    aria-label="Date" 
                    type="date" 
                    name="fecha"
                    value={fecha}
                    onChange={onInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            <input
              type="text"
              name="resultado"
              value={`${marcador.goles_equipo_uno}x${marcador.goles_equipo_dos}`}
              onChange={onInputChange}
              hidden
            />
           
            <div className="form-group mt-2 mb-2 text-center">
              <input
                type="submit"
                className="btnSubmit"
                value="Crear Resultado"
              />
            </div>
            
          </form>
        </div>

        {
          (marcador && (marcador.equipo_uno || marcador.equipo_dos)) ? 
          (
            <div className="container mt-4">
              <div className="row">
                <div className="col text-center">
                  <h4>Marcador:</h4>
                  <div className="d-flex justify-content-center align-items-center my-4">

                    <div className="text-center mx-3">
                      <img 
                        src={`http://localhost:3000/${marcador.imagen_equipo_uno}`} 
                        alt={marcador.equipo_uno} 
                        className="w-50 img-fluid mb-2 rounded-circle shadow-lg"
                      />
                      <p className="fs-4 font-weight-bold">{marcador.equipo_uno}</p>
                    </div>
                    
                    <div className="d-flex flex-column justify-content-center align-items-center mx-3">
                      <div 
                        className="d-flex justify-content-center align-items-center mb-2"
                        style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333', padding: '10px 20px', borderRadius: '8px', backgroundColor: '#f5f5f5', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
                      >
                        <span className="mx-3">{marcador.goles_equipo_uno}</span> 
                        <span className="mx-3">x</span> 
                        <span className="mx-3">{marcador.goles_equipo_dos}</span>
                      </div>
                      <p className="text-muted">Marcador de goles</p>
                    </div>
                    
                    <div className="text-center mx-3">
                      <img 
                        src={`http://localhost:3000/${marcador.imagen_equipo_dos}`} 
                        alt={marcador.equipo_dos} 
                        className="w-50 img-fluid mb-2 rounded-circle shadow-lg"
                      />
                      <p className="fs-4 font-weight-bold">{marcador.equipo_dos}</p>
                    </div>

                  </div>

                </div>
              </div>
            </div>
          ) : (
            null
          )
        }

      </div>
    </div>
  );
};
