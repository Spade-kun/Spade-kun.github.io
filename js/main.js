/**
 * Modern Portfolio JavaScript
 * Vanilla JavaScript - No frameworks
 * Features: Smooth scrolling, animations, typing effect, form handling
 */

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// ==========================================
// Utility Functions
// ==========================================

/**
 * Debounce function to limit function calls
 */
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function for scroll events
 */
function throttle(func, wait = 10) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, wait);
        }
    };
}

// ==========================================
// Navigation
// ==========================================

class Navigation {
    constructor() {
        this.navbar = document.getElementById('mainNav');
        this.navToggle = document.getElementById('navToggle');
        this.navMenu = document.getElementById('navMenu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }
    
    init() {
        // Handle scroll effect
        window.addEventListener('scroll', throttle(() => this.handleScroll(), 10));
        
        // Mobile menu toggle
        if (this.navToggle) {
            this.navToggle.setAttribute('aria-expanded', 'false');
            this.navToggle.addEventListener('click', () => this.toggleMenu());
        }
        
        // Close menu on link click (mobile)
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 980) {
                    this.closeMenu();
                }
                this.setActiveLink(link);
            });
        });
        
        // Smooth scrolling for navigation links
        this.setupSmoothScroll();
        
        // Set active link on scroll
        window.addEventListener('scroll', debounce(() => this.updateActiveLink(), 100));

        window.addEventListener('resize', debounce(() => {
            if (window.innerWidth > 980) {
                this.closeMenu();
            }
        }, 100));
    }
    
    handleScroll() {
        if (window.scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }
    
    toggleMenu() {
        const isOpen = this.navMenu.classList.toggle('active');
        this.navToggle.classList.toggle('active', isOpen);
        document.body.classList.toggle('nav-open', isOpen);
        this.navToggle.setAttribute('aria-expanded', String(isOpen));
    }
    
    closeMenu() {
        this.navMenu.classList.remove('active');
        this.navToggle.classList.remove('active');
        document.body.classList.remove('nav-open');
        if (this.navToggle) {
            this.navToggle.setAttribute('aria-expanded', 'false');
        }
    }
    
    setupSmoothScroll() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        const offsetTop = target.offsetTop - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
    
    updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    setActiveLink(clickedLink) {
        this.navLinks.forEach(link => link.classList.remove('active'));
        clickedLink.classList.add('active');
    }
}

// ==========================================
// Typing Animation
// ==========================================

class TypingAnimation {
    constructor(element, words, typeSpeed = 100, deleteSpeed = 50, delayBetween = 2000) {
        this.element = element;
        this.words = words;
        this.typeSpeed = typeSpeed;
        this.deleteSpeed = deleteSpeed;
        this.delayBetween = delayBetween;
        this.wordIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        
        this.init();
    }
    
    init() {
        if (this.element) {
            this.type();
        }
    }
    
    type() {
        const currentWord = this.words[this.wordIndex];
        
        if (this.isDeleting) {
            // Remove character
            this.element.textContent = currentWord.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            // Add character
            this.element.textContent = currentWord.substring(0, this.charIndex + 1);
            this.charIndex++;
        }
        
        let typeSpeedCurrent = this.isDeleting ? this.deleteSpeed : this.typeSpeed;
        
        if (!this.isDeleting && this.charIndex === currentWord.length) {
            // Pause at end of word
            typeSpeedCurrent = this.delayBetween;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            // Move to next word
            this.isDeleting = false;
            this.wordIndex = (this.wordIndex + 1) % this.words.length;
            typeSpeedCurrent = 500; // Pause before starting new word
        }
        
        setTimeout(() => this.type(), typeSpeedCurrent);
    }
}

// ==========================================
// Scroll Animations (IntersectionObserver)
// ==========================================

class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.init();
    }
    
    init() {
        // Create observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Optional: Stop observing after animation
                    // observer.unobserve(entry.target);
                }
            });
        }, this.observerOptions);
        
        // Observe all elements with fade-in class
        const fadeElements = document.querySelectorAll('.section, .skill-category, .project-card, .certification-card, .timeline-item');
        fadeElements.forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    }
}

// ==========================================
// Back to Top Button
// ==========================================

class BackToTop {
    constructor() {
        this.button = document.querySelector('.scroll-progress-ring-wrap');
        this.init();
    }
    
    init() {
        if (!this.button) return;
        
        window.addEventListener('scroll', throttle(() => this.toggleVisibility(), 100));
        this.button.addEventListener('click', () => this.scrollToTop());
    }
    
    toggleVisibility() {
        if (window.scrollY > 300) {
            this.button.classList.add('show');
        } else {
            this.button.classList.remove('show');
        }
    }
    
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// ==========================================
// Contact Form Handler
// ==========================================

class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.submitButton = document.getElementById('submitButton');
        this.successMessage = document.getElementById('submitSuccessMessage');
        this.errorMessage = document.getElementById('submitErrorMessage');
        
        this.init();
    }
    
    init() {
        if (!this.form) return;
        
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Add input validation
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateInput(input));
            input.addEventListener('input', () => this.clearError(input));
        });
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        // Validate all inputs
        const inputs = this.form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!this.validateInput(input)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            return;
        }
        
        // Show loading state
        this.setLoading(true);
        this.hideMessages();
        
        try {
            // Submit form using Formspree
            const response = await fetch(this.form.action, {
                method: 'POST',
                body: new FormData(this.form),
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                this.showSuccess();
                this.form.reset();
            } else {
                this.showError();
            }
        } catch (error) {
            console.error('Form submission error:', error);
            this.showError();
        } finally {
            this.setLoading(false);
        }
    }
    
    validateInput(input) {
        const value = input.value.trim();
        
        // Check if required field is empty
        if (input.hasAttribute('required') && !value) {
            this.showInputError(input, 'This field is required');
            return false;
        }
        
        // Email validation
        if (input.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                this.showInputError(input, 'Please enter a valid email address');
                return false;
            }
        }
        
        this.clearError(input);
        return true;
    }
    
    showInputError(input, message) {
        input.style.borderColor = '#ef4444';
        
        // Remove existing error message
        const existingError = input.parentElement.querySelector('.input-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Add error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'input-error';
        errorDiv.style.color = '#ef4444';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.25rem';
        errorDiv.textContent = message;
        input.parentElement.appendChild(errorDiv);
    }
    
    clearError(input) {
        input.style.borderColor = '';
        const errorDiv = input.parentElement.querySelector('.input-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }
    
    setLoading(isLoading) {
        if (isLoading) {
            this.submitButton.disabled = true;
            this.submitButton.innerHTML = '<i class="bi bi-hourglass-split"></i> Sending...';
        } else {
            this.submitButton.disabled = false;
            this.submitButton.innerHTML = '<i class="bi bi-send"></i> Send Message';
        }
    }
    
    showSuccess() {
        this.successMessage.style.display = 'flex';
        setTimeout(() => {
            this.successMessage.style.display = 'none';
        }, 5000);
    }
    
    showError() {
        this.errorMessage.style.display = 'flex';
        setTimeout(() => {
            this.errorMessage.style.display = 'none';
        }, 5000);
    }
    
    hideMessages() {
        this.successMessage.style.display = 'none';
        this.errorMessage.style.display = 'none';
    }
}

// ==========================================
// Cursor Effects (Optional Enhancement)
// ==========================================

class CursorEffects {
    constructor() {
        this.cursor = null;
        this.cursorDot = null;
        this.init();
    }
    
    init() {
        // Only on desktop
        if (window.innerWidth < 768) return;
        
        // Create custom cursor elements
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        this.cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid #6366f1;
            border-radius: 50%;
            pointer-events: none;
            transition: transform 0.2s ease;
            z-index: 10000;
            display: none;
        `;
        
        document.body.appendChild(this.cursor);
        
        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.display = 'block';
            this.cursor.style.left = e.clientX + 'px';
            this.cursor.style.top = e.clientY + 'px';
        });
        
        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            this.cursor.style.display = 'none';
        });
        
        // Scale cursor on hover over interactive elements
        const interactiveElements = document.querySelectorAll('a, button, input, textarea');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.style.transform = 'scale(1.5)';
                this.cursor.style.borderColor = '#f59e0b';
            });
            el.addEventListener('mouseleave', () => {
                this.cursor.style.transform = 'scale(1)';
                this.cursor.style.borderColor = '#6366f1';
            });
        });
    }
}

// ==========================================
// Performance Monitoring
// ==========================================

class PerformanceMonitor {
    constructor() {
        this.init();
    }
    
    init() {
        // Log page load time
        window.addEventListener('load', () => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`%c🚀 Page loaded in ${pageLoadTime}ms`, 'color: #10b981; font-weight: bold;');
        });
    }
}

// ==========================================
// Console Welcome Message
// ==========================================

function showConsoleWelcome() {
    const styles = [
        'color: #6366f1',
        'font-size: 20px',
        'font-weight: bold',
        'text-shadow: 2px 2px 4px rgba(0,0,0,0.3)'
    ].join(';');
    
    console.log('%c👋 Welcome to my portfolio!', styles);
    console.log('%c💼 Built with vanilla HTML, CSS, and JavaScript', 'color: #8b5cf6; font-size: 14px;');
    console.log('%c📧 Contact: noelratertajr@gmail.com', 'color: #f59e0b; font-size: 14px;');
    console.log('%c🔗 GitHub: https://github.com/Spade-kun', 'color: #10b981; font-size: 14px;');
    console.log('%c\nInterested in the code? Feel free to explore and reach out!', 'color: #94a3b8; font-size: 12px;');
}

// ==========================================
// Role & Project Showcase Filtering
// ==========================================

class ProjectFilters {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.rolePills = document.querySelectorAll('.role-pill');
        this.projectCards = document.querySelectorAll('.project-card');
        this.serviceCards = document.querySelectorAll('.service-card');
        
        this.init();
    }
    
    init() {
        // Handle Project Filter Bar
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                this.setActiveFilter(btn, this.filterButtons);
                this.filterProjects(filter);
                
                // Sync with role pill if matching
                const matchingPill = Array.from(this.rolePills).find(p => p.getAttribute('data-role-target') === filter);
                if (matchingPill) {
                    this.setActiveFilter(matchingPill, this.rolePills);
                    this.filterServices(filter);
                }
            });
        });
        
        // Handle Role Selector Pills
        this.rolePills.forEach(pill => {
            pill.addEventListener('click', () => {
                const role = pill.getAttribute('data-role-target');
                this.setActiveFilter(pill, this.rolePills);
                this.filterServices(role);
                
                // Sync with project filter buttons if matching
                const matchingBtn = Array.from(this.filterButtons).find(b => b.getAttribute('data-filter') === role);
                if (matchingBtn) {
                    this.setActiveFilter(matchingBtn, this.filterButtons);
                    this.filterProjects(role);
                }
            });
        });

        // Handle Service Hire Buttons (Pre-select form option)
        document.querySelectorAll('.service-hire-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const serviceOpt = btn.getAttribute('data-service-option');
                const selectElement = document.getElementById('serviceSelect');
                if (selectElement && serviceOpt) {
                    selectElement.value = serviceOpt;
                }
            });
        });
    }
    
    setActiveFilter(activeElement, group) {
        group.forEach(item => item.classList.remove('active'));
        activeElement.classList.add('active');
    }
    
    filterProjects(filter) {
        this.projectCards.forEach(card => {
            const categories = card.getAttribute('data-category') || '';
            if (filter === 'all' || categories.includes(filter)) {
                card.style.display = '';
                card.style.opacity = '1';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    filterServices(role) {
        this.serviceCards.forEach(card => {
            const serviceType = card.getAttribute('data-service') || '';
            if (role === 'all' || serviceType === role) {
                card.style.display = '';
                card.style.opacity = '1';
            } else {
                card.style.display = 'none';
            }
        });
    }
}

// ==========================================
// Case Study Modal System
// ==========================================

class CaseStudyModal {
    constructor() {
        this.modal = document.getElementById('caseStudyModal');
        this.closeBtns = [document.getElementById('modalCloseBtn'), document.getElementById('modalCloseFooterBtn')];
        this.caseStudyData = {
            'everly-plumbing': {
                title: 'Everly Plumbing',
                category: 'WordPress Migration & Custom Laravel Build',
                stack: ['WordPress', 'Laravel Blade', 'PHP', 'APIs', 'SEO Audit'],
                image: 'assets/everly-plumbing-preview.png',
                challenge: 'The client needed a high-performance web platform for residential and commercial plumbing services with responsive quote inquiry capabilities and fast page speed.',
                solution: 'Migrated legacy WordPress pages to a lightweight custom Laravel Blade application, integrated appointment booking API endpoints, structured mobile-first landing pages, and optimized Core Web Vitals.',
                impact: [
                    '⚡ Over 50% faster page load speed compared to legacy WordPress installation',
                    '📱 100% responsive experience tailored for mobile, tablet, and desktop views',
                    '📅 Streamlined quote request and appointment lead generation funnel'
                ],
                link: 'http://everlyplumbing.com/'
            },
            'salt-lyf-cruises': {
                title: 'Salt Lyf Cruises',
                category: 'Squarespace Customization & UI Polish',
                stack: ['Squarespace', 'Custom CSS', 'JavaScript', 'UI/UX Polish'],
                image: 'assets/salt-lyf-cruises-preview.png',
                challenge: 'Salt Lyf Cruises required an engaging, luxury-tier tour website presenting destinations, itinerary packages, and direct booking inquiries.',
                solution: 'Redesigned and customized the Squarespace platform using bespoke CSS/JS code injection, brand-color refinements, optimized image assets, and structured the reservation funnel.',
                impact: [
                    '⛵ High-converting layout designed for luxury cruise package browsing',
                    '🎨 Custom CSS and JavaScript code injection for bespoke buttons and glass cards',
                    '📈 Clear user journey leading directly to reservation request forms'
                ],
                link: 'https://www.saltlyfcruises.com/'
            },
            'everly-bookkeeping': {
                title: 'Everly Bookkeeping',
                category: 'Custom Full-Stack Laravel Web Application',
                stack: ['Laravel', 'PHP', 'MySQL', 'Interactive UI'],
                image: 'assets/everly-bookkeeping-preview.png',
                challenge: 'A bookkeeping firm needed a trusted, professional website with interactive consultation features to convert incoming business clients.',
                solution: 'Engineered a custom Laravel web application from scratch with realtime messaging-style consultation tools, clear service package breakdowns, and secure client onboarding workflows.',
                impact: [
                    '💼 Bespoke full-stack Laravel application deployed to production',
                    '💬 Interactive consultation experience for prospective financial clients',
                    '🔒 Secure backend database architecture with optimized models'
                ],
                link: 'https://www.everlybookkeeping.com/'
            }
        };
        
        this.init();
    }
    
    init() {
        if (!this.modal) return;
        
        // Trigger buttons
        document.querySelectorAll('.view-case-study-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const projectId = btn.getAttribute('data-project-id');
                if (projectId && this.caseStudyData[projectId]) {
                    this.openModal(this.caseStudyData[projectId]);
                }
            });
        });
        
        // Close handlers
        this.closeBtns.forEach(btn => {
            if (btn) btn.addEventListener('click', () => this.closeModal());
        });
        
        // Backdrop click close
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
        });
        
        // Escape key close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }
    
    openModal(data) {
        document.getElementById('modalCategory').textContent = data.category;
        document.getElementById('modalTitle').textContent = data.title;
        
        // Render stack badges
        const stackContainer = document.getElementById('modalStack');
        stackContainer.innerHTML = data.stack.map(s => `<span class="modal-stack-badge">${s}</span>`).join('');
        
        // Media
        document.getElementById('modalMedia').innerHTML = `<img src="${data.image}" alt="${data.title} preview" loading="lazy" />`;
        
        // Sections
        document.getElementById('modalChallenge').textContent = data.challenge;
        document.getElementById('modalSolution').textContent = data.solution;
        
        // Impact
        const impactContainer = document.getElementById('modalImpact');
        impactContainer.innerHTML = data.impact.map(item => `<li style="display:flex; align-items:center; gap:0.5rem;"><i class="bi bi-check-circle-fill" style="color: var(--color-primary);"></i> ${item}</li>`).join('');
        
        // Live link
        const liveLink = document.getElementById('modalLiveLink');
        liveLink.href = data.link;
        
        // Show modal
        this.modal.classList.add('active');
        this.modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
    
    closeModal() {
        this.modal.classList.remove('active');
        this.modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
}

// ==========================================
// Initialize Everything
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new Navigation();
    new ScrollAnimations();
    new ContactForm();
    new PerformanceMonitor();
    new ProjectFilters();
    new CaseStudyModal();
    
    // Optional: Uncomment for custom cursor on desktop
    // new CursorEffects();
    
    // Typing animation for hero section
    const typedElement = document.querySelector('.typed-text');
    if (typedElement) {
        new TypingAnimation(typedElement, [
            'web applications',
            'mobile apps',
            'scalable solutions',
            'innovative products'
        ], 100, 50, 2000);
    }
    
    // Show console welcome message
    showConsoleWelcome();
    
    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
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
    
    // Add loading complete class to body
    document.body.classList.add('loaded');
});

// ==========================================
// Service Worker Registration (Optional for PWA)
// ==========================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered:', registration))
        //     .catch(error => console.log('SW registration failed:', error));
    });
}

// ==========================================
// Export for testing (if needed)
// ==========================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Navigation,
        TypingAnimation,
        ScrollAnimations,
        BackToTop,
        ContactForm
    };
}
