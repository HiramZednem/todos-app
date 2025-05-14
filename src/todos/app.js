
import todoStore from '../store/todo.store';
import html from './app.html?raw'
import { renderTodo } from './usecases';

/**
 * 
 * @param {String} elementId 
 */
export const App = ( elementId ) => {

    const ElementsIds = {
        TodoList: '.todo-list',
        TodoInput: '#new-todo-input'
    }

    const loadTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        renderTodo(ElementsIds.TodoList, todos)
    }

    (()=>{
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append( app );
        loadTodos();
    })();

    // Referencias HTML
    const todoInput = document.querySelector(ElementsIds.TodoInput);
    
    // EventListeners
    todoInput.addEventListener('keyup', (evt) => {
        if(evt.keyCode !== 13) return;
        if(evt.target.value.trim().length === 0) return;

        todoStore.addTodo(evt.target.value);
        evt.target.value = '';
        loadTodos();
    })
}