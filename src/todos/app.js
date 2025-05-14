
import todoStore, { Filters } from '../store/todo.store';
import html from './app.html?raw'
import { countingPending, renderTodos } from './usecases';

/**
 * 
 * @param {String} elementId 
 */
export const App = ( elementId ) => {

    const ElementsIds = {
        TodoList: '.todo-list',
        TodoInput: '#new-todo-input',
        ClearCompleted: '.clear-completed',
        FiltersLI: '.filtro',
        PendingCount: '#pending-count'
    }

    const loadTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        renderTodos(ElementsIds.TodoList, todos);
        updatePending();
    }

    const updatePending = () => {
        countingPending(ElementsIds.PendingCount)
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
    const clearCompleted = document.querySelector(ElementsIds.ClearCompleted);
    const filtersLi = document.querySelectorAll(ElementsIds.FiltersLI);
    
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

    filtersLi.forEach( element => 

        element.addEventListener('click', (e) => {
            filtersLi.forEach( el => el.classList.remove('selected') );
            e.target.classList.add('selected');


            switch(e.target.text){
                case 'Todos':
                    todoStore.setFilter(Filters.All)
                break
                case 'Pendientes':
                    todoStore.setFilter(Filters.Pending)
                break 
                case 'Completados':
                    todoStore.setFilter(Filters.Completed)
                break
            }
            
            loadTodos();
        })

    );
}