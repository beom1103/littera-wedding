import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { winstonLogger } from "libs/logger/logger.config";
import * as cookieParser from "cookie-parser";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    logger: winstonLogger,
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>("PORT") || 3000;

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const frontendUrl = configService.get("LITTERA_API_URL_FE");
  const backendUrl = configService.get("LITTERA_API_URL_BE");

  app.enableCors({
    origin: [frontendUrl, backendUrl],
    credentials: true,
  });

  await app.listen(port);
}
bootstrap();
