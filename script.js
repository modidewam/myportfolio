document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('header nav');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active'); // For styling the hamburger icon itself
        });
    }

    // Optional: Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });

                // Optional: Close mobile menu when a link is clicked
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            }
        });
    });

    // Optional: Active link highlighting based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLi = document.querySelectorAll('header nav ul li a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 60) { // 60px offset for header height
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').substring(1) === current) {
                a.classList.add('active');
            }
        });
        // Ensure "Home" is active when at the top or hero section is visible
        if (current === 'home' || window.pageYOffset < sections[0].offsetTop - 60) {
             document.querySelector('header nav ul li a[href="#home"]').classList.add('active');
        } else if (current === '') { // If no section is "current" (e.g., scrolled past last section)
            // Potentially highlight the last relevant link or do nothing
        }
    });
     // Set initial active link on page load
    let initialCurrent = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 60) {
            initialCurrent = section.getAttribute('id');
        }
    });
    if (!initialCurrent && sections.length > 0) { // If at the very top
        initialCurrent = sections[0].getAttribute('id');
    }
     navLi.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').substring(1) === initialCurrent) {
            a.classList.add('active');
        }
    });
    if (initialCurrent === 'home' || window.pageYOffset < (sections[0] ? sections[0].offsetTop - 60 : 0)) {
        const homeLink = document.querySelector('header nav ul li a[href="#home"]');
        if (homeLink) homeLink.classList.add('active');
    }


    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const moonIcon = '<i class="fas fa-moon"></i>';
    const sunIcon = '<i class="fas fa-sun"></i>';

    // Function to apply the saved theme
    const applySavedTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
            if (darkModeToggle) darkModeToggle.innerHTML = sunIcon;
        } else if (savedTheme === 'light') {
            body.classList.remove('dark-mode');
            if (darkModeToggle) darkModeToggle.innerHTML = moonIcon;
        } else {
            // Default to dark mode if no theme is saved
            body.classList.add('dark-mode');
            if (darkModeToggle) darkModeToggle.innerHTML = sunIcon;
            localStorage.setItem('theme', 'dark');
        }
    };

    // Apply theme on initial load
    applySavedTheme();

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            if (body.classList.contains('dark-mode')) {
                darkModeToggle.innerHTML = sunIcon;
                localStorage.setItem('theme', 'dark');
            } else {
                darkModeToggle.innerHTML = moonIcon;
                localStorage.setItem('theme', 'light');
            }
        });
    }

// Project Carousel Functionality
    const projectCarousel = document.querySelector('.project-carousel');
    if (projectCarousel) {
        const slidesContainer = projectCarousel.querySelector('.carousel-slides');
        const slides = Array.from(slidesContainer.children);
        const nextButton = projectCarousel.querySelector('.carousel-control.next');
        const prevButton = projectCarousel.querySelector('.carousel-control.prev');
        let currentIndex = 0;

        const updateCarousel = () => {
            if (slides.length === 0) return; // Guard against no slides

            // Calculate slide width dynamically
            const slideWidth = slides[0].getBoundingClientRect().width;
            slidesContainer.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

            slides.forEach((slide, index) => {
                if (index === currentIndex) {
                    slide.classList.add('active');
                } else {
                    slide.classList.remove('active');
                }
            });
        };

        if (nextButton && prevButton && slides.length > 0) {
            nextButton.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % slides.length;
                updateCarousel();
            });

            prevButton.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                updateCarousel();
            });

            // Initialize carousel
            updateCarousel();
        } else {
            if (slides.length > 0 && (!nextButton || !prevButton)) {
                console.warn("Carousel navigation buttons not found, but slides exist.");
                // Fallback: show first slide if controls are missing
                if (slides[0]) slides[0].classList.add('active');
            }
        }
    }
    console.log("Portfolio script loaded and mobile nav + smooth scroll + active link + dark mode initialized.");
});