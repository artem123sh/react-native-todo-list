import { v4 as uuidv4 } from 'uuid';

export default class TodosService {
    constructor() {
        this.todos = [];
    }

    getTodos() {
        return this.todos;
    }

    createTodo(todo) {
        const id = uuidv4();
        this.todos.push({ ...todo, id, complete: false });
        return id;
    }

    updateTodo(id, todo) {
        const indexToUpdate = this.todos.findIndex(({ id: todoId }) => todoId === id );
        if (indexToUpdate !== -1) {
            this.todos[indexToUpdate] = { ...this.todos[indexToUpdate], ...todo };
            return true;
        }
        return false;
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(({ id: todoId }) => todoId !== id);
        return true;
    }
}
