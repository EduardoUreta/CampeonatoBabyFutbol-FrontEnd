import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../hooks';

export const CampeonatoNavbar = () => {

  const { user, status, startLogout } = useAuthStore();

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-secondary">
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
            <NavLink className={({isActive}) => `nav-item nav-link ${isActive ? 'active' : ''}`} to="/resultados" >
              Resultados
            </NavLink>
            <NavDropdown title="Estadísticas" id="collapsible-nav-dropdown" className='text-light'>
              <NavDropdown.Item to="/tabla">Tabla</NavDropdown.Item>
              <NavDropdown.Item to="/goleadores">Goleadores</NavDropdown.Item>
            </NavDropdown>
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
