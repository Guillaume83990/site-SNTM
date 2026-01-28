// ===================================
// INITIALIZATION
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initHeroSlider();
    initParticles();
    initScrollAnimations();
    initParallax();
    initCustomCursor();
    initTiltEffect();
    initStatCounters();
    initContactForm();
    initScrollTop();
    initSmoothScroll();
    initGalleryLightbox();
    init3DServiceCards();
    initTextReveal();
    optimizePerformance();
});

// ===================================
// CUSTOM CURSOR
// ===================================
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.innerHTML = '<div class="cursor-dot"></div><div class="cursor-ring"></div>';
    document.body.appendChild(cursor);

    const cursorDot = cursor.querySelector('.cursor-dot');
    const cursorRing = cursor.querySelector('.cursor-ring');

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor follow
    function animateCursor() {
        // Dot follows immediately
        cursorX += (mouseX - cursorX) * 0.9;
        cursorY += (mouseY - cursorY) * 0.9;

        // Ring follows with delay
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;

        cursorDot.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Add hover effects
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .gallery-item');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorRing.style.transform += ' scale(1.5)';
            cursorDot.style.transform += ' scale(0.5)';
        });

        el.addEventListener('mouseleave', () => {
            cursorRing.style.transform = cursorRing.style.transform.replace(' scale(1.5)', '');
            cursorDot.style.transform = cursorDot.style.transform.replace(' scale(0.5)', '');
        });
    });

    // Add CSS for custom cursor
    const style = document.createElement('style');
    style.textContent = `
        .custom-cursor {
            pointer-events: none;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 10000;
            mix-blend-mode: difference;
        }
        .cursor-dot {
            position: absolute;
            width: 8px;
            height: 8px;
            background: #fff;
            border-radius: 50%;
            transform-origin: center;
        }
        .cursor-ring {
            position: absolute;
            width: 40px;
            height: 40px;
            border: 2px solid #fff;
            border-radius: 50%;
            margin: -16px 0 0 -16px;
            transition: transform 0.3s ease;
        }
        * {
            cursor: none !important;
        }
        @media (max-width: 768px) {
            .custom-cursor {
                display: none;
            }
            * {
                cursor: auto !important;
            }
        }
    `;
    document.head.appendChild(style);
}

// ===================================
// HERO BACKGROUND SLIDER
// ===================================
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length === 0) return;

    let currentSlide = 0;

    function changeSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    // Change slide every 5 seconds
    setInterval(changeSlide, 5000);
}

// ===================================
// PARTICLES ANIMATION
// ===================================
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
    particle.style.animationDelay = `${Math.random() * 5}s`;

    container.appendChild(particle);

    // Remove and recreate when animation ends
    particle.addEventListener('animationend', () => {
        particle.remove();
        createParticle(container);
    });
}

// ===================================
// PARALLAX EFFECT
// ===================================
function initParallax() {
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                parallaxScroll();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

function parallaxScroll() {
    const scrolled = window.pageYOffset;

    // Hero parallax
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    }

    // Service cards parallax
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const offset = (window.innerHeight - rect.top) * 0.05;
            card.style.transform = `translateY(${offset}px)`;
        }
    });
}

// ===================================
// 3D TILT EFFECT
// ===================================
function initTiltEffect() {
    const tiltElements = document.querySelectorAll('[data-tilt]');

    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// ===================================
// 3D SERVICE CARDS
// ===================================
function init3DServiceCards() {
    const cards = document.querySelectorAll('.service-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
        });

        card.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            this.style.transform = `
                perspective(1000px) 
                rotateX(${-rotateX}deg) 
                rotateY(${rotateY}deg) 
                translateZ(10px)
                scale3d(1.02, 1.02, 1.02)
            `;

            // Move image inside card
            const image = this.querySelector('.service-image');
            if (image) {
                image.style.transform = `
                    scale(1.15) 
                    translateX(${rotateY}px) 
                    translateY(${-rotateX}px)
                `;
            }
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0) scale3d(1, 1, 1)';

            const image = this.querySelector('.service-image');
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });
}

// ===================================
// TEXT REVEAL ANIMATION
// ===================================
function initTextReveal() {
    const textElements = document.querySelectorAll('.section-title, .service-title, .about-description');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('text-revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    textElements.forEach(el => {
        observer.observe(el);
    });
}

// ===================================
// GALLERY LIGHTBOX
// ===================================
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            openLightbox(index);
        });
    });
}

function openLightbox(index) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close">&times;</button>
            <button class="lightbox-prev">&#10094;</button>
            <button class="lightbox-next">&#10095;</button>
            <div class="lightbox-image-container">
                <img src="" alt="Gallery Image" class="lightbox-image">
                <div class="lightbox-caption"></div>
            </div>
        </div>
    `;

    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';

    const galleryImages = document.querySelectorAll('.gallery-image');
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    let currentIndex = index;

    function showImage(idx) {
        const img = galleryImages[idx];
        const item = img.closest('.gallery-item');
        const caption = item.querySelector('.gallery-content h4').textContent;

        lightboxImage.src = img.src;
        lightboxCaption.textContent = caption;
        currentIndex = idx;
    }

    showImage(index);

    // Close lightbox
    lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
        lightbox.remove();
        document.body.style.overflow = '';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.remove();
            document.body.style.overflow = '';
        }
    });

    // Navigation
    lightbox.querySelector('.lightbox-prev').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        showImage(currentIndex);
    });

    lightbox.querySelector('.lightbox-next').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % galleryImages.length;
        showImage(currentIndex);
    });

    // Keyboard navigation
    document.addEventListener('keydown', function keyHandler(e) {
        if (e.key === 'Escape') {
            lightbox.remove();
            document.body.style.overflow = '';
            document.removeEventListener('keydown', keyHandler);
        } else if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
            showImage(currentIndex);
        } else if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % galleryImages.length;
            showImage(currentIndex);
        }
    });

    // Add lightbox styles
    if (!document.getElementById('lightbox-styles')) {
        const style = document.createElement('style');
        style.id = 'lightbox-styles';
        style.textContent = `
            .lightbox {
                position: fixed;
                inset: 0;
                background: rgba(0, 0, 0, 0.95);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.3s ease;
            }
            .lightbox-content {
                position: relative;
                max-width: 90%;
                max-height: 90%;
            }
            .lightbox-image-container {
                position: relative;
            }
            .lightbox-image {
                max-width: 90vw;
                max-height: 85vh;
                object-fit: contain;
                border-radius: 10px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                animation: zoomIn 0.3s ease;
            }
            .lightbox-caption {
                color: #fff;
                text-align: center;
                padding: 1rem;
                font-size: 1.25rem;
            }
            .lightbox-close {
                position: absolute;
                top: -50px;
                right: 0;
                background: rgba(255, 255, 255, 0.1);
                color: #fff;
                border: none;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                font-size: 2rem;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            .lightbox-close:hover {
                background: #e60012;
                transform: rotate(90deg);
            }
            .lightbox-prev, .lightbox-next {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                background: rgba(255, 255, 255, 0.1);
                color: #fff;
                border: none;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                font-size: 1.5rem;
                cursor: pointer;
                transition: all 0.3s ease;
                z-index: 10001;
            }
            .lightbox-prev {
                left: 20px;
            }
            .lightbox-next {
                right: 20px;
            }
            .lightbox-prev:hover, .lightbox-next:hover {
                background: #e60012;
                transform: translateY(-50%) scale(1.1);
            }
            @keyframes zoomIn {
                from {
                    transform: scale(0.8);
                    opacity: 0;
                }
                to {
                    transform: scale(1);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===================================
// NAVIGATION
// ===================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sticky navbar with hide/show on scroll
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll
        if (currentScroll > lastScroll && currentScroll > 500) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    }, { passive: true });

    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            if (menuToggle) {
                menuToggle.classList.remove('active');
            }
            document.body.style.overflow = '';
        });
    });

    // Active link on scroll
    updateActiveLink();
    window.addEventListener('scroll', updateActiveLink, { passive: true });
}

function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';
    const scrollPosition = window.pageYOffset + 200;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
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

// ===================================
// SCROLL ANIMATIONS
// ===================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Add staggered animation for children
                const children = entry.target.querySelectorAll('.value-item, .stat-card-inline, .contact-item');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => observer.observe(card));

    // Observe gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px) scale(0.9)';
        item.style.transition = 'all 0.6s ease';

        const itemObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) scale(1)';
                    }, index * 100);
                    itemObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        itemObserver.observe(item);
    });

    // Observe other animated elements
    const animatedElements = document.querySelectorAll('.value-item, .stat-card-inline, .contact-item, .cities-list li');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });

    observer.observe(document.querySelector('.about-values'));
    observer.observe(document.querySelector('.about-stats-inline'));
    observer.observe(document.querySelector('.contact-details'));
    observer.observe(document.querySelector('.cities-list'));
}

// ===================================
// STAT COUNTERS
// ===================================
function initStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    if (statNumbers.length > 0) {
        const firstStat = statNumbers[0].closest('.about-stats-inline');
        if (firstStat) {
            observer.observe(firstStat);
        }
    }

    function animateCounters() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2500;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target;
                }
            };

            updateCounter();
        });
    }
}

// ===================================
// CONTACT FORM
// ===================================
function initContactForm() {
    const form = document.getElementById('contactForm');

    if (!form) return;

    // Add floating label effect
    const formGroups = form.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea, select');
        if (!input) return;

        input.addEventListener('focus', () => {
            group.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                group.classList.remove('focused');
            }
        });

        if (input.value) {
            group.classList.add('focused');
        }
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;

        // Disable button and show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <span>Envoi en cours...</span>
            <svg class="spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
            </svg>
        `;

        // Add spinner animation
        const spinner = submitBtn.querySelector('.spinner');
        if (spinner) {
            spinner.style.animation = 'spin 1s linear infinite';
        }

        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Simulate form submission
        try {
            await simulateFormSubmission(data);

            // Success animation
            showNotification('✓ Message envoyé avec succès ! Nous vous répondrons rapidement.', 'success');
            form.reset();
            formGroups.forEach(group => group.classList.remove('focused'));

            // Confetti effect
            createConfetti();

        } catch (error) {
            showNotification('✗ Une erreur est survenue. Veuillez réessayer.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    });

    // Form validation
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });

        input.addEventListener('input', () => {
            if (input.classList.contains('invalid')) {
                validateField(input);
            }
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;

    if (field.hasAttribute('required') && !value) {
        isValid = false;
    }

    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(value);
    }

    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\d\s\+\-\(\)]{10,}$/;
        isValid = phoneRegex.test(value);
    }

    if (isValid) {
        field.classList.remove('invalid');
        field.style.borderColor = '#4caf50';
    } else {
        field.classList.add('invalid');
        field.style.borderColor = '#e60012';
    }

    return isValid;
}

function simulateFormSubmission(data) {
    return new Promise((resolve) => {
        console.log('Form data:', data);
        setTimeout(resolve, 2000);
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '-400px',
        padding: '1.5rem 2rem',
        background: type === 'success' ? 'linear-gradient(135deg, #4caf50, #45a049)' : 'linear-gradient(135deg, #e60012, #c70010)',
        color: '#fff',
        borderRadius: '15px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
        zIndex: '10000',
        maxWidth: '400px',
        fontSize: '1rem',
        fontWeight: '600',
        transition: 'right 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        lineHeight: '1.5'
    });

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.right = '20px';
    }, 100);

    setTimeout(() => {
        notification.style.right = '-400px';
        setTimeout(() => notification.remove(), 500);
    }, 5000);
}

function createConfetti() {
    const colors = ['#e60012', '#ff4444', '#4caf50', '#fff'];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            top: 50%;
            left: 50%;
            opacity: 1;
            border-radius: 50%;
            z-index: 10000;
            pointer-events: none;
        `;

        document.body.appendChild(confetti);

        const angle = (Math.PI * 2 * i) / confettiCount;
        const velocity = 5 + Math.random() * 5;

        const animation = confetti.animate([
            {
                transform: 'translate(0, 0) scale(1)',
                opacity: 1
            },
            {
                transform: `translate(${Math.cos(angle) * velocity * 50}px, ${Math.sin(angle) * velocity * 50 - 200}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 1500,
            easing: 'cubic-bezier(0, .9, .57, 1)'
        });

        animation.onfinish = () => confetti.remove();
    }
}

// ===================================
// SCROLL TO TOP
// ===================================
function initScrollTop() {
    const scrollTopBtn = document.getElementById('scrollTop');

    if (!scrollTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===================================
// SMOOTH SCROLL
// ===================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            if (href === '#' || href === '#!') return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                const offsetTop = target.offsetTop - 80;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// PERFORMANCE OPTIMIZATIONS
// ===================================
function optimizePerformance() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Preload critical resources
    const preloadLinks = [
        { href: 'Logo_SNTM.jpg', as: 'image' },
        { href: 'Logo_SAP_signature_mail.jpg', as: 'image' }
    ];

    preloadLinks.forEach(link => {
        const preload = document.createElement('link');
        preload.rel = 'preload';
        preload.href = link.href;
        preload.as = link.as;
        document.head.appendChild(preload);
    });
}

// ===================================
// ACCESSIBILITY
// ===================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const menuToggle = document.querySelector('.menu-toggle');

        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (menuToggle) {
                menuToggle.classList.remove('active');
            }
            document.body.style.overflow = '';
        }
    }
});

// Add spinner animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    .spinner {
        width: 20px;
        height: 20px;
        margin-left: 10px;
    }
`;
document.head.appendChild(style);

// ===================================
// CONSOLE SIGNATURE
// ===================================
console.log('%c🧹 SNTM SAP', 'color: #e60012; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
console.log('%cNettoyage Professionnel Premium', 'color: #666; font-size: 16px;');
console.log('%c✨ Site Web avec Effets Avancés', 'color: #4caf50; font-size: 14px; font-weight: bold;');
console.log('%cParallax • Particules • 3D • Animations', 'color: #999; font-size: 12px;');