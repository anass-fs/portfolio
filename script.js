/**
 * Anass Zaari — Portfolio Script
 * Pure JavaScript, optimized for performance and accessibility.
 */

(function () {
    'use strict';

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.addEventListener('DOMContentLoaded', () => {
        initCustomCursor();
        initScrollReveal();
        initMobileMenu();
        initThemeToggle();
        initNavigation();
        initProjects();
        initProjectModal();
        initContactForm();
        initTypewriter();
        initBackToTop();
    });

    /* ── Helpers ─────────────────────────────────────────────────────── */

    function escapeHTML(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    const storage = (() => {
        try {
            const testKey = '__portfolio_test__';
            window.localStorage.setItem(testKey, '1');
            window.localStorage.removeItem(testKey);
            return window.localStorage;
        } catch (e) {
            // localStorage unavailable (opaque origin, privacy mode, storage blocked).
            const memory = {};
            return {
                getItem: (k) => (k in memory ? memory[k] : null),
                setItem: (k, v) => { memory[k] = String(v); },
                removeItem: (k) => { delete memory[k]; }
            };
        }
    })();

    /* ── 1. Custom Cursor ─────────────────────────────────────────────── */

    function initCustomCursor() {
        const cursor = document.querySelector('.cursor');
        const follower = document.querySelector('.cursor-follower');
        const bgOrbs = document.querySelectorAll('.bg-orb');

        if (reducedMotion || 'ontouchstart' in window || window.innerWidth < 992) {
            if (cursor) cursor.style.display = 'none';
            if (follower) follower.style.display = 'none';
            return;
        }

        let mouseX = 0;
        let mouseY = 0;
        let followerX = 0;
        let followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

            bgOrbs.forEach((orb, i) => {
                const speed = (i + 1) * 20;
                const x = (window.innerWidth - e.pageX * speed) / 100;
                const y = (window.innerHeight - e.pageY * speed) / 100;
                orb.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            });
        });

        const moveFollower = () => {
            if (window.innerWidth < 992) return;
            followerX += (mouseX - followerX) * 0.15;
            followerY += (mouseY - followerY) * 0.15;
            follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
            requestAnimationFrame(moveFollower);
        };
        moveFollower();

        const hoverElements = document.querySelectorAll('a, button, .project-card, .tech-item, .social-icon, .zoom-on-hover');
        hoverElements.forEach((el) => {
            el.addEventListener('mouseenter', () => follower.classList.add('cursor-grow'));
            el.addEventListener('mouseleave', () => follower.classList.remove('cursor-grow'));
        });
    }

    /* ── 2. Scroll Reveal ─────────────────────────────────────────────── */

    function initScrollReveal() {
        const revealElements = document.querySelectorAll('.reveal-element');

        if (reducedMotion) {
            revealElements.forEach((el) => el.classList.add('is-visible'));
            return;
        }

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateCounters(entry.target);
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

        revealElements.forEach((el) => revealObserver.observe(el));
    }

    function animateCounters(container) {
        if (reducedMotion) {
            container.querySelectorAll('.counter-num').forEach((counter) => {
                counter.innerText = counter.getAttribute('data-target');
            });
            return;
        }

        const counters = container.querySelectorAll('.counter-num');
        counters.forEach((counter) => {
            const target = parseInt(counter.getAttribute('data-target'), 10) || 0;
            const duration = 1600;
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

    /* ── 3. Mobile Menu ───────────────────────────────────────────────── */

    function initMobileMenu() {
        const menuToggle = document.getElementById('mobile-menu');
        const navLinks = document.getElementById('nav-links');
        const menuOverlay = document.getElementById('menu-overlay');
        const links = document.querySelectorAll('.nav-link');

        if (!menuToggle || !navLinks) return;

        const toggleMenu = (state) => {
            const isOpen = state !== undefined ? state : !navLinks.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isOpen);
            menuToggle.setAttribute('aria-label', isOpen ? 'Close mobile menu' : 'Open mobile menu');
            navLinks.classList.toggle('active', isOpen);
            if (menuOverlay) menuOverlay.classList.toggle('active', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        };

        menuToggle.addEventListener('click', () => toggleMenu());
        if (menuOverlay) menuOverlay.addEventListener('click', () => toggleMenu(false));

        links.forEach((link) => link.addEventListener('click', () => toggleMenu(false)));

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                toggleMenu(false);
            }
        });
    }

    /* ── 4. Theme Toggle ──────────────────────────────────────────────── */

    function initThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const body = document.body;
        const iconUse = themeToggle ? themeToggle.querySelector('use') : null;

        if (!themeToggle) return;

        const savedTheme = storage.getItem('theme') || 'dark';
        if (savedTheme === 'light') body.classList.add('light-mode');
        if (iconUse) iconUse.setAttribute('href', savedTheme === 'light' ? '#i-sun' : '#i-moon');

        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            const isLight = body.classList.contains('light-mode');
            storage.setItem('theme', isLight ? 'light' : 'dark');
            if (iconUse) iconUse.setAttribute('href', isLight ? '#i-sun' : '#i-moon');
        });
    }

    /* ── 5. Navigation & Scroll Progress ──────────────────────────────── */

    function initNavigation() {
        const navbar = document.querySelector('.navbar');
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        const scrollProgress = document.getElementById('scroll-progress');

        const onScroll = () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
            if (totalScroll > 0 && scrollProgress) {
                scrollProgress.style.width = `${(window.scrollY / totalScroll) * 100}%`;
            }

            let current = '';
            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                if (window.scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach((link) => {
                const target = link.getAttribute('href') ? link.getAttribute('href').slice(1) : '';
                link.classList.toggle('active', target === current);
            });
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    /* ── 6. Dynamic Projects ──────────────────────────────────────────── */

    let lastFocusedCard = null;

    function initProjects() {
        const container = document.getElementById('projects-container');
        const filterContainer = document.getElementById('project-filters');
        const countEl = document.getElementById('projects-count');

        if (!container || typeof projectsData === 'undefined') return;

        // Projects counter is driven by the data, never hard-coded.
        if (countEl && Array.isArray(projectsData)) {
            countEl.setAttribute('data-target', projectsData.length);
        }

        const allBadges = new Set(['All']);
        projectsData.forEach((p) => p.badges.forEach((b) => allBadges.add(b)));

        if (filterContainer) {
            allBadges.forEach((badge) => {
                const button = document.createElement('button');
                button.type = 'button';
                button.className = `filter-chip ${badge === 'All' ? 'active' : ''}`;
                button.textContent = badge;
                button.setAttribute('aria-pressed', badge === 'All' ? 'true' : 'false');
                button.addEventListener('click', () => {
                    filterContainer.querySelectorAll('.filter-chip').forEach((btn) => {
                        btn.classList.remove('active');
                        btn.setAttribute('aria-pressed', 'false');
                    });
                    button.classList.add('active');
                    button.setAttribute('aria-pressed', 'true');
                    renderProjects(badge);
                });
                filterContainer.appendChild(button);
            });
        }

        const renderProjects = (filter = 'All') => {
            const filtered = filter === 'All'
                ? projectsData
                : projectsData.filter((p) => p.badges.includes(filter));

            container.innerHTML = '';

            const status = document.getElementById('projects-status');
            if (status) status.textContent = `${filtered.length} project${filtered.length === 1 ? '' : 's'} shown`;

            filtered.forEach((project, index) => {
                const card = buildCard(project, filter, index);
                container.appendChild(card);
            });
        };

        renderProjects();
    }

    function buildCard(project, filter, index) {
        const card = document.createElement('article');
        card.className = `project-card reveal-element is-visible${project.isFeatured && filter === 'All' ? ' featured' : ''}`;
        card.style.setProperty('animation-delay', `${index * 0.05}s`);
        card.setAttribute('data-project', project.title);

        const hasImage = Boolean(project.image);
        const iconSvg = `<svg class="icon-lg" aria-hidden="true" focusable="false"><use href="#i-${project.icon}"></use></svg>`;

        const headerInner = hasImage
            ? `<img src="${escapeHTML(project.image)}" alt="${escapeHTML(project.title)} preview" class="project-image" loading="lazy" width="1200" height="675"
                   onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
               <div class="project-header-overlay" aria-hidden="true"></div>
               <span class="project-header-icon" style="display:none;">${iconSvg}</span>`
            : `<span class="project-header-icon">${iconSvg}</span>`;

        const featuresHTML = project.features && project.features.length
            ? `<ul class="project-features-list">${project.features.slice(0, 4)
                .map((f) => `<li>${escapeHTML(f)}</li>`).join('')}</ul>`
            : '';

        const badgesHTML = project.badges
            .map((b) => `<span class="badge">${escapeHTML(b)}</span>`).join('');

        const impactHTML = project.impact
            ? `<div class="impact-banner">${escapeHTML(project.impact)}</div>`
            : '';

        const sourceLink = project.github
            ? `<a href="${escapeHTML(project.github)}" target="_blank" rel="noopener noreferrer" aria-label="View source on GitHub">
                <svg class="icon" aria-hidden="true" focusable="false"><use href="#i-github"></use></svg> Source</a>`
            : '';

        const demoLink = project.demo
            ? `<a href="${escapeHTML(project.demo)}" target="_blank" rel="noopener noreferrer" aria-label="Open live demo or video">
                <svg class="icon" aria-hidden="true" focusable="false"><use href="#i-external"></use></svg> Demo</a>`
            : '';

        card.innerHTML = `
            <div class="project-header" style="background: ${project.gradient}">
                ${headerInner}
                ${project.isNew ? '<span class="new-tag">New</span>' : ''}
            </div>
            <div class="project-body">
                <h5>${escapeHTML(project.title)}</h5>
                <p>${escapeHTML(project.description)}</p>
                ${featuresHTML}
                ${impactHTML}
                <div class="badges">${badgesHTML}</div>
                <div class="project-links">
                    <button type="button" class="details-btn" aria-haspopup="dialog">
                        <svg class="icon" aria-hidden="true" focusable="false"><use href="#i-code"></use></svg> Details
                    </button>
                    ${sourceLink}
                    ${demoLink}
                </div>
            </div>
        `;

        // Tilt & glow (decorative, disabled with reduced motion)
        if (!reducedMotion && window.innerWidth >= 992) {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mx', `${(x / rect.width) * 100}%`);
                card.style.setProperty('--my', `${(y / rect.height) * 100}%`);
                card.style.transform = `perspective(1000px) rotateX(${(rect.height / 2 - y) / 20}deg) rotateY(${(x - rect.width / 2) / 20}deg) scale3d(1.01, 1.01, 1.01)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        }

        const detailsBtn = card.querySelector('.details-btn');
        if (detailsBtn) {
            detailsBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openModal(project, card);
            });
        }

        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (detailsBtn) detailsBtn.click();
            }
        });

        return card;
    }

    /* ── 7. Project Detail Modal ──────────────────────────────────────── */

    function initProjectModal() {
        const modal = document.getElementById('project-modal');
        if (!modal) return;

        modal.querySelectorAll('[data-modal-close]').forEach((el) => {
            el.addEventListener('click', closeModal);
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.hidden) {
                closeModal();
            }
        });
    }

    function openModal(project, trigger) {
        const modal = document.getElementById('project-modal');
        if (!modal) return;

        lastFocusedCard = trigger;

        const headerIcon = modal.querySelector('#project-modal-header use');
        const title = document.getElementById('project-modal-title');
        const body = document.getElementById('project-modal-body');

        if (headerIcon) headerIcon.setAttribute('href', `#i-${project.icon}`);
        title.textContent = project.title;

        const featuresHTML = project.features && project.features.length
            ? `<h4>Highlights</h4><ul class="project-features-list">${project.features
                .map((f) => `<li>${escapeHTML(f)}</li>`).join('')}</ul>`
            : '';

        const impactHTML = project.impact
            ? `<div class="impact-banner">${escapeHTML(project.impact)}</div>`
            : '';

        const archHTML = project.architecture
            ? `<div class="modal-arch"><strong>Architecture:</strong> ${escapeHTML(project.architecture)}</div>`
            : '';

        const badgesHTML = project.badges
            .map((b) => `<span class="badge">${escapeHTML(b)}</span>`).join('');

        const sourceLink = project.github
            ? `<a href="${escapeHTML(project.github)}" class="btn-outline-zak" target="_blank" rel="noopener noreferrer">
                <svg class="icon" aria-hidden="true" focusable="false"><use href="#i-github"></use></svg> Source</a>`
            : '';

        const demoLink = project.demo
            ? `<a href="${escapeHTML(project.demo)}" class="btn-primary-zak" target="_blank" rel="noopener noreferrer">
                <svg class="icon" aria-hidden="true" focusable="false"><use href="#i-external"></use></svg> Open demo</a>`
            : '';

        body.innerHTML = `
            <p>${escapeHTML(project.description)}</p>
            ${impactHTML}
            ${archHTML}
            ${featuresHTML}
            <div class="badges">${badgesHTML}</div>
            <div class="modal-actions">
                ${demoLink}
                ${sourceLink}
            </div>
        `;

        modal.hidden = false;
        document.body.classList.add('modal-open');
        document.querySelector('.modal-close').focus();
    }

    function closeModal() {
        const modal = document.getElementById('project-modal');
        if (!modal || modal.hidden) return;

        modal.hidden = true;
        document.body.classList.remove('modal-open');
        if (lastFocusedCard) lastFocusedCard.focus();
    }

    /* ── 8. Contact Form (Formspree) ──────────────────────────────────── */

    function initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        const feedback = document.getElementById('formFeedback');
        const submitBtn = document.getElementById('submitBtn');
        const label = submitBtn ? submitBtn.querySelector('.submit-label') : null;
        const contactAlt = document.getElementById('contact-alt');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Honeypot — silently ignore bots that filled it.
            const honey = form.querySelector('input[name="_gotcha"]');
            if (honey && honey.value) return;

            const name = form.name.value.trim();
            const email = form.email.value.trim();
            const message = form.message.value.trim();

            let isValid = validateInput(form.name, name, 'Name is required');
            isValid = validateInput(form.email, email, 'A valid email is required', /^[^\s@]+@[^\s@]+\.[^\s@]+$/) && isValid;
            isValid = validateInput(form.message, message, 'Message is required') && isValid;

            if (!isValid) return;

            setFeedback('', '');
            disableSubmit(true);
            if (label) label.textContent = 'Sending...';

            const action = form.getAttribute('action') || '';
            try {
                const response = await fetch(action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: { Accept: 'application/json' }
                });

                if (response.ok) {
                    setFeedback('Message sent — I will get back to you soon. Thank you!', 'success');
                    form.reset();
                } else {
                    throw new Error('Request failed');
                }
            } catch (err) {
                setFeedback('Something went wrong. Please email me directly and I will get back to you.', 'error');
            }

            disableSubmit(false);
            if (label) label.textContent = 'Send Message';

            if (contactAlt) contactAlt.style.display = 'block';
        });
    }

    function validateInput(input, value, message, pattern) {
        const group = input.parentElement;
        const error = group ? group.querySelector('.error-message') : null;
        const passes = value !== '' && (!pattern || pattern.test(value));

        input.classList.toggle('error', !passes);
        if (error) {
            error.textContent = passes ? '' : message;
            error.classList.toggle('show', !passes);
        }
        return passes;
    }

    function setFeedback(message, type) {
        const feedback = document.getElementById('formFeedback');
        if (!feedback) return;
        feedback.textContent = message;
        feedback.className = type ? `form-feedback ${type} show` : 'form-feedback';
    }

    function disableSubmit(disabled) {
        const submitBtn = document.getElementById('submitBtn');
        if (submitBtn) submitBtn.disabled = disabled;
    }

    /* ── 9. Typewriter Effect ─────────────────────────────────────────── */

    function initTypewriter() {
        const element = document.getElementById('typing-text');
        if (!element) return;

        if (reducedMotion) {
            element.textContent = 'software that ships';
            return;
        }

        const words = [
            'full-stack web applications',
            'secure REST APIs',
            'robust backend systems',
            'intelligent AI features'
        ];

        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function type() {
            const currentWord = words[wordIndex];

            if (isDeleting) {
                charIndex--;
                typeSpeed = 50;
            } else {
                charIndex++;
                typeSpeed = 100;
            }

            element.textContent = currentWord.substring(0, charIndex);

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typeSpeed = 2000;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }

        type();
    }

    /* ── 10. Back to Top ──────────────────────────────────────────────── */

    function initBackToTop() {
        const btn = document.getElementById('backToTop');
        if (!btn) return;

        window.addEventListener('scroll', () => {
            btn.classList.toggle('show', window.scrollY > 500);
        }, { passive: true });

        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
        });
    }
})();