// Mobile Menu Toggle
const mobileMenu = document.querySelector('.mobile-menu');
const nav = document.querySelector('nav');

if (mobileMenu) {
    mobileMenu.addEventListener('click', function() {
        nav.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Fixed Header on Scroll
const header = document.querySelector('header');
let scrolled = false;

window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        if (!scrolled) {
            header.classList.add('scrolled');
            scrolled = true;
        }
    } else {
        if (scrolled) {
            header.classList.remove('scrolled');
            scrolled = false;
        }
    }
});

// Form Validation
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple validation
        let valid = true;
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        
        if (!name.value.trim()) {
            valid = false;
            showError(name, 'Name is required');
        } else {
            removeError(name);
        }
        
        if (!email.value.trim()) {
            valid = false;
            showError(email, 'Email is required');
        } else if (!isValidEmail(email.value)) {
            valid = false;
            showError(email, 'Please enter a valid email');
        } else {
            removeError(email);
        }
        
        if (!message.value.trim()) {
            valid = false;
            showError(message, 'Message is required');
        } else {
            removeError(message);
        }
        
        if (valid) {
            // Here you would typically send the form data to a server
            // For demo purposes, we'll just show a success message
            const formGroups = contactForm.querySelectorAll('.form-group');
            formGroups.forEach(group => {
                group.style.display = 'none';
            });
            
            const submitBtn = contactForm.querySelector('.btn');
            submitBtn.style.display = 'none';
            
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully.';
            
            contactForm.appendChild(successMessage);
            
            // Reset form
            contactForm.reset();
        }
    });
}

function showError(input, message) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
    
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(errorElement);
    }
    
    input.classList.add('input-error');
}

function removeError(input) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');
    
    if (errorElement) {
        formGroup.removeChild(errorElement);
    }
    
    input.classList.remove('input-error');
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Reveal Animation on Scroll
const revealElements = document.querySelectorAll('.reveal');

function revealOnScroll() {
    for (let i = 0; i < revealElements.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = revealElements[i].getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            revealElements[i].classList.add('active');
        }
    }
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);