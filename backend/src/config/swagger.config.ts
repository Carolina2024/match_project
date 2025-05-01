import { DocumentBuilder } from '@nestjs/swagger';

export const SWAGGER_OPTIONS = new DocumentBuilder()
  .setTitle('Patas Pirque')
  .setDescription(
    `
  Bienvenido a la documentación oficial de la API de Patas Pirque.

  Aquí encontrarás la descripción detallada de los distintos endpoints disponibles, sus métodos, parámetros de entrada, formatos de respuesta y ejemplos de uso.

  Te recomendamos seguir las instrucciones y ejemplos proporcionados para garantizar una correcta implementación y aprovechamiento de los servicios.
  `,
  )
  .setVersion('1.0')
  .addBearerAuth()
  .addGlobalResponse({
    status: 500,
    description: 'Ocurre un error en el servidor',
    example: {
      message: 'Error en el servidor',
      error: 'Internal server error',
      statusCode: 500,
    },
  })

  .build();
