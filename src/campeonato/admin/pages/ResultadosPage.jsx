import { Link } from 'react-router-dom';
import './ContenidoPages.css';

export const ResultadosPage = () => {
  return (
    <div id="Contenido">
      <h3>Resultados</h3>

      <div className='container'>
        <div className='row'>

          <div className='col-md-6'>
            <Link to="/admin/resultados/crear">
              <div className="card">
                <div className="card-body text-center">
                  <i className="fa-solid fa-plus" style={{ fontSize: "40px", color: "blue", marginBottom: "40px", marginTop: "40px"}}></i>
                  <h5 className="card-title text-center">CREAR</h5>
                </div>
              </div>
            </Link>
          </div>

          <div className='col-md-6'>
            <Link to="/admin/resultados/listar">
              <div className="card">
                <div className="card-body text-center">
                  <i className="fa-solid fa-list" style={{ fontSize: "40px", color: "blue", marginBottom: "40px", marginTop: "40px"}}></i>
                  <h5 className="card-title text-center">LISTAR</h5>
                </div>
              </div>
            </Link>
          </div>

        </div>
      
      </div>
    </div>
  );
};
