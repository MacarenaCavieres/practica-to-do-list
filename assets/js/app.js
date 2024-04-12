const contenidoTareas = document.querySelector("#contenidoTareas");
const formulario = document.querySelector("#formulario");
const tanda = document.querySelector(".tanda");
const alerta = document.querySelector(".alerta");
const template = document.querySelector("#template").content;
const fragment = document.createDocumentFragment();

const arrayTareas = [];

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    agregarTarea();
    pintarTarea();
});

const agregarTarea = () => {
    const tarea = document.querySelector("#tarea").value;

    if (!tarea.trim()) {
        alerta.textContent = "Agregue una tarea";
        return;
    } else {
        alerta.textContent = "";
    }

    const quehacer = {
        id: Date.now(),
        task: tarea,
        fecha: new Date().toLocaleString(),
    };

    arrayTareas.push(quehacer);

    console.log(arrayTareas);
};

const pintarTarea = () => {
    arrayTareas.forEach((item) => {
        const clone = template.cloneNode(true);
        clone.querySelector(".tanda").textContent = item.task;

        fragment.appendChild(clone);
    });

    contenidoTareas.appendChild(fragment);
};
