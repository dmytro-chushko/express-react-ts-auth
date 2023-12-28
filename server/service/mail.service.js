const nodemailer = require("nodemailer");

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secret: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: `Activate your accaunt on ${process.env.API_URL}`,
      text: "",
      html: `
        <div>
          <h1>Folow the link for activate your account</h1>
          <a href="${link}">${link}</a>
        </div>
      `,
    });
  }
}

module.exports = new MailService();
