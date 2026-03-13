/* ===================================
   CYBERSECURITY RESUME — SCRIPTS
   =================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Matrix Rain ----
  const canvas = document.getElementById('matrix-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let w, h, columns, drops;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:<>?/~';
    const fontSize = 14;

    function initMatrix() {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
      columns = Math.floor(w / fontSize);
      drops = Array.from({ length: columns }, () => Math.random() * -100);
    }

    function drawMatrix() {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.06)';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#00f0ff';
      ctx.font = `${fontSize}px 'Fira Code', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Slight green/cyan variation
        ctx.fillStyle = Math.random() > 0.5 ? 'rgba(0, 240, 255, 0.35)' : 'rgba(0, 255, 65, 0.25)';
        ctx.fillText(char, x, y);

        if (y > h && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    initMatrix();
    let matrixInterval = setInterval(drawMatrix, 45);

    window.addEventListener('resize', () => {
      clearInterval(matrixInterval);
      initMatrix();
      matrixInterval = setInterval(drawMatrix, 45);
    });
  }


  // ---- Typing Effect ----
  const subtitleEl = document.getElementById('typed-subtitle');
  if (subtitleEl) {
    const phrases = [
      'Cybersecurity Professional',
      'Vulnerability Management',
      'Incident Response & Forensics',
      'Secure Systems Engineer',
      'Defending Critical Infrastructure'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const current = phrases[phraseIndex];
      if (isDeleting) {
        subtitleEl.textContent = current.substring(0, charIndex--);
        if (charIndex < 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setTimeout(typeEffect, 400);
          return;
        }
        setTimeout(typeEffect, 35);
      } else {
        subtitleEl.textContent = current.substring(0, charIndex++);
        if (charIndex > current.length) {
          isDeleting = true;
          setTimeout(typeEffect, 2000);
          return;
        }
        setTimeout(typeEffect, 70);
      }
    }

    // Add cursor element
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    subtitleEl.parentNode.insertBefore(cursor, subtitleEl.nextSibling);
    typeEffect();
  }


  // ---- Scroll Reveal (Intersection Observer) ----
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));


  // ---- Navbar Scroll Effect ----
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  });


  // ---- Mobile Menu Toggle ----
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      navToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.textContent = '☰';
      });
    });
  }


  // ---- Smooth Scroll for Nav Links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offsetTop = target.offsetTop - 70;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    });
  });

});
