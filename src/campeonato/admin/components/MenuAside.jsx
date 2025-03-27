import React from 'react';
import { NavLink } from 'react-router-dom';
import './MenuAside.css';

export const MenuAside = () => {
  return (
    <aside className="menu-aside">
      <nav>
        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`} to="/admin/" end><i className="fa-solid fa-house"></i> Inicio</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`} to="/admin/equipos"><i className="fa-solid fa-people-group"></i> Equipos</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`} to="/admin/jugadores"><i className="fa-solid fa-star"></i> Jugadores</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`} to="/admin/resultados"><i className="fa-solid fa-futbol"></i> Resultados</NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
