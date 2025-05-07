import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { readFileSync } from 'fs';
import { compile } from 'handlebars';
import { join } from 'path';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('MAIL_HOST'),
      port: this.configService.get<number>('MAIL_PORT'),
      secure: false, // true para puerto 465, false para otros
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASSWORD'),
      },
    });
  }

  async sendMail(to: string, subject: string, html: string): Promise<void> {
    await this.transporter.sendMail({
      from: this.configService.get<string>('MAIL_FROM'),
      to,
      subject,
      html,
    });
  }

  /** Renderiza la plantilla Handlebars y envía */
  private renderAndSend<T>(
    templateName: string,
    to: string,
    subject: string,
    context: T,
  ) {
    const templatePath = join(__dirname, 'templates', `${templateName}.hbs`);
    const source = readFileSync(templatePath, 'utf8');
    const compiled = compile(source);
    const html = compiled(context);
    return this.sendMail(to, subject, html);
  }

    /** 1) Código de recuperación */
    async sendRecoveryCode(email: string, token: string) {
        return this.renderAndSend(
          'recovery-code',
          email,
          'Código de recuperación de contraseña',
          { code: token },
        );
      }


}
