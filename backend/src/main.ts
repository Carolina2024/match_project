import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //--------Documentanción de Swagger------------
  const options = new DocumentBuilder()
    .setTitle('Patas Pirque')
    .setDescription(
      `
      Bienvenido a la documentación oficial de la API de Patas Pirque.

      Aquí encontrarás la descripción detallada de los distintos endpoints disponibles, sus métodos, parámetros de entrada, formatos de respuesta y ejemplos de uso.

      Te recomendamos seguir las instrucciones y ejemplos proporcionados para garantizar una correcta implementación y aprovechamiento de los servicios.
      `,
    )

    .setVersion('1.0')
    .addTag('default')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  app.enableCors();
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
