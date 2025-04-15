export function formatearFecha(fecha) {
      return new Date(fecha).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });
    }
    
    export function formatearFechaExtendida(fecha) {
      return new Date(fecha).toLocaleDateString('es-ES', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });
    }
    
    export function contarDiasHabiles(desde, hasta) {
      let count = 0;
      const current = new Date(desde);
      while (current <= hasta) {
        const day = current.getDay();
        if (day >= 1 && day <= 6) count++; // lunes a sábado
        current.setDate(current.getDate() + 1);
      }
      return count;
    }
    
    export function convertirNumeroALetras(num) {
      const letras = {
        30: 'Treinta',
        29: 'Veintinueve',
        28: 'Veintiocho',
        27: 'Veintisiete',
        26: 'Veintiséis',
        25: 'Veinticinco',
        24: 'Veinticuatro',
        23: 'Veintitrés',
        22: 'Veintidós',
        21: 'Veintiuno',
        20: 'Veinte',
        15: 'Quince',
        10: 'Diez',
        8: 'Ocho',
      };
      return letras[num] || num;
    }
    
    export function generarTextoNota({ empleado, fechaDeclaradaDesde, fechaDeclaradaHasta }) {
      const inicio = new Date(fechaDeclaradaDesde);
      const fin = new Date(fechaDeclaradaHasta);
    
      const notificacion = new Date(inicio);
      notificacion.setDate(notificacion.getDate() - 15);
    
      const reintegro = new Date(fin);
      reintegro.setDate(reintegro.getDate() + 1);
    
      const diasHabiles = contarDiasHabiles(inicio, fin);
    
      return `
    Asunción, ${formatearFecha(notificacion)}.-
    
    Señor/a.
    ${empleado}
    Presente
    
    Ref.: Comunicación de vacaciones
    
    Por la presente, ponemos a tu conocimiento que las vacaciones anuales que a usted le corresponden de ${diasHabiles} (${convertirNumeroALetras(diasHabiles)}) días, correspondiente al periodo 2024/2025 de acuerdo a su antigüedad podrá usufructuar como sigue:
    Desde el ${formatearFechaExtendida(inicio)}.
    Hasta el día ${formatearFechaExtendida(fin)}, inclusive.
    
    Su reintegro a las labores comienza a partir del día ${formatearFechaExtendida(reintegro)}, en el horario establecido.
    
    Sírvase pasar por las oficinas de la empresa a efectos de percibir el importe que le corresponde en concepto de vacaciones.
    
    Atentamente.
    
    
    
    
    Javier González                                  Lic. Yamil Bazán 
    Jefe de Recursos Humanos                         Gerente General
    
    Notificado en fecha: ${formatearFecha(notificacion)}
    
    Firma del empleado
    C.I. NO:`;
    }