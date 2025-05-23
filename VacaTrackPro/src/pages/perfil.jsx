import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userSlice } from "../features/user/userSlice";
import Swal from "sweetalert2";
import { API_URL } from "@/api/api";

export default function Perfil() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  // Inicializa el estado local 'usuario' con el nombre del estado de Redux
  const [usuario, setUsuario] = useState(user.nombre || "");
  const [contrasenaActual, setContrasenaActual] = useState("");
  const [nuevaContrasena, setNuevaContrasena] = useState("");
  const [confirmarNuevaContrasena, setConfirmarNuevaContrasena] = useState("");

  const handleChangeUsuario = (e) => {
    setUsuario(e.target.value);
  };

  const handleChangeContrasenaActual = (e) => {
    setContrasenaActual(e.target.value);
  };

  const handleChangeNuevaContrasena = (e) => {
    setNuevaContrasena(e.target.value);
  };

  const handleChangeConfirmarNuevaContrasena = (e) => {
    setConfirmarNuevaContrasena(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuario.trim()) {
      Swal.fire("Advertencia", "El nombre de usuario no puede estar vacío.", "warning");
      return;
    }

    if (nuevaContrasena && nuevaContrasena.length < 6) {
      Swal.fire("Advertencia", "La nueva contraseña debe tener al menos 6 caracteres.", "warning");
      return;
    }

    if (nuevaContrasena !== confirmarNuevaContrasena) {
      Swal.fire("Error", "La nueva contraseña y la confirmación no coinciden.", "error");
      return;
    }

    const datosActualizacion = {
      usuario: usuario,
      contrasenaActual: contrasenaActual,
      nuevaContrasena: nuevaContrasena,
    };

    try {
      const response = await fetch(`${API_URL}/usuarios/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(datosActualizacion),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire("Éxito", data.mensaje || "Perfil actualizado correctamente.", "success");
        dispatch(userSlice.actions.loginSuccess({ token: user.token, nombre: usuario, email: user.email }));
        setContrasenaActual("");
        setNuevaContrasena("");
        setConfirmarNuevaContrasena("");
      } else {
        Swal.fire("Error", data.mensaje || "Error al actualizar el perfil.", "error");
      }
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      Swal.fire("Error", "Error al comunicarse con el servidor.", "error");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Perfil de Usuario</h2>

      <div className="mb-4">
        <label htmlFor="nombre" className="block text-gray-700 text-sm font-bold mb-2">
          Nombre:
        </label>
        <input
          type="text"
          id="nombre"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={usuario} // Usa el estado local 'usuario' que se inicializa con el nombre de Redux
          onChange={handleChangeUsuario}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
          Email:
        </label>
        <input
          type="email"
          id="email"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={user.email || ""} // Muestra el email del estado de Redux
          readOnly
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="contrasenaActual" className="block text-gray-700 text-sm font-bold mb-2">
            Contraseña Actual:
          </label>
          <input
            type="password"
            id="contrasenaActual"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={contrasenaActual}
            onChange={handleChangeContrasenaActual}
          />
        </div>

        <div>
          <label htmlFor="nuevaContrasena" className="block text-gray-700 text-sm font-bold mb-2">
            Nueva Contraseña (opcional):
          </label>
          <input
            type="password"
            id="nuevaContrasena"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={nuevaContrasena}
            onChange={handleChangeNuevaContrasena}
          />
        </div>

        <div>
          <label htmlFor="confirmarNuevaContrasena" className="block text-gray-700 text-sm font-bold mb-2">
            Confirmar Nueva Contraseña:
          </label>
          <input
            type="password"
            id="confirmarNuevaContrasena"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={confirmarNuevaContrasena}
            onChange={handleChangeConfirmarNuevaContrasena}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}