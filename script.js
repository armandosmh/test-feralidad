const nombreForm = document.getElementById('nombreForm');
const nombreInput = document.getElementById('nombre');
const canvas = document.getElementById('cuadrante');
const ctx = canvas.getContext('2d');
let usuario = { nombre: "", x: null, y: null };

function dibujarCuadrante() {
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

async function sendEvaluation(nombre, evaluador, x, y, color) {
  const data = {nombre, evaluador, x, y, color};
  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbwoLafU77absaDMA0kjKIy5lYLOQ8et_ITsZwz6UlWtMGvIrJMWOEpuIr-u_aOK0y9G/exec', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Error al enviar la evaluación');
    }
    const result = await response.json();
    console.log('Evaluación enviada con éxito:', result);
    return result;
  } catch (error) {
    console.error('Error al enviar la evaluación:', error);
    alert('Hubo un problema al enviar la evaluación. Por favor, intenta de nuevo.');
  }
}
