import { Navigate, Route, Routes } from 'react-router-dom'
import { ResultadosPage } from '../campeonato/admin/pages'
import { AgregarResultado, MostrarResultados, UnResultado, ActualizarResultado } from '../campeonato/admin/components/resultados'
import { AgregarEstadistica } from '../campeonato/admin/components/estadisticas/AgregarEstadistica'

export const EstadisticasRouter = () => {
  return (
    <>
        <Routes>
            <Route path="/" element={<ResultadosPage/>}/>
            <Route path="/:id" element={<AgregarEstadistica/>} />
            {/* <Route path="crear" element={<AgregarResultado/>}/>
            <Route path="/actualizar/:id" element={<ActualizarResultado/>} />
            <Route path="listar" element={<MostrarResultados/>}/> */}
            <Route path="/*" element={<Navigate to="/admin/resultados"/>}></Route>
        </Routes>
    </>
  )
}
