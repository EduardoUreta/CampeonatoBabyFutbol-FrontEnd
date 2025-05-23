import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../hooks';
import './style.css'

export const CampeonatoNavbar = () => {

  const { user, status, startLogout } = useAuthStore();

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-black custom-navbar-border" style={{ borderBottom: '2px solid rgb(204 200 195)', fontFamily: 'Pitcher' }}>
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavLink className={({isActive}) => `nav-item nav-link ${isActive ? 'active' : ''}`} to="/">
              Campeonato
            </NavLink>
            <NavLink className={({isActive}) => `nav-item nav-link ${isActive ? 'active' : ''}`} to="/equipos" >
              Equipos
            </NavLink>
            <NavLink className={({isActive}) => `nav-item nav-link ${isActive ? 'active' : ''}`} to="/jugadores" >
              Jugadores
            </NavLink>
            <NavLink className={({isActive}) => `nav-item nav-link ${isActive ? 'active' : ''}`} to="/resultados" >
              Resultados
            </NavLink>
          </Nav>
          <Nav>

            {
              (status === 'auth') ? 

                <>
                  <NavLink className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`} to="/admin">
                    <i className="fa-regular fa-circle-user"></i>  {user.nombre}
                  </NavLink>
                  <NavLink className={({isActive}) => `nav-item nav-link (${isActive ? 'active' : ''}`} onClick={startLogout} >
                    Cerrar Sesión
                  </NavLink>
                </>

                : 
                <>
                  <NavLink className={({isActive}) => `nav-item nav-link (${isActive ? 'active' : ''}`} to="/login" >
                    Iniciar Sesión
                  </NavLink>
                </>
            }

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
