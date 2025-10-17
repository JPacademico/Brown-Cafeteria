
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    nav.classList.toggle('active');
  });

 
  document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      nav.classList.remove('active');
    });
  });
}


const header = document.querySelector('header');
const sections = document.querySelectorAll('section[id], footer[id]');

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

function handleScroll() {
  const currentScroll = window.pageYOffset;
  if (header) {
    if (currentScroll > 100) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }

  activateMenuOnScroll();

  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.transform = `translateY(${currentScroll * 0.5}px)`;
  }
}

window.addEventListener('scroll', handleScroll);

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


