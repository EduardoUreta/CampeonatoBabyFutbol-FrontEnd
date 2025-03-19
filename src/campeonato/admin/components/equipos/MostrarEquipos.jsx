import { useEffect } from "react";
import { useEquipoStore } from "../../../../hooks";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";

export const MostrarEquipos = () => {

    const { startLoadTeams, cargandoEquipo } = useEquipoStore();

    const { equipos } = useSelector(state => state.equipo);

    useEffect(() => {
        startLoadTeams();
    }, []);

    if (cargandoEquipo) {
        return <Spinner animation="border" />;
    };

  return (
    <div className="container">
        <div className="row">
            {
                equipos.map((equipo) => (
                <div key={equipo.id} className="col-md-6">
                    <div className="card">
                        <img src={`http://localhost:3000/${equipo.imagen}`} className="card-img-top img-fluid img-thumbnail" alt={equipo.nombre}/>
                        <div className="card-body">
                            <h5 className="card-title text-center">{equipo.nombre}</h5>
                            <div className="text-end">
                                <a href="#" className="btn btn-primary">Ver Detalles</a>
                            </div>
                        </div>
                    </div>
                </div>
                ))
            }
            
        </div>
    </div>
  )
}
