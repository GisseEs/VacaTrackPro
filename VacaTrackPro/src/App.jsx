import { useState } from "react";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MenuLateral from "./pages/MenuLateral";
import MenuSuperior from "./pages/MenuSuperior";
import Contenido from "./pages/Contenido";
import PanelVacaciones from "./pages/PanelVacaciones";
import InicioSesionAnimado from "./pages/InicioSesion";
import PlanillaVacaciones from "./pages/PlanillaVacaciones";
function App() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <BrowserRouter>
      <div className="flex h-screen w-screen">
        <MenuLateral isOpen={isOpen} toggleMenu={() => setIsOpen(!isOpen)} className="flex-shrink-0" />
        <div className="flex flex-col flex-1 min-w-0">
          <MenuSuperior />
          <Contenido>
            <Routes>
              <Route path="/vacaciones" element={<PanelVacaciones />} />
            </Routes>
            <Routes>
              <Route path="/iniciosesion" element={<InicioSesionAnimado />} />
            </Routes>
            <Routes>
              <Route path="/planillavacaciones" element={<PlanillaVacaciones />} />
            </Routes>
          </Contenido>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;