document.addEventListener('DOMContentLoaded', () => {
    // Scroll reveal animation using IntersectionObserver
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once it's visible
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // Active state for navigation links based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });

        // Glass nav background adjustment on scroll
        const nav = document.querySelector('.glass-nav');
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(15, 17, 26, 0.8)';
            nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        } else {
            nav.style.background = 'rgba(15, 17, 26, 0.6)';
            nav.style.boxShadow = 'none';
        }
    });

    // Replace image placeholders with dynamically generated SVGs to make it look nicer locally
    // If you actually place files in Amos-Assets folder, comment out this section!
    const placeholderImages = document.querySelectorAll('.placeholder-img');
    placeholderImages.forEach(img => {
        const text = img.alt || "Placeholder";
        const width = 800;
        const height = 600;
        // Simple SVG data URI
        const svg = `
            <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
                <rect width="${width}" height="${height}" fill="#1e293b"/>
                <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="#94a3b8">${text}</text>
            </svg>
        `.trim().replace(/\n/g, '').replace(/\s+/g, ' ');
        
        // Try to load the image, if it fails, show the nice SVG placeholder
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml;base64,' + btoa(svg);
        });
    });
});
