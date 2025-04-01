import React from 'react'
import { HomeIcon } from '@heroicons/react/24/solid';  

function Inicio() {

  return (

<div className="flex flex-col items-center">  
<div className="p-4">
<h1 className="text-3xl font-bold mb-6 text-blue-600">sistema de Control de Vacaciones y Permisos (VacaTrackPro) destinado a optimizar la gestión de licencias y ausencias del personal dentro de la empresa</h1>
  <p className="text-lg text-gray-700 mb-4">Selecciona alguna opcion del menú</p>
</div>
<HomeIcon className="h-20 w-20 text-gray-500" />  
</div>

  );
}

export default Inicio;