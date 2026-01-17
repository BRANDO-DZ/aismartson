document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Hamburger animation
            const bars = document.querySelectorAll('.bar');
            if (navLinks.classList.contains('active')) {
                bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    }

    // 2. Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach(el => observer.observe(el));

    // 3. Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            const feedback = document.getElementById('formFeedback');
            
            let isValid = true;
            
            // Simple validation
            if (!name.value.trim()) {
                isValid = false;
                name.style.borderColor = 'red';
            } else {
                name.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }

            if (!email.value.trim() || !validateEmail(email.value)) {
                isValid = false;
                email.style.borderColor = 'red';
            } else {
                email.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }

            if (!message.value.trim()) {
                isValid = false;
                message.style.borderColor = 'red';
            } else {
                message.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }

            if (isValid) {
                // Determine if we should show a success message
                feedback.textContent = 'Message sent successfully! We will get back to you shortly.';
                feedback.style.color = 'var(--accent-blue)';
                feedback.style.marginTop = '1rem';
                contactForm.reset();
            } else {
                feedback.textContent = 'Please fill in all required fields correctly.';
                feedback.style.color = 'red';
                feedback.style.marginTop = '1rem';
            }
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});
