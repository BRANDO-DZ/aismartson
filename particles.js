document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. NEURAL NETWORK PARTICLES
       ========================================= */
    const canvas = document.createElement('canvas');
    canvas.id = 'neural-canvas';

    // Insert canvas as the first child of the hero section or body
    const heroSection = document.querySelector('header');
    if (heroSection) {
        heroSection.insertBefore(canvas, heroSection.firstChild);
        heroSection.style.position = 'relative'; // Ensure hero is positioned for absolute canvas
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '0'; // Behind content
        canvas.style.pointerEvents = 'none';
    }

    const ctx = canvas.getContext('2d');

    let width, height;
    let particles = [];

    // Configuration
    const particleCount = 60;
    const connectionDistance = 150;
    const particleSpeed = 0.5;

    function resize() {
        width = canvas.width = heroSection ? heroSection.offsetWidth : window.innerWidth;
        height = canvas.height = heroSection ? heroSection.offsetHeight : window.innerHeight;
    }

    window.addEventListener('resize', () => {
        resize();
        initParticles();
    });
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * particleSpeed;
            this.vy = (Math.random() - 0.5) * particleSpeed;
            this.size = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw() {
            ctx.fillStyle = 'rgba(14, 165, 233, 0.5)'; // Accent Blue
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            // Connect particles
            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(14, 165, 233, ${0.15 - distance / connectionDistance * 0.15})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();


    /* =========================================
       2. TYPING EFFECT
       ========================================= */
    const typeTarget = document.querySelector('.typing-effect');
    if (typeTarget) {
        const textToType = typeTarget.getAttribute('data-text') || typeTarget.innerText;
        typeTarget.innerText = ''; // Clear initial text
        typeTarget.style.display = 'inline-block'; // Maintain layout

        let charIndex = 0;
        const typingSpeed = 50; // ms per char

        function type() {
            if (charIndex < textToType.length) {
                typeTarget.innerText += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(type, typingSpeed);
            } else {
                // Add blinking cursor at the end
                typeTarget.style.borderRight = '2px solid var(--accent-blue)';
                setInterval(() => {
                    typeTarget.style.borderColor =
                        typeTarget.style.borderColor === 'transparent' ? 'var(--accent-blue)' : 'transparent';
                }, 500);
            }
        }

        // Start typing after a short delay
        setTimeout(type, 500);
    }
});
