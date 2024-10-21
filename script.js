const canvas = document.getElementById('signature-pad');
const ctx = canvas.getContext('2d');
const clearBtn = document.getElementById('clear-btn');
const saveBtn = document.getElementById('save-btn');
const signatureImage = document.getElementById('signature-image');

let isDrawing = false;
let lastX = 0;
let lastY = 0;

function startDrawing(event) {
  isDrawing = true;
  [lastX, lastY] = [event.offsetX, event.offsetY];
}

function draw(event) {
  if (!isDrawing) return;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  [lastX, lastY] = [event.offsetX, event.offsetY];
  ctx.lineTo(lastX, lastY);
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;
  ctx.stroke();
}

function stopDrawing() {
  isDrawing = false;
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function saveSignature() {
  const dataURL = canvas.toDataURL('image/png');
  signatureImage.src = dataURL;
  signatureImage.style.display = 'block';

  // Crear un enlace temporal para descargar la imagen
  const downloadLink = document.createElement('a');
  downloadLink.href = dataURL;
  downloadLink.download = 'firma.png'; // Nombre del archivo
  downloadLink.click(); // Ejecuta la descarga
}

// Eventos del canvas para firmar
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Soporte táctil para tabletas
canvas.addEventListener('touchstart', (event) => {
  const touch = event.touches[0];
  const mouseEvent = new MouseEvent('mousedown', {
    clientX: touch.clientX,
    clientY: touch.clientY,
  });
  canvas.dispatchEvent(mouseEvent);
});

canvas.addEventListener('touchmove', (event) => {
  const touch = event.touches[0];
  const mouseEvent = new MouseEvent('mousemove', {
    clientX: touch.clientX,
    clientY: touch.clientY,
  });
  canvas.dispatchEvent(mouseEvent);
});

canvas.addEventListener('touchend', () => {
  canvas.dispatchEvent(new MouseEvent('mouseup'));
});

// Botones de borrar y guardar
clearBtn.addEventListener('click', clearCanvas);
saveBtn.addEventListener('click', saveSignature);
