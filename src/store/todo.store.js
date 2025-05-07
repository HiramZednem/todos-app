import { Todo } from "../todos/models/todo.model";
import { validate } from "uuid";

const Filters = {
    All: 'all',
    Completed: 'completed',
    Pending: 'pending'
}

const state = {
    todos: [
        new Todo('Comer'),
        new Todo('Dormir'),
        new Todo('Programar')
    ],
    filter: Filters.All,
}

const initStore = () => {
    console.log(state);
    console.log('InitStore 🐧')
    setFilter();
}

const loadStore = () => {
    throw new Error('Not implemented')
}

const getTodos = ( filter = Filters.All ) => {
    switch(filter) {
        case Filters.All:
            return [...state.todos];
        case Filters.Completed:
            return state.todos.filter(todo => todo.done);
        case Filters.Pending:
            return state.todos.filter(todo => !todo.done);
        default:
            throw new Error(`Option: ${filter} not valid`)
    }
}

/**
 * 
 * @param {string} description 
 */
const addTodo = ( description ) => {
    if (!description) throw new Error('description is required');
    state.todos.push( new Todo(description) );
}

const toogleTodo = ( idTodo ) => {
    validateId(idTodo);
    state.todos = state.todos.map((todo) => {
        if (todo.id === idTodo) {
            todo.done = !todo.done
        }
    });
}

const deleteTodo = ( idTodo ) => {
    validateId(idTodo);
    state.todos = state.todos.filter(todo => todo.id !== idTodo)
};

const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => !todo.done);
}

const setFilter = ( filter = Filters.All ) => {
    if( !Object.values(Filters).includes(filter) ) throw new Error(`filter: ${filter} not valid`);
    state.filter = filter;
}

const getCurrentFilter = () => {
    return state.filter;
}

const validateId = (id) => {
    if (!id) throw new Error('id is required');
    if (!validate(id)) throw new Error(`id: ${id} not valid`);
}

export default { initStore, loadStore, addTodo, toogleTodo, deleteTodo, deleteCompleted, setFilter, getCurrentFilter, getTodos };