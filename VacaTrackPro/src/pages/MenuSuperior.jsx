import { Cog6ToothIcon, UserIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";

import React from 'react';
import { CogIcon} from '@heroicons/react/24/outline';

function MenuSuperior() {
  return (
    <header className="bg-gray-480 text-black p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Bienvenido a VacaTrackPro</h2>
        <div className="flex items-center">
          <a href="#" className="mx-2">
            <CogIcon className="h-6 w-6" />
          </a>
          <a href="#" className="mx-2">
            <UserIcon className="h-6 w-6" />
          </a>
          <a href="#" className="mx-2">
            <UserIcon className="h-6 w-6" />
          </a>
        </div>
      </div>
    </header>
  );
}

export default MenuSuperior;