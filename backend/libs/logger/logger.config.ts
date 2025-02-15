import { utilities as nestWinstonModuleUtilities, WinstonModule } from "nest-winston";
import * as winston from "winston";

const isProduction = process.env.NODE_ENV === "production";
const logDir = __dirname + "/../../logs";

const dailyOptions = (level: string) => ({
  level,
  datePattern: "YYYY-MM-DD",
  dirname: `${logDir}/${level}`,
  filename: `%DATE%.${level}.log`,
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
});

export const winstonLogger = WinstonModule.createLogger({
  transports: [
    new winston.transports.Console({
      level: isProduction ? "info" : "silly",
      format: isProduction
        ? winston.format.simple()
        : winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike("Littera", {
              colors: true,
              prettyPrint: true,
            }),
          ),
    }),
  ],
});
