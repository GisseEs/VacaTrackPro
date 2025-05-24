const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "gisseesvi25@gmail.com",
    pass: "ilng swat zdnp gtuz",
  },
});
const mailOptions = {
  from: "gissees25@outlook.com",
  to: "martinezcrizs10@gmail.com",
  subject: "Hola Mundo!",
  text: "we are the champions bootcamperos!",
};
transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log("Error al enviar el correo:", error);
  } else {
    console.log("Correo enviado:", info.response);
  }
});