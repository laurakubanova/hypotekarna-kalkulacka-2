import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: process.env.WEB_APP_URL ?? "http://localhost:3000" });
  app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix("");

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`API beží na http://localhost:${port}`);
}

bootstrap();
