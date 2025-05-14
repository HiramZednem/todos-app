import { Todo } from "../todos/models/todo.model";
import { validate } from "uuid";

const Filters = {
    All: 'all',
    Completed: 'completed',
    Pending: 'pending'
}

const state = {
    todos: [],
    filter: Filters.All,
}

const initStore = () => {
    loadStore();
    console.log('InitStore 🐧')
    setFilter();
}

const loadStore = () => {
    const storedState = localStorage.getItem('state');
    if (!storedState) return;

    const { todos = [], filter = Filters.All } = JSON.parse(storedState);
    state.todos = todos.map(todo => new Todo(todo.description, todo.id, todo.done));
    state.filter = filter;
}

export const saveStateToLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(state))
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

    saveStateToLocalStorage();
}

const toogleTodo = ( idTodo ) => {
    validateId(idTodo);
    state.todos = state.todos.map((todo) => {
        if (todo.id === idTodo) {
            todo.done = !todo.done
        }
        return todo
    });
    saveStateToLocalStorage();
}

const deleteTodo = ( idTodo ) => {
    validateId(idTodo);
    state.todos = state.todos.filter(todo => todo.id !== idTodo)
    saveStateToLocalStorage();
};

const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => !todo.done);
    saveStateToLocalStorage();
}

const setFilter = ( filter = Filters.All ) => {
    if( !Object.values(Filters).includes(filter) ) throw new Error(`filter: ${filter} not valid`);
    state.filter = filter;
    saveStateToLocalStorage();
}

const getCurrentFilter = () => {
    return state.filter;
}

const validateId = (id) => {
    console.log(id)
    if (!id) throw new Error('id is required');
    if (!validate(id)) throw new Error(`id: ${id} not valid`);
}

export default { initStore, loadStore, addTodo, toogleTodo, deleteTodo, deleteCompleted, setFilter, getCurrentFilter, getTodos };