/**
 * Main JavaScript file for Shobhit Pal Portfolio
 * Contains all interactive functionality
 */

// ===== CUSTOM CURSOR =====
(function initCustomCursor() {
    const cursor1 = document.querySelector('.cursor-1');
    const cursor2 = document.querySelector('.cursor-2');

    if (!cursor1 || !cursor2) return;

    document.addEventListener('mousemove', (e) => {
        cursor1.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        cursor2.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });

    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor1.style.transform = 'scale(2)';
            cursor2.style.transform = 'scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursor1.style.transform = 'scale(1)';
            cursor2.style.transform = 'scale(1)';
        });
    });
})();

// ===== MOBILE MENU =====
(function initMobileMenu() {
    const menuBars = document.getElementById('menu-bars');
    const navbar = document.querySelector('.navbar');

    if (!menuBars || !navbar) return;

    menuBars.addEventListener('click', () => {
        if (navbar.style.display === 'flex') {
            navbar.style.display = 'none';
        } else {
            navbar.style.display = 'flex';
            navbar.style.flexDirection = 'column';
            navbar.style.position = 'fixed';
            navbar.style.top = '8rem';
            navbar.style.right = '2rem';
            navbar.style.background = 'white';
            navbar.style.padding = '2rem';
            navbar.style.borderRadius = '2rem';
            navbar.style.boxShadow = 'var(--shadow)';
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 991 && 
            !navbar.contains(e.target) && 
            !menuBars.contains(e.target)) {
            navbar.style.display = 'none';
        }
    });
})();

// ===== TYPING ANIMATION =====
(function initTypingAnimation() {
    const typedText = document.querySelector('.typed-text');
    if (!typedText) return;

    const words = [
        'AI Engineer', 
        'Generative AI Specialist', 
        'Computer Vision Expert', 
        'Python Developer', 
        'Software Engineer', 
        'Data Scientist'
    ];
    
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typedText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(typeEffect, 500);
        } else {
            setTimeout(typeEffect, isDeleting ? 50 : 100);
        }
    }

    typeEffect();
})();

// ===== SMOOTH SCROLL =====
(function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                
                // Close mobile menu after clicking
                if (window.innerWidth <= 991) {
                    const navbar = document.querySelector('.navbar');
                    if (navbar) {
                        navbar.style.display = 'none';
                    }
                }
            }
        });
    });
})();

// ===== FORM SUBMISSION =====
(function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you within 24 hours.');
        contactForm.reset();
    });
})();

// ===== ACTIVE NAVIGATION ON SCROLL =====
(function initActiveNavigation() {
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.navbar a');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.style.background = 'transparent';
            link.style.color = 'var(--text-primary)';
            if (link.getAttribute('href') === `#${current}`) {
                link.style.background = 'var(--primary)';
                link.style.color = 'white';
            }
        });
    });
})();

// ===== SKILLS ANIMATION ON SCROLL =====
(function initSkillsAnimation() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const barPosition = bar.getBoundingClientRect().top;
            const screenPosition = window.innerHeight;
            
            if (barPosition < screenPosition) {
                bar.style.width = bar.style.width; // Keep existing width
            }
        });
    }

    window.addEventListener('scroll', animateSkillBars);
    animateSkillBars(); // Run on initial load
})();

// ===== LAZY LOAD IMAGES =====
(function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
})();

// ===== SCROLL TO TOP BUTTON =====
(function initScrollToTop() {
    // Create scroll to top button
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-top-btn';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 5rem;
        height: 5rem;
        border-radius: 50%;
        background: var(--primary);
        color: white;
        border: none;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        box-shadow: var(--shadow);
        z-index: 999;
        transition: all 0.3s ease;
    `;

    document.body.appendChild(scrollBtn);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'flex';
        } else {
            scrollBtn.style.display = 'none';
        }
    });

    // Scroll to top on click
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hover effect
    scrollBtn.addEventListener('mouseenter', () => {
        scrollBtn.style.transform = 'translateY(-5px)';
        scrollBtn.style.boxShadow = 'var(--shadow-hover)';
    });

    scrollBtn.addEventListener('mouseleave', () => {
        scrollBtn.style.transform = 'translateY(0)';
        scrollBtn.style.boxShadow = 'var(--shadow)';
    });
})();

// ===== PRELOADER =====
(function initPreloader() {
    // Create preloader element
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--bg-white);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;

    preloader.innerHTML = `
        <div class="loader">
            <div class="loader-circle"></div>
            <div class="loader-text">Loading...</div>
        </div>
    `;

    // Add loader styles
    const style = document.createElement('style');
    style.textContent = `
        .loader {
            position: relative;
            width: 10rem;
            height: 10rem;
        }
        .loader-circle {
            width: 100%;
            height: 100%;
            border: 3px solid var(--border);
            border-top-color: var(--primary);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        .loader-text {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 1.4rem;
            color: var(--primary);
        }
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;

    document.head.appendChild(style);
    document.body.appendChild(preloader);

    // Remove preloader after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 500);
    });
})();

// ===== DARK MODE TOGGLE (Optional) =====
(function initDarkMode() {
    // Create dark mode toggle button
    const darkModeBtn = document.createElement('button');
    darkModeBtn.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeBtn.className = 'dark-mode-btn';
    darkModeBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        left: 2rem;
        width: 5rem;
        height: 5rem;
        border-radius: 50%;
        background: var(--primary);
        color: white;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        box-shadow: var(--shadow);
        z-index: 999;
        transition: all 0.3s ease;
    `;

    document.body.appendChild(darkModeBtn);

    // Check for saved preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Toggle dark mode
    darkModeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark);
        darkModeBtn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });

    // Hover effect
    darkModeBtn.addEventListener('mouseenter', () => {
        darkModeBtn.style.transform = 'translateY(-5px)';
        darkModeBtn.style.boxShadow = 'var(--shadow-hover)';
    });

    darkModeBtn.addEventListener('mouseleave', () => {
        darkModeBtn.style.transform = 'translateY(0)';
        darkModeBtn.style.boxShadow = 'var(--shadow)';
    });
})();

// ===== ANALYTICS (Optional - Add your tracking code) =====
(function initAnalytics() {
    // Add your analytics code here
    // Example: Google Analytics, etc.
    console.log('Portfolio loaded successfully');
})();

// ===== SERVICE WORKER FOR PWA (Optional) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(error => {
            console.log('ServiceWorker registration failed: ', error);
        });
    });
}


