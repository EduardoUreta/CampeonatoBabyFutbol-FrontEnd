import React from 'react'
import { CampeonatoNavbar } from '../../components/campeonatoNavbar'
import { MenuAside } from '../components/MenuAside'
import { Navigate, Route, Routes } from 'react-router-dom'
import { EquiposPage, FechasPage, JugadoresPage, ResultadosPage } from "../pages"
import { EquiposRouter, JugadoresRouter } from '../../../routes'

export const AdminPage = () => {
  return (
    <>
        <CampeonatoNavbar/>
        <MenuAside/>

        <div>
          <Routes>
            <Route path="equipos/*" element={<EquiposRouter/>}/>
            <Route path="jugadores/*" element={<JugadoresRouter/>}/>
            <Route path="resultados" element={<ResultadosPage/>}/>
            <Route path="fechas" element={<FechasPage/>}/>
            <Route path="/*" element={<Navigate to="/admin"/>}/>
          </Routes>
        </div>
    </>
  )
}
