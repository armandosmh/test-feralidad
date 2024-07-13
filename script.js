// script.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA5gOZ1iR2u614Yao7H53ACdfTx7PbsFSE",
    authDomain: "feralidad-4e663.firebaseapp.com",
    projectId: "feralidad-4e663",
    storageBucket: "feralidad-4e663.appspot.com",
    messagingSenderId: "272219235817",
    appId: "1:272219235817:web:7e76ee459e32e0bb2f9778",
    measurementId: "G-3F722VNET0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function sendEvaluation(nombre, evaluador, x, y, color) {
    try {
        await addDoc(collection(db, "evaluations"), {
            nombre: nombre,
            evaluador: evaluador,
            x: x,
            y: y,
            color: color
        });
        console.log("Evaluación enviada con éxito");
    } catch (error) {
        console.error("Error al enviar la evaluación:", error);
    }
}

// Hacer sendEvaluation accesible globalmente
window.sendEvaluation = sendEvaluation;

const nombreForm = document.getElementById('nombreForm');
const nombreInput = document.getElementById('nombre');
const canvas = document.getElementById('cuadrante');
const ctx = canvas.getContext('2d');
let usuario = { nombre: "", x: null, y: null };

function dibujarCuadrante() {
    console.log("Dibujando cuadrante");
    canvas.style.display = 'block';
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

function iniciarCuadrante() {
    let nombre = nombreInput.value;
    if (nombre !== "") {
        usuario.nombre = nombre;
        sessionStorage.setItem('nombreUsuario', nombre); // Guardamos el nombre en el almacenamiento de la sesión
        dibujarCuadrante();
        nombreForm.style.display = 'none';
        alert("Por favor, coloca un punto en el cuadrante que represente cómo te ves a ti mismo/a.");
    } else {
        alert("Por favor, selecciona tu nombre.");
    }
}

canvas.addEventListener('click', function(event) {
    if (usuario.x === null && usuario.y === null) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        usuario.x = x;
        usuario.y = y;
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fill();
        sessionStorage.setItem('userX', x); // Guardamos la posición x
        sessionStorage.setItem('userY', y); // Guardamos la posición y
        setTimeout(() => {
            window.location.href = 'amigos.html'; // Redirigimos a la página de amigos
        }, 1000);
    }
});
