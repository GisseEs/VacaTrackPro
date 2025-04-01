import React from 'react';

const Contenido = ({ children }) => {
  return (
    <div className="p-4">
      {children} {/* Renderiza los children pasados desde App.jsx */}
    </div>
  );
};

export default Contenido;