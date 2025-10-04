import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import * as pug from "pug";
import { join } from "path";

@Injectable()
export class NodemailerService {
  private transporter;

  constructor() {
  console.log("Variáveis carregadas:", {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS ? "***" : "undefined",
    from: process.env.MAIL_FROM,
  });

  this.transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp-relay.brevo.com",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}


async sendTemplate(
  to: string,
  subject: string,
  templateName: string,
  context: Record<string, any>,
) {
  const templatePath = join(process.cwd(), "src/modules/mail/infrastructure/common/templates", `${templateName}.pug`);
  const html = pug.renderFile(templatePath, context);

  try {
    const result = await this.transporter.sendMail({
      from: `"biblioteca Service" <${process.env.MAIL_FROM}>`,
      to,
      subject,
      html,
    });

    console.log("Email enviado:", result);
    return result;
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    throw error;
  }
}

  }

