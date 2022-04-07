import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { ErrorHandler } from 'express-handler-errors';
import morgan from 'morgan-body';
import routes from './routes';
import logger from './middlewares/Logger';

class App {
  public readonly express: Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    this.errorHandle();
  }

  private middleware(): void {
    this.express.use(express.json());
    this.express.use(cors());
    morgan(this.express, {
      noColors: true,
      prettify: false,
      logReqUserAgent: false,
      stream: {
        write: (msg: string) => {
          logger.log(msg);
          return false;
        },
      },
    });
  }

  private errorHandle(): void {
    this.express.use(
      (err: Error, _: Request, res: Response, next: NextFunction) => {
        new ErrorHandler().handle(err, res, next);
      }
    );
  }

  private routes(): void {
    this.express.use(routes);
  }
}

export default new App().express;
