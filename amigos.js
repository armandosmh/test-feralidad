// amigos.js

const amigos = ["César", "Paola", "Ana", "May", "Pedro", "Javier", "Armando"];
const colores = ["#FF6347", "#4682B4", "#32CD32", "#FFD700", "#6A5ACD", "#FF69B4", "#FFA500"]; // Un color para cada amigo
let evaluaciones = [];
let indiceActual = 0;
const canvas = document.getElementById('cuadrante');
const ctx = canvas.getContext('2d');
const instrucciones = document.getElementById('instrucciones');
let nombreUsuario = sessionStorage.getItem('nombreUsuario');
let usuarioX = parseInt(sessionStorage.getItem('userX'), 10);
let usuarioY = parseInt(sessionStorage.getItem('userY'), 10);

function dibujarCuadrante() {
    console.log("Dibujando cuadrante");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(250, 0);
    ctx.lineTo(250, 500);
    ctx.moveTo(0, 250);
    ctx.lineTo(500, 250);
    ctx.stroke();
    ctx.fillText('Doméstico', 490, 260);
    ctx.fillText('Salvaje', 10, 260);
    ctx.fillText('Pacífico', 255, 10);
    ctx.fillText('Violento', 255, 490);
}

function filtrarAmigos() {
    console.log("Filtrando amigos, excluyendo a:", nombreUsuario);
    const amigosFiltrados = amigos.filter(amigo => amigo !== nombreUsuario);
    console.log("Amigos filtrados:", amigosFiltrados);
    return amigosFiltrados;
}

function actualizarInstrucciones() {
    const amigosFiltrados = filtrarAmigos();
    console.log("Actualizando instrucciones. Índice actual:", indiceActual, "Amigos filtrados:", amigosFiltrados.length);
    if (indiceActual < amigosFiltrados.length) {
        instrucciones.textContent = `Coloca un punto para ${amigosFiltrados[indiceActual]}`;
    } else {
        instrucciones.textContent = "¡Gracias por completar las evaluaciones!";
        agregarPuntoAutopercepcion();
        setTimeout(() => {
            alert("Has completado todas las evaluaciones. ¡Gracias!");
        }, 500);
    }
}

function agregarPuntoAutopercepcion() {
    console.log("Agregando punto de autopercepción");
    ctx.fillStyle = '#000000'; // Color negro para el punto de autopercepción
    ctx.beginPath();
    ctx.arc(usuarioX, usuarioY, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillText(`${nombreUsuario} (tú)`, usuarioX + 10, usuarioY + 10); // Etiqueta para el punto de autopercepción
    mostrarTodosLosPuntos(); // Mostrar todos los puntos con nombres después de colocar el de autopercepción
}

function mostrarTodosLosPuntos() {
    console.log("Mostrando todos los puntos", evaluaciones);
    evaluaciones.forEach(eval => {
        ctx.fillStyle = eval.color;
        ctx.beginPath();
        ctx.arc(eval.x, eval.y, 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillText(eval.nombre, eval.x + 10, eval.y + 10); // Añadir el nombre al lado del punto
    });
}

canvas.addEventListener('click', function(event) {
    const amigosFiltrados = filtrarAmigos();
    console.log("Canvas click event. Índice actual:", indiceActual, "Amigos filtrados:", amigosFiltrados.length);
    if (indiceActual < amigosFiltrados.length) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const amigoActual = amigosFiltrados[indiceActual];
        console.log("Amigo actual:", amigoActual, "Color:", colores[amigos.indexOf(amigoActual)]);
        ctx.fillStyle = colores[amigos.indexOf(amigoActual)];
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fill();
        evaluaciones.push({ nombre: amigoActual, x: x, y: y, color: ctx.fillStyle });
        console.log("Evaluación añadida:", evaluaciones);
        sendEvaluation(nombreUsuario, amigoActual, x, y, ctx.fillStyle);
        indiceActual++;
        actualizarInstrucciones();
    } else {
        console.log("No hay más amigos para evaluar");
    }
});

document.addEventListener('DOMContentLoaded', function() {
    console.log("Document loaded. Nombre de usuario:", nombreUsuario);
    nombreUsuario = sessionStorage.getItem('nombreUsuario');
    dibujarCuadrante();
    actualizarInstrucciones();
});

async function getEvaluations(nombre) {
  // Fetching evaluations from Firestore (if needed for display)
  // Placeholder for getting evaluations
}
