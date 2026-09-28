/* =========================================================
   0. PRELOADER
========================================================= */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('hidden');
  }, 800);
});

/* =========================================================
   1. CURSOR CUSTOMIZADO
========================================================= */
const cursorDot = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .portfolio-item, .servico-card').forEach(el => {
  el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
});

/* =========================================================
   2. PARTÍCULAS DE FUNDO
========================================================= */
const canvas = document.getElementById('particles-bg');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.opacity = Math.random() * 0.5 + 0.2;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x > canvas.width) this.x = 0;
    if (this.x < 0) this.x = canvas.width;
    if (this.y > canvas.height) this.y = 0;
    if (this.y < 0) this.y = canvas.height;
  }
  draw() {
    ctx.fillStyle = `rgba(255, 107, 53, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  const count = Math.min(80, Math.floor(canvas.width / 20));
  for (let i = 0; i < count; i++) particles.push(new Particle());
}
initParticles();
window.addEventListener('resize', initParticles);

function connectParticles() {
  for (let a = 0; a < particles.length; a++) {
    for (let b = a + 1; b < particles.length; b++) {
      const dx = particles[a].x - particles[b].x;
      const dy = particles[a].y - particles[b].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.strokeStyle = `rgba(255, 107, 53, ${0.08 * (1 - dist / 120)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  connectParticles();
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* =========================================================
   3. MENU MOBILE
========================================================= */
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
  menuToggle.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.classList.remove('active');
  });
});

/* =========================================================
   4. HEADER SCROLL + PROGRESS BAR + BACK TO TOP
========================================================= */
const header = document.getElementById('header');
const backToTop = document.getElementById('back-to-top');
const scrollProgress = document.getElementById('scroll-progress');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollY / docHeight) * 100;
  scrollProgress.style.width = progress + '%';

  if (scrollY > 50) {
    header.classList.add('scrolled');
    backToTop.classList.add('visible');
  } else {
    header.classList.remove('scrolled');
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* =========================================================
   5. SCROLL SPY
========================================================= */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    if (window.scrollY >= sectionTop) current = section.getAttribute('id');
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
});

/* =========================================================
   6. TYPED TEXT EFFECT (HERO)
========================================================= */
const typedElement = document.getElementById('typed-text');
const roles = ['Full-Stack Developer', 'UI/UX Enthusiast', 'Problem Solver', 'Creative Coder'];
let roleIndex = 0, charIndex = 0, isDeleting = false;

function typeEffect() {
  const currentRole = roles[roleIndex];

  if (isDeleting) {
    typedElement.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedElement.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentRole.length) {
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 500;
  }

  setTimeout(typeEffect, speed);
}
typeEffect();

/* =========================================================
   7. REVEAL ANIMATIONS ON SCROLL
========================================================= */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('revealed'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

/* =========================================================
   8. SKILLS ANIMATION
========================================================= */
const skillsSection = document.getElementById('sobre');
let skillsAnimated = false;

function animateSkills() {
  if (skillsAnimated) return;
  document.querySelectorAll('.fill').forEach((fill, i) => {
    setTimeout(() => {
      fill.style.width = fill.dataset.width;
    }, i * 150);
  });
  skillsAnimated = true;
}

const observerSkills = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) animateSkills(); });
}, { threshold: 0.3 });

if (skillsSection) observerSkills.observe(skillsSection);

/* =========================================================
   9. PORTFÓLIO DINÂMICO + FILTROS + ESTADO VAZIO
========================================================= */
const projetos = [
  // ✨ Adicione seus projetos aqui quando estiverem prontos:
  // {
  //   titulo: 'Nome do Projeto',
  //   categoria: 'Categoria',
  //   tipo: 'web', // 'web' | 'mobile' | 'design'
  //   imagem: 'caminho/para/imagem.jpg'
  // },
];

const portfolioGrid = document.getElementById('portfolio-grid');
const portfolioFilters = document.querySelector('.portfolio-filters');

if (portfolioGrid) {
  if (projetos.length === 0) {
    /* ---------- ESTADO VAZIO ---------- */
    if (portfolioFilters) portfolioFilters.style.display = 'none';

    portfolioGrid.innerHTML = `
      <div class="portfolio-empty" data-reveal>
        <div class="portfolio-empty-icon">
          <i class="fa-solid fa-folder-open"></i>
        </div>
        <h3>Projetos em construção 🚧</h3>
        <p>
          Ainda estou organizando meu portfólio. Em breve vou publicar aqui
          os projetos que estou desenvolvendo durante minha jornada na programação.
        </p>
        <p class="portfolio-empty-cta">Enquanto isso, que tal trocar uma ideia?</p>
        <a href="#contato" class="btn btn-primary">
          <span>Vamos conversar</span>
          <i class="fa-solid fa-arrow-right"></i>
        </a>
      </div>
    `;

    const emptyEl = portfolioGrid.querySelector('.portfolio-empty');
    if (emptyEl) revealObserver.observe(emptyEl);
  } else {
    /* ---------- RENDERIZA PROJETOS ---------- */
    projetos.forEach(projeto => {
      const item = document.createElement('div');
      item.className = 'portfolio-item';
      item.dataset.tipo = projeto.tipo;
      item.innerHTML = `
        <div class="portfolio-image">
          <img src="${projeto.imagem}" alt="${projeto.titulo}" loading="lazy" />
          <div class="portfolio-overlay">
            <span class="portfolio-overlay-btn">
              <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </span>
          </div>
        </div>
        <div class="portfolio-info">
          <h3>${projeto.titulo}</h3>
          <p>${projeto.categoria}</p>
        </div>
      `;
      portfolioGrid.appendChild(item);
    });

    /* ---------- FILTROS ---------- */
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;

        document.querySelectorAll('.portfolio-item').forEach(item => {
          if (filter === 'all' || item.dataset.tipo === filter) {
            item.classList.remove('hidden');
            item.style.animation = 'fadeInUp 0.5s ease both';
          } else {
            item.classList.add('hidden');
          }
        });
      });
    });
  }
}

/* =========================================================
   10. CONTADORES ANIMADOS
========================================================= */
const counters = document.querySelectorAll('.counter');
let countersAnimated = false;

function animateCounters() {
  if (countersAnimated) return;
  counters.forEach(counter => {
    const target = +counter.dataset.target;
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.floor(eased * target).toLocaleString('pt-BR');
      if (progress < 1) requestAnimationFrame(update);
      else counter.textContent = target.toLocaleString('pt-BR');
    }
    requestAnimationFrame(update);
  });
  countersAnimated = true;
}

const statsSection = document.querySelector('.stats');
if (statsSection) {
  const observerStats = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) animateCounters(); });
  }, { threshold: 0.4 });
  observerStats.observe(statsSection);
}

/* =========================================================
   11. FORMULÁRIO
========================================================= */
const form = document.getElementById('contato-form');
const feedback = document.getElementById('form-feedback');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const nome = form.nome.value.trim();
    const email = form.email.value.trim();

    if (!nome || !email) {
      feedback.style.color = '#ff5252';
      feedback.textContent = '⚠️ Preencha todos os campos obrigatórios.';
      return;
    }

    feedback.style.color = '#4caf50';
    feedback.textContent = '✅ Sua mensagem foi enviada! Obrigado :)';
    form.reset();

    setTimeout(() => { feedback.textContent = ''; }, 5000);
  });
}

/* =========================================================
   12. ANO ATUAL
========================================================= */
document.getElementById('ano').textContent = new Date().getFullYear();