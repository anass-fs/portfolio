/**
 * ANASS.FS Portfolio Script
 * Pure JavaScript, no dependencies for maximum performance.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Custom Cursor Logic
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    // Hide cursor elements on mobile only
    const isMobile = window.innerWidth < 992 || ('ontouchstart' in window && window.innerWidth < 992);
    if (isMobile) {
        if (cursor) cursor.style.display = 'none';
        if (follower) follower.style.display = 'none';
    }
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    if (cursor && follower && window.innerWidth >= 992) {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Immediate cursor movement
            cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        });

        // Smooth follower movement using requestAnimationFrame
        const moveFollower = () => {
            // Lerp (Linear Interpolation) for smoothness
            followerX += (mouseX - followerX) * 0.15;
            followerY += (mouseY - followerY) * 0.15;
            
            follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
            requestAnimationFrame(moveFollower);
        };
        moveFollower();

        const hoverables = document.querySelectorAll('a, button, input, textarea, .project-card, .tech-item');
        hoverables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                follower.classList.add('cursor-grow');
                cursor.style.opacity = '0.3';
            });
            el.addEventListener('mouseleave', () => {
                follower.classList.remove('cursor-grow');
                cursor.style.opacity = '1';
            });
        });
    }

    // 2. Scroll Reveal Logic (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal-element');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: stop observing once visible
                // revealOnScroll.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // 3. Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const isLightMode = document.body.classList.contains('light-mode');
        
        if (window.scrollY > 50) {
            navbar.style.padding = '0.8rem 0';
            if (isLightMode) {
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            } else {
                navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
            }
        } else {
            navbar.style.padding = '1.25rem 0';
            navbar.style.backgroundColor = '';
        }

        // Active nav link highlighting
        const scrollPos = window.scrollY + navbar.offsetHeight + 100;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${id}"]`);
            
            if (navLink) {
                if (scrollPos >= top && scrollPos < top + height) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    });

    // 4. Smooth scroll for navigation links (Manual handling for offset)
    const navLinks = document.querySelectorAll('.nav-link, .navbar-brand');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const navHeight = navbar.offsetHeight;
                    const targetPosition = targetElement.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 5. Contact Form Submission (with Formspree)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const inputs = contactForm.querySelectorAll('input, textarea');
            let isValid = true;

            inputs.forEach(input => {
                const errorSpan = input.nextElementSibling;
                if (!input.value.trim()) {
                    input.classList.add('error');
                    if (errorSpan && errorSpan.classList.contains('error-message')) {
                        errorSpan.textContent = `${input.getAttribute('aria-label')} is required`;
                        errorSpan.classList.add('show');
                    }
                    isValid = false;
                } else if (input.type === 'email' && !isValidEmail(input.value)) {
                    input.classList.add('error');
                    if (errorSpan && errorSpan.classList.contains('error-message')) {
                        errorSpan.textContent = 'Please enter a valid email';
                        errorSpan.classList.add('show');
                    }
                    isValid = false;
                } else {
                    input.classList.remove('error');
                    if (errorSpan && errorSpan.classList.contains('error-message')) {
                        errorSpan.classList.remove('show');
                    }
                }

                // Clear error on input
                input.addEventListener('input', () => {
                    input.classList.remove('error');
                    if (errorSpan && errorSpan.classList.contains('error-message')) {
                        errorSpan.classList.remove('show');
                    }
                });
            });

            if (!isValid) return;

            const btn = contactForm.querySelector('#submitBtn');
            const feedback = document.getElementById('formFeedback');
            const originalText = btn.innerText;
            
            btn.innerText = 'Sending...';
            btn.disabled = true;

            try {
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    feedback.textContent = 'Message sent successfully! I\'ll get back to you soon.';
                    feedback.classList.add('success');
                    feedback.classList.remove('error');
                    contactForm.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                feedback.textContent = 'Something went wrong. Please try again or email me directly.';
                feedback.classList.add('error');
                feedback.classList.remove('success');
            } finally {
                btn.innerText = originalText;
                btn.disabled = false;
                setTimeout(() => {
                    feedback.classList.remove('success', 'error');
                }, 5000);
            }
        });
    }

    // Email validation helper
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // 6. Typewriter Effect with Animation
    const typeTarget = document.getElementById('typing-text');
    const words = ["Engineer", "Developer", "Innovator"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 150;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typeTarget.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 80;
        } else {
            typeTarget.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 150;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
            // Add glow effect when word is complete
            typeTarget.style.animation = 'glow 0.5s ease-out';
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before new word
            typeTarget.style.animation = 'none';
        }

        setTimeout(type, typeSpeed);
    }

    if (typeTarget) {
        setTimeout(type, 1000); // Initial delay
        // Add animation to cursor
        const cursor = document.querySelector('.typing-cursor');
        if (cursor) {
            cursor.style.animation = 'blink 0.8s infinite';
        }
    }

    // 7. Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navLinksList = document.querySelector('.nav-links');
    const menuOverlay = document.getElementById('menu-overlay');
    
    if (menuToggle && navLinksList && menuOverlay) {
        const toggleMenu = () => {
            const isActive = navLinksList.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            menuToggle.setAttribute('aria-expanded', isActive);
            
            const icon = menuToggle.querySelector('i');
            if (isActive) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        };

        menuToggle.addEventListener('click', toggleMenu);
        menuOverlay.addEventListener('click', toggleMenu);

        // Close menu when a link is clicked
        const navLinksItems = document.querySelectorAll('.nav-link');
        navLinksItems.forEach(item => {
            item.addEventListener('click', () => {
                if (navLinksList.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });
    }

    // 7.1 Navbar Hide on Scroll (Mobile optimization)
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        if (window.innerWidth <= 992) {
            const currentScroll = window.pageYOffset;
            if (currentScroll <= 0) {
                navbar.style.transform = 'translateY(0)';
                return;
            }
            
            if (currentScroll > lastScroll && !navLinksList.classList.contains('active')) {
                // Scrolling down - hide navbar
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up - show navbar
                navbar.style.transform = 'translateY(0)';
            }
            lastScroll = currentScroll;
        } else {
            navbar.style.transform = 'translateY(0)';
        }
    });

    // 8. Dynamic Projects Loading (Using projects.js)
    const projectsContainer = document.getElementById('projects-container');
    
    function loadProjects() {
        if (!projectsContainer || typeof projectsData === 'undefined') return;
        
        projectsContainer.innerHTML = ''; // Clear loading message
        
        projectsData.forEach((project, index) => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card reveal-element';
            projectCard.setAttribute('role', 'listitem');
            projectCard.style.transitionDelay = `${index * 0.08}s`;

            const badgesHTML = project.badges.map(badge => `<span class="badge">${badge}</span>`).join('');

            const ribbonHTML = project.isNew ? `<span class="ribbon">New</span>` : '';

            const hasDemo = project.demo && project.demo !== "" && project.demo !== "#";
            const demoBtnHTML = hasDemo
                ? `<a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="action-live" aria-label="Live Demo for ${project.title}"><i class="fas fa-external-link-alt" aria-hidden="true"></i> Live Demo</a>`
                : '';
            const codeBtnHTML = `<a href="${project.github}" target="_blank" rel="noopener noreferrer" class="action-code" aria-label="Source code for ${project.title}"><i class="fab fa-github" aria-hidden="true"></i> Source Code</a>`;

            projectCard.innerHTML = `
                ${ribbonHTML}
                <div class="project-header" style="background: ${project.gradient}">
                    <i class="${project.icon}" aria-hidden="true"></i>
                </div>
                <div class="project-body">
                    <h5>${project.title}</h5>
                    <p>${project.description}</p>
                    <div class="badges">
                        ${badgesHTML}
                    </div>
                    <div class="project-actions">
                        ${codeBtnHTML}
                        ${demoBtnHTML}
                    </div>
                </div>
            `;

            projectsContainer.appendChild(projectCard);

            // Observe new card for reveal animation
            revealOnScroll.observe(projectCard);

            // Mouse-follow radial glow via CSS variables --mx/--my
            projectCard.addEventListener('mousemove', (e) => {
                const rect = projectCard.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                projectCard.style.setProperty('--mx', `${x}%`);
                projectCard.style.setProperty('--my', `${y}%`);
            });

            // Subtle 3D tilt effect (desktop only)
            if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
                projectCard.classList.add('tilt');
                projectCard.addEventListener('mousemove', (e) => {
                    const rect = projectCard.getBoundingClientRect();
                    const px = (e.clientX - rect.left) / rect.width - 0.5;
                    const py = (e.clientY - rect.top) / rect.height - 0.5;
                    projectCard.style.setProperty('--ry', `${px * 6}deg`);
                    projectCard.style.setProperty('--rx', `${-py * 6}deg`);
                });
                projectCard.addEventListener('mouseleave', () => {
                    projectCard.style.setProperty('--ry', `0deg`);
                    projectCard.style.setProperty('--rx', `0deg`);
                });
            }

            // Custom cursor interaction
            if (cursor && follower && window.innerWidth >= 992) {
                projectCard.addEventListener('mouseenter', () => {
                    follower.classList.add('cursor-grow');
                    cursor.style.opacity = '0.3';
                });
                projectCard.addEventListener('mouseleave', () => {
                    follower.classList.remove('cursor-grow');
                    cursor.style.opacity = '1';
                });
            }
        });
    }

    loadProjects();

    // 9. Dark / Light Mode Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    if (themeToggle) {
        // Load saved theme or default to 'dark'
        const savedTheme = localStorage.getItem('theme') || 'dark';
        
        // Apply saved theme on page load
        function applyTheme(theme) {
            if (theme === 'light') {
                document.body.classList.add('light-mode');
                htmlElement.style.colorScheme = 'light';
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                document.body.classList.remove('light-mode');
                htmlElement.style.colorScheme = 'dark';
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        }
        
        // Apply initial theme
        applyTheme(savedTheme);
        
        // Toggle theme on button click
        themeToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const currentTheme = localStorage.getItem('theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            localStorage.setItem('theme', newTheme);
            applyTheme(newTheme);
        });
    }

    // 10. Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    const scrollProgress = document.getElementById('scroll-progress');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }

        // Scroll progress bar
        if (scrollProgress) {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            scrollProgress.style.width = `${scrollPercent}%`;
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 11. Keyboard accessibility for back-to-top
    document.addEventListener('keydown', (e) => {
        if (e.key === 'End' && backToTopBtn.classList.contains('show')) {
            backToTopBtn.focus();
        }
    });

    // 12. Lazy Loading for Images
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }
});
