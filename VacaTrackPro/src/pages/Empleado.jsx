import React, { useEffect, useState } from "react";
import FormEmpleado from "../pages/FormEmpleado";
import Swal from "sweetalert2";

const formatDate = (dateString) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

export default function Empleado() {
    const [empleados, setEmpleados] = useState([]);
    const [busqueda, setBusqueda] = useState({ cedula: "", departamento: "" });
    const [editando, setEditando] = useState(null);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [cargandoEmpleados, setCargandoEmpleados] = useState(true);
    const [departamentos, setDepartamentos] = useState([]);  
    const [cargandoDepartamentos, setCargandoDepartamentos] = useState(true);  

    const cargarEmpleados = async () => {
        setCargandoEmpleados(true);
        try {
            const res = await fetch("http://localhost:3001/api/empleados");
            const data = await res.json();
            if (res.ok && Array.isArray(data)) {
                setEmpleados(data);
            } else {
                throw new Error(data?.mensaje || "No se pudo obtener la lista de empleados");
            }
        } catch (error) {
            console.error("Error al cargar empleados:", error);
            Swal.fire("Error", error.message || "Error al cargar empleados", "error");
        } finally {
            setCargandoEmpleados(false);
        }
    };

    const cargarDepartamentos = async () => {
        setCargandoDepartamentos(true);
        try {
            const res = await fetch("http://localhost:3001/api/departamentos");  
            const data = await res.json();
            if (res.ok && Array.isArray(data)) {
                setDepartamentos(data);
            } else {
                throw new Error(data?.mensaje || "No se pudo obtener la lista de departamentos");
            }
        } catch (error) {
            console.error("Error al cargar departamentos:", error);
            Swal.fire("Error", error.message || "Error al cargar departamentos", "error");
        } finally {
            setCargandoDepartamentos(false);
        }
    };

    const handleEliminar = async (id) => {
        const confirm = await Swal.fire({
            title: "¿Eliminar empleado?",
            text: "Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
        });
        if (confirm.isConfirmed) {
            try {
                const res = await fetch(`http://localhost:3001/api/empleados/${id}`, { method: "DELETE" });
                const data = await res.json();
                if (!res.ok) throw new Error(data.mensaje || "Error al eliminar");
                Swal.fire("Eliminado", data.mensaje, "success");
                cargarEmpleados();
            } catch (err) {
                Swal.fire("Error", err.message, "error");
            }
        }
    };

    const empleadosFiltrados = empleados.filter((e) =>
        e.cedula.includes(busqueda.cedula) &&
        (busqueda.departamento === "" || e.departamento?.includes(busqueda.departamento))
    );

    useEffect(() => {
        cargarEmpleados();
        cargarDepartamentos(); // Llamar a la función para cargar departamentos
    }, []);

    return (
        <div className="max-w-5xl mx-auto p-4 bg-gray-100 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Empleados</h2>

            <div className="flex flex-wrap gap-2 mb-4">
                <input
                    type="text"
                    placeholder="Buscar por cédula"
                    value={busqueda.cedula}
                    onChange={(e) => setBusqueda({ ...busqueda, cedula: e.target.value })}
                    className="border p-2 rounded w-full sm:w-auto"
                />
              <select
    value={busqueda.departamento}
    onChange={(e) => setBusqueda({ ...busqueda, departamento: e.target.value })}
    className="border p-2 rounded w-full sm:w-auto"
>
    <option value="">Todos los departamentos</option>
    {cargandoDepartamentos ? (
        <option disabled>Cargando departamentos...</option>
    ) : (
        departamentos.map((dep) => (
            <option key={dep._id} value={dep.nombre_departamento}>{dep.nombre_departamento}</option>
        ))
    )}
</select>
                <button
                    onClick={() => {
                        setEditando(null);
                        setMostrarFormulario(true);
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Nuevo Empleado
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded" disabled>
                    Importar Masivamente
                </button>
            </div>

            {mostrarFormulario && (
                <FormEmpleado
                    onClose={() => {
                        setMostrarFormulario(false);
                        setEditando(null);
                        cargarEmpleados();
                    }}
                    empleadoEditando={editando}
                    departamentos={departamentos} // Pasar la lista de departamentos al formulario
                />
            )}

            <table className="w-full table-auto bg-white shadow rounded mt-4">
                <thead>
                    <tr className="bg-gray-200 text-left">
                        <th className="p-2">Cédula</th>
                        <th className="p-2">Nombre</th>
                        <th className="p-2">Departamento</th>
                        <th className="p-2">Ingreso</th>
                        <th className="p-2">Salida</th>
                        <th className="p-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {empleadosFiltrados.map((emp) => (
                        <tr key={emp._id} className="border-t">
                            <td className="p-2">{emp.cedula}</td>
                            <td className="p-2">{emp.nombre} {emp.apellido}</td>
                            <td className="p-2">{emp.departamento}</td>
                            <td className="p-2">{formatDate(emp.fechaIngreso)}</td>
                            <td className="p-2">{formatDate(emp.fechaSalida)}</td>
                            <td className="p-2 space-x-2">
                                <button onClick={() => {
                                    setEditando(emp);
                                    setMostrarFormulario(true);
                                }} className="bg-yellow-400 text-black px-2 py-1 rounded">Editar</button>
                                <button onClick={() => handleEliminar(emp._id)} className="bg-red-500 text-white px-2 py-1 rounded">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}