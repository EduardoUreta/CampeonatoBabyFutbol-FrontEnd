import { Navigate, Route, Routes } from 'react-router-dom'
import { ResultadosPage } from '../campeonato/admin/pages'
import { AgregarResultado, MostrarResultados, UnResultado, ActualizarResultado } from '../campeonato/admin/components/resultados'

export const ResultadosRouter = () => {
  return (
    <>
        <Routes>
            <Route path="/" element={<ResultadosPage/>}/>
            <Route path="crear" element={<AgregarResultado/>}/>
            <Route path="listar" element={<MostrarResultados/>}/>
            <Route path="/:id" element={<UnResultado/>} />
            <Route path="/actualizar/:id" element={<ActualizarResultado/>} />
            <Route path="/*" element={<Navigate to="/admin/resultados"/>}></Route>
        </Routes>
    </>
  )
}
