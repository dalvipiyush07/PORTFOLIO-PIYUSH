// Navigation
const navTabs = document.querySelectorAll('.nav-tab');
const sections = document.querySelectorAll('.section');

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-mode');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const theme = body.classList.contains('light-mode') ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
});

// Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    sidebar.classList.toggle('active');
});

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && 
        !sidebar.contains(e.target) && 
        !menuToggle.contains(e.target) && 
        sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetSection = tab.dataset.section;
        
        navTabs.forEach(t => t.classList.remove('active'));
        sections.forEach(s => s.classList.remove('active'));
        
        tab.classList.add('active');
        document.getElementById(targetSection).classList.add('active');
    });
});

// Portfolio Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        projectCards.forEach(card => {
            if (filter === 'all') {
                card.classList.remove('hidden');
            } else {
                const categories = card.dataset.category.split(' ');
                if (categories.includes(filter)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            }
        });
    });
});

// Contact Form
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    const submitBtn = contactForm.querySelector('.submit-btn');
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Form will submit to Formspree
    // After submission, Formspree will show thank you page
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.glass-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});
