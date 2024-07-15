document.addEventListener('DOMContentLoaded', cargarTareas);

let tareaDato = document.getElementById('formulario');
let tareaNumero = document.getElementById('tareaTxt');
let tareaLista = document.getElementById('tareaLista');

tareaDato.addEventListener('submit', agregarTarea);
tareaLista.addEventListener('click', quitarTarea);

function agregarTarea(evento) {
    //evitar que recargue la pagina
    evento.preventDefault();
    //obtiene el valor del campo de entrada de texto y elimina los espacios en blanco al inicio y al final.
    let tareaTexto = tareaNumero.value.trim();
    
    if (tareaTexto === ''){
        return;
    }
    //creamos la lista
    let li = document.createElement('li');
    li.textContent = tareaTexto;
    //creamos el boton
    let eliminarBtn = document.createElement('button');
    eliminarBtn.textContent = 'Eliminar';
    li.appendChild(eliminarBtn);
    
    tareaLista.appendChild(li);
    //almacenamos la tarea
    almacenarLocalStorage (tareaTexto);
    tareaNumero.value = ''; //limpiamos el formulario
}

function quitarTarea(evento) {
    if (evento.target.tagName === 'BUTTON') {
        let li = evento.target.parentElement;
        quitarlocalStorage(li.firstChild.textContent);
        tareaLista.removeChild(li);
    }
}

function almacenarLocalStorage(dato1) {
    let tareas = localStorage.getItem('tareas') ? JSON.parse(localStorage.getItem('tareas')) : [];
    tareas.push(dato1);
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

function cargarTareas() {
    let tareas = localStorage.getItem('tareas') ? JSON.parse(localStorage.getItem('tareas')) : [];

    tareas.forEach(tarea => {
        let li = document.createElement('li');
        li.textContent = tarea;
        let eliminarBtn = document.createElement('button');
        eliminarBtn.textContent = 'Eliminar';
        li.appendChild(eliminarBtn);
        tareaLista.appendChild(li);
    });
}

function quitarlocalStorage(dato1) {
    let tareas = localStorage.getItem('tareas') ? JSON.parse(localStorage.getItem('tareas')) : [];
    tareas = tareas.filter(t => t !== dato1);
    localStorage.setItem('tareas', JSON.stringify(tareas));
}
