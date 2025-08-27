// =============================
// Sticky Header on Scroll
// =============================
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.classList.remove('scrolled');
        header.style.boxShadow = 'none';
    }
});

// =============================
// Expertise Cards Hover Light
// =============================
document.querySelectorAll('.expertise-card').forEach(card => {
    const light = card.querySelector('.card-light-effect');
    const corner = card.querySelector('.corner-light');

    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Circular light follow
        if (light) {
            light.style.left = `${x}px`;
            light.style.top = `${y}px`;
            light.style.opacity = '1';
        }

        // Corner light intensity
        if (corner) {
            const distanceToCorner = Math.sqrt(
                Math.pow(x - rect.width, 2) + Math.pow(y, 2)
            );
            const intensity = 1 - Math.min(distanceToCorner / rect.width, 1);
            corner.style.opacity = intensity * 0.8;
        }
    });

    card.addEventListener('mouseleave', () => {
        if (light) light.style.opacity = '0';
        if (corner) corner.style.opacity = '0';
    });
});

// =============================
// Mobile Navigation Toggle
// =============================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// =============================
// Smooth Scrolling for Anchor Links
// =============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        const targetId = anchor.getAttribute('href');
        if (targetId && targetId !== '#') {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// =============================
// Contact Form Submission
// =============================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', e => {
        e.preventDefault();

        const name = document.getElementById('name')?.value;
        const email = document.getElementById('email')?.value;
        const subject = document.getElementById('subject')?.value;
        const message = document.getElementById('message')?.value;

        console.log({ name, email, subject, message });

        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}


const counters = document.querySelectorAll('.stat-number');

counters.forEach(counter => {
    counter.innerText = '0';
    const updateCounter = () => {
        const target = +counter.getAttribute('data-target');
        const current = +counter.innerText;
        const increment = target / 100; // speed adjust karne ke liye

        if (current < target) {
            counter.innerText = Math.ceil(current + increment);
            setTimeout(updateCounter, 20); // delay adjust kare
        } else {
            counter.innerText = target + (target > 10 ? '+' : ''); // + sign add for large numbers
        }
    };

    // Trigger animation when element is in viewport
    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            updateCounter();
            observer.unobserve(counter);
        }
    }, { threshold: 1 });

    observer.observe(counter);
});
