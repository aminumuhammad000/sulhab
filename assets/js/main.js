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

  // Setup responsive mobile navigation drawer helper
  function setupMobileMenu(toggleId, menuId) {
    const toggle = document.getElementById(toggleId);
    const menu = document.getElementById(menuId);
    if (!toggle || !menu) return;

    function openMenu() {
      menu.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.classList.add('nav-open');
      toggle.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
    }

    function closeMenu() {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      
      // If no menu is open, remove nav-open from body
      const anyOpen = document.querySelectorAll('.hero-nav-links.is-open, .nav-menu.is-open');
      if (anyOpen.length === 0) {
        document.body.classList.remove('nav-open');
      }

      toggle.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;

      // Collapse open dropdowns inside this menu
      menu.querySelectorAll('.nav-dropdown.is-active').forEach(dd => {
        dd.classList.remove('is-active');
        const trigger = dd.querySelector('.dropdown-trigger');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      });
    }

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (menu.classList.contains('is-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close menu when navigation link is clicked
    const links = menu.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 992) {
          closeMenu();
        }
      });
    });

    // Accordion behavior for dropdown triggers on mobile/tablet
    const dropdownTriggers = menu.querySelectorAll('.dropdown-trigger');
    dropdownTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        if (window.innerWidth <= 992) {
          e.preventDefault();
          e.stopPropagation();
          const parentDropdown = trigger.closest('.nav-dropdown');
          if (parentDropdown) {
            const isCurrentlyActive = parentDropdown.classList.contains('is-active');
            
            // Close other sibling dropdowns in this menu
            menu.querySelectorAll('.nav-dropdown.is-active').forEach(dd => {
              if (dd !== parentDropdown) {
                dd.classList.remove('is-active');
                const t = dd.querySelector('.dropdown-trigger');
                if (t) t.setAttribute('aria-expanded', 'false');
              }
            });

            if (!isCurrentlyActive) {
              parentDropdown.classList.add('is-active');
              trigger.setAttribute('aria-expanded', 'true');
            } else {
              parentDropdown.classList.remove('is-active');
              trigger.setAttribute('aria-expanded', 'false');
            }
          }
        }
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (menu.classList.contains('is-open') && !menu.contains(e.target) && !toggle.contains(e.target)) {
        closeMenu();
      }
    });

    // Close when ESC key is pressed
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        closeMenu();
      }
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
