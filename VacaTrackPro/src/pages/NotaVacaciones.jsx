import React, { useEffect, useState } from 'react';
import {
    mostrarExito,
    mostrarError,
    mostrarConfirmacion,
    mostrarAdvertencia,
} from "../utils/alertas";
import { generarTextoNota } from "../utils/pdfHelpers";  
import PDFViewer from "../components/PDFViewer"; 
import { API_URL } from "@/api/api";

export default function NotaVacacionesRRHH() {
    const [solicitudes, setSolicitudes] = useState([]);
    const [filters, setFilters] = useState({
        fechaDesde: '',
        fechaHasta: '',
        estado: 'Pendiente',
    });

    const [modal, setModal] = useState({ visible: false, solicitud: null, desde: '', hasta: '' });
    const [textoNota, setTextoNota] = useState("");
    const [mostrarPDF, setMostrarPDF] = useState(false);

    useEffect(() => {
        cargarSolicitudes();
    }, []);

    const cargarSolicitudes = () => {
        let data = [
            {
                id: 1,
                empleado: 'Liz Florentin',
                departamento: 'Informática',
                fechaSolicitud: '2025-03-20',
                inicio: '2025-05-05',
                fin: '2025-05-14',
                estado: 'Pendiente',
                declarado: false,
                pdfGenerado: false,
            },
            {
                id: 2,
                empleado: 'Carlos Paredes',
                departamento: 'RRHH',
                fechaSolicitud: '2025-03-22',
                inicio: '2025-05-10',
                fin: '2025-05-17',
                estado: 'Aprobada',
                declarado: true,
                pdfGenerado: true,
            },
        ];

        if (filters.estado !== 'Todas') {
            data = data.filter((s) => s.estado === filters.estado);
        }

        setSolicitudes(data);
    };

    const handleDeclarar = (solicitud) => {
        setModal({
            visible: true,
            solicitud,
            desde: solicitud.inicio,
            hasta: solicitud.fin,
        });
    };

    const guardarDeclaracion = () => {
        if (!modal.desde || !modal.hasta) {
            mostrarError("Debes completar ambas fechas de declaración");
            return;
        }

        if (new Date(modal.desde) > new Date(modal.hasta)) {
            mostrarError("La fecha 'Desde' no puede ser posterior a la fecha 'Hasta'.");
            return;
        }

        setSolicitudes((prev) =>
            prev.map((s) =>
                s.id === modal.solicitud.id
                    ? { ...s, declarado: true, inicio: modal.desde, fin: modal.hasta }
                    : s
            )
        );
        mostrarExito("Declaración guardada correctamente");
        setModal({ visible: false, solicitud: null, desde: '', hasta: '' });
    };

    const generarNota = (solicitud) => {
        if (!solicitud.declarado) {
            mostrarAdvertencia("Primero debe declarar la fecha al MTESS.");
            return;
        }

        const texto = generarTextoNota({
            empleado: solicitud.empleado,
            fechaDeclaradaDesde: solicitud.inicio,
            fechaDeclaradaHasta: solicitud.fin
        });

        setTextoNota(texto);
        setMostrarPDF(true);

        setSolicitudes((prev) =>
            prev.map((s) => (s.id === solicitud.id ? { ...s, pdfGenerado: true } : s))
        );

        mostrarExito("Nota generada exitosamente");
    };

    const notificar = (solicitud) => {
        if (!solicitud.declarado) {
            mostrarAdvertencia("Debe declarar la fecha al MTESS primero.");
            return;
        }
        if (!solicitud.pdfGenerado) {
            mostrarAdvertencia("Primero debe generar la nota.");
            return;
        }

        // Simulación de envío de correo
        console.log(`Simulando envío de correo a ${solicitud.empleado} con la nota adjunta.`);
        mostrarExito("Correo enviado al funcionario con la nota adjunta.");
    };

    const cancelar = () => {
        setMostrarPDF(false);
        setTextoNota("");
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Nota de Vacaciones - RRHH</h2>

            {/* Filtros */}
            <div className="bg-gray-100 p-4 rounded mb-4 flex gap-4 items-end flex-wrap">
                <div>
                    <label className="block text-sm font-medium">Desde</label>
                    <input
                        type="date"
                        className="border rounded p-2"
                        value={filters.fechaDesde}
                        onChange={(e) => setFilters({ ...filters, fechaDesde: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Hasta</label>
                    <input
                        type="date"
                        className="border rounded p-2"
                        value={filters.fechaHasta}
                        onChange={(e) => setFilters({ ...filters, fechaHasta: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Estado</label>
                    <select
                        className="border rounded p-2"
                        value={filters.estado}
                        onChange={(e) => setFilters({ ...filters, estado: e.target.value })}
                    >
                        <option value="Pendiente">Pendiente</option>
                        <option value="Aprobada">Aprobada</option>
                        <option value="Todas">Todas</option>
                    </select>
                </div>
                <button
                    className="bg-gray-800 text-white px-4 py-2 rounded"
                    onClick={cargarSolicitudes}
                >
                    Aplicar Filtro
                </button>
            </div>

            {/* Tabla */}
            <table className="w-full table-auto border">
                <thead>
                    <tr className="bg-gray-200 text-left">
                        <th className="p-2">Empleado</th>
                        <th className="p-2">Departamento</th>
                        <th className="p-2">Fecha Solicitud</th>
                        <th className="p-2">Inicio Vacaciones</th>
                        <th className="p-2">Fin Vacaciones</th>
                        <th className="p-2">Estado</th>
                        <th className="p-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {solicitudes.map((s) => (
                        <tr key={s.id} className="border-t">
                            <td className="p-2">{s.empleado}</td>
                            <td className="p-2">{s.departamento}</td>
                            <td className="p-2">{new Date(s.fechaSolicitud).toLocaleDateString()}</td>
                            <td className="p-2">{new Date(s.inicio).toLocaleDateString()}</td>
                            <td className="p-2">{new Date(s.fin).toLocaleDateString()}</td>
                            <td className="p-2">{s.estado}</td>
                            <td className="p-2 flex gap-2 flex-wrap">
                                <button
                                    className="bg-blue-600 text-white px-3 py-1 rounded"
                                    onClick={() => handleDeclarar(s)}
                                >
                                    Declarar MTESS
                                </button>
                                <button
                                    className="bg-green-600 text-white px-3 py-1 rounded"
                                    onClick={() => generarNota(s)}
                                >
                                    Generar Nota
                                </button>
                                <button
                                    className="bg-orange-500 text-white px-3 py-1 rounded"
                                    onClick={() => notificar(s)}
                                >
                                    Notificar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal Declarar */}
            {modal.visible && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="bg-white rounded shadow p-6 w-[400px]">
                        <h3 className="text-lg font-semibold mb-4">Declarar Vacaciones al MTESS</h3>
                        <label className="block mb-2">Fecha Desde:</label>
                        <input
                            type="date"
                            className="border rounded p-2 w-full mb-4"
                            value={modal.desde}
                            onChange={(e) => setModal({ ...modal, desde: e.target.value })}
                        />
                        <label className="block mb-2">Fecha Hasta:</label>
                        <input
                            type="date"
                            className="border rounded p-2 w-full mb-4"
                            value={modal.hasta}
                            onChange={(e) => setModal({ ...modal, hasta: e.target.value })}
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                className="px-4 py-2 bg-gray-300 rounded"
                                onClick={() => setModal({ visible: false, solicitud: null })}
                            >
                                Cancelar
                            </button>
                            <button
                                className="px-4 py-2 bg-blue-600 text-white rounded"
                                onClick={guardarDeclaracion}
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* PDF Viewer */}
            <PDFViewer contenido={textoNota} visible={mostrarPDF} />

            {mostrarPDF && (
                <div className="flex justify-end mt-4">
                    <button onClick={cancelar} className="bg-red-500 text-white px-4 py-2 rounded">
                        Cancelar
                    </button>
                </div>
            )}
        </div>
    );
}