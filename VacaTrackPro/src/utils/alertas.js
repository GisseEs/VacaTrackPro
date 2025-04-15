
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MiSwal = withReactContent(Swal);

// ALERTA GENERAL
export const mostrarAlerta = ({ title, text, icon = 'info', confirmButtonText = 'Aceptar' }) => {
  return MiSwal.fire({
    title,
    text,
    icon,
    confirmButtonText,
  });
};

// EXITO
export const mostrarExito = (mensaje = 'Operación realizada con éxito') => {
  return MiSwal.fire({
    icon: 'success',
    title: '¡Éxito!',
    text: mensaje,
    confirmButtonColor: '#28a745',
  });
};

// ERROR
export const mostrarError = (mensaje = 'Ocurrió un error inesperado') => {
  return MiSwal.fire({
    icon: 'error',
    title: 'Error',
    text: mensaje,
    confirmButtonColor: '#dc3545',
  });
};

// INFORMACIÓN
export const mostrarInfo = (mensaje = 'Esta es una información importante') => {
  return MiSwal.fire({
    icon: 'info',
    title: 'Información',
    text: mensaje,
    confirmButtonColor: '#0d6efd',
  });
};

// ADVERTENCIA
export const mostrarAdvertencia = (mensaje = 'Tené cuidado con esta acción') => {
  return MiSwal.fire({
    icon: 'warning',
    title: 'Advertencia',
    text: mensaje,
    confirmButtonColor: '#ffc107',
  });
};

// CONFIRMACIÓN
export const mostrarConfirmacion = async ({
  title = '¿Estás seguro?',
  text = mensaje,
  confirmButtonText = 'Sí, confirmar',
  cancelButtonText = 'Cancelar',
  icon = 'question',
}) => {
  const resultado = await MiSwal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
    confirmButtonColor: '#0d6efd',
    cancelButtonColor: '#6c757d',
  });

  return resultado.isConfirmed;
};
