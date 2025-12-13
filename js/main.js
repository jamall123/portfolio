document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            hamburger.classList.toggle('toggle');
        });
    }

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple fade-in animation on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card, .app-item, .tool-card, .profile-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // Add visible class styling dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Dynamic Background Slideshow - Only for Hero Section
    const heroSection = document.querySelector('.hero');

    if (heroSection) {
        const images = [
            'images/bg1.jpg',
            'images/bg2.jpg',
            'images/bg3.jpg',
            'images/bg4.jpg'
        ];

        const slideshowContainer = document.createElement('div');
        slideshowContainer.id = 'bg-slideshow';
        // Prepend to hero section instead of body
        heroSection.prepend(slideshowContainer);

        // Preload and create divs
        const slides = images.map((imgSrc, index) => {
            const slide = document.createElement('div');
            slide.className = 'bg-slide';
            slide.style.backgroundImage = `url('${imgSrc}')`;
            if (index === 0) slide.classList.add('active');
            slideshowContainer.appendChild(slide);
            return slide;
        });

        let currentSlide = 0;
        const intervalTime = 30000; // 30 seconds as requested

        setInterval(() => {
            // Remove active from current
            slides[currentSlide].classList.remove('active');

            // Move to next
            currentSlide = (currentSlide + 1) % slides.length;

            // Add active to next
            slides[currentSlide].classList.add('active');
        }, intervalTime);
    }

    // Create Particle Effect for Hero Section
    const createParticles = () => {
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;

        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        heroSection.appendChild(particlesContainer);

        const particleCount = 30;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            // Random size between 2-6px
            const size = Math.random() * 4 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;

            // Random horizontal position
            particle.style.left = `${Math.random() * 100}%`;

            // Random animation delay
            particle.style.animationDelay = `${Math.random() * 15}s`;

            // Random animation duration
            particle.style.animationDuration = `${Math.random() * 10 + 10}s`;

            particlesContainer.appendChild(particle);
        }
    };

    createParticles();
});
