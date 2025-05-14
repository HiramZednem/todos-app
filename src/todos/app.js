
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
        TodoInput: '#new-todo-input',
        ClearCompleted: '.clear-completed'
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
    const todoListUL = document.querySelector(ElementsIds.TodoList);
    const clearCompleted = document.querySelector(ElementsIds.ClearCompleted)
    
    // EventListeners
    todoInput.addEventListener('keyup', (evt) => {
        if(evt.keyCode !== 13) return;
        if(evt.target.value.trim().length === 0) return;

        todoStore.addTodo(evt.target.value);
        evt.target.value = '';
        loadTodos();
    });

    todoListUL.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]');

        todoStore.toogleTodo(element.getAttribute('data-id'));
        loadTodos();
    });

     todoListUL.addEventListener('click', (event) => {
        if (event.target.getAttribute('class') !== 'destroy') return;
        
        const element = event.target.closest('[data-id]');
        todoStore.deleteTodo(element.getAttribute('data-id'));
        loadTodos();
    });
    
    clearCompleted.addEventListener('click', (event)=> {
        todoStore.deleteCompleted();
        loadTodos();
    })
}