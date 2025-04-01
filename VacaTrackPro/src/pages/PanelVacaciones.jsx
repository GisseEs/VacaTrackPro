import React, { useState, useMemo } from "react";
import dayjs from "dayjs";
import "dayjs/locale/es";

dayjs.locale("es");

const PanelVacaciones = () => {
  const [empleados] = useState([
    { id: 1, nombre: "Gissela", apellido: "Estigarribia", cedula: "1234567", fechaIngreso: "2024-01-02" },
    { id: 2, nombre: "Liz", apellido: "Florentin", cedula: "2345678", fechaIngreso: "2007-02-20" },
    { id: 3, nombre: "Juan", apellido: "Perez", cedula: "3456789", fechaIngreso: "2018-03-09" },
  ]);

  const calcularAntiguedad = (fechaIngreso) => dayjs().diff(dayjs(fechaIngreso), "year");

  const calcularDiasVacaciones = (antiguedad) => (antiguedad >= 10 ? 30 : antiguedad >= 6 ? 18 : 12);

  const empleadosProcesados = useMemo(() => 
    empleados.map((emp) => {
      const antiguedad = calcularAntiguedad(emp.fechaIngreso);
      const diasVacaciones = calcularDiasVacaciones(antiguedad);
      const fechaIngreso = dayjs(emp.fechaIngreso).locale("es");
      const mesIngreso = fechaIngreso.format("MMMM").toUpperCase();
      const fechaSalida = fechaIngreso.set("year", dayjs().year()).format("DD/MM/YYYY");
      //const topeFechaSalida = dayjs(fechaSalida, "DD/MM/YYYY").add(6, "months").format("DD/MM/YYYY");
      const topeFechaSalida = fechaIngreso.add(antiguedad, "year").add(6, "months").format("DD/MM/YYYY");


      return { ...emp, antiguedad, diasVacaciones, mesIngreso, fechaSalida, topeFechaSalida };
    }), 
  [empleados]);

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
                className={`border text-center ${emp.mesIngreso === dayjs().locale("es").format("MMMM").toUpperCase() ? "bg-yellow-300 font-bold" : ""}`}
              >
                <td className="py-2 px-4">{emp.nombre} {emp.apellido}</td>
                <td className="py-2 px-4">{emp.cedula}</td>
                <td className="py-2 px-4">{dayjs(emp.fechaIngreso).format("DD/MM/YYYY")}</td>
                <td className="py-2 px-4">{emp.antiguedad} AÑOS</td>
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
