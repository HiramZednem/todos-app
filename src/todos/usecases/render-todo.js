import { Todo } from "../models/todo.model";
import { createTodo } from "./";

let element;
/**
 * 
 * @param {String} elementId el id del elemento en donde se desea renderizar los todos 
 * @param {Todo} todoList 
 */
export const renderTodo = ( elementId, todoList ) => {
    if(!elementId) throw new Error('elementId required');
    if(!todoList) throw new Error('todoList required') 
       
    if (!element) element = document.querySelector(elementId); 
    if (!element) throw new Error(`element with id: ${elementId} not found`) 
    
   element.innerHTML = ''
   todoList.forEach(todo => { 
        const todoElement = createTodo(todo);
        element .append(todoElement); 
   });
}