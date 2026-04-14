/**
 * Nexill POS - Main JavaScript
 * Consolidates reveal animations, navigation highlighting, journey progress, and form handling.
 */

(function() {
  'use strict';

  // --- Reveal Animations ---
  const revealItems = document.querySelectorAll('[data-reveal]');
  if (revealItems.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });

    revealItems.forEach((item) => revealObserver.observe(item));
  }

  // --- Navigation Highlighting ---
  const sectionLinks = document.querySelectorAll('.nav-list a[href^="#"]');
  const trackedSections = document.querySelectorAll('main section[id]');

  if (sectionLinks.length > 0 && trackedSections.length > 0) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const activeId = '#' + entry.target.id;
        sectionLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === activeId);
        });
      });
    }, {
      rootMargin: '-35% 0px -50% 0px',
      threshold: 0.01,
    });

    trackedSections.forEach((section) => navObserver.observe(section));
  }

  // --- Journey Progress ---
  const journeyTrack = document.querySelector('[data-journey-track]');
  const journeyFill = document.querySelector('.journey-line__fill');

  if (journeyTrack && journeyFill) {
    let ticking = false;

    const updateJourneyProgress = () => {
      const rect = journeyTrack.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const total = rect.height + viewportHeight * 0.45;
      const travelled = Math.min(Math.max(viewportHeight * 0.72 - rect.top, 0), total);
      const progress = total > 0 ? travelled / total : 0;
      journeyFill.style.transform = `scaleY(${progress.toFixed(3)})`;
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateJourneyProgress);
        ticking = true;
      }
    };

    updateJourneyProgress();
    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', updateJourneyProgress);
  }

  // --- Support Form Handling ---
  const supportForm = document.getElementById('support-form');
  const successMessage = document.getElementById('form-success');
  const errorMessage = document.getElementById('form-error');

  if (supportForm) {
    supportForm.addEventListener('submit', (event) => {
      event.preventDefault();

      if (successMessage) successMessage.style.display = 'none';
      if (errorMessage) errorMessage.style.display = 'none';

      if (!supportForm.reportValidity()) {
        if (errorMessage) errorMessage.style.display = 'block';
        return;
      }

      const formData = new FormData(supportForm);
      const name = (formData.get('name') || '').toString().trim();
      const business = (formData.get('business') || '').toString().trim();
      const email = (formData.get('email') || '').toString().trim();
      const requestType = (formData.get('request-type') || '').toString().trim();
      const message = (formData.get('message') || '').toString().trim();
      const subject = encodeURIComponent(`Nexill POS - ${requestType} - ${business}`);
      const body = encodeURIComponent(
        `Name: ${name}\n` +
        `Business: ${business}\n` +
        `Email: ${email}\n` +
        `Request type: ${requestType}\n\n` +
        message
      );

      window.location.href = `mailto:contact@nexillretail.store?subject=${subject}&body=${body}`;
      if (successMessage) successMessage.style.display = 'block';
    });
  }
})();
