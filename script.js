/**
 * NEXUS Token - Web3 Landing Page
 * Interactive functionality
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollAnimations();
    initCountUpAnimations();
});

/**
 * Mobile Navigation Toggle
 */
function initNavigation() {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            mobileBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileBtn.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
    
    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/**
 * Scroll-triggered Animations
 */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.feature-card, .timeline-item, .social-card').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

/**
 * Number Count-up Animation
 */
function initCountUpAnimations() {
    const stats = document.querySelectorAll('.stat-value');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const text = el.textContent;
                const isPercentage = text.includes('%');
                const isBillion = text.includes('B');
                
                if (!isPercentage && !isBillion) {
                    animateValue(el, 0, parseInt(text.replace(/[^0-9]/g, '')), 2000);
                }
                
                observer.unobserve(el);
            }
        });
    }, observerOptions);
    
    stats.forEach(stat => {
        observer.observe(stat);
    });
}

/**
 * Animate numeric value
 */
function animateValue(element, start, end, duration) {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (end - start) * easeOutQuart);
        
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = end.toLocaleString();
        }
    }
    
    requestAnimationFrame(update);
}

/**
 * Smooth scroll for anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    /* Scroll Animation Classes */
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-on-scroll.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Staggered delays for grid items */
    .features-grid .animate-on-scroll:nth-child(1) { transition-delay: 0s; }
    .features-grid .animate-on-scroll:nth-child(2) { transition-delay: 0.1s; }
    .features-grid .animate-on-scroll:nth-child(3) { transition-delay: 0.2s; }
    .features-grid .animate-on-scroll:nth-child(4) { transition-delay: 0.3s; }
    
    .timeline-item .animate-on-scroll:nth-child(1) { transition-delay: 0s; }
    .timeline-item .animate-on-scroll:nth-child(2) { transition-delay: 0.15s; }
    .timeline-item .animate-on-scroll:nth-child(3) { transition-delay: 0.3s; }
    .timeline-item .animate-on-scroll:nth-child(4) { transition-delay: 0.45s; }
    
    /* Navbar scrolled state */
    .navbar.scrolled {
        padding: 12px 0;
        background: rgba(10, 10, 15, 0.95);
    }
    
    /* Mobile menu active state */
    .mobile-menu-btn.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-btn.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-btn.active span:nth-child(3) {
        transform: rotate(-45deg) translate(5px, -5px);
    }
    
    @media (max-width: 768px) {
        .nav-links {
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background: rgba(10, 10, 15, 0.98);
            backdrop-filter: blur(20px);
            flex-direction: column;
            padding: 24px;
            gap: 20px;
            border-bottom: 1px solid var(--border-color);
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .nav-links.active {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
    }
`;
document.head.appendChild(style);