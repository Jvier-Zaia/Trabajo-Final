import nodemailer from 'nodemailer';

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Debug: ver qué valores tiene
    console.log('EMAIL_USER:', process.env.EMAIL_USER);
    console.log('EMAIL_PASS existe:', !!process.env.EMAIL_PASS);
    console.log('EMAIL_PASS length:', process.env.EMAIL_PASS?.length);

    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }

  async sendWelcomeEmail(userEmail: string, userName: string) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: 'Bienvenido/a!!🎉✨',
      html: `<h1>¡Bienvenido/a🎉✨ ${userName}🎉✨!</h1>
        <p>Tu cuenta ha sido creada exitosamente!!!🎉</p>
        <p>Gracias por registrarte.</p>
      `
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('✔Email enviado a:', userEmail);
    } catch (error) {
      console.error('❌Error enviando email:', error);
    }
  }
}