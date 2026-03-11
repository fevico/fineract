import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Fineract-Platform-TenantId',
      'X-Mifos-Platform-TenantId',
    ],
    credentials: true,
  });
  app.setGlobalPrefix('fineract-provider/api/v1');
  const port = process.env.PORT ?? 8443;
  await app.listen(port);
  console.log(`\n🏦 Fineract Mock Server running on http://localhost:${port}`);
  console.log(`📋 Base URL: http://localhost:${port}/fineract-provider/api/v1`);
  console.log(`🔑 Login: POST /fineract-provider/api/v1/authentication`);
  console.log(
    `   username: mifos  |  password: password  |  tenant: default\n`,
  );
}
bootstrap();
