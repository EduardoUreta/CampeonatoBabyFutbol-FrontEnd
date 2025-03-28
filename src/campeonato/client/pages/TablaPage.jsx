import { useSelector } from "react-redux";
import { useEquipoStore } from "../../../hooks";
import { useEffect } from "react";

export const TablaPage = () => {
    const { equipos } = useSelector(state => state.equipo);
    const { startLoadTeams } = useEquipoStore();
    
    useEffect(() => {
        startLoadTeams();
    }, []);

    const ordenarEquipos = [...equipos].sort((a, b) => {
      if(b.puntos != a.puntos){
        return b.puntos - a.puntos
      };

      if(b.ganados != a.ganados){
        return b.ganados - a.ganados
      };

      return (b.goles_favor - b.goles_contra) - (a.goles_favor - a.goles_contra);
    });

    return (
        <>
            <div className="container">
                <div className="pt-4">
                    <h1 className="text-center text-warning" style={{ fontFamily: 'campus '}}>CLASIFICACIÓN</h1>
                </div>
                <div className="row">
                    <div className="col-md-10 mx-auto">
                        <div>
                            <table className="table table-bordered mt-4 stylish-table">
                                <thead className="table-dark">
                                    <tr>
                                        <th className="text-center">Equipo</th>
                                        <th className="text-center">Puntos</th>
                                        <th className="text-center">V</th>
                                        <th className="text-center">E</th>
                                        <th className="text-center">D</th>
                                        <th className="text-center">GA</th>
                                        <th className="text-center">GC</th>
                                        <th className="text-center">Dif</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    ordenarEquipos.map((equipo) => {
                                        return (
                                        <tr key={equipo.id} className="table-light">
                                            <td className="text-center">
                                                <img src={`http://localhost:3000/${equipo.imagen}`} className="img-fluid rounded-circle" alt={equipo.nombre}/>
                                                <strong>{equipo.nombre} {equipo.apellido}</strong>
                                            </td>
                                            <td className="text-center">{equipo.puntos}</td>
                                            <td className="text-center">{equipo.ganados}</td>
                                            <td className="text-center">{equipo.empatados}</td>
                                            <td className="text-center">{equipo.perdidos}</td>
                                            <td className="text-center">{equipo.goles_favor}</td>
                                            <td className="text-center">{equipo.goles_contra}</td>
                                            <td className="text-center">{equipo.goles_favor - equipo.goles_contra}</td>
                                        </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
