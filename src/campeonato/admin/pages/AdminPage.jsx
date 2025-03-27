import React from 'react'
import { CampeonatoNavbar } from '../../components/campeonatoNavbar'
import { MenuAside } from '../components/MenuAside'
import { Navigate, Route, Routes } from 'react-router-dom'
import { EquiposRouter, JugadoresRouter, ResultadosRouter, EstadisticasRouter } from '../../../routes'

export const AdminPage = () => {
  return (
    <>
        <CampeonatoNavbar/>
        <MenuAside/>

        <div>
          <Routes>
            <Route path="equipos/*" element={<EquiposRouter/>}/>
            <Route path="jugadores/*" element={<JugadoresRouter/>}/>
            <Route path="resultados/*" element={<ResultadosRouter/>}/>
            <Route path="estadisticas/*" element={<EstadisticasRouter/>}/>
            <Route path="/*" element={<Navigate to="/admin"/>}/>
          </Routes>
        </div>
    </>
  )
}
