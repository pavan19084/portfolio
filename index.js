/* -----------------------------------------
  Have focus outline only for keyboard users 
 ---------------------------------------- */

const handleFirstTab = (e) => {
  if(e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing')

    window.removeEventListener('keydown', handleFirstTab)
    window.addEventListener('mousedown', handleMouseDownOnce)
  }
}

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing')

  window.removeEventListener('mousedown', handleMouseDownOnce)
  window.addEventListener('keydown', handleFirstTab)
}

window.addEventListener('keydown', handleFirstTab)

// Back to top button functionality
const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

let alterStyles = (isBackToTopRendered) => {
  if (backToTopButton) {
    backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
    backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
    backToTopButton.style.transform = isBackToTopRendered ? "scale(1)" : "scale(0)";
  }
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(isBackToTopRendered);
  } else {
    isBackToTopRendered = false;
    alterStyles(isBackToTopRendered);
  }
});

// Typing animation for header text
const headerText = document.querySelector('.header__text p');
const text = headerText.textContent;
headerText.textContent = '';

let i = 0;
function typeWriter() {
    if (i < text.length) {
        headerText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
    }
}

// Start typing animation when page loads
window.addEventListener('load', typeWriter);

// Scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements and observe them
document.querySelectorAll('.work__box, .experience__box, .about__content, .contact__info').forEach(element => {
    element.classList.add('fade-in');
    observer.observe(element);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile navigation toggle
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        nav.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !nav.classList.contains('scroll-down')) {
        // Scroll down
        nav.classList.remove('scroll-up');
        nav.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && nav.classList.contains('scroll-down')) {
        // Scroll up
        nav.classList.remove('scroll-down');
        nav.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navItems = document.querySelector('.nav__items');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navItems.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navItems.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navItems.contains(e.target) && !menuToggle.contains(e.target)) {
        menuToggle.classList.remove('active');
        navItems.classList.remove('active');
    }
});
