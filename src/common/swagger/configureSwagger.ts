import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { IConfig } from '../config/IConfig';
import defaultStyles from './defaultStyles';

export function configureSwagger(
  app: INestApplication,
  configService: ConfigService<IConfig>,
): void {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('RF API')
    .setDescription('Russian Fairs API server')
    .setVersion('1.0.0')
    .addBearerAuth()
    .addCookieAuth(configService.get('cookieName'))
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup(configService.get('docsPath'), app, swaggerDocument, {
    swaggerOptions: {
      docExpansion: 'none',
      tagsSorter: 'alpha',
      plugins: [
      ],
    },
    customCss: [
      defaultStyles,
    ].join('\n'),
  });
}
