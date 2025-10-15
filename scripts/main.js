// ======= MENU MOBILE =======
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    nav.classList.toggle('active');
  });

  // Fechar menu ao clicar em um link
  document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      nav.classList.remove('active');
    });
  });
}

// ======= HEADER SCROLL =======
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (!header) return;

  if (currentScroll > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  lastScroll = currentScroll;
});

// ======= ROLAGEM SUAVE =======
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (!href) return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();

    const headerHeight = header ? header.offsetHeight : 0;
    const targetPosition = target.offsetTop - headerHeight;
    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
  });
});

// ======= ATIVAR LINK ATIVO NO MENU =======
const sections = document.querySelectorAll('section[id]');

function activateMenuOnScroll() {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 150;
    const sectionId = section.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelectorAll('.nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', activateMenuOnScroll);

const heroButton = document.querySelector('.hero button');
if (heroButton) {
  heroButton.addEventListener('click', () => {
    const menuSection = document.querySelector('#menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// ======= ANIMAÇÃO DE CARREGAMENTO =======
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});


