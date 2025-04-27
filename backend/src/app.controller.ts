import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: 'Obtener la información del equipo',
    description: 'Devuelve la información general del equipo.',
  })
  @ApiOkResponse({
    description: 'Devuelve exitosamente la información del equipo',
    example: {
      name: 'Match Project',
      links: {
        github: 'https://github.com/Carolina2024/match_project',
        frontend: 'https://match-adopcion-mascotas.vercel.app/',
      },
      members: {
        'UX/UI': [
          'Anabel Somoza',
          'Feliangela García',
          'Daniela López Carrillo',
          'Camila Schamun',
          'Nayely Mell RodrÍguez Auccasi',
        ],
        Frontend: [
          'Christian Martínez',
          'Ingrid Paola Chaves Barbosa',
          'Carolina Castillo',
          'Luis Ángel Quispe Navarro',
          'Eduardo Ismael Fuentes',
        ],
        Backend: [
          'Ricardo César Ortega Quejuan',
          'Diana Mayorga',
          'Angel Añez',
          'Miriam Bautista Torres',
          'Sonny Pimentel',
        ],
        QA: ['Gabriela Beatriz Pardo', 'David Zabala'],
        AF: 'Juan Francisco Aguilar Bermeo',
        PM: 'Claudia Campos González',
      },
    },
  })
  @Get('/docs')
  welcome() {
    return this.appService.welcome();
  }
}
