import { Navigate, Route, Routes } from "react-router-dom"
import { HomePage, EquiposPage, JugadoresPage, ResultadosPage } from "../campeonato/client/pages/index"
import { AdminPage } from "../campeonato/admin/pages/AdminPage"
import { useAuthStore } from "../hooks"
import { useEffect } from "react"
import { Spinner } from 'react-bootstrap';
import { LoginPage } from "../auth/LoginPage"
import { GoleadoresPage } from "../campeonato/client/pages/GoleadoresPage"


export const CampeonatoRouter = () => {
    
    const { status, checkAuthToken } = useAuthStore();

    useEffect(() => {
        checkAuthToken();
    },[]);

    if (status === "checking") {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

  return (
    <>
        <Routes>

            {
                (status === "auth") ? 
                    (
                        <>
                            <Route path="/admin/*" element={<AdminPage/>}/>
                            <Route path="/login" element={<Navigate to="/admin"/>}/>
                            <Route path="/" element={<HomePage/>}/>  
                            <Route path="/*" element={<Navigate to="/"/>}/>
                        </>
                    )
                    : 
                    (
                        <>
                            <Route path="/" element={<HomePage/>}/>         
                            <Route path="/login" element={<LoginPage/>}/>
                            <Route path="/*" element={<Navigate to="/"/>}/>
                        </>
                    ) 
            }

            <Route path="/equipos" element={<EquiposPage/>}/>
            <Route path="/jugadores" element={<JugadoresPage/>}/>
            <Route path="/resultados" element={<ResultadosPage/>}/>

        </Routes>
    </>
  )
}
