const roleEl = document.querySelector('#roleText');
const roles = ['Student', 'AI Researcher', 'Data Analyst'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

const logCards = document.querySelectorAll(".log-card");
const modal = document.getElementById("logModal");
const modalTitle = document.getElementById("modalTitle");
const modalDate = document.getElementById("modalDate");
const modalContent = document.getElementById("modalContent");
const modalClose = document.getElementById("modalClose");

logCards.forEach(card => {
  card.style.cursor = "pointer";

  card.addEventListener("click", () => {
    modalTitle.textContent = card.dataset.title;
    modalDate.textContent = card.dataset.date;
    modalContent.textContent = card.dataset.content;

    modal.classList.add("active");
  });
});

modalClose.addEventListener("click", () => {
  modal.classList.remove("active");
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
});

// Optional: ESC key to close
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modal.classList.remove("active");
  }
});


function typeRole() {
    if (!roleEl) return;
    
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        charIndex--;
        roleEl.textContent = currentRole.substring(0, charIndex);
        
        if (charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(typeRole, 500);
            return;
        }
        setTimeout(typeRole, 50);
    } else {
        roleEl.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentRole.length) {
            isDeleting = true;
            setTimeout(typeRole, 2000);
            return;
        }
        setTimeout(typeRole, 100);
    }
}

if (roleEl) typeRole();

const themeBtn = document.querySelector('#themeBtn');
const body = document.body;

const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
    body.classList.add('light');
    if (themeBtn) themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
} else {
    if (themeBtn) themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
}

if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        body.classList.toggle('light');
        const theme = body.classList.contains('light') ? 'light' : 'dark';
        localStorage.setItem('theme', theme);
        themeBtn.innerHTML = theme === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    });
}

const mobileBtn = document.querySelector('.mobile-btn');
const navMenu = document.querySelector('.nav-menu');

mobileBtn.addEventListener('click', () => {
    mobileBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileBtn.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

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

const skillCards = document.querySelectorAll('.skill-card');

const animateSkills = () => {
    skillCards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            const fill = card.querySelector('.fill');
            if (fill && !fill.style.width) {
                const progress = fill.getAttribute('data-progress');
                setTimeout(() => {
                    fill.style.width = progress + '%';
                }, index * 100);
            }
        }
    });
};

window.addEventListener('scroll', animateSkills);
animateSkills();

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

emailjs.init({
    publicKey: "1oVXmtQ3K6k9YeWe3",
});

const form = document.querySelector('#contactForm');
const msg = document.querySelector('#formMsg');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    msg.textContent = 'Sending...';
    msg.classList.remove('success', 'error');
    
    const formData = {
        user_name: form.querySelector('input[name="user_name"]').value,
        user_email: form.querySelector('input[name="user_email"]').value,
        subject: form.querySelector('input[name="subject"]').value,
        message: form.querySelector('textarea[name="message"]').value,
    };
    
    emailjs.send('service_daud', 'template_contact', {
        user_name: formData.user_name,
        user_email: formData.user_email,
        subject: formData.subject,
        message: formData.message,

    })
    .then(() => {
        msg.classList.add('success');
        msg.textContent = 'Message sent! I\'ll get back to you soon.';
        form.reset();
        
        setTimeout(() => {
            msg.classList.remove('success');
            msg.textContent = '';
        }, 5000);
    })
    .catch((error) => {
        msg.classList.add('error');
        msg.textContent = 'Failed to send. Please try emailing directly.';
        console.error('EmailJS error:', error);
    });
});

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

const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
    } else {
        nav.style.boxShadow = 'none';
    }
});

document.querySelectorAll('.floating-card').forEach((card, i) => {
    card.style.animationDelay = `${-i * 1}s`;
    card.style.animationDuration = `${3 + Math.random() * 2}s`;
});

console.log('%cHey there!', 'color: #0ea5e9; font-size: 24px; font-weight: bold;');
console.log('%cLooking for something? Feel free to reach out!', 'color: #94a3b8; font-size: 14px;');
console.log('%cEmail: daudshahbaz.contact@gmail.com', 'color: #06b6d4; font-size: 12px;');
