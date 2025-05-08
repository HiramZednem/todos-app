import { Todo } from "../models/todo.model";

/**
 * 
 * @param {Todo} todo 
 * @returns {HTMLLIElement}
 */
export const createTodo = ( todo ) => {
    if (!todo) throw new Error('Todo is required');

    const todoElement = document.createElement('li');

    todo.done ? todoElement.className = 'completed' : todoElement.className = '';
    todoElement.setAttribute('data-id', todo.id);
    
    todoElement.innerHTML =`
        <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.done) ? 'checked' : '' }>
            <label>${todo.description}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Rule the web">
    `;


    return todoElement;
};
