import { Router } from 'express';
import TodosController from '../controllers/TodosController';
import { verifyAdmin } from '../middlewares/authorization';

export default class TodosRoutes {
    constructor(service) {
        this.controller = new TodosController(service);
        this.router = Router();
        this.routes();
    }

    routes = () => {
        this.router
            .get('/', this.controller.getTodos)
            .post('/', verifyAdmin, this.controller.createTodo);

        this.router
            .patch('/:id', this.controller.updateTodo)
            .delete('/:id', verifyAdmin, this.controller.deleteTodo);
    }
}
