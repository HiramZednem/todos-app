import './style.css'
import { App } from './todos/app'
import todosStore from './store/todo.store'
import todoStore from './store/todo.store'

todoStore.initStore();

App('#app')