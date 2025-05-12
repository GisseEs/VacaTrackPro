import { useState } from "react";
import "./index.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import MenuLateral from "./pages/MenuLateral";
import MenuSuperior from "./pages/MenuSuperior";
import Contenido from "./pages/Contenido";
import PanelVacaciones from "./pages/PanelVacaciones";
import InicioSesionAnimado from "./pages/InicioSesion";
import PlanillaVacaciones from "./pages/PlanillaVacaciones";
import AprobacionVacaciones from "./pages/AprobacionVacaciones";
import SolicitudPermiso from "./pages/SolicitudPermiso";
import NotaVacaciones from "./pages/NotaVacaciones";
import EstadoPermisoFuncionario from "./pages/EstadoPermisoFuncionario";
import Usuario from "./pages/Usuario";
import Perfil from "./pages/perfil";
import Notificaciones from "./pages/Notificaciones";
import Empleado from "./pages/Empleado";

import ConfiguracionSistema from "./pages/ConfiguracionSistema";

import { useDispatch, useSelector } from 'react-redux';

import { userSlice } from "./features/user/userSlice";
import { useEffect } from "react";  

function App() {
    const [isOpen, setIsOpen] = useState(true);
   const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

   //const isAuthenticated = useSelector((state) => state)
    console.log(isAuthenticated)

const NavigateToLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
      navigate("/");
  }, [navigate]);

  return null;  
};

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
      dispatch(userSlice.actions.logout());
      navigate("/");
  }, [dispatch, navigate]);

  return (
      <div className="flex justify-center items-center h-full">
          <p>Cerrando sesión...</p>
      </div>
  );
};

    return (
       
            <BrowserRouter>
                <div className="flex h-screen w-screen">
                    {isAuthenticated && (
                        <MenuLateral isOpen={isOpen} toggleMenu={() => setIsOpen(!isOpen)} className="flex-shrink-0" />
                    )}
                    <div className="flex flex-col flex-1 min-w-0">
                        {isAuthenticated && <MenuSuperior />}
                        <Contenido>
                            <Routes>
                                <Route path="/" element={<InicioSesionAnimado />} />
                                <Route path="/vacaciones" element={isAuthenticated ? <PanelVacaciones /> : <NavigateToLogin />} />
                                <Route path="/planillavacaciones" element={isAuthenticated ? <PlanillaVacaciones /> : <NavigateToLogin />} />
                                <Route path="/aprobacionvacaciones" element={isAuthenticated ? <AprobacionVacaciones /> : <NavigateToLogin />} />
                                <Route path="/solicitudpermiso" element={isAuthenticated ? <SolicitudPermiso/> : <NavigateToLogin />} />
                                <Route path="/notavacaciones" element={isAuthenticated ? <NotaVacaciones/> : <NavigateToLogin />} />
                                <Route path="/estadopermiso" element={isAuthenticated ? <EstadoPermisoFuncionario/> : <NavigateToLogin />} />
                                <Route path="/gestionusuario" element={isAuthenticated ? <Usuario/> : <NavigateToLogin />} />
                                <Route path="/gestionempleado" element={isAuthenticated ? <Empleado/> : <NavigateToLogin />} />
                                <Route path="/perfil" element={isAuthenticated ? <Perfil /> : <NavigateToLogin />} />
                                <Route path="/notificaciones" element={isAuthenticated ? <Notificaciones /> : <NavigateToLogin />} />
                                <Route path="/logout" element={<Logout />} />
                                <Route path="/inicio" element={isAuthenticated ? <Contenido /> : <NavigateToLogin />} />
                                 <Route path="/gestionconfiguracion" element={isAuthenticated ? <ConfiguracionSistema /> : <NavigateToLogin />} />
                            </Routes>
                        </Contenido>
                    </div>
                </div>
            </BrowserRouter>
   
    );
}


export default App;