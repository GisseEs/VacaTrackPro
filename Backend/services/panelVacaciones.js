
const Empleado = require("../models/empleado");  
const ConfiguracionSistema = require("../models/configuracionSistema"); // Importa el modelo de Configuración

const dayjs = require("dayjs");
require("dayjs/locale/es");
dayjs.locale("es");

const calcularAntiguedad = (fechaIngreso) => dayjs().diff(dayjs(fechaIngreso), "year");

const calcularDiasVacaciones = (antiguedad, tablaAntiguedad) => {
  const antiguedadParaCalculo = antiguedad === 0 ? 1 : antiguedad; // Si la antigüedad es 0, usamos 1 para el cálculo

  for (const rango in tablaAntiguedad) {
    const [min, max] = rango.split("-").map(Number);
    if (antiguedadParaCalculo >= min && (!max || antiguedadParaCalculo <= max)) {
      return tablaAntiguedad[rango];
    }
  }
  return 0; // Si no coincide con ningún rango, retorna 0 días
};

const calcularTopeFechaSalida = (fechaIngreso, antiguedad, topeSalidaVacacionesMeses) => {
  const fechaIngresoDayjs = dayjs(fechaIngreso);
  const mesesToAdd = parseInt(topeSalidaVacacionesMeses, 10); // Convertimos la cadena a un número entero

  if (isNaN(mesesToAdd)) {
    console.error("El valor de tope_salida_vacaciones en la configuración no es un número válido.");
    return "Error en configuración"; // O podrías devolver un valor por defecto o lanzar un error
  }

  const antiguedadParaTope = antiguedad === 0 ? 1 : antiguedad; // Usamos 1 para el tope también, para el primer año
  const fechaTope = fechaIngresoDayjs.add(antiguedadParaTope, "year").add(mesesToAdd, "months");
  return fechaTope.format("DD/MM/YYYY");
};

const calcularInformacionVacaciones = async () => {
  try {
    const empleados = await Empleado.find().populate('_id', 'nombre_departamento'); // Populate para obtener el nombre del departamento
    const configuracion = await ConfiguracionSistema.findOne(); // Obtén la configuración del sistema

    if (!configuracion) {
      throw new Error("No se encontró la configuración del sistema.");
    }

    const tablaAntiguedadVacaciones = configuracion.tabla_antiguedad_vacaciones;
    const topeSalidaVacacionesMeses = configuracion.tope_salida_vacaciones;
    const hastaPeriodoCorte = dayjs(configuracion.hasta_periodoCorte); // Convertir a objeto Dayjs

    if (!tablaAntiguedadVacaciones || typeof tablaAntiguedadVacaciones !== 'object') {
      throw new Error("La tabla de antigüedad de vacaciones no está configurada correctamente.");
    }

    const empleadosProcesados = empleados.map((emp) => {
      const antiguedad = calcularAntiguedad(emp.fechaIngreso);
      const diasVacaciones = calcularDiasVacaciones(antiguedad, tablaAntiguedadVacaciones);
      const fechaIngresoDayjs = dayjs(emp.fechaIngreso).locale("es");
      const mesIngreso = fechaIngresoDayjs.format("MMMM").toUpperCase();

      // Establecer el año de la fecha de salida al año del hasta_periodo_corte
      const fechaSalida = fechaIngresoDayjs.set('year', hastaPeriodoCorte.year()).format('DD/MM/YYYY');
      const topeFechaSalida = calcularTopeFechaSalida(emp.fechaIngreso, antiguedad, topeSalidaVacacionesMeses);
      const departamentoNombre = emp.id_departamento ? emp.id_departamento.nombre_departamento : null; // Obtener el nombre del departamento

      return {
        id: emp._id,
        nombre: emp.nombre,
        apellido: emp.apellido,
        cedula: emp.cedula,
        fechaIngreso: emp.fechaIngreso,
        antiguedad: antiguedad,
        diasVacaciones,
        mesIngreso,
        fechaSalida,
        topeFechaSalida,
        id_departamento: emp.id_departamento ? emp.id_departamento._id : null,
        nombre_departamento: departamentoNombre,
      };
    });

    return empleadosProcesados;
  } catch (error) {
    console.error("Error al calcular la información de vacaciones:", error);
    throw error;
  }
};

const calcularInformacionVacacionesPorDepartamento = async (departamentoId) => {
  try {
    const empleados = await Empleado.find({ id_departamento: departamentoId }).populate('id_departamento', 'nombre_departamento');
    const configuracion = await ConfiguracionSistema.findOne();

    if (!configuracion) {
      throw new Error("No se encontró la configuración del sistema.");
    }

    const tablaAntiguedadVacaciones = configuracion.tabla_antiguedad_vacaciones;
    const topeSalidaVacacionesMeses = configuracion.tope_salida_vacaciones;
    const hastaPeriodoCorte = dayjs(configuracion.hastaPeriodoCorte); // Convertir a objeto Dayjs

    if (!tablaAntiguedadVacaciones || typeof tablaAntiguedadVacaciones !== 'object') {
      throw new Error("La tabla de antigüedad de vacaciones no está configurada correctamente.");
    }

    const empleadosProcesados = empleados.map((emp) => {
      const antiguedad = calcularAntiguedad(emp.fechaIngreso);
      const diasVacaciones = calcularDiasVacaciones(antiguedad, tablaAntiguedadVacaciones);
      const fechaIngresoDayjs = dayjs(emp.fechaIngreso).locale("es");
      const mesIngreso = fechaIngresoDayjs.format("MMMM").toUpperCase();

      // Establecer el año de la fecha de salida al año del hasta_periodo_corte
      const fechaSalida = fechaIngresoDayjs.set('year', hastaPeriodoCorte.year()).format('DD/MM/YYYY');
      const topeFechaSalida = calcularTopeFechaSalida(emp.fechaIngreso, antiguedad, topeSalidaVacacionesMeses);
      const departamentoNombre = emp.id_departamento ? emp.id_departamento.nombre_departamento : null;

      return {
        id: emp._id,
        nombre: emp.nombre,
        apellido: emp.apellido,
        cedula: emp.cedula,
        fechaIngreso: emp.fechaIngreso,
        antiguedad: antiguedad,
        diasVacaciones,
        mesIngreso,
        fechaSalida,
        topeFechaSalida,
        id_departamento: emp.id_departamento ? emp.id_departamento._id : null,
        nombre_departamento: departamentoNombre,
      };
    });

    return empleadosProcesados;
  } catch (error) {
    console.error("Error al calcular la información de vacaciones por departamento:", error);
    throw error;
  }
};

// Nueva función para buscar empleado por ID
const calcularInformacionVacacionesPorEmpleado = async (empleadoId) => {
  try {
    const empleado = await Empleado.findById(empleadoId).populate('_id', 'nombre_departamento');
    const configuracion = await ConfiguracionSistema.findOne();

    if (!configuracion) {
      throw new Error("No se encontró la configuración del sistema.");
    }

    const tablaAntiguedadVacaciones = configuracion.tabla_antiguedad_vacaciones;
    const topeSalidaVacacionesMeses = configuracion.tope_salida_vacaciones;
    const hastaPeriodoCorte = dayjs(configuracion.hastaPeriodoCorte); // Convertir a objeto Dayjs

    if (!empleado) {
      return null; // O lanza un error si prefieres manejarlo así
    }

    const antiguedad = calcularAntiguedad(empleado.fechaIngreso);
    const diasVacaciones = calcularDiasVacaciones(antiguedad, tablaAntiguedadVacaciones);
    const fechaIngresoDayjs = dayjs(empleado.fechaIngreso).locale("es");
    const mesIngreso = fechaIngresoDayjs.format("MMMM").toUpperCase();
    const fechaSalida = fechaIngresoDayjs.set('year', hastaPeriodoCorte.year()).format('DD/MM/YYYY');
    const topeFechaSalida = calcularTopeFechaSalida(empleado.fechaIngreso, antiguedad, topeSalidaVacacionesMeses);
    const departamentoNombre = empleado.id_departamento ? empleado.id_departamento.nombre_departamento : null;

    return {
      id: empleado._id,
      nombre: empleado.nombre,
      apellido: empleado.apellido,
      cedula: empleado.cedula,
      fechaIngreso: empleado.fechaIngreso,
      antiguedad: antiguedad,
      diasVacaciones,
      mesIngreso,
      fechaSalida,
      topeFechaSalida,
      id_departamento: empleado.id_departamento ? empleado.id_departamento._id : null,
      nombre_departamento: departamentoNombre,
    };
  } catch (error) {
    console.error("Error al calcular la información de vacaciones por empleado:", error);
    throw error;
  }
};

module.exports = {
  calcularInformacionVacaciones,
  calcularInformacionVacacionesPorDepartamento,
  calcularInformacionVacacionesPorEmpleado, // Exporta la nueva función
};