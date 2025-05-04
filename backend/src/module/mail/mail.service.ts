import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendRecoveryCode(email: string, token: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Código de recuperación de contraseña',
      template: 'recovery-code',
      context: {
        code:token,
      },
    });
  }
}
