import express from 'express';
import cors from 'cors';
import config from './common/config';
import AppRouter from './app.routes';
import RequestErrorHandler from './app.error';

class App {
  private app = express();

  private port = config.app.port;

  private env = config.app.env;

  private domain = config.app.domain;

  private appRouter = new AppRouter();

  constructor() {
    this.setupCors();
    this.setupAcceptContentType();
    this.setupEndpoint();
    this.setupRequestErrorHandler();
  }

  setupAcceptContentType() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  setupCors() {
    this.app.use(cors({
      origin: this.domain,
    }));
  }

  setupEndpoint() {
    this.app.use('/', this.appRouter.getRouter());
  }

  setupRequestErrorHandler() {
    this.app.use(RequestErrorHandler);
  }

  run() {
    this.app.listen(this.port, () => {
      // eslint-disable-next-line no-console
      console.info(`[CSC326 backend] run on ${this.env} and using port: ${this.port}`);
    });
  }
}

new App().run();
