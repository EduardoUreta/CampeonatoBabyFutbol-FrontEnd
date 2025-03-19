import { Navigate, Route, Routes } from 'react-router-dom'
import { AgregarEquipo, MostrarEquipos, UnEquipo, ActualizarEquipo } from '../campeonato/admin/components/equipos'
import { EquiposPage } from '../campeonato/admin/pages'

export const EquiposRouter = () => {
  return (
    <>
        <Routes>
            <Route path="/" element={<EquiposPage/>}/>
            <Route path="crear" element={<AgregarEquipo/>}/>
            <Route path="listar" element={<MostrarEquipos/>}/>
            <Route path="/:id" element={<UnEquipo/>} />
            <Route path="/actualizar/:id" element={<ActualizarEquipo/>} />
            <Route path="/*" element={<Navigate to="/admin/equipos"/>}></Route>
        </Routes>
    </>
  )
}
