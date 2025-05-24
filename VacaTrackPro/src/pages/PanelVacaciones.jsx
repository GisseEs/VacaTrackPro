import React, { useEffect, useMemo  } from "react";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { useSelector, useDispatch } from 'react-redux';
import { fetchEmpleadosVacaciones } from '../features/empleadosVacaciones/empleadosVacacionesSlice';
import { fetchEmpleadosVacacionesPorDepartamento } from '../features/empleadosVacaciones/empleadosVacacionesSlice';
import { API_URL } from "@/api/api";

dayjs.locale("es");

//const PanelVacaciones = ({ departamentoId }) => { 
const PanelVacaciones = () => {
  const dispatch = useDispatch();
  const empleadosVacaciones = useSelector((state) => state.empleadosVacaciones.lista);
  const loading = useSelector((state) => state.empleadosVacaciones.loading);
  const error = useSelector((state) => state.empleadosVacaciones.error);

  useEffect(() => {
    dispatch(fetchEmpleadosVacaciones());
  }, [dispatch]);

   //useEffect(() => {
   
  // dispatch(fetchEmpleadosVacacionesPorDepartamento(departamentoId)); // Dispara la nueva acción
  //}, [dispatch, departamentoId]);

  const empleadosProcesados = useMemo(() => {
    return empleadosVacaciones.map((emp) => ({
      ...emp,
      fechaIngreso: dayjs(emp.fechaIngreso).locale("es").format("DD/MM/YYYY"),
      mesIngreso: dayjs(emp.fechaIngreso).locale("es").format("MMMM").toUpperCase(),
      fechaSalida: emp.fechaSalida || 'N/A',
      antiguedad: emp.antiguedad !== undefined ? `${emp.antiguedad} AÑOS` : 'N/A',
    }));
  }, [empleadosVacaciones]);

  if (loading) {
    return <div>Cargando datos de empleados...</div>;
  }

  if (error) {
    return <div>Error al cargar los datos: {error}</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Panel de Vacaciones</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-lg">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="py-2 px-4">Empleado</th>
              <th className="py-2 px-4">Cédula</th>
              <th className="py-2 px-4">Fecha Ingreso</th>
              <th className="py-2 px-4">Antigüedad</th>
              <th className="py-2 px-4">Días</th>
              <th className="py-2 px-4">Mes</th>
              <th className="py-2 px-4">Fecha Salida</th>
              <th className="py-2 px-4">Tope Fecha Salida</th>
            </tr>
          </thead>
          <tbody>
            {empleadosProcesados.map((emp) => (
              <tr
                key={emp.id}
                className={`border text-center ${dayjs(emp.fechaIngreso, "DD/MM/YYYY").locale("es").format("MMMM").toUpperCase() === dayjs().locale("es").format("MMMM").toUpperCase() ? "bg-yellow-300 font-bold" : ""}`}
              >
                <td className="py-2 px-4">{emp.nombre} {emp.apellido}</td>
                <td className="py-2 px-4">{emp.cedula}</td>
                <td className="py-2 px-4">{emp.fechaIngreso}</td>
                <td className="py-2 px-4">{emp.antiguedad}</td>
                <td className="py-2 px-4">{emp.diasVacaciones}</td>
                <td className="py-2 px-4">{emp.mesIngreso}</td>
                <td className="py-2 px-4">{emp.fechaSalida}</td>
                <td className="py-2 px-4">{emp.topeFechaSalida}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PanelVacaciones;