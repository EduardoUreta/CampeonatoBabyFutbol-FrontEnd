import { Link } from 'react-router-dom'
import { AgregarEquipo, MostrarEquipos } from '../components/equipos'
import './ContenidoPages.css'

export const EquiposPage = () => {
  return (
    <div id="Contenido">
      <h3>Equipos</h3>

      <div className='container'>
        <div className='row'>
          <div className='col-md-6'>
            <Link to="/admin/equipo/crear">
              <div className="card">
                <div className="card-body text-center">
                  <i className="fa-solid fa-plus" style={{ fontSize: "40px", color: "blue", marginBottom: "40px", marginTop: "40px"}}></i>
                  <h5 className="card-title text-center">CREAR</h5>
                </div>
              </div>
            </Link>
          </div>
          <div className='col-md-6'>
            <div className="card">
              <div className="card-body text-center">
                <i className="fa-solid fa-list" style={{ fontSize: "40px", color: "blue", marginBottom: "40px", marginTop: "40px"}}></i>
                <h5 className="card-title text-center">LISTAR</h5>
              </div>
            </div>
          </div>
        </div>
        <br/>
        <div className='row'>
          <div className='col-md-6'>
            <div className="card">
              <div className="card-body text-center">
                <i className="fa-solid fa-pen" style={{ fontSize: "40px", color: "blue", marginBottom: "40px", marginTop: "40px"}}></i>
                <h5 className="card-title text-center">ACTUALIZAR</h5>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className="card">
              <div className="card-body text-center">
                <i className="fa-solid fa-trash" style={{ fontSize: "40px", color: "blue", marginBottom: "40px", marginTop: "40px"}}></i>
                <h5 className="card-title text-center">ELIMINAR</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AgregarEquipo/>

      <MostrarEquipos/>
    </div>
  )
}
