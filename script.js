document.addEventListener('DOMContentLoaded', () => {

    // Scroll-triggered fade-in animations
    const fadeElements = document.querySelectorAll('.fade-in');

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || index * 80;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, Math.min(delay, 400));
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    fadeElements.forEach(el => fadeObserver.observe(el));

    // Mobile hamburger nav
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('open');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });
    }

    // Navbar background on scroll
    const nav = document.getElementById('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 100) {
            nav.style.background = 'rgba(11, 15, 26, 0.95)';
        } else {
            nav.style.background = 'rgba(11, 15, 26, 0.8)';
        }

        lastScroll = currentScroll;
    }, { passive: true });

    // Active nav link highlighting
    const sections = document.querySelectorAll('.section, .hero');
    const navAnchors = document.querySelectorAll('.nav-links a');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navAnchors.forEach(a => {
                    a.style.color = '';
                    if (a.getAttribute('href') === `#${id}`) {
                        a.style.color = '#ffffff';
                    }
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-70px 0px 0px 0px'
    });

    sections.forEach(section => sectionObserver.observe(section));

});
