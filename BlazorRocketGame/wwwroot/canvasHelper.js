let stars = [];

export function initializeCanvas() {
    const canvas = document.getElementById('gameCanvas');
    const context = canvas.getContext('2d');

    // Set the background color to black
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the stars
    context.fillStyle = 'white';
    for (let i = 0; i < 100; i++) {
        const starX = Math.random() * canvas.width;
        const starY = Math.random() * canvas.height;
        stars.push({ x: starX, y: starY });
        context.fillRect(starX, starY, 2, 2);
    }
}

export function drawTriangle(rotationAngle, centerX, centerY, showFlames, planets, rocketX, rocketY) {
    const canvas = document.getElementById('gameCanvas');
    const context = canvas.getContext('2d');

    // Clear the canvas but keep the stars
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Redraw the stars
    context.fillStyle = 'white';
    stars.forEach(star => {
        context.fillRect(star.x, star.y, 2, 2);
    });

    // Draw the planets
    context.fillStyle = 'green';
    planets.forEach(planet => {
        const planetX = centerX + (planet.x - rocketX);
        const planetY = centerY + (planet.y - rocketY);
        context.beginPath();
        context.arc(planetX, planetY, planet.radius, 0, 2 * Math.PI);
        context.fill();
    });

    context.save();
    context.translate(centerX, centerY);
    context.rotate((rotationAngle + 90) * Math.PI / 180); // Rotate by 90 degrees clockwise
    context.translate(-centerX, -centerY);

    // Draw the main triangle (rocket) - reduced to 1/3 of its original size
    context.beginPath();
    context.moveTo(centerX, centerY - 17); // Top point of the triangle
    context.lineTo(centerX - 17, centerY + 17); // Bottom left point of the triangle
    context.lineTo(centerX + 17, centerY + 17); // Bottom right point of the triangle
    context.closePath();

    context.fillStyle = 'blue';
    context.fill();

    // Draw flames if showFlames is true
    if (showFlames) {
        context.fillStyle = 'red';
        drawFlame(context, centerX, centerY + 17, 7);
        drawFlame(context, centerX - 10, centerY + 17, 7);
        drawFlame(context, centerX + 10, centerY + 17, 7);
    }

    context.restore();
}

function drawFlame(context, x, y, size) {
    context.save();
    context.translate(x, y);
    context.rotate(Math.PI); // Rotate 180 degrees
    context.translate(-x, -y);

    context.beginPath();
    context.moveTo(x, y - size);
    context.lineTo(x - size / 2, y + size);
    context.lineTo(x + size / 2, y + size);
    context.closePath();

    context.fill();
    context.restore();
}

export function setCanvasSize(width, height) {
    const canvas = document.getElementById('gameCanvas');
    canvas.width = width;
    canvas.height = height;
}

export function generateRandomPosition(excludeX, excludeY, excludeRadius, canvasWidth, canvasHeight) {
    let x, y;
    do {
        x = Math.random() * canvasWidth;
        y = Math.random() * canvasHeight;
    } while (Math.hypot(x - excludeX, y - excludeY) < excludeRadius);
    return { x, y };
}
