/* ============================================================
   ARYAN SAINI – Portfolio Main JavaScript
   ============================================================ */

// ── Preloader ──
window.addEventListener('load', () => {
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) preloader.classList.add('hidden');
  }, 1800);
});

// ── Scroll Progress Bar ──
function updateScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  bar.style.width = pct + '%';
}
window.addEventListener('scroll', updateScrollProgress);

// ── Particles Background ──
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const count = Math.min(80, Math.floor(window.innerWidth / 14));

  class Particle {
    constructor() { this.reset(true); }
    reset(init = false) {
      this.x = Math.random() * canvas.width;
      this.y = init ? Math.random() * canvas.height : canvas.height + 10;
      this.size = Math.random() * 1.5 + 0.3;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = -(Math.random() * 0.5 + 0.2);
      this.opacity = Math.random() * 0.5 + 0.1;
      const colors = ['#00f5ff','#0066ff','#00ff88','#7b2fff'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.life = 0;
      this.maxLife = Math.random() * 300 + 200;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.life++;
      if (this.y < -10 || this.life > this.maxLife) this.reset();
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity * (1 - this.life / this.maxLife);
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 4;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < count; i++) particles.push(new Particle());

  // Connection lines
  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.save();
          ctx.globalAlpha = (1 - dist / 100) * 0.08;
          ctx.strokeStyle = '#00f5ff';
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawConnections();
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}
initParticles();

// ── Theme Toggle ──
const themeToggle = document.getElementById('theme-toggle');
function applyTheme(mode) {
  document.body.classList.toggle('light-mode', mode === 'light');
  if (themeToggle) themeToggle.textContent = mode === 'light' ? '🌙' : '☀️';
  localStorage.setItem('theme', mode);
}
if (themeToggle) {
  const saved = localStorage.getItem('theme') || 'dark';
  applyTheme(saved);
  themeToggle.addEventListener('click', () => {
    const current = document.body.classList.contains('light-mode') ? 'light' : 'dark';
    applyTheme(current === 'light' ? 'dark' : 'light');
  });
} else {
  const saved = localStorage.getItem('theme') || 'dark';
  applyTheme(saved);
}

// ── Mobile Menu ──
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.getElementById('mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
    });
  });
}

// ── Active Nav Link ──
function setActiveNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, #mobile-menu a').forEach(a => {
    const href = a.getAttribute('href');
    a.classList.toggle('active', href === page || (page === '' && href === 'index.html'));
  });
}
setActiveNav();

// ── Scroll Reveal ──
function initScrollReveal() {
  const items = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  items.forEach(el => observer.observe(el));
}
initScrollReveal();

// ── Typing Effect ──
function initTyping() {
  const el = document.querySelector('.hero-typing');
  if (!el) return;
  const phrases = [
    'Securing Cloud Infrastructure.',
    'Building Scalable AWS Environments.',
    'Conducting VAPT Assessments.',
    'Hardening Servers & Networks.',
    'Protecting Digital Assets.'
  ];
  let phraseIdx = 0, charIdx = 0, deleting = false;

  function type() {
    const phrase = phrases[phraseIdx];
    if (deleting) {
      el.innerHTML = phrase.substring(0, charIdx - 1) + '<span class="cursor"></span>';
      charIdx--;
      if (charIdx === 0) { deleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; setTimeout(type, 500); return; }
    } else {
      el.innerHTML = phrase.substring(0, charIdx + 1) + '<span class="cursor"></span>';
      charIdx++;
      if (charIdx === phrase.length) { deleting = true; setTimeout(type, 2000); return; }
    }
    setTimeout(type, deleting ? 40 : 65);
  }
  type();
}
initTyping();

// ── 3D Tilt Cards ──
function init3DTilt() {
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
      card.style.transform = `perspective(600px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(600px) rotateX(0) rotateY(0) translateY(0)';
    });
  });
}
init3DTilt();

// ── Smooth Page Transition ──
document.querySelectorAll('a[href]').forEach(a => {
  const href = a.getAttribute('href');
  if (href && !href.startsWith('#') && !href.startsWith('http') && !href.startsWith('mailto') && href.endsWith('.html')) {
    a.addEventListener('click', e => {
      e.preventDefault();
      document.body.style.opacity = '0';
      document.body.style.transition = 'opacity 0.3s';
      setTimeout(() => { window.location.href = href; }, 300);
    });
  }
});
window.addEventListener('pageshow', () => {
  document.body.style.opacity = '1';
  document.body.style.transition = 'opacity 0.4s';
});
