import { Catch, ArgumentsHost, HttpStatus, HttpException, Logger } from "@nestjs/common";
import { Request, Response } from "express";
import { QueryFailedError } from "typeorm";
import { ErrorResponder } from "./custom.exception";

enum MysqlErrorCode {
  ALREADY_EXIST = "ER_DUP_ENTRY",
}

@Catch()
export class ExceptionsFilter {
  private readonly logger: Logger = new Logger(ExceptionsFilter.name);

  public catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const statusCode = this.getHttpStatus(exception);
    const datetime = new Date().toISOString(); // UTC 시간으로 설정

    const message = exception instanceof HttpException ? exception.message : (exception as Error).message || "UNKNOWN ERROR";
    const stack = exception instanceof Error ? exception.stack : "";
    const errorResponse = {
      code: statusCode,
      timestamp: datetime,
      path: req.url,
      method: req.method,
      message: message,
      stack: stack,
    };

    if (statusCode >= HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(`Error: ${JSON.stringify(errorResponse)}`, errorResponse.stack);
    } else {
      this.logger.warn(`Warning: ${JSON.stringify(errorResponse)}`);
    }

    res.status(statusCode).json(errorResponse);

    // ErrorResponder를 사용하여 로그 기록
    new ErrorResponder(message, statusCode);
  }

  private getHttpStatus(exception: unknown): HttpStatus {
    if (exception instanceof QueryFailedError && exception.driverError.code === MysqlErrorCode.ALREADY_EXIST) {
      return HttpStatus.CONFLICT;
    } else if (exception instanceof HttpException) {
      return exception.getStatus();
    } else {
      return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }
}
