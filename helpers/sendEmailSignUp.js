import nodemailer from 'nodemailer';

async function sendEmailSignUp({nombre, email, token}) {
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
    from: 'Admin cuentas streaming (ASA)',
    to: email,
    subject: 'Confirmacion de cuenta en Admin cuentas streaming (ASA)',
    html: `<p>Hola ${nombre}. Confirma tu cuenta en ASA para empezar a administrar tus cuentas de streaming</p>
    <p>Confirmala en el siguiente enlace: <a href="${process.env.FRONTEND_URL}/confirm/${token}">Confirmar cuenta</a></p>

    <p>Si tu no creaste esta cuenta haz caso omiso a este mensaje</p>
    `,
  });

  console.log("Message sent: %s", info.messageId);
}

export default sendEmailSignUp