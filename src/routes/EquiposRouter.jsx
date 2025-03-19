import { Navigate, Route, Routes } from 'react-router-dom'
import { AgregarEquipo, MostrarEquipos } from '../campeonato/admin/components/equipos'
import { EquiposPage } from '../campeonato/admin/pages'

export const EquiposRouter = () => {
  return (
    <>|
        <Routes>
            <Route path="/" element={<EquiposPage/>}/>
            <Route path="crear" element={<AgregarEquipo/>}/>
            <Route path="listar" element={<MostrarEquipos/>}/>
            <Route path="/*" element={<Navigate to="/admin/equipos"/>}></Route>
        </Routes>
    </>
  )
}
