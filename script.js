// ─────────────────────────────────────────────
//  Gomolemo Lizzy Dikgomo | Portfolio Script
// ─────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. Active Nav Link ──────────────────────
  // Highlights the nav link that matches the current page
  const navLinks = document.querySelectorAll('header nav ul li a');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('active');
    }
  });


  // ── 2. Smooth Scroll ────────────────────────
  // Smooth scrolling for any anchor links that point to an ID on the same page
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  // ── 3. Scroll-Reveal Animation ──────────────
  // Elements with the class 'reveal' fade in when they enter the viewport.
  // Add class="reveal" to any section/element you want animated on scroll.
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target); // animate once
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => revealObserver.observe(el));


  // ── 4. Contact Form Handler ─────────────────
  const form = document.getElementById('contactForm');

  if (form) {
    const submitBtn = form.querySelector('button[type="submit"]') || form.querySelector('button');
    const successMsg = document.querySelector('.form-success');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Basic validation
      const name    = form.querySelector('input[name="name"], input[placeholder*="Name"], input[placeholder*="name"]');
      const email   = form.querySelector('input[type="email"], input[name="email"]');
      const message = form.querySelector('textarea');

      if (name && name.value.trim() === '') {
        showFieldError(name, 'Please enter your name.');
        return;
      }
      if (email && !isValidEmail(email.value)) {
        showFieldError(email, 'Please enter a valid email address.');
        return;
      }
      if (message && message.value.trim() === '') {
        showFieldError(message, 'Please enter a message.');
        return;
      }

      // Simulate sending (add your back-end / EmailJS here)
      if (submitBtn) {
        submitBtn.classList.add('sending');
        submitBtn.textContent = 'Sending';
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.classList.remove('sending');
          submitBtn.textContent = 'Send Message';
        }
        form.reset();
        if (successMsg) {
          successMsg.classList.add('visible');
          setTimeout(() => successMsg.classList.remove('visible'), 5000);
        } else {
          alert('Message sent! Thank you for reaching out.');
        }
      }, 1800);
    });

    // Clear field error styling on input
    form.querySelectorAll('input, textarea').forEach(field => {
      field.addEventListener('input', () => clearFieldError(field));
    });
  }


  // ── 5. Mobile Nav Toggle ────────────────────
  // If you add a hamburger button with id="navToggle", this will
  // toggle the nav open/closed on small screens.
  const navToggle = document.getElementById('navToggle');
  const navMenu   = document.querySelector('header nav ul');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close nav when a link is clicked (mobile UX)
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('nav-open');
        if (navToggle) navToggle.setAttribute('aria-expanded', false);
      });
    });
  }


  // ── 6. Back-to-Top Button ───────────────────
  // Auto-creates a back-to-top button and shows it after scrolling down
  const topBtn = document.createElement('button');
  topBtn.id = 'backToTop';
  topBtn.title = 'Back to top';
  topBtn.textContent = '↑';
  topBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: none;
    background: blueviolet;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.4s ease, transform 0.4s ease, background 0.3s ease;
    z-index: 999;
    box-shadow: 0 4px 14px rgba(138,43,226,0.5);
  `;
  document.body.appendChild(topBtn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      topBtn.style.opacity = '1';
      topBtn.style.transform = 'translateY(0)';
    } else {
      topBtn.style.opacity = '0';
      topBtn.style.transform = 'translateY(20px)';
    }
  });

  topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  topBtn.addEventListener('mouseover', () => {
    topBtn.style.background = 'rgb(113, 43, 226)';
  });

  topBtn.addEventListener('mouseout', () => {
    topBtn.style.background = 'blueviolet';
  });


  // ── 7. Current Year in Footer ───────────────
  // Keeps the copyright year in the footer always up to date
  const footerText = document.querySelector('footer p');
  if (footerText) {
    footerText.innerHTML = footerText.innerHTML.replace(
      /\d{4}/,
      new Date().getFullYear()
    );
  }


  // ── Helpers ─────────────────────────────────

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }

  function showFieldError(field, message) {
    clearFieldError(field);
    field.style.boxShadow = '0 0 8px rgba(255, 80, 80, 0.8)';
    field.style.borderColor = 'rgba(255,80,80,0.6)';

    const error = document.createElement('span');
    error.className = 'field-error';
    error.style.cssText = 'color:#ff8080; font-size:0.82rem; margin-top:-8px; display:block;';
    error.textContent = message;
    field.insertAdjacentElement('afterend', error);
    field.focus();
  }

  function clearFieldError(field) {
    field.style.boxShadow = '';
    field.style.borderColor = '';
    const next = field.nextElementSibling;
    if (next && next.classList.contains('field-error')) {
      next.remove();
    }
  }

});

// Initialize EmailJS (do this once — move to top of file if preferred)
emailjs.init("6dGgVcCIPsFd_2qIT"); // 🔁 Replace with your Public Key

document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.sendForm(
      "service_opyxI1d",
      "template_euedwn1",
      this
    ).then(
      function () {
        alert("Message sent successfully!");
      },
      function (error) {
        alert("Failed to send message: " + error.text);
      }
    );
  });