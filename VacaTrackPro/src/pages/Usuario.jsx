import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { API_URL } from "@/api/api";

export default function Usuario() {
    const [usuarios, setUsuarios] = useState([]);
    const [empleados, setEmpleados] = useState([]);
    const [formulario, setFormulario] = useState({
        usuario: "",
        email: "",
        contrasena: "",
        id_empleado: "",
    });
    const [editandoId, setEditandoId] = useState(null);
    const [cargandoEmpleados, setCargandoEmpleados] = useState(true);

    const cargarUsuarios = async () => {
        try {
            const res = await fetch(`${API_URL}/usuarios`);
            const data = await res.json();
            if (res.ok && Array.isArray(data.data)) {
                setUsuarios(data.data);
            } else {
                throw new Error(data.mensaje || "No se pudo obtener la lista de usuarios");
            }
        } catch (error) {
            Swal.fire("Error", error.message, "error");
        }
    };

    const cargarEmpleados = async () => {
        setCargandoEmpleados(true);
        try {
            const res = await fetch(`${API_URL}/empleados`);
    
            if (!res.ok) {
                console.error("Error al cargar empleados:", res.status, res.statusText);
                Swal.fire("Error", `Error al cargar empleados: ${res.status} ${res.statusText}`, "error");
                return;
            }
    
            // Verificamos si el tipo de contenido es JSON
            const contentType = res.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new Error("La respuesta no es JSON válida.");
            }
    
            const data = await res.json();
            console.log("Empleados recibidos:", data);
            
            if (!Array.isArray(data)) {
                console.warn("La respuesta no es un array de empleados. Estructura recibida:", data);
            }
        
            setEmpleados(Array.isArray(data) ? data : []);
            
        } catch (error) {
            console.error("Error al procesar la respuesta de empleados:", error);
            Swal.fire("Error", error.message || "No se pudo cargar empleados", "error");
        } finally {
            setCargandoEmpleados(false);
        }
    };
    

    useEffect(() => {
        cargarUsuarios();
        cargarEmpleados();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormulario({ ...formulario, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = editandoId
                ? `${API_URL}/usuarios/${editandoId}`
                : `${API_URL}/usuarios`;
            const method = editandoId ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formulario),
            });

            const result = await res.json();

            if (!res.ok) throw new Error(result.mensaje || "Error en la operación");

            Swal.fire("Éxito", result.mensaje, "success");
            setFormulario({ usuario: "", email: "", contrasena: "", id_empleado: "" });
            setEditandoId(null);
            cargarUsuarios();
        } catch (error) {
            Swal.fire("Error", error.message, "error");
        }
    };

    const handleEditar = (usuario) => {
        setFormulario({
            usuario: usuario.usuario,
            email: usuario.email || "",
            contrasena: "",
            id_empleado: usuario.id_empleado || "",
        });
        setEditandoId(usuario._id);
    };

    const handleEliminar = (id) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Esto eliminará el usuario.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await fetch(`${API_URL}/usuarios/${id}`, {
                        method: "DELETE",
                    });
                    const data = await res.json();
                    if (!res.ok) throw new Error(data.mensaje || "No se pudo eliminar el usuario");
                    Swal.fire("Eliminado", data.mensaje, "success");
                    cargarUsuarios();
                } catch (error) {
                    Swal.fire("Error", error.message, "error");
                }
            }
        });
    };

    return (
        <div className="max-w-3xl mx-auto p-4 bg-gray-100 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Gestión de Usuarios</h2>

            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-md shadow">
                <input
                    type="text"
                    name="usuario"
                    value={formulario.usuario}
                    onChange={handleChange}
                    placeholder="Nombre de usuario"
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={formulario.email}
                    onChange={handleChange}
                    placeholder="Correo electrónico"
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    type="password"
                    name="contrasena"
                    value={formulario.contrasena}
                    onChange={handleChange}
                    placeholder="Contraseña"
                    className="w-full border p-2 rounded"
                    required={!editandoId}
                />
                <select
                    name="id_empleado"
                    value={formulario.id_empleado}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                    disabled={cargandoEmpleados}
                >
                    <option value="">
                        {cargandoEmpleados ? "Cargando empleados..." : "Seleccione un empleado"}
                    </option>
                    {empleados.length > 0 ? (
                        empleados.map((emp) => (
                            <option key={emp._id} value={emp._id}>
                                {emp.nombre} {emp.apellido}
                            </option>
                        ))
                    ) : (
                        !cargandoEmpleados && <option disabled>No hay empleados disponibles</option>
                    )}
                </select>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                    {editandoId ? "Actualizar" : "Crear"}
                </button>
            </form>

            <div className="mt-6">
                <h3 className="font-semibold mb-2">Usuarios registrados</h3>
                <table className="w-full text-sm bg-white rounded shadow">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2">Usuario</th>
                            <th className="p-2">Email</th>
                            <th className="p-2">Empleado</th>
                            <th className="p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((u) => {
                            const emp = empleados.find((e) => e._id === u.id_empleado);
                            return (
                                <tr key={u._id} className="border-t">
                                    <td className="p-2">{u.usuario}</td>
                                    <td className="p-2">{u.email}</td>
                                    <td className="p-2">{emp ? `${emp.nombre} ${emp.apellido}` : "No asignado"}</td>
                                    <td className="p-2 flex gap-2">
                                        <button
                                            className="bg-yellow-400 text-white px-2 py-1 rounded"
                                            onClick={() => handleEditar(u)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-2 py-1 rounded"
                                            onClick={() => handleEliminar(u._id)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
