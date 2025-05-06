import { Todo } from "../todos/models/todo.model";

const state = {
    todos: [
        new Todo('Comer'),
        new Todo('Dormir'),
        new Todo('Programar')
    ]
}

const initStore = () => {
    console.log(state);
    console.log('InitStore 🐧')
}