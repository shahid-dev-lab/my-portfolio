document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Toggle Functionality (REINTRODUCED)
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.getElementById('main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            // Toggle the 'is-open' class on the navigation
            mainNav.classList.toggle('is-open');

            // Update ARIA attributes for accessibility
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !isExpanded);
        });

        // Close the menu when a link inside it is clicked (for single-page scrolling)
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('is-open');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // 2. Lottie Animation Initialization for the About Section (Keep this)
    if (typeof lottie !== 'undefined') {
        const lottieContainer = document.getElementById('lottie-soft-dev');

        if (lottieContainer) {
            lottie.loadAnimation({
                container: lottieContainer, 
                renderer: 'svg', 
                loop: true, 
                autoplay: true, 
                path: 'animations/Software Devlopment.json'
            });
        }
    } else {
        console.error("Lottie library is not loaded. Check your script link in index.html.");
    }

    // 3. Project Portfolio Filter Functionality (Keep this)
    const filterContainer = document.getElementById('project-filters');
    const projectList = document.getElementById('project-list');
    const projectCards = projectList ? projectList.querySelectorAll('.project-card') : [];

    if (filterContainer && projectList) {
        filterContainer.addEventListener('click', (event) => {
            const target = event.target;

            if (target.classList.contains('filter-btn')) {
                const filterValue = target.getAttribute('data-filter');

                // 1. Update active button styles
                filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                target.classList.add('active');

                // 2. Filter the projects
                projectCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');

                    if (filterValue === 'all' || cardCategory === filterValue) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                });
            }
        });
    }
});

// ... (Your existing Lottie and Filter code blocks remain here) ...

// 4. Project Gallery FULL-WIDTH AUTO-CAROUSEL Functionality
const track = document.getElementById('gallery-carousel-track');
let autoSlideInterval;
let autoSlideOffset = 0; // Current scroll offset in percentage

function startAutoCarousel() {
    if (!track) return;
    
    // Calculate the width of the track (total number of items * item width, assuming items take up 1/Nth of the viewport)
    // For a smooth loop, you often duplicate content, but for continuous movement, we just need a slow, consistent slide.
    
    // Clear any existing interval
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
    }

    // Set a consistent slide speed (e.g., move 1% every 50ms)
    const speed = 18; // milliseconds
    const step = 0.10; // percentage to move per step
    
    autoSlideInterval = setInterval(() => {
        // Increment the offset
        autoSlideOffset += step;
        
        // Loop back to 0 when the last item begins to slide out of view. 
        // A large number (like 300% or 400%) ensures continuous movement without visible gaps.
        if (autoSlideOffset >= 400) { 
            autoSlideOffset = 0;
        }

        track.style.transform = `translateX(-${autoSlideOffset}%)`;
    }, speed);
}

// Start the carousel when the page loads
if (track) {
    startAutoCarousel();

    // Optional: Pause on mouse hover for better user experience
    track.parentElement.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    track.parentElement.addEventListener('mouseleave', () => {
        startAutoCarousel();
    });
}

document.addEventListener('DOMContentLoaded', () => {

    // ... (Your existing Mobile Menu Toggle logic) ...

    // NEW: 1. Skill Bar Animation on Scroll
    const skillSection = document.getElementById('skills');

    function animateSkillBars(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // When the section is in view, trigger the animations
                entry.target.querySelectorAll('.skill-group').forEach(group => {
                    const percent = parseInt(group.getAttribute('data-percent'));
                    const progressBar = group.querySelector('.skill-bar-progress');
                    const percentText = group.querySelector('.skill-percent');
                    
                    // 1. Trigger the CSS transition (bar fill)
                    progressBar.style.width = percent + '%';
                    
                    // 2. Animate the percentage text (count-up effect)
                    let current = 0;
                    const step = percent / 100; // Step size for the animation
                    
                    const counter = setInterval(() => {
                        current += step;
                        // Use Math.round to ensure a clean final number
                        percentText.textContent = Math.round(current) + '%';
                        
                        if (current >= percent) {
                            clearInterval(counter);
                            percentText.textContent = percent + '%'; // Ensure it hits the exact percentage
                        }
                    }, 12); // Speed of count (adjust this for faster/slower)
                });

                // Stop observing once the animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }

    if (skillSection) {
        const observer = new IntersectionObserver(animateSkillBars, {
            root: null, // Use the viewport
            threshold: 0.4 // Trigger when 40% of the section is visible
        });
        observer.observe(skillSection);
    }

    // ... (Your existing Lottie and Project Filter logic follows) ...
    // ... (Your existing Auto-Carousel logic follows) ...
});

// Wait for the document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // 1. Get the container element where the animation will be placed
    var animationContainer = document.getElementById('lottie-animation-container');

    // 2. Clear any existing content (optional, but good practice)
    animationContainer.innerHTML = '';
    
    // 3. Load the new Lottie animation
    // NOTE: This assumes the lottie.js library is loaded in your HTML.
    if (typeof lottie !== 'undefined') {
        var newAnimation = lottie.loadAnimation({
            // The DOM element to render the animation
            container: animationContainer, 
            // Required: choose 'svg', 'canvas', or 'html'
            renderer: 'svg', 
            // Optional: set to true to loop the animation indefinitely
            loop: true, 
            // Optional: set to true to start playing automatically
            autoplay: true, 
            // *** IMPORTANT: Replace this with the path to your new Lottie JSON file ***
            path: 'animations/developer skills.json' 
        });

        // You can optionally control the animation later if you save it to a variable:
        // newAnimation.setSpeed(0.8); // Make it 20% slower
    } else {
        console.error("Lottie player library is not defined. Please include lottie.min.js.");
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    const loadMoreBtn = document.getElementById('load-more-btn');

    const initialCount = 6; // Number of projects to show initially
    let visibleCount = initialCount;

    // 1. Hide all projects beyond initialCount
    projectCards.forEach((card, index) => {
        if (index >= initialCount) {
            card.style.display = 'none';
        }
    });

    // 2. Load More Button Click
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            const remainingCards = Array.from(projectCards).slice(visibleCount, visibleCount + initialCount);
            
            remainingCards.forEach(card => {
                card.style.display = 'block';
            });

            visibleCount += initialCount;

            // Hide button if all cards are visible
            if (visibleCount >= projectCards.length) {
                loadMoreBtn.style.display = 'none';
            }
        });
    }
});
// Dynamic Typing Effect for Roles in Hero Section
  
  const roles = [
    "Software Engineer",
    "Web Developer",
    "SEO Specialist",
    "Digital Marketer"
  ];

  const colors = [
    "#041F28",
    "#145368ff",
    "#68cef0ff",
    "#145368ff",
    "#041F28",
  ];

  const textElement = document.querySelector(".dynamic-text");

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
  }

  function typeEffect() {
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
      const span = document.createElement("span");
      span.textContent = currentRole.charAt(charIndex);
      span.style.color = getRandomColor();
      textElement.appendChild(span);
      charIndex++;
    } else {
      textElement.removeChild(textElement.lastChild);
      charIndex--;
    }

    if (charIndex === currentRole.length && !isDeleting) {
      setTimeout(() => isDeleting = true, 1200);
    }

    if (charIndex === 0 && isDeleting) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }

    setTimeout(typeEffect, isDeleting ? 50 : 120);
  }

  typeEffect();


