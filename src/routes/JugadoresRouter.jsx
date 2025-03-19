import { Navigate, Route, Routes } from 'react-router-dom'
import { AgregarJugador, MostrarJugadores, UnJugador, ActualizarJugador } from '../campeonato/admin/components/jugadores'
import { JugadoresPage } from '../campeonato/admin/pages'

export const JugadoresRouter = () => {
  return (
    <>
        <Routes>
            <Route path="/" element={<JugadoresPage/>}/>
            <Route path="crear" element={<AgregarJugador/>}/>
            <Route path="listar" element={<MostrarJugadores/>}/>
            <Route path="/:id" element={<UnJugador/>} />
            <Route path="/actualizar/:id" element={<ActualizarJugador/>} />
            <Route path="/*" element={<Navigate to="/admin/jugadores"/>}></Route>
        </Routes>
    </>
  )
}
