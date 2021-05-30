import express from 'express';
import http from 'http';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import logger from './utils/logger';
import requestLogger from './api/middlewares/requestLogger';
import AuthenticationRoutes from './api/routes/AuthenticationRoutes';
import TodosRoutes from './api/routes/TodosRoutes';
import AuthenticationService from './services/AuthenticationService';
import TodosService from './services/TodosService';
import AuthorizationService from './services/AuthorizationService';
import { verifyTokenWith } from './api/middlewares/authorization';

class Server {
    constructor() {
        process.on('uncaughtException', (err) =>  {
            logger.error(err);
            process.exit(1);
        });
        process.on('unhandledRejection', err => {
            logger.error(err);
        });
        this.app = express();
        this.config();
        this.routes();
        this.app.disable('x-powered-by');
    }

    config() {
        this.app.use(cors({ origin: process.env.ORIGIN }));
        this.app.set('port', Number(process.env.PORT) || 3000);
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(compression());
        this.app.use(cookieParser());
        this.app.use(requestLogger);
    }

    routes() {
        const authenticationService = new AuthenticationService();
        const authorizationService = new AuthorizationService();
        const todosService = new TodosService();

        this.app.use('/login', new AuthenticationRoutes(authenticationService).router);
        this.app.use('/todos', verifyTokenWith(authorizationService), new TodosRoutes(todosService).router);
    }

    start() {
        const port = this.app.get('port');
        http.createServer(this.app).listen(port, () => {
            logger.info(`API is running at http://localhost:${port}`);
        });
    }
}

const server = new Server();
server.start();
