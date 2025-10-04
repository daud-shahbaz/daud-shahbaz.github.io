// Typing animation
const roleEl = document.querySelector('.role');
const roles = ['Student', 'AI Researcher', 'Designer', 'Data Analyst'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeRole() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        roleEl.innerHTML = currentRole.substring(0, charIndex - 1) + '<span class="cursor">|</span>';
        charIndex--;
        
        if (charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(typeRole, 500);
        } else {
            setTimeout(typeRole, 50);
        }
    } else {
        roleEl.innerHTML = currentRole.substring(0, charIndex + 1) + '<span class="cursor">|</span>';
        charIndex++;
        
        if (charIndex === currentRole.length) {
            isDeleting = true;
            setTimeout(typeRole, 2000);
        } else {
            setTimeout(typeRole, 100);
        }
    }
}

typeRole();

// Theme toggle
const themeBtn = document.querySelector('.theme-btn');
const html = document.documentElement;
const body = document.body;

const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
    body.classList.add('light');
    themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
}

themeBtn.addEventListener('click', () => {
    body.classList.toggle('light');
    const theme = body.classList.contains('light') ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
    themeBtn.innerHTML = theme === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
});

// Mobile menu
const mobileBtn = document.querySelector('.mobile-btn');
const navMenu = document.querySelector('.nav-menu');

mobileBtn.addEventListener('click', () => {
    mobileBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu on link click
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileBtn.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll and active nav
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
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

// Skill progress animation
const skillCards = document.querySelectorAll('.skill-card');

const animateSkills = () => {
    skillCards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            const fill = card.querySelector('.fill');
            if (fill && !fill.style.width) {
                const progress = fill.getAttribute('data-progress');
                setTimeout(() => {
                    fill.style.width = progress;
                }, index * 100);
            }
        }
    });
};

window.addEventListener('scroll', animateSkills);
animateSkills();

// Particle background
const canvas = document.createElement('canvas');
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.zIndex = '-2';
canvas.style.pointerEvents = 'none';
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 50;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(14, 165, 233, 0.3)';
        ctx.fill();
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
}

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    // Draw lines between nearby particles
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(14, 165, 233, ${0.2 * (1 - distance / 150)})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }
    
    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Form handling
const form = document.querySelector('.form');
const msg = document.querySelector('.msg');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const message = form.querySelector('textarea').value;
    
    if (name && email && message) {
        msg.classList.add('success');
        msg.textContent = '✓ Message sent! I\'ll get back to you soon.';
        form.reset();
        
        setTimeout(() => {
            msg.classList.remove('success');
        }, 5000);
    }
});

// Scroll reveal animation
const reveal = (selector, delay = 0) => {
    const elements = document.querySelectorAll(selector);
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * delay);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
};

reveal('.skill-card', 100);
reveal('.project', 100);
reveal('.method', 100);

// Nav scroll effect
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
    } else {
        nav.style.boxShadow = 'none';
    }
});

// Floating cards random animation timing
document.querySelectorAll('.floating-card').forEach((card, i) => {
    card.style.animationDelay = `${-i * 1}s`;
    card.style.animationDuration = `${3 + Math.random() * 2}s`;
});

// Console easter egg
console.log('%cHey there! 👋', 'color: #0ea5e9; font-size: 24px; font-weight: bold;');
console.log('%cLooking for something? Feel free to reach out!', 'color: #94a3b8; font-size: 14px;');
console.log('%cEmail: daudshahbaz.contact@gmail.com', 'color: #06b6d4; font-size: 12px;');
