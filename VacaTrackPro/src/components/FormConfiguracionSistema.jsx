import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

function FormConfiguracionSistema({ configuracionInicial, onGuardar, onCancelar }) {
    const [formulario, setFormulario] = useState({});

    useEffect(() => {
        if (configuracionInicial) {
            setFormulario({
                tabla_antiguedad_vacaciones: { ...configuracionInicial.tabla_antiguedad_vacaciones },
                desde_periodo_corte: configuracionInicial.desde_periodo_corte?.substring(0, 10) || '',
                hasta_periodo_corte: configuracionInicial.hasta_periodo_corte?.substring(0, 10) || '',
                tope_salida_vacaciones: configuracionInicial.tope_salida_vacaciones || '',
            });
        }
    }, [configuracionInicial]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('antiguedad-')) {
            const antiguedad = name.split('-')[1];
            setFormulario(prevForm => ({
                ...prevForm,
                tabla_antiguedad_vacaciones: {
                    ...prevForm.tabla_antiguedad_vacaciones,
                    [antiguedad]: value,
                },
            }));
        } else {
            setFormulario(prevForm => ({
                ...prevForm,
                [name]: value,
            }));
        }
    };

    const guardarConfiguracion = async () => {
    try {
        const res = await fetch(`http://localhost:3001/api/configuraciones/${configuracionInicial?._id}`, {
            method: 'PUT', // O 'POST' si tu API lo requiere para la actualización
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formulario),
        });
        const data = await res.json();
        if (res.ok) {
            Swal.fire('Éxito', data.mensaje || 'Configuración guardada correctamente', 'success');
            onGuardar({
                tabla_antiguedad_vacaciones: { ...formulario.tabla_antiguedad_vacaciones },
                desde_periodo_corte: formulario.desde_periodo_corte,
                hasta_periodo_corte: formulario.hasta_periodo_corte,
                tope_salida_vacaciones: formulario.tope_salida_vacaciones,
            });
        } else {
            throw new Error(data?.mensaje || 'Error al guardar la configuración');
        }
    } catch (err) {
        console.error('Error al guardar la configuración:', err);
        Swal.fire('Error', err.message || 'Error al guardar la configuración', 'error');
    }
};

    return (
        <form className="space-y-4">
            <h3 className="text-xl font-semibold mb-2">Editar Configuración</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label htmlFor="antiguedad-1-5" className="block text-gray-700 text-sm font-bold mb-2">Antigüedad 1-5 años:</label>
                    <input type="number" id="antiguedad-1-5" name="antiguedad-1-5" value={formulario.tabla_antiguedad_vacaciones?.['1-5'] || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div>
                    <label htmlFor="antiguedad-6-10" className="block text-gray-700 text-sm font-bold mb-2">Antigüedad 6-10 años:</label>
                    <input type="number" id="antiguedad-6-10" name="antiguedad-6-10" value={formulario.tabla_antiguedad_vacaciones?.['6-10'] || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div>
                    <label htmlFor="antiguedad-+10" className="block text-gray-700 text-sm font-bold mb-2">Antigüedad +10 años:</label>
                    <input type="number" id="antiguedad-+10" name="antiguedad-+10" value={formulario.tabla_antiguedad_vacaciones?.['+10'] || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="desde_periodo_corte" className="block text-gray-700 text-sm font-bold mb-2">Desde Periodo de Corte:</label>
                    <input type="date" id="desde_periodo_corte" name="desde_periodo_corte" value={formulario.desde_periodo_corte} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div>
                    <label htmlFor="hasta_periodo_corte" className="block text-gray-700 text-sm font-bold mb-2">Hasta Periodo de Corte:</label>
                    <input type="date" id="hasta_periodo_corte" name="hasta_periodo_corte" value={formulario.hasta_periodo_corte} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
            </div>
            <div>
                <label htmlFor="tope_salida_vacaciones" className="block text-gray-700 text-sm font-bold mb-2">Tope de Salida de Vacaciones (días):</label>
                <input type="number" id="tope_salida_vacaciones" name="tope_salida_vacaciones" value={formulario.tope_salida_vacaciones} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="flex justify-end gap-2">
                <button type="button" onClick={onCancelar} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Cancelar
                </button>
                <button type="button" onClick={guardarConfiguracion} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Guardar Configuración
                </button>
            </div>
        </form>
    );
}

export default FormConfiguracionSistema;