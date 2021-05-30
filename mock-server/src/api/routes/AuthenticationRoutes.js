import { Router } from 'express';
import AuthenticationController from '../controllers/AuthenticationController';

export default class AuthenticationRoutes {
    constructor(service) {
        this.controller = new AuthenticationController(service);
        this.router = Router();
        this.routes();
    }

    routes = () => {
        this.router.post('/', this.controller.login);
    }
}
