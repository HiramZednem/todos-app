import todoStore, { Filters } from "../../store/todo.store";

let element;
export const countingPending = (elementId) => {
    if(!element) element = document.querySelector(elementId);       
    if(!element) throw new Error(`element with id ${elementId} doesnt exist`);

    console.log(element)
    element.innerHTML = todoStore.getTodos( Filters.Pending ).length;
}