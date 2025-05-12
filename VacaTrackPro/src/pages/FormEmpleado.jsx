import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function FormEmpleado({ onClose, empleadoEditando }) {
    const [formulario, setFormulario] = useState({
        nombre: "",
        apellido: "",
        cedula: "",
        id_departamento: "",
        fechaIngreso: "",
        fechaSalida: "",
    });

    const [departamentos, setDepartamentos] = useState([]);
    const [cargandoDepartamentos, setCargandoDepartamentos] = useState(true);
   const cargarDepartamentos = async () => {
        setCargandoDepartamentos(true);
        try {
            const res = await fetch("http://localhost:3001/api/departamentos"); // Asume que tienes un endpoint para departamentos
            const data = await res.json();
            if (res.ok && Array.isArray(data)) {
                setDepartamentos(data);
                console.log(data)
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = empleadoEditando ? "PUT" : "POST";
        const url = empleadoEditando
            ? `http://localhost:3001/api/empleados/${empleadoEditando._id}`
            : "http://localhost:3001/api/empleados";
        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formulario),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.mensaje || "Error al guardar");
            Swal.fire("Éxito", data.mensaje, "success");
            onClose();
        } catch (err) {
            Swal.fire("Error", err.message, "error");
        }
    };

    useEffect(() => {
        cargarDepartamentos();
        if (empleadoEditando) {
            setFormulario({
                nombre: empleadoEditando.nombre || "",
                apellido: empleadoEditando.apellido || "",
                cedula: empleadoEditando.cedula || "",
                id_departamento: empleadoEditando.id_departamento || "",
                fechaIngreso: empleadoEditando.fechaIngreso?.substring(0, 10) || "",
                fechaSalida: empleadoEditando.fechaSalida?.substring(0, 10) || "",
            });
        }
    }, [empleadoEditando]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormulario({ ...formulario, [name]: value });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow mb-4">
            <div className="flex gap-2">
                <input name="nombre" value={formulario.nombre} onChange={handleChange} placeholder="Nombre" required className="w-1/2 border p-2 rounded" />
                <input name="apellido" value={formulario.apellido} onChange={handleChange} placeholder="Apellido" required className="w-1/2 border p-2 rounded" />
            </div>
            <input name="cedula" value={formulario.cedula} onChange={handleChange} placeholder="Cédula" required className="w-full border p-2 rounded" />
            <select name="id_departamento" value={formulario.id_departamento} onChange={handleChange} required className="w-full border p-2 rounded">
    <option value="">Seleccione departamento</option>
    {departamentos.map((d) => (
        <option key={d._id} value={d._id}>{d.nombre_departamento}</option>
    ))}
</select>
            <div className="flex gap-2">
                <input type="date" name="fechaIngreso" value={formulario.fechaIngreso} onChange={handleChange} required className="w-1/2 border p-2 rounded" />
                <input type="date" name="fechaSalida" value={formulario.fechaSalida} onChange={handleChange} className="w-1/2 border p-2 rounded" />
            </div>
            <div className="flex justify-end gap-2">
                <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">Cancelar</button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">{empleadoEditando ? "Actualizar" : "Guardar"}</button>
            </div>
        </form>
    );
}
