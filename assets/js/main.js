/**
 * Sulhab Creative - Main Interaction Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // Sticky Header on Scroll (Reveals smoothly once past full-screen hero)
  const siteHeader = document.querySelector('.site-header');
  const heroSection = document.getElementById('hero');

  if (siteHeader && heroSection) {
    window.addEventListener('scroll', () => {
      const heroBottom = heroSection.getBoundingClientRect().bottom;
      if (heroBottom <= 80) {
        siteHeader.classList.add('is-sticky');
      } else {
        siteHeader.classList.remove('is-sticky');
      }
    }, { passive: true });
  }

  // Setup mobile menu helper
  function setupMobileMenu(toggleId, menuId) {
    const toggle = document.getElementById(toggleId);
    const menu = document.getElementById(menuId);
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen);
      toggle.innerHTML = isOpen
        ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
        : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });

    const links = menu.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          menu.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
          toggle.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
        }
      });
    });
  }

  setupMobileMenu('menuToggle', 'navMenu');
  setupMobileMenu('menuToggleSticky', 'navMenuSticky');

  // Enquiry / Contact Form Handling
  const enquiryForm = document.getElementById('enquiryForm');
  const formSuccess = document.getElementById('formSuccess');

  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = enquiryForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting Enquiry...';

      setTimeout(() => {
        enquiryForm.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        if (formSuccess) {
          formSuccess.style.display = 'block';
          formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setTimeout(() => {
            formSuccess.style.display = 'none';
          }, 8000);
        }
      }, 700);
    });
  }
});
