const canvas = document.getElementById("simulationCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 400;

const tempSlider = document.getElementById("temperature");
const tempDisplay = document.getElementById("tempDisplay");

// Particle setup
const NUM_PARTICLES = 50;
let particles = [];

class Particle {
    constructor() {
        this.radius = 5;
        this.x = Math.random() * (canvas.width - 2 * this.radius) + this.radius;
        this.y = Math.random() * (canvas.height - 2 * this.radius) + this.radius;
        this.speed = 1; // will scale with temperature
        this.angle = Math.random() * 2 * Math.PI;
    }

    update() {
        this.x += this.speed * Math.cos(this.angle);
        this.y += this.speed * Math.sin(this.angle);

        // Bounce off walls
        if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
            this.angle = Math.PI - this.angle;
        }
        if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
            this.angle = -this.angle;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = "dodgerblue";
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.stroke();
    }
}

// Initialize particles
for (let i = 0; i < NUM_PARTICLES; i++) {
    particles.push(new Particle());
}

// Map temperature to particle speed
function updateParticleSpeed() {
    const temp = parseInt(tempSlider.value);
    tempDisplay.textContent = `${temp} K`;
    const baseSpeed = temp / 300; // arbitrary scaling, 300K ~ speed 1
    particles.forEach(p => p.speed = baseSpeed);
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    requestAnimationFrame(animate);
}

// Event listener
tempSlider.addEventListener("input", updateParticleSpeed);

// Start
updateParticleSpeed();
animate();
