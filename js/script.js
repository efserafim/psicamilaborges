// Site interactions
const ROTA_TRACK_BASE = 'https://zuszasnxslusolpmstnp.supabase.co/functions/v1/whatsapp-redirect/psicamilaborges';

function getRotaTrackUrl() {
  const utmTerm = new URLSearchParams(window.location.search).get('utm_term') || '';
  return `${ROTA_TRACK_BASE}?utm_term=${encodeURIComponent(utmTerm)}`;
}

function applyRotaTrackLinks() {
  const rotaTrackUrl = getRotaTrackUrl();
  document.querySelectorAll(`a[href*="${ROTA_TRACK_BASE}"]`).forEach(function(link) {
    link.href = rotaTrackUrl;
  });
}

document.addEventListener('DOMContentLoaded', function() {
  applyRotaTrackLinks();

  // Contact form handling
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);

      const message = `Olá Camila Borges, gostaria de agendar uma consulta:

*Nome:* ${data.Nome}
*E-mail:* ${data['E-mail']}
*Telefone:* ${data.Telefone}
*Tipo de Atendimento:* ${data.TipoAtendimento}
*Modalidade:* ${data.Modalidade}
*Mensagem:* ${data.Mensagem}`;
      
      const whatsappUrl = `https://wa.me/5521969023529?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    });
  }

  // Update year in footer
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Active navigation link based on scroll position
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function setActiveNav() {
    let current = '';
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
      
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  window.addEventListener('scroll', setActiveNav);
  window.addEventListener('load', setActiveNav);

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      mainNav.classList.toggle('active');
      const isExpanded = this.classList.contains('active');
      this.setAttribute('aria-expanded', isExpanded);
      document.body.style.overflow = isExpanded ? 'hidden' : '';
    });

    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        mainNav.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // Testimonials carousel
  const testimonialsCarousel = document.querySelector('.testimonials-carousel');
  if (testimonialsCarousel) {
    const slides = testimonialsCarousel.querySelectorAll('.testimonial-slide');
    const dots = testimonialsCarousel.querySelectorAll('.testimonial-dot');
    const prevBtn = testimonialsCarousel.querySelector('.testimonial-prev');
    const nextBtn = testimonialsCarousel.querySelector('.testimonial-next');
    let currentIndex = 0;
    let autoplayTimer;

    function goToSlide(index) {
      currentIndex = (index + slides.length) % slides.length;

      slides.forEach(function(slide, i) {
        const isActive = i === currentIndex;
        slide.classList.toggle('active', isActive);
        slide.setAttribute('aria-hidden', String(!isActive));
      });

      dots.forEach(function(dot, i) {
        const isActive = i === currentIndex;
        dot.classList.toggle('active', isActive);
        dot.setAttribute('aria-selected', String(isActive));
      });
    }

    function startAutoplay() {
      clearInterval(autoplayTimer);
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      autoplayTimer = setInterval(function() {
        goToSlide(currentIndex + 1);
      }, 7000);
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        goToSlide(currentIndex - 1);
        startAutoplay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        goToSlide(currentIndex + 1);
        startAutoplay();
      });
    }

    dots.forEach(function(dot, i) {
      dot.addEventListener('click', function() {
        goToSlide(i);
        startAutoplay();
      });
    });

    testimonialsCarousel.addEventListener('mouseenter', function() {
      clearInterval(autoplayTimer);
    });

    testimonialsCarousel.addEventListener('mouseleave', startAutoplay);

    startAutoplay();
  }
});
