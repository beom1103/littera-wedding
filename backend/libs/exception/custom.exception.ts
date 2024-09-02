import { HttpException, HttpStatus, Logger } from "@nestjs/common";

export class ErrorResponder extends HttpException {
  private readonly logger = new Logger(ErrorResponder.name);

  constructor(message: string, status: HttpStatus) {
    super(
      {
        statusCode: status,
        message,
      },
      status,
    );

    this.logError(message, status);
  }

  private logError(message: string, status: HttpStatus) {
    this.logger.log(`Status: ${status}, Message: ${message}`);
  }
}
