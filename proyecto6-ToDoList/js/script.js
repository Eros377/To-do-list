document.addEventListener('DOMContentLoaded', cargarTareas);

let tareaDato = document.getElementById('formulario');
let tareaNumero = document.getElementById('txtTarea');
let tareaLista = document.getElementById('tareaLista');

tareaDato.addEventListener('submit', agregarTarea);
tareaLista.addEventListener('click', quitarTarea);

function agregarTarea(evento) {
    evento.preventDefault();
    let tareaTexto = tareaNumero.value.trim();
    
    if (tareaTexto === ''){
        return;
    }
    let li = document.createElement('li');
    li.textContent = tareaTexto;
    let eliminarBtn = document.createElement('button');
    eliminarBtn.textContent = 'Eliminar';
    li.appendChild(eliminarBtn);
    
    tareaLista.appendChild(li);
    almacenarLocalStorage (tareaTexto);
    tareaNumero.value = '';
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
