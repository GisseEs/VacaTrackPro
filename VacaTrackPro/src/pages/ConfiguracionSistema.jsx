import React, { useState, useEffect } from 'react';
import FormConfiguracionSistema from "../components/FormConfiguracionSistema";
import Swal from 'sweetalert2';
import { API_URL } from "@/api/api";

function ConfiguracionSistema() {
    const [configuracion, setConfiguracion] = useState(null);
    const [editando, setEditando] = useState(false);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const cargarConfiguracion = async () => {
        setCargando(true);
        setError(null);
        try {
            const res = await fetch(`${API_URL}/configuraciones`);
            const data = await res.json();
            if (res.ok && Array.isArray(data) && data.length > 0) {
                setConfiguracion(data[0]);
            } else if (res.ok) {
                setConfiguracion({});
            } else {
                throw new Error(data?.mensaje || 'No se pudo obtener la configuración del sistema');
            }
        } catch (err) {
            console.error('Error al cargar la configuración:', err);
            setError(err.message || 'Error al cargar la configuración.');
            Swal.fire('Error', err.message || 'Error al cargar la configuración', 'error');
        } finally {
            setCargando(false);
        }
    };

    const handleEditar = () => {
        setEditando(true);
    };

    const handleGuardadoExitoso = (nuevaConfiguracion) => {
        setConfiguracion(nuevaConfiguracion);
        setEditando(false);
    };

    const handleCancelarEdicion = () => {
        setEditando(false);
    };

    useEffect(() => {
        cargarConfiguracion();
    }, []);

    if (cargando) {
        return <div>Cargando configuración del sistema...</div>;
    }

    if (error) {
        return <div>Error al cargar la configuración: {error}</div>;
    }

    if (!configuracion) {
        return <div>No se encontró configuración del sistema.</div>;
    }

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-4">Configuración del Sistema</h2>

            {!editando ? (
                <div>
                    <h3 className="text-xl font-semibold mb-2">Días por años de antiguedad</h3>
                    <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Antigüedad 1-5 años:</label>
                            <div className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">{configuracion.tabla_antiguedad_vacaciones?.['1-5'] || 'N/A'}</div>
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Antigüedad 6-10 años:</label>
                            <div className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">{configuracion.tabla_antiguedad_vacaciones?.['6-10'] || 'N/A'}</div>
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Antigüedad +10 años:</label>
                            <div className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">{configuracion.tabla_antiguedad_vacaciones?.['+10'] || 'N/A'}</div>
                        </div>
                    </div>
                    <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Desde Periodo de Corte:</label>
                            <div className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">{configuracion.desde_periodo_corte?.substring(0, 10) || 'N/A'}</div>
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Hasta Periodo de Corte:</label>
                            <div className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">{configuracion.hasta_periodo_corte?.substring(0, 10) || 'N/A'}</div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Tope de Salida de Vacaciones (días):</label>
                        <div className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">{configuracion.tope_salida_vacaciones || 'N/A'}</div>
                    </div>
                    <button onClick={handleEditar} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Editar Configuración
                    </button>
                </div>
            ) : (
                <FormConfiguracionSistema
                    configuracionInicial={configuracion}
                    onGuardar={handleGuardadoExitoso}
                    onCancelar={handleCancelarEdicion}
                />
            )}
        </div>
    );
}

export default ConfiguracionSistema;