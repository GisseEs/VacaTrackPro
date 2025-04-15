import React, { useState } from 'react';

const formEnvioCorreo = () => {
  const [destinatarios, setDestinatarios] = useState('');
  const [cc, setCc] = useState('');
  const [bcc, setBcc] = useState('');
  const [asunto, setAsunto] = useState('');
  const [body, setBody] = useState('');
  const [mensajeResultado, setMensajeResultado] = useState('');
  const [errorResultado, setErrorResultado] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensajeResultado('');
    setErrorResultado('');

    // Aquí podrías realizar validaciones en el frontend antes de enviar los datos

    const correoData = {
      to: destinatarios.split(',').map(email => email.trim()), // Convertir a array de destinatarios
      cc: cc.split(',').map(email => email.trim()).filter(email => email), // Convertir a array y filtrar vacíos
      bcc: bcc.split(',').map(email => email.trim()).filter(email => email), // Convertir a array y filtrar vacíos
      subject: asunto,
      body: body,
    };

    try {
      // Simulación de envío al backend (reemplaza con tu llamada real a la API)
      console.log('Datos a enviar al backend:', correoData);
      setMensajeResultado('Simulación de envío exitosa. Verifica la consola.');
      // const response = await fetch('/api/email/send', { // Reemplaza con tu endpoint real
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(correoData),
      // });

      // const data = await response.json();

      // if (response.ok) {
      //   setMensajeResultado(data.message);
      //   setDestinatarios('');
      //   setCc('');
      //   setBcc('');
      //   setAsunto('');
      //   setBody('');
      // } else {
      //   setErrorResultado(data.error || 'Error al enviar el correo.');
      // }
    } catch (error) {
      setErrorResultado('Error al comunicarse con el servidor.');
      console.error('Error al enviar el correo:', error);
    }
  };

  return (
    <div>
      <h2>Enviar Correo Electrónico</h2>
      {mensajeResultado && <p style={{ color: 'green' }}>{mensajeResultado}</p>}
      {errorResultado && <p style={{ color: 'red' }}>{errorResultado}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="destinatarios">Destinatario(s):</label>
          <input
            type="email"
            id="destinatarios"
            value={destinatarios}
            onChange={(e) => setDestinatarios(e.target.value)}
            placeholder="Ingrese las direcciones de correo separadas por comas"
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="cc">CC:</label>
          <input
            type="email"
            id="cc"
            value={cc}
            onChange={(e) => setCc(e.target.value)}
            placeholder="Ingrese las direcciones de correo separadas por comas (opcional)"
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div>
          <label htmlFor="bcc">CCO:</label>
          <input
            type="email"
            id="bcc"
            value={bcc}
            onChange={(e) => setBcc(e.target.value)}
            placeholder="Ingrese las direcciones de correo separadas por comas (opcional)"
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div>
          <label htmlFor="asunto">Asunto:</label>
          <input
            type="text"
            id="asunto"
            value={asunto}
            onChange={(e) => setAsunto(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="body">Mensaje:</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows="8"
            className="mt-1 p-2 border rounded w-full"
            required
          ></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
          Enviar Correo
        </button>
      </form>
    </div>
  );
};

export default formEnvioCorreo;