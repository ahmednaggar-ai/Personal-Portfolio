// Navbar Scroll Effect
(function() {
    'use strict';
    
    const navbar = document.querySelector('.mine');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    // Function to handle scroll
    function handleScroll() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Smooth scroll for anchor links
    function smoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Skip if it's just "#"
                if (href === '#' || href === '') {
                    return;
                }
                
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (navbarCollapse.classList.contains('show')) {
                        navbarToggler.click();
                    }
                }
            });
        });
    }
    
    // Active nav item on scroll
    function setActiveNavItem() {
        const sections = document.querySelectorAll('section[id], header');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        window.addEventListener('scroll', function() {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.scrollY >= (sectionTop - 100)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.parentElement.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.parentElement.classList.add('active');
                }
            });
        });
    }
    
    // Initialize on page load
    window.addEventListener('DOMContentLoaded', function() {
        handleScroll(); // Check initial scroll position
        smoothScroll();
        setActiveNavItem();
    });
    
    // Listen for scroll events
    window.addEventListener('scroll', handleScroll);
    
    // Handle resize events
    window.addEventListener('resize', function() {
        handleScroll();
    });
    
})();

