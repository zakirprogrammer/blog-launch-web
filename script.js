let fwCanvas, fwCtx, particles = [];

function startCountdown() {
  const launchContent = document.getElementById('launchContent');
  const countdownEl = document.getElementById('countdown');
  const launchingText = document.getElementById('launchingText');

  launchContent.style.display = 'none';
  countdownEl.style.display = 'block';

  let count = 3;
  countdownEl.textContent = count;

  const timer = setInterval(() => {
    count--;
    if (count > 0) {
      countdownEl.textContent = count;
    } else {
      clearInterval(timer);
      countdownEl.style.display = 'none';
      launchingText.style.display = 'block';

      // 🔥 Fireworks and instant redirect together
      startFireworks();
      window.location.href = "https://fikrabadmisbah.blogspot.com/";
    }
  }, 1000);
}

function startFireworks() {
  fwCanvas = document.getElementById('fireworks');
  fwCtx = fwCanvas.getContext('2d');
  fwCanvas.width = window.innerWidth;
  fwCanvas.height = window.innerHeight;

  for (let i = 0; i < 200; i++) {
    particles.push(createParticle());
  }

  animateFireworks();
}

function createParticle() {
  const angle = Math.random() * 2 * Math.PI;
  const speed = Math.random() * 8 + 2;
  return {
    x: fwCanvas.width / 2,
    y: fwCanvas.height / 2,
    radius: Math.random() * 3 + 2,
    color: `hsl(${Math.random() * 360}, 100%, 60%)`,
    speedX: Math.cos(angle) * speed,
    speedY: Math.sin(angle) * speed,
    alpha: 1
  };
}

function animateFireworks() {
  fwCtx.clearRect(0, 0, fwCanvas.width, fwCanvas.height);
  particles.forEach(p => {
    p.x += p.speedX;
    p.y += p.speedY;
    p.alpha -= 0.015;
    fwCtx.fillStyle = p.color;
    fwCtx.globalAlpha = p.alpha;
    fwCtx.beginPath();
    fwCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    fwCtx.fill();
  });
  fwCtx.globalAlpha = 1;
  particles = particles.filter(p => p.alpha > 0);
  if (particles.length > 0) requestAnimationFrame(animateFireworks);
}

// Optional: Resize on window change
window.addEventListener('resize', () => {
  if (fwCanvas) {
    fwCanvas.width = window.innerWidth;
    fwCanvas.height = window.innerHeight;
  }
});

const bgColors = [
  '#1a1a2e', '#16213e', '#0f3460', '#533483', '#2c3e50',
  '#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#f39c12'
];
let currentBg = 0;

setInterval(() => {
  document.body.style.backgroundColor = bgColors[currentBg];
  currentBg = (currentBg + 1) % bgColors.length;
}, 2000);


