const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const process = require("process");
const email = process.env.MAILER_EMAIL_FROM;
const pass = process.env.MAILER_PASS;
const clientId = process.env.OAUTH_CLIENTID;
const clientSecret = process.env.OAUTH_CLIENT_SECRET;
const refreshToken = process.env.OAUTH_REFRESH_TOKEN;

// Configurar el transporte de correo
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: email,
    pass: pass,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});

async function sendMailToClient({
  nombreCliente,
  emailCliente,
  detallesCompra = [],
}) {
  const mailOptions = {
    from: email, // Remitente
    to: emailCliente, // Email del cliente
    subject: "Confirmación de compra",
    html: `
      <h2>Hola ${nombreCliente},</h2>
      <p>Tu compra ha sido realizada con éxito. Detalles:</p>
      <ul>
        ${detallesCompra
          .map(
            (item) =>
              `<li>
                <ul>
                  <li>Producto: ${item.title}</li>
                  <li>Descripcion: ${item.description}</li>
                  <li>Cantidad: ${item.quantity}</li>
                  <li>Precio unitario: ${item.unit_price}</li>
                </ul>
              </li>`
          )
          .join("")}
      </ul>
      <p>Gracias por tu compra.</p>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Correo de confirmación enviado: " + info.response);
    }
  });
}

async function receiveContactMessage({
  emailContacto,
}) {
  const mailOptions = {
    from: emailContacto, // Remitente
    to: email, // Email del cliente
    subject: "Contacto",
    html: `
      <h2>Hola ${nombreCliente},</h2>
      <p>Tu compra ha sido realizada con éxito. Detalles:</p>
      <ul>
        ${detallesCompra
          .map(
            (item) =>
              `<li>
                <ul>
                  <li>Producto: ${item.title}</li>
                  <li>Descripcion: ${item.description}</li>
                  <li>Cantidad: ${item.quantity}</li>
                  <li>Precio unitario: ${item.unit_price}</li>
                </ul>
              </li>`
          )
          .join("")}
      </ul>
      <p>Gracias por tu compra.</p>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Correo de confirmación enviado: " + info.response);
    }
  });
}

module.exports = { sendMailToClient };
