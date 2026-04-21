// ============================================
// FORTRESS HILL — main.js
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initContactForm();
    initSmoothScroll();
    initScrollAnimations();
    initNavbarScroll();
    initPhoneInput();
});

// ============================================
// Mobile Menu
// ============================================

function initMobileMenu() {
    const btn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (!btn || !navLinks) return;

    btn.addEventListener('click', () => {
        const isOpen = btn.classList.toggle('active');
        navLinks.classList.toggle('is-open', isOpen);
        // Prevent body scroll when menu is open
        document.body.style.overflow = isOpen ? 'hidden' : '';
        btn.setAttribute('aria-expanded', isOpen);
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close on backdrop click (clicking outside)
    navLinks.addEventListener('click', (e) => {
        if (e.target === navLinks) closeMenu();
    });

    function closeMenu() {
        btn.classList.remove('active');
        navLinks.classList.remove('is-open');
        document.body.style.overflow = '';
        btn.setAttribute('aria-expanded', 'false');
    }
}

// ============================================
// Smooth Scroll
// ============================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            const target = href !== '#' && document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 64;
                const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });
}

// ============================================
// Scroll Animations
// ============================================

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // Stagger siblings in the same parent
                const siblings = [...entry.target.parentElement.querySelectorAll('.anim-ready')];
                const idx = siblings.indexOf(entry.target);
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, idx * 60);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.service-card, .portfolio-card, .tech-badge, .tech-category').forEach(el => {
        el.classList.add('anim-ready');
        observer.observe(el);
    });
}

// ============================================
// Navbar Scroll Effect
// ============================================

function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const onScroll = () => {
        navbar.style.boxShadow = window.scrollY > 40
            ? '0 4px 24px rgba(0,0,0,0.3)'
            : 'none';
    };

    window.addEventListener('scroll', onScroll, { passive: true });
}

// ============================================
// Contact Form
// ============================================

function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    form.addEventListener('submit', handleFormSubmit);
}

async function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formMessage = document.getElementById('formMessage');
    const submitBtn = form.querySelector('button[type="submit"]');

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Отправка...';

    const formData = new FormData(form);
    const data = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        message: formData.get('message')
    };

    try {
        const response = await fetch('/api/applications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        if (!response.ok || !result.ok) {
            throw new Error(result.error || 'Ошибка отправки');
        }

        showFormMessage(formMessage, 'Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.', 'success');
        form.reset();
        setTimeout(() => {
            if (formMessage) formMessage.style.display = 'none';
        }, 6000);
    } catch (error) {
        showFormMessage(formMessage, 'Не удалось отправить заявку. Попробуйте еще раз.', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
}

function showFormMessage(element, message, type) {
    if (!element) return;
    element.textContent = message;
    element.className = `form-message ${type}`;
    element.style.display = 'block';
}

// ============================================
// Phone Input
// ============================================

function initPhoneInput() {
    const phoneInput = document.getElementById('phone');
    if (!phoneInput) return;

    phoneInput.addEventListener('input', () => formatPhoneNumber(phoneInput));

    phoneInput.addEventListener('keydown', (e) => {
        const allowed = [46, 8, 9, 27, 13];
        const isCtrl = e.ctrlKey || e.metaKey;
        const isCtrlKey = isCtrl && [65, 67, 86, 88].includes(e.keyCode);
        const isNumpad = e.keyCode >= 96 && e.keyCode <= 105;
        const isDigit = !e.shiftKey && e.keyCode >= 48 && e.keyCode <= 57;

        if (allowed.includes(e.keyCode) || isCtrlKey || isNumpad || isDigit) return;
        e.preventDefault();
    });
}

function formatPhoneNumber(input) {
    const digits = input.value.replace(/\D/g, '');
    if (!digits) { input.value = ''; return; }

    const d = digits.startsWith('7') || digits.startsWith('8') ? digits.slice(1) : digits;

    let formatted = '+7';
    if (d.length > 0) formatted += ' (' + d.slice(0, 3);
    if (d.length >= 3) formatted += ') ' + d.slice(3, 6);
    if (d.length >= 6) formatted += '-' + d.slice(6, 8);
    if (d.length >= 8) formatted += '-' + d.slice(8, 10);

    input.value = formatted;
}
