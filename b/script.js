// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            if (navLinks) {
                navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            }
        });

        // Close menu when clicking on a link
        const links = document.querySelectorAll('.nav-links a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                if (navLinks) {
                    navLinks.style.display = 'none';
                }
            });
        });
    }

    // Contact Form Handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    observeElementsOnScroll();
});

/**
 * Handle contact form submission
 */
async function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formMessage = document.getElementById('formMessage');
    const submitBtn = form.querySelector('button[type="submit"]');

    // Validate form
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    // Disable submit button
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Отправка...';

    // Collect form data
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
        }, 5000);
    } catch (error) {
        showFormMessage(formMessage, 'Не удалось отправить заявку. Попробуйте еще раз.', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
}

/**
 * Show form message
 */
function showFormMessage(element, message, type) {
    element.textContent = message;
    element.className = `form-message ${type}`;
    element.style.display = 'block';
}

/**
 * Observe elements for scroll animations
 */
function observeElementsOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe service cards, portfolio cards, tech badges
    document.querySelectorAll('.service-card, .portfolio-card, .tech-badge').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

/**
 * Phone number formatting
 */
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');

    if (value.length > 0) {
        if (value.length <= 1) {
            value = '+7 (' + value;
        } else if (value.length <= 4) {
            value = '+7 (' + value.slice(1, 4) + ')';
        } else if (value.length <= 7) {
            value = '+7 (' + value.slice(1, 4) + ') ' + value.slice(4);
        } else {
            value = '+7 (' + value.slice(1, 4) + ') ' + value.slice(4, 7) + '-' + value.slice(7, 9) + '-' + value.slice(9, 11);
        }
    }

    input.value = value;
}

// Apply phone formatting on phone input
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function() {
        formatPhoneNumber(this);
    });

    phoneInput.addEventListener('keydown', function(e) {
        // Allow: backspace, delete, tab, escape, enter
        if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
            // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X, Cmd+A, Cmd+C, Cmd+V, Cmd+X
            (e.keyCode === 65 && e.ctrlKey === true) ||
            (e.keyCode === 67 && e.ctrlKey === true) ||
            (e.keyCode === 86 && e.ctrlKey === true) ||
            (e.keyCode === 88 && e.ctrlKey === true) ||
            (e.keyCode === 65 && e.metaKey === true) ||
            (e.keyCode === 67 && e.metaKey === true) ||
            (e.keyCode === 86 && e.metaKey === true) ||
            (e.keyCode === 88 && e.metaKey === true)) {
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
}

/**
 * Navbar scroll effect
 */
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    const scrollPosition = window.scrollY;

    if (scrollPosition > 50) {
        navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
    } else {
        navbar.style.boxShadow = 'none';
    }
}

window.addEventListener('scroll', handleNavbarScroll);
