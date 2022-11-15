import nodemailer from 'nodemailer';

async function sendEmailForgotPassword({nombre, email, token}) {
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: 'vtorresquintanilla0206@gmail.com',
      pass: "bpouhsttwwodnjjz"
    }
  });

  const info = await transport.sendMail({
    from: 'Cambio de contraseña en Admin cuentas streaming (ASA)',
    to: email,
    subject: 'Confirmacion de cuenta en ASA',
    html: `<p>Hola ${nombre}. Solicitaste un cambio de contraseña en ASA</p>
    <p>Puedes cambiarla en el siguiente enlace: <a href="${process.env.FRONTEND_URL}/save-password/${token}">Cambiar contraseña</a></p>

    <p>Si tu no solicitaste este cambio de contraseña haz caso omiso a este mensaje</p>
    `,
  });

  console.log("Message sent: %s", info.messageId);
}

export default sendEmailForgotPassword