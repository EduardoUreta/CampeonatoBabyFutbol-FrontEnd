import React from 'react'
import { CampeonatoNavbar } from '../../components/campeonatoNavbar'
import { MenuAside } from '../components/MenuAside'
import { Navigate, Route, Routes } from 'react-router-dom'
import { EquiposPage, FechasPage, JugadoresPage, ResultadosPage } from "../pages"
import { EquiposRouter } from '../../../routes/EquiposRouter'

export const AdminPage = () => {
  return (
    <>
        <CampeonatoNavbar/>
        <MenuAside/>

        <div>
          <Routes>
            <Route path="equipos/*" element={<EquiposRouter/>}/>
            <Route path="resultados" element={<ResultadosPage/>}/>
            <Route path="jugadores" element={<JugadoresPage/>}/>
            <Route path="fechas" element={<FechasPage/>}/>
            <Route path="/*" element={<Navigate to="/admin"/>}></Route>
          </Routes>
        </div>
    </>
  )
}
