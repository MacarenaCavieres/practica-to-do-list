const contenidoTareas = document.querySelector("#contenidoTareas");
const formulario = document.querySelector("#formulario");
const alerta = document.querySelector(".alerta");
const template = document.querySelector("#template").content;
const fragment = document.createDocumentFragment();

let arrayTareas = [];

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("arrayTareas")) {
        arrayTareas = JSON.parse(localStorage.getItem("arrayTareas"));
        pintarTarea();
    }
});

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    agregarTarea();
    pintarTarea();

    tarea.value = "";
    limite.value = "";
});

const agregarTarea = () => {
    const tarea = document.querySelector("#tarea").value;
    const fechaInput = document.querySelector("#limite").value.toLocaleString();
    const termino = fechaInput.split("-").reverse().join("-");

    if (!tarea.trim()) {
        alerta.style.color = "red";
        alerta.textContent = "Agregue una tarea";
        return;
    } else {
        alerta.textContent = "";
    }

    const quehacer = {
        id: Date.now(),
        task: tarea,
        fecha: new Date().toLocaleString(),
        fechaTermino: termino,
    };

    arrayTareas.push(quehacer);
};

const pintarTarea = () => {
    localStorage.setItem("arrayTareas", JSON.stringify(arrayTareas));
    contenidoTareas.textContent = "";

    arrayTareas.forEach((item) => {
        const clone = template.cloneNode(true);
        clone.querySelector(".tanda").textContent = item.task;
        clone.querySelector(".fecha").textContent = item.fecha;
        clone.querySelector(".termino").textContent = item.fechaTermino;
        clone.querySelector("article").classList.add(`${item.id}`);

        fragment.appendChild(clone);
    });

    contenidoTareas.appendChild(fragment);
};

contenidoTareas.addEventListener("click", (e) => {
    if (e.target.classList.contains("btnEliminar")) {
        const articleClass = +e.target.parentNode.parentNode.className;
        const article = arrayTareas.findIndex((item) => item.id === articleClass);
        arrayTareas.splice(article, 1);
        pintarTarea();
    }
});
