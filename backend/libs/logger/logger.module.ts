import { Global, Logger, MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { LoggerContextMiddleware } from "./logger.context.middleware";

@Global()
@Module({
  imports: [JwtModule.register({})],
  providers: [Logger],
  exports: [Logger],
})
export class LoggerModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerContextMiddleware).forRoutes("*");
  }
}
