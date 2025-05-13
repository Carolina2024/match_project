import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { MailService } from './mail.service';
import { ContactMessageDto } from './dto/contact-message.dto';
import {
  ApiOkResponse,
  ApiOperation,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';

@Controller('mail')
export class MailController {
  constructor(readonly mailService: MailService) {}

  @ApiOperation({
    summary: 'Enviar un mensaje de contacto a la fundación',
    description:
      'Permite enviar a través de correo electrónico un mensaje de contacto a la fundación.',
  })
  @ApiOkResponse({
    description: 'El correo es enviado exitosamente',
    example: {
      message:
        'Te hemos enviado un correo con un enlace y un código para recuperar tu contraseña',
    },
  })
  @ApiTooManyRequestsResponse({
    description: 'El usuario hace muchas peticiones al endpoint',
    example: {
      statusCode: 429,
      message: 'ThrottlerException: Too Many Requests',
    },
  })
  @UseGuards(ThrottlerGuard)
  @Post('contact')
  async sendContactMessage(@Body() contactMessageDto: ContactMessageDto) {
    await this.mailService.sendContactMessage(contactMessageDto);
    return { message: 'Su mensaje ha sido enviado exitosamente' };
  }
}
