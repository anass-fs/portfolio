/**
 * ANAS Portfolio Script
 * Pure JavaScript, optimized for performance and accessibility.
 */

document.addEventListener('DOMContentLoaded', () => {
    initPortfolio();
});

function initPortfolio() {
    // ── 1. Custom Cursor ───────────────────────────────────────────────────
    initCustomCursor();

    // ── 2. Scroll Reveal ───────────────────────────────────────────────────
    initScrollReveal();

    // ── 3. Mobile Menu ─────────────────────────────────────────────────────
    initMobileMenu();

    // ── 4. Theme Toggle ────────────────────────────────────────────────────
    initThemeToggle();

    // ── 5. Navigation & Scroll Progress ────────────────────────────────────
    initNavigation();

    // ── 6. Dynamic Projects ────────────────────────────────────────────────
    initProjects();

    // ── 7. Contact Form ────────────────────────────────────────────────────
    initContactForm();

    // ── 8. Typewriter Effect ───────────────────────────────────────────────
    initTypewriter();

    // ── 9. Back to Top ─────────────────────────────────────────────────────
    initBackToTop();
}

function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    const bgOrbs = document.querySelectorAll('.bg-orb');
    
    // Disable on touch devices or small screens
    if ('ontouchstart' in window || window.innerWidth < 992) {
        if (cursor) cursor.style.display = 'none';
        if (follower) follower.style.display = 'none';
        return;
    }

    let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

        // Subtle background orb movement
        bgOrbs.forEach((orb, i) => {
            const speed = (i + 1) * 20;
            const x = (window.innerWidth - e.pageX * speed) / 100;
            const y = (window.innerHeight - e.pageY * speed) / 100;
            orb.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        });
    });

    const moveFollower = () => {
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
        requestAnimationFrame(moveFollower);
    };
    moveFollower();

    const hoverElements = document.querySelectorAll('a, button, .project-card, .tech-item, .social-icon');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => follower.classList.add('cursor-grow'));
        el.addEventListener('mouseleave', () => follower.classList.remove('cursor-grow'));
    });
}

function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-element');
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                if (entry.target.querySelector('.counter-num')) {
                    animateCounters(entry.target);
                }
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));
}

function animateCounters(container) {
    const counters = container.querySelectorAll('.counter-num');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        let start = 0;
        const increment = target / (duration / 16);
        
        const updateCount = () => {
            start += increment;
            if (start < target) {
                counter.innerText = Math.ceil(start);
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
}

function initMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    const menuOverlay = document.getElementById('menu-overlay');
    const links = document.querySelectorAll('.nav-link');

    if (!menuToggle || !navLinks) return;

    const toggleMenu = (state) => {
        const isOpen = state !== undefined ? state : !navLinks.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', isOpen);
        menuToggle.setAttribute('aria-label', isOpen ? 'Close Mobile Menu' : 'Open Mobile Menu');
        navLinks.classList.toggle('active', isOpen);
        if (menuOverlay) menuOverlay.classList.toggle('active', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    menuToggle.addEventListener('click', () => toggleMenu());
    if (menuOverlay) menuOverlay.addEventListener('click', () => toggleMenu(false));

    links.forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            toggleMenu(false);
        }
    });
}

function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') body.classList.add('light-mode');
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        const isLight = body.classList.contains('light-mode');
        const currentTheme = isLight ? 'light' : 'dark';
        localStorage.setItem('theme', currentTheme);
        updateThemeIcon(currentTheme);
    });
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#theme-toggle i');
    if (!icon) return;
    icon.className = theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
}

function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollProgress = document.getElementById('scroll-progress');

    window.addEventListener('scroll', () => {
        // Navbar styling on scroll
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scroll progress bar
        const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalScroll) * 100;
        if (scrollProgress) scrollProgress.style.width = `${progress}%`;

        // Active link tracking
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

function initProjects() {
    const container = document.getElementById('projects-container');
    const filterContainer = document.getElementById('project-filters');
    
    if (!container || typeof projectsData === 'undefined') return;

    // Build filters
    const allBadges = new Set(['All']);
    projectsData.forEach(p => p.badges.forEach(b => allBadges.add(b)));
    
    if (filterContainer) {
        filterContainer.innerHTML = '';
        allBadges.forEach(badge => {
            const button = document.createElement('button');
            button.className = `filter-chip ${badge === 'All' ? 'active' : ''}`;
            button.textContent = badge;
            button.setAttribute('role', 'tab');
            button.setAttribute('aria-selected', badge === 'All');
            button.addEventListener('click', () => {
                document.querySelectorAll('.filter-chip').forEach(btn => {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-selected', 'false');
                });
                button.classList.add('active');
                button.setAttribute('aria-selected', 'true');
                renderProjects(badge);
            });
            filterContainer.appendChild(button);
        });
    }

    const renderProjects = (filter = 'All') => {
        container.innerHTML = '';
        const filtered = filter === 'All' 
            ? projectsData 
            : projectsData.filter(p => p.badges.includes(filter));

        filtered.forEach((project, index) => {
            const card = document.createElement('div');
            card.className = `project-card reveal-element is-visible ${project.isFeatured && filter === 'All' ? 'featured' : ''}`;
            card.style.animationDelay = `${index * 0.1}s`;
            
            const badgesHTML = project.badges.map(b => `<span class="badge">${b}</span>`).join('');
            const featuresHTML = project.features ? 
                `<ul class="project-features-list">${project.features.map(f => `<li>${f}</li>`).slice(0, 4).join('')}</ul>` : '';
            
            const headerContent = project.image 
                ? `<img src="${project.image}" alt="${project.title} Preview" class="project-image" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                   <div class="project-header-overlay" aria-hidden="true"></div>
                   <i class="${project.icon}" style="display:none;" aria-hidden="true"></i>`
                : `<i class="${project.icon}" aria-hidden="true"></i>`;

            card.innerHTML = `
                <div class="project-header" style="background: ${project.gradient}">
                    ${headerContent}
                    ${project.isNew ? '<span class="new-tag">New</span>' : ''}
                </div>
                <div class="project-body">
                    <h5>${project.title}</h5>
                    <p>${project.description}</p>
                    ${featuresHTML}
                    <div class="badges">${badgesHTML}</div>
                    <div class="project-links">
                        ${project.github ? `<a href="${project.github}" target="_blank" rel="noopener noreferrer" aria-label="GitHub Source Code"><i class="fab fa-github"></i> Source</a>` : ''}
                        ${project.demo && project.demo !== '#' ? `<a href="${project.demo}" target="_blank" rel="noopener noreferrer" aria-label="Live Demo"><i class="fas fa-external-link-alt"></i> Demo</a>` : ''}
                    </div>
                </div>
            `;
            container.appendChild(card);

            // Add Tilt and Glow effects
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Radial Glow
                card.style.setProperty('--mx', `${(x / rect.width) * 100}%`);
                card.style.setProperty('--my', `${(y / rect.height) * 100}%`);
                
                // 3D Tilt
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (centerY - y) / 10;
                const rotateY = (x - centerX) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            });
        });
    };

    renderProjects();
}

function initContactForm() {
    const form = document.getElementById('contactForm');
    const feedback = document.getElementById('formFeedback');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();
        
        let isValid = true;
        
        // Simple validation
        if (!name) {
            showError(form.name, 'Name is required');
            isValid = false;
        } else {
            hideError(form.name);
        }

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showError(form.email, 'Valid email is required');
            isValid = false;
        } else {
            hideError(form.email);
        }

        if (!message) {
            showError(form.message, 'Message is required');
            isValid = false;
        } else {
            hideError(form.message);
        }

        if (!isValid) return;

        const submitBtn = document.getElementById('submitBtn');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        // Simulate form submission or use a real service
        // Since this is a demo, we'll just show a success message
        setTimeout(() => {
            feedback.innerHTML = '<i class="fas fa-check-circle"></i> This is a demo. Please contact me directly via email at <a href="mailto:zaaria46@gmail.com">zaaria46@gmail.com</a>';
            feedback.className = 'form-feedback success show';
            form.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
            
            setTimeout(() => {
                feedback.classList.remove('show');
            }, 8000);
        }, 1000);
    });

    function showError(input, message) {
        const group = input.parentElement;
        const error = group.querySelector('.error-message');
        input.classList.add('error');
        if (error) {
            error.textContent = message;
            error.classList.add('show');
        }
    }

    function hideError(input) {
        const group = input.parentElement;
        const error = group.querySelector('.error-message');
        input.classList.remove('error');
        if (error) {
            error.classList.remove('show');
        }
    }
}

function initTypewriter() {
    const element = document.getElementById('typing-text');
    if (!element) return;

    const words = [
        'full-stack web applications',
        'robust backend systems',
        'efficient database architectures',
        'user-centric digital solutions'
    ];
    
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            element.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            element.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btn.classList.add('show');
        } else {
            btn.classList.remove('show');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
