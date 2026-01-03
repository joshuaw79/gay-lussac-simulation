// Constants
const P0 = 101.3;  // reference pressure in kPa
const T0 = 300;    // reference temperature in K
const k = P0 / T0; // constant for Gay-Lussac's law

// DOM Elements
const tempSlider = document.getElementById('tempSlider');
const tempValue = document.getElementById('tempValue');
const pressureValue = document.getElementById('pressureValue');
const canvas = document.getElementById('containerCanvas');
const ctx = canvas.getContext('2d');

// Update function
function updateSimulation() {
    const T = parseFloat(tempSlider.value);
    const P = k * T;

    tempValue.textContent = T.toFixed(0);
    pressureValue.textContent = P.toFixed(2);

    drawContainer(P);
}

// Simple visual container
function drawContainer(pressure) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const particleHeight = Math.min(canvas.height, pressure);
    ctx.fillStyle = 'skyblue';
    ctx.fillRect(50, canvas.height - particleHeight, 300, particleHeight);
    ctx.strokeStyle = 'black';
    ctx.strokeRect(50, 0, 300, canvas.height);
}

// Initial draw
updateSimulation();

// Listen to slider changes
tempSlider.addEventListener('input', updateSimulation);
