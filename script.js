/* Anass Zaari — portfolio
   Vanilla JS, no dependencies. Sections: theme, header/nav, reveal + counters,
   projects (filters, cards, modal), featured gallery, contact form, misc. */
(() => {
    'use strict';

    const $ = (sel, root = document) => root.querySelector(sel);
    const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const store = {
        get(k) { try { return localStorage.getItem(k); } catch { return null; } },
        set(k, v) { try { localStorage.setItem(k, v); } catch { /* private mode */ } }
    };

    const escapeHTML = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

    /* ---------- Theme ---------- */
    function initTheme() {
        const btn = $('#theme-toggle');
        const saved = store.get('theme');
        const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
        apply(saved || (prefersLight ? 'light' : 'dark'));

        btn?.addEventListener('click', () => {
            const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
            apply(next); store.set('theme', next);
        });

        function apply(theme) {
            document.documentElement.dataset.theme = theme;
            if (btn) {
                const light = theme === 'light';
                btn.setAttribute('aria-pressed', String(light));
                btn.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
            }
        }
    }

    /* ---------- Header: scrolled state, progress bar, mobile menu, active link ---------- */
    function initHeader() {
        const header = $('.site-header');
        const progress = $('.scroll-progress');
        const menuBtn = $('#menu-toggle');
        const links = $('#nav-links');

        const onScroll = () => {
            const y = window.scrollY;
            header.classList.toggle('is-scrolled', y > 8);
            if (progress) {
                const max = document.documentElement.scrollHeight - window.innerHeight;
                progress.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
            }
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });

        const setMenu = (open) => {
            document.body.classList.toggle('menu-open', open);
            menuBtn.setAttribute('aria-expanded', String(open));
            menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        };
        menuBtn?.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
        links?.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && document.body.classList.contains('menu-open')) setMenu(false); });
        window.matchMedia('(min-width: 900px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });

        // Active section highlighting
        const navAnchors = $$('#nav-links a');
        const sections = navAnchors.map((a) => $(a.getAttribute('href'))).filter(Boolean);
        if ('IntersectionObserver' in window && sections.length) {
            const io = new IntersectionObserver((entries) => {
                entries.forEach((en) => {
                    if (!en.isIntersecting) return;
                    navAnchors.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === `#${en.target.id}`));
                });
            }, { rootMargin: '-45% 0px -50% 0px' });
            sections.forEach((s) => io.observe(s));
        }
    }

    /* ---------- Reveal on scroll + counters ---------- */
    function initReveal() {
        const items = $$('.reveal');
        const counters = $$('[data-count]');

        const runCounter = (el) => {
            const target = Number(el.dataset.count) || 0;
            if (reducedMotion) { el.textContent = target; return; }
            const start = performance.now(); const dur = 900;
            const tick = (t) => {
                const p = Math.min((t - start) / dur, 1);
                el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
                if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        };

        if (reducedMotion || !('IntersectionObserver' in window)) {
            items.forEach((el) => el.classList.add('is-visible'));
            counters.forEach(runCounter);
            return;
        }
        const io = new IntersectionObserver((entries, obs) => {
            entries.forEach((en) => {
                if (!en.isIntersecting) return;
                en.target.classList.add('is-visible');
                $$('[data-count]', en.target).forEach((c) => { if (!c.dataset.done) { c.dataset.done = '1'; runCounter(c); } });
                obs.unobserve(en.target);
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
        items.forEach((el) => io.observe(el));
        // Fail-safe: never leave content hidden (e.g. print, unusual viewports, observer issues)
        setTimeout(() => items.forEach((el) => el.classList.add('is-visible')), 2500);
    }

    /* ---------- Projects: filters, cards, modal ---------- */
    const PROJECTS = typeof projectsData !== 'undefined' ? projectsData : [];
    const CATEGORIES = typeof projectCategories !== 'undefined' ? projectCategories : [{ id: 'all', label: 'All' }];
    const byId = (id) => PROJECTS.find((p) => p.id === id);

    function coverHTML(p, lazy = true) {
        if (p.image) {
            return `<img class="card-img" src="${escapeHTML(p.image)}" alt="${escapeHTML(p.title)} — screenshot" width="1200" height="675" ${lazy ? 'loading="lazy"' : ''} decoding="async" onerror="this.closest('.card-cover').classList.add('no-image'); this.remove();">`;
        }
        return '';
    }

    function cardHTML(p, index) {
        const links = [];
        if (p.demo) links.push(`<a class="card-link" href="${escapeHTML(p.demo)}" target="_blank" rel="noopener noreferrer"><svg class="icon" aria-hidden="true"><use href="#i-external"></use></svg>Live demo</a>`);
        if (p.github) links.push(`<a class="card-link" href="${escapeHTML(p.github)}" target="_blank" rel="noopener noreferrer"><svg class="icon" aria-hidden="true"><use href="#i-github"></use></svg>Source</a>`);
        links.push(`<button class="card-link" type="button" data-open-project="${escapeHTML(p.id)}"><svg class="icon" aria-hidden="true"><use href="#i-plus-circle"></use></svg>Details</button>`);

        return `
        <article class="project-card reveal is-visible" data-category="${escapeHTML(p.category)}" style="--i:${index}">
            <div class="card-cover ${p.image ? '' : 'no-image'}" data-cover="${escapeHTML(p.id)}">
                ${coverHTML(p)}
                <div class="cover-fallback" aria-hidden="true">
                    <svg class="icon icon-xl"><use href="#${escapeHTML(p.icon || 'i-code')}"></use></svg>
                    <span>${escapeHTML(p.title.split(' — ')[0])}</span>
                </div>
                <span class="card-year">${escapeHTML(p.year)}</span>
            </div>
            <div class="card-body">
                <h3 class="card-title">${escapeHTML(p.title)}</h3>
                <p class="card-tagline">${escapeHTML(p.tagline)}</p>
                <ul class="chips chips-sm" aria-label="Stack">${p.stack.slice(0, 4).map((s) => `<li>${escapeHTML(s)}</li>`).join('')}</ul>
                <div class="card-links">${links.join('')}</div>
            </div>
        </article>`;
    }

    function initProjects() {
        const grid = $('#project-grid');
        const filters = $('#project-filters');
        if (!grid) return;
        const list = PROJECTS.filter((p) => !p.featured);

        // Filters (only categories that exist)
        const present = new Set(list.map((p) => p.category));
        filters.innerHTML = CATEGORIES.filter((c) => c.id === 'all' || present.has(c.id))
            .map((c, i) => `<button type="button" class="filter${i === 0 ? ' is-active' : ''}" data-filter="${c.id}" aria-pressed="${i === 0}">${escapeHTML(c.label)}</button>`).join('');

        const render = (cat) => {
            const shown = cat === 'all' ? list : list.filter((p) => p.category === cat);
            grid.innerHTML = shown.map(cardHTML).join('') || '<p class="muted">No project in this category yet.</p>';
        };
        render('all');

        filters.addEventListener('click', (e) => {
            const b = e.target.closest('[data-filter]'); if (!b) return;
            $$('.filter', filters).forEach((f) => { f.classList.toggle('is-active', f === b); f.setAttribute('aria-pressed', String(f === b)); });
            render(b.dataset.filter);
        });

        // Featured demo link (hidden until a URL is set)
        const demo = $('#binga-demo'); const binga = byId('binga');
        if (demo && binga?.demo) { demo.href = binga.demo; demo.hidden = false; }
    }

    function initModal() {
        const modal = $('#project-modal'); if (!modal) return;
        const dialog = $('.modal-dialog', modal);
        let lastFocus = null;

        const open = (p, trigger) => {
            lastFocus = trigger || document.activeElement;
            $('.modal-kicker', modal).textContent = `${p.year} · ${CATEGORIES.find((c) => c.id === p.category)?.label || ''}`;
            $('#modal-title').textContent = p.title;
            $('.modal-role', modal).textContent = p.role || p.tagline;
            $('.modal-desc', modal).textContent = p.description;
            $('.modal-highlights', modal).innerHTML = (p.highlights || []).map((h) => `<li>${escapeHTML(h)}</li>`).join('');
            $('.modal-stack', modal).innerHTML = p.stack.map((s) => `<li>${escapeHTML(s)}</li>`).join('');
            $('.modal-media', modal).innerHTML = p.image
                ? `<img src="${escapeHTML(p.image)}" alt="${escapeHTML(p.title)} — screenshot" width="1200" height="675" decoding="async">`
                : `<div class="cover-fallback modal-fallback" aria-hidden="true"><svg class="icon icon-xl"><use href="#${escapeHTML(p.icon || 'i-code')}"></use></svg></div>`;
            const actions = [];
            if (p.demo) actions.push(`<a class="btn btn-primary" href="${escapeHTML(p.demo)}" target="_blank" rel="noopener noreferrer"><svg class="icon" aria-hidden="true"><use href="#i-external"></use></svg><span>Live demo</span></a>`);
            if (p.github) actions.push(`<a class="btn btn-ghost" href="${escapeHTML(p.github)}" target="_blank" rel="noopener noreferrer"><svg class="icon" aria-hidden="true"><use href="#i-github"></use></svg><span>View source</span></a>`);
            if (!p.github) actions.push('<span class="note">Source code is private (company project).</span>');
            $('.modal-actions', modal).innerHTML = actions.join('');

            modal.hidden = false;
            document.body.classList.add('modal-open');
            requestAnimationFrame(() => dialog.focus());
        };
        const close = () => {
            modal.hidden = true;
            document.body.classList.remove('modal-open');
            lastFocus?.focus?.();
        };

        document.addEventListener('click', (e) => {
            const t = e.target.closest('[data-open-project]');
            if (t) { const p = byId(t.dataset.openProject); if (p) open(p, t); return; }
            if (e.target.closest('[data-close]')) close();
        });
        document.addEventListener('keydown', (e) => {
            if (modal.hidden) return;
            if (e.key === 'Escape') { close(); return; }
            if (e.key === 'Tab') { // focus trap
                const f = $$('a[href], button:not([disabled]), [tabindex="0"]', dialog);
                if (!f.length) return;
                const first = f[0], last = f[f.length - 1];
                if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
                else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
            }
        });
    }

    /* ---------- Featured gallery ---------- */
    function initGallery() {
        const g = $('#binga-gallery'); if (!g) return;
        const main = $('#gallery-main', g);
        const tabs = $$('[role="tab"]', g);
        const select = (tab) => {
            tabs.forEach((t) => t.setAttribute('aria-selected', String(t === tab)));
            main.src = tab.dataset.src; main.alt = tab.dataset.alt || '';
        };
        tabs.forEach((t) => t.addEventListener('click', () => select(t)));
        g.addEventListener('keydown', (e) => {
            if (!['ArrowLeft', 'ArrowRight'].includes(e.key)) return;
            const i = tabs.findIndex((t) => t.getAttribute('aria-selected') === 'true');
            const n = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
            select(n); n.focus(); e.preventDefault();
        });
    }

    /* ---------- Contact form (Formspree) ---------- */
    function initContactForm() {
        const form = $('#contact-form'); if (!form) return;
        const feedback = $('#form-feedback');
        const btn = $('#submit-btn');
        const configured = !/TODO_FORM_ID/.test(form.action);

        const setError = (input, msg) => {
            const field = input.closest('.field');
            field.classList.toggle('has-error', !!msg);
            $('.field-error', field).textContent = msg || '';
            input.setAttribute('aria-invalid', msg ? 'true' : 'false');
        };
        const validate = () => {
            let ok = true;
            const name = $('#f-name'), email = $('#f-email'), msg = $('#f-message');
            if (name.value.trim().length < 2) { setError(name, 'Please enter your name.'); ok = false; } else setError(name, '');
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) { setError(email, 'Please enter a valid email address.'); ok = false; } else setError(email, '');
            if (msg.value.trim().length < 10) { setError(msg, 'Tell me a little more (10 characters minimum).'); ok = false; } else setError(msg, '');
            return ok;
        };
        const say = (text, type) => { feedback.textContent = text; feedback.dataset.type = type; };

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (!validate()) return;
            if (!configured) {
                const subject = encodeURIComponent('Message from your portfolio');
                const body = encodeURIComponent(`${$('#f-message').value}\n\n— ${$('#f-name').value} (${$('#f-email').value})`);
                window.location.href = `mailto:zaaria46@gmail.com?subject=${subject}&body=${body}`;
                say('Opening your email client…', 'ok');
                return;
            }
            btn.disabled = true; $('span', btn).textContent = 'Sending…';
            try {
                const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
                if (!res.ok) throw new Error(String(res.status));
                form.reset(); say('Thanks! Your message has been sent — I will reply soon.', 'ok');
            } catch {
                say('Something went wrong. Please email me directly at zaaria46@gmail.com.', 'error');
            } finally {
                btn.disabled = false; $('span', btn).textContent = 'Send message';
            }
        });
        $$('input, textarea', form).forEach((el) => el.addEventListener('input', () => { if (el.closest('.field')?.classList.contains('has-error')) validate(); }));
    }

    /* ---------- Misc ---------- */
    function initMisc() {
        const top = $('#back-to-top');
        const toggle = () => top?.classList.toggle('is-visible', window.scrollY > 600);
        toggle(); window.addEventListener('scroll', toggle, { passive: true });
        top?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' }));
        const y = $('#year'); if (y) y.textContent = String(new Date().getFullYear());
    }

    initTheme();
    initHeader();
    initProjects();
    initModal();
    initGallery();
    initReveal();
    initContactForm();
    initMisc();
})();
