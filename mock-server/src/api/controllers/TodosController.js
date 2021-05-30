export default class TodosController {
    constructor(service) {
        this.service = service;
    }

    getTodos = async (req, res, next) => {
        try {
            return res.json(this.service.getTodos());
        } catch (e) {
            return next(e);
        }
    }

    createTodo = async (req, res, next) => {
        try {
            const todoDto = req.body;
            const id = this.service.createTodo(todoDto);
            return res.status(201).json({ id });
        } catch (e) {
            return next(e);
        }
    }

    updateTodo = async (req, res, next) => {
        try {
            const result = this.service.updateTodo(req.params.id, req.body);
            if (result) {
                res.sendStatus(204);
            } else {
                res.sendStatus(404);
            }
        } catch (e) {
            return next(e);
        }
    }

    deleteTodo = async (req, res, next) => {
        try {
            const result = this.service.deleteTodo(req.params.id);
            if (result) {
                res.sendStatus(204);
            } else {
                res.sendStatus(404);
            }
        } catch (e) {
            return next(e);
        }
    }
}
