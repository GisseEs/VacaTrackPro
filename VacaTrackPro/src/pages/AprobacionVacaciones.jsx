import React, { useEffect, useState } from "react";
import FiltroAprobVacaciones from "../components/filtroAprobVacaciones";
import ListaVacaciones from "../components/listaVacaciones";
import ModalDetalleVacaciones from "../components/modalDetalleVacaciones";
import Swal from 'sweetalert2';
import { API_URL } from "@/api/api";

const AprobacionVacaciones = () => {
  const [estadoFiltro, setEstadoFiltro] = useState("Pendientes");
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const [planillas, setPlanillas] = useState([]);
  const [planillaSeleccionada, setPlanillaSeleccionada] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);

  // Simula carga inicial con planillas pendientes
  useEffect(() => {
    aplicarFiltro();
  }, []);

  const aplicarFiltro = async () => {
    try {
      // Simulación de fetch - aquí iría la llamada real backend
      const datos = await fetchPlanillasSimuladas(estadoFiltro, fechaDesde, fechaHasta);
      setPlanillas(datos);
    } catch (error) {
      console.error("Error al obtener las planillas:", error);
    }
  };

  const fetchPlanillasSimuladas = async (estado, desde, hasta) => {
    // Este es un mock, reemplazar con API real
    const todas = [
      { id: 1, empleado: "Ana Gómez", departamento: "RRHH", fecha: "2025-04-05", estado: "Pendiente", detalles: [] },
      { id: 2, empleado: "Luis Rivas", departamento: "TI", fecha: "2025-04-07", estado: "Aprobado", detalles: [] },
    ];

    return todas.filter(planilla =>
      (estado === "Todos" || planilla.estado === estado.slice(0, -1)) &&
      (!desde || new Date(planilla.fecha) >= new Date(desde)) &&
      (!hasta || new Date(planilla.fecha) <= new Date(hasta))
    );
  };

  const manejarVerDetalle = (planilla) => {
    setPlanillaSeleccionada(planilla);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setPlanillaSeleccionada(null);
  };

  const aprobarTodasLasLineas = () => {
    console.log("aprobadando");
    Swal.fire({
      title: "¿Aprobar todas las líneas?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, aprobar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("fue por el then");
        Swal.fire("¡Aprobado!", "Todas las líneas han sido aprobadas.", "success");
        cerrarModal();
        aplicarFiltro();
      }
    });
  };

  const rechazarTodasLasLineas = () => {
    Swal.fire({
      title: "¿Rechazar todas las líneas?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, rechazar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("¡Rechazado!", "Todas las líneas han sido rechazadas.", "success");
        cerrarModal();
        aplicarFiltro();
      }
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-bold mb-4">Aprobación de Planillas de Vacaciones</h2>

      <FiltroAprobVacaciones
        estado={estadoFiltro}
        setEstado={setEstadoFiltro}
        fechaDesde={fechaDesde}
        setFechaDesde={setFechaDesde}
        fechaHasta={fechaHasta}
        setFechaHasta={setFechaHasta}
        aplicarFiltro={aplicarFiltro}
      />

      <ListaVacaciones
        planillas={planillas}
        verDetalle={manejarVerDetalle}
      />

      {modalAbierto && planillaSeleccionada && (
        <ModalDetalleVacaciones
          planilla={planillaSeleccionada}
          onClose={cerrarModal}
          onAprobarTodo={aprobarTodasLasLineas}
          onRechazarTodo={rechazarTodasLasLineas}
        />
      )}
    </div>
  );
};

export default AprobacionVacaciones;
