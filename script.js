// Global Variables
let currentDay = 1;
let isScrolling = false;
let scrollTimeout;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Main initialization function
function initializeApp() {
    // Initialize all components
    initializeLoadingScreen();
    initializeNavigation();
    initializeParticles();
    initializeCounters();
    initializeProgramTabs();
    initializeContactForm();
    initializeModal();
    initializeScrollEffects();
    initializeParallax();
    initializeTypingEffect();
    initializeInteractiveElements();
}

// Loading Screen
function initializeLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Simulate loading time
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
}

// Navigation
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = 120; // Increased height to account for navbar + extra space
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Particle System
function initializeParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random properties
    const size = Math.random() * 4 + 2;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;

    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 50%;
        left: ${x}%;
        top: ${y}%;
        animation: float ${duration}s linear infinite;
        animation-delay: ${delay}s;
    `;

    container.appendChild(particle);
}

// Add floating animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(0px) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Counter Animation
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    };

    // Intersection Observer for counters
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Program Tabs
function initializeProgramTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const timelineDays = document.querySelectorAll('.timeline-day');

    // Program data for different days
    const programData = {
        1: [
            { time: '09:00', title: 'Opening Ceremony', description: 'Welcome address by Prof. Isaiah I.C. Wakindiki (VC)', location: 'Main Hall', speaker: 'Prof. Isaiah I.C. Wakindiki' },
            { time: '10:30', title: 'Keynote Address', description: 'Strategic vision by Prof. Vincent Onywera (DVC, Research & Innovation)', location: 'Auditorium', speaker: 'Prof. Vincent Onywera' },
            { time: '14:00', title: 'Innovation Exhibition', description: 'Showcase of student projects and research', location: 'Exhibition Hall', speaker: 'All Participants' }
        ],
        2: [
            { time: '09:00', title: 'Special Innovation Tracks', description: 'Women in Innovation, Green Tech, EduTech', location: 'Workshop Rooms', speaker: 'Track Leaders' },
            { time: '11:00', title: 'Panel Discussions', description: 'Industry-academia collaboration sessions', location: 'Conference Hall', speaker: 'Industry Leaders' },
            { time: '15:00', title: 'Startup/IP Clinics', description: 'Intellectual property and commercialization workshops', location: 'Auditorium', speaker: 'IP Experts' }
        ],
        3: [
            { time: '09:00', title: 'Sustainability Innovation Challenge', description: 'Green technology and sustainability solutions', location: 'Tech Lab', speaker: 'Sustainability Experts' },
            { time: '13:00', title: 'Investor Matchmaking', description: 'Connect innovators with potential investors', location: 'Dining Hall', speaker: 'Investors & Startups' },
            { time: '16:00', title: 'Closing Ceremony', description: 'Awards and recognition of outstanding innovations', location: 'Main Hall', speaker: 'Event Organizers' }
        ]
    };

    function updateTimeline(day) {
        const currentTimeline = document.querySelector(`.timeline-day[data-day="${day}"]`);
        if (!currentTimeline) return;

        const dayData = programData[day];
        if (!dayData) return;

        currentTimeline.innerHTML = dayData.map(item => `
            <div class="timeline-item" data-aos="fade-up">
                <div class="timeline-time">${item.time}</div>
                <div class="timeline-content">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <div class="timeline-meta">
                        <span><i class="fas fa-map-marker-alt"></i> ${item.location}</span>
                        <span><i class="fas fa-user"></i> ${item.speaker}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const day = button.getAttribute('data-day');
            
            // Update active states
            tabButtons.forEach(btn => btn.classList.remove('active'));
            timelineDays.forEach(day => day.classList.remove('active'));
            
            button.classList.add('active');
            document.querySelector(`.timeline-day[data-day="${day}"]`).classList.add('active');
            
            // Update timeline content
            updateTimeline(day);
            
            // Refresh animations for new content
            console.log('Content updated successfully');
        });
    });

    // Initialize first day
    updateTimeline(1);
}

// Contact Form
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        showLoadingState(contactForm);
        
        setTimeout(() => {
            hideLoadingState(contactForm);
            showModal('Registration Successful!', 'Thank you for your interest in KCA Innovation Week 2025. We\'ll be in touch soon with more details.');
            contactForm.reset();
        }, 2000);
    });
}

function showLoadingState(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
}

function hideLoadingState(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    submitBtn.disabled = false;
}

// Modal System
function initializeModal() {
    const modal = document.getElementById('modal');
    const closeBtn = modal.querySelector('.close');
    
    closeBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
}

function showModal(title, message) {
    const modal = document.getElementById('modal');
    const modalTitle = modal.querySelector('h2');
    const modalMessage = modal.querySelector('p');
    
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modal.style.display = 'block';
    
    // Add fade-in effect
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Scroll Effects
function initializeScrollEffects() {
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            isScrolling = true;
            requestAnimationFrame(() => {
                handleScroll();
                isScrolling = false;
            });
        }
    });
}

function handleScroll() {
    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = scrollTop * 0.5;
        hero.style.transform = `translateY(${scrolled}px)`;
    }
    
    // Fade in elements on scroll
    const elements = document.querySelectorAll('.highlight-card, .speaker-card, .timeline-item');
    elements.forEach(element => {
        const elementTop = element.offsetTop;
        const elementHeight = element.offsetHeight;
        
        if (scrollTop + windowHeight > elementTop && scrollTop < elementTop + elementHeight) {
            element.classList.add('fade-in');
        }
    });
}

// Parallax Effects
function initializeParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-background, .innovation-wheel');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Typing Effect
function initializeTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing effect after loading screen
    setTimeout(typeWriter, 2500);
}

// Interactive Elements
function initializeInteractiveElements() {
    // Hover effects for cards
    const cards = document.querySelectorAll('.highlight-card, .speaker-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Innovation wheel interaction
    const wheelItems = document.querySelectorAll('.wheel-item');
    wheelItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.animationPlayState = 'paused';
            item.style.transform = 'scale(1.1)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.animationPlayState = 'running';
            item.style.transform = 'scale(1)';
        });
    });
    
    // Smooth reveal for timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.1 });
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = 'all 0.6s ease-out';
        timelineObserver.observe(item);
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Performance optimization
const optimizedScrollHandler = throttle(() => {
    // Handle scroll events efficiently
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Add some fun interactive features
document.addEventListener('DOMContentLoaded', () => {
    // Easter egg: Konami code
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.keyCode);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            // Trigger special effect
            document.body.style.animation = 'rainbow 2s ease-in-out';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 2000);
        }
    });
    
    // Add rainbow animation
    const rainbowStyle = document.createElement('style');
    rainbowStyle.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(rainbowStyle);
});

// Export functions for global access
window.showModal = showModal;
window.closeModal = closeModal;
