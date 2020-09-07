import './styles.css';

import { Todo, TodoList } from './classes';
import { crearTodoHtml } from './js/componentes';
// import { Todo } from './classes/todo.class';
// import { TodoList } from './classes/todo-list.class';



export const todoList = new TodoList();

// const tarea = new Todo('Aprendiendo JavaScritp!!!');

// todoList.nuevoTodo(tarea);


// console.log(todoList);

// crearTodoHtml(tarea);

todoList.todos.forEach(todo => crearTodoHtml(todo));

//const newTodo = new Todo('Aprendiendo JavaScript');
//todoList.nuevoTodo(newTodo);

todoList.todos[0].imprimirClase();

console.log('todos', todoList.todos);