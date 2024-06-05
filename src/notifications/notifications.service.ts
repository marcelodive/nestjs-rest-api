import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NotificationsService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.NODEMAILER_HOST,
      port: 465,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    });
  }

  async sendEmail(to: string, subject: string, html: string) {
    const mailOptions = {
      from: process.env.NODEMAILER_USER,
      to,
      subject,
      html,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.info('Email sent successfully', JSON.stringify(mailOptions));
    } catch (error) {
      console.error('Error sending email', error, JSON.stringify(mailOptions));
    }
  }
}
