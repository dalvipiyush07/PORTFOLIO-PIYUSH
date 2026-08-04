/* ============================================================
   PIYUSH DALVI — PREMIUM PORTFOLIO JAVASCRIPT
   ============================================================ */

'use strict';

// =========================================================
// THEME TOGGLE
// =========================================================
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;

const sunSVG = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="5"/>
  <line x1="12" y1="1" x2="12" y2="3"/>
  <line x1="12" y1="21" x2="12" y2="23"/>
  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
  <line x1="1" y1="12" x2="3" y2="12"/>
  <line x1="21" y1="12" x2="23" y2="12"/>
  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
</svg>`;

const moonSVG = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
</svg>`;

function applyTheme(isDark) {
    if (isDark) {
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
        themeIcon.innerHTML = sunSVG;
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        themeIcon.innerHTML = moonSVG;
    }
}

// Load saved theme
const savedTheme = localStorage.getItem('pd-theme');
if (savedTheme === 'dark') {
    applyTheme(true);
} else {
    applyTheme(false);
}

themeToggle.addEventListener('click', () => {
    const isDark = body.classList.contains('dark-mode');
    applyTheme(!isDark);
    localStorage.setItem('pd-theme', !isDark ? 'dark' : 'light');
});

// =========================================================
// MOBILE NAV
// =========================================================
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
const mobileOverlay = document.getElementById('mobileOverlay');
const mobileClose = document.getElementById('mobileClose');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

function openMobileNav() {
    mobileNav.classList.add('open');
    mobileOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
    hamburger.setAttribute('aria-expanded', 'true');
}

function closeMobileNav() {
    mobileNav.classList.remove('open');
    mobileOverlay.classList.remove('show');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
}

hamburger.addEventListener('click', openMobileNav);
mobileClose.addEventListener('click', closeMobileNav);
mobileOverlay.addEventListener('click', closeMobileNav);

mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileNav);
});

// Escape key closes mobile nav
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileNav();
});

// =========================================================
// STICKY NAV + ACTIVE LINK
// =========================================================
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function updateNav() {
    const scrollY = window.scrollY;

    // Scrolled class for shadow
    if (scrollY > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active nav link based on section
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateNav, { passive: true });

// =========================================================
// SCROLL REVEAL
// =========================================================
const revealElements = document.querySelectorAll('.reveal, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Stagger delay for sibling elements
            const siblings = entry.target.parentElement
                ? Array.from(entry.target.parentElement.children).filter(el =>
                    el.classList.contains('reveal') || el.classList.contains('reveal-right')
                  )
                : [];
            const siblingIndex = siblings.indexOf(entry.target);
            const delay = siblingIndex * 80;

            setTimeout(() => {
                entry.target.classList.add('visible');
            }, delay);

            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// =========================================================
// SMOOTH SCROLLING
// =========================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = navbar.offsetHeight;
            const targetTop = target.offsetTop - navHeight;
            window.scrollTo({
                top: targetTop,
                behavior: 'smooth'
            });
        }
    });
});

// =========================================================
// BACK TO TOP
// =========================================================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backToTop.style.opacity = '1';
        backToTop.style.pointerEvents = 'auto';
    } else {
        backToTop.style.opacity = '0';
        backToTop.style.pointerEvents = 'none';
    }
}, { passive: true });

// Initial state
backToTop.style.opacity = '0';
backToTop.style.pointerEvents = 'none';
backToTop.style.transition = 'opacity 0.3s ease';

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// =========================================================
// CONTACT FORM
// =========================================================
const contactForm = document.getElementById('contactForm');
const formSubmit = document.getElementById('formSubmit');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Allow Netlify to handle submission
        formSubmit.textContent = 'Sending...';
        formSubmit.disabled = true;

        // Re-enable after 4 seconds as fallback
        setTimeout(() => {
            formSubmit.textContent = '';
            formSubmit.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Send Message`;
            formSubmit.disabled = false;
        }, 4000);
    });
}

// =========================================================
// HERO SCROLL INDICATOR HIDE
// =========================================================
const heroScrollIndicator = document.querySelector('.hero-scroll-indicator');
if (heroScrollIndicator) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            heroScrollIndicator.style.opacity = '0';
        } else {
            heroScrollIndicator.style.opacity = '1';
        }
    }, { passive: true });
    heroScrollIndicator.style.transition = 'opacity 0.4s ease';
}

// =========================================================
// RESUME BUTTON — PDF download linked directly
// =========================================================
// Resume PDF is linked via href + download attribute in HTML
// No JS override needed

// =========================================================
// TOAST NOTIFICATION
// =========================================================
function showToast(message) {
    const existing = document.querySelector('.pd-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'pd-toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%) translateY(20px);
        background: #1a1a1a;
        color: #fff;
        padding: 14px 24px;
        border-radius: 999px;
        font-size: 14px;
        font-weight: 500;
        box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        z-index: 9999;
        opacity: 0;
        transition: all 0.3s ease;
        max-width: calc(100vw - 48px);
        text-align: center;
        font-family: 'Inter', sans-serif;
    `;

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(20px)';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// =========================================================
// SKILL BADGE HOVER — micro interaction tilt
// =========================================================
document.querySelectorAll('.skill-badge').forEach(badge => {
    badge.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.05)';
    });
    badge.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// =========================================================
// CARD TILT — subtle 3D effect on project cards
// =========================================================
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;
        card.style.transform = `translateY(-6px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', function() {
        card.style.transform = '';
        card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    card.addEventListener('mouseenter', function() {
        card.style.transition = 'border 0.25s ease, box-shadow 0.25s ease';
    });
});

// =========================================================
// TYPING EFFECT — hero title
// =========================================================
function typeEffect(element, text, speed = 60) {
    if (!element) return;
    element.textContent = '';
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}

// Initialize on load
window.addEventListener('load', () => {
    // Hero reveal with stagger
    const heroLeft = document.querySelector('.hero-left');
    const heroRight = document.querySelector('.hero-right');

    if (heroLeft) {
        setTimeout(() => {
            heroLeft.classList.add('visible');
        }, 200);
    }
    if (heroRight) {
        setTimeout(() => {
            heroRight.classList.add('visible');
        }, 400);
    }
});

// =========================================================
// PERFORMANCE: RequestAnimationFrame for scroll events
// =========================================================
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            updateNav();
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

console.log(
    '%cPiyush Dalvi — AI & Cloud Engineer',
    'color: #C9A84C; font-size: 16px; font-weight: bold; font-family: Inter, sans-serif;'
);
console.log(
    '%cBuilding intelligent AI applications & cloud infrastructure.',
    'color: #6B7280; font-size: 13px; font-family: Inter, sans-serif;'
);
