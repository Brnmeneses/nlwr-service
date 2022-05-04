import nodemailer from "nodemailer";
import { MailAdapter, SendEmailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "0acb260b152113",
    pass: "fe2422eef6f9c0",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendEmailData) {
    await transport.sendMail({
      from: "Equipe Feedget <oi@feedget.com>",
      to: "Bruno Meneses <brnmeneses@gmail.com>",
      subject: subject,
      html: body,
    });
  }
}
