import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { ContactMessageDto } from './dto/contact-message.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('mail')
export class MailController {
  constructor(readonly mailService: MailService) {}

  @ApiOperation({
    summary: 'Enviar un mensaje de contacto a la fundación',
    description:
      'Permite enviar a través de correo electrónico un mensaje de contacto a la fundación.',
  })
  @Post('contact')
  async sendContactMessage(@Body() contactMessageDto: ContactMessageDto) {
    await this.mailService.sendContactMessage(contactMessageDto);
    return { message: 'Su mensaje ha sido enviado exitosamente' };
  }
}
