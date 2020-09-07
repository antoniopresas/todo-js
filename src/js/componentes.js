// Referencias en el HTML

import { Todo } from "../classes";
import { todoList } from "../index";



const divTodolist = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('filtro');


export const crearTodoHtml = (todo) => {

    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${todo.id}">
		<div class="view">
			<input class="toggle" type="checkbox" ${(todo.completado) ? 'checked' : ''}>
			<label>${todo.tarea}</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
	</li>
    `
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodolist.append(div.firstElementChild);

    return div;

}

//Evento

txtInput.addEventListener('keyup', (event) => {

    if (event.keyCode === 13 && txtInput.value.length > 0) {
        console.log(txtInput.value);
        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);

        crearTodoHtml(nuevoTodo);
        txtInput.value = '';
    }

});

divTodolist.addEventListener('click', (event) => {

    console.log('click');
    const nombreElemento = event.target.localName; // input, label o bonton
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');

    if (nombreElemento.includes('input')) {
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');
    } else if (nombreElemento.includes('button')) {

        todoList.eliminarTodo(todoId);
        divTodolist.removeChild(todoElemento);

    }

    console.log(todoList);
});

btnBorrar.addEventListener('click', () => {

    todoList.eliminarCompletados();

    for (let i = divTodolist.children.length - 1; i >= 0; i--) {

        const elemento = divTodolist.children[i];

        if (elemento.classList.contains('completed')) {
            divTodolist.removeChild(elemento);
        }

    }

});

ulFiltros.addEventListener('click', (event) => {

    const filtro = event.target.text;

    if (!filtro) { return; }

    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');



    for (const elemento of divTodolist.children) {

        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch (filtro) {

            case 'Pendientes':
                if (completado) {
                    elemento.classList.add('hidden');
                }
                break;

            case 'Completados':
                if (!completado) {
                    elemento.classList.add('hidden');
                }
                break;



        }

    }

});