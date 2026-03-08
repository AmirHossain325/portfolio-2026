// GSAP Animations and ScrollTrigger configurations

document.addEventListener('DOMContentLoaded', () => {
    // Wait for loading screen to be hidden before animating navbar
    const loadingScreen = document.getElementById('loading-screen');
    const animateNavbar = () => {
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        // Animate navigation on load
        gsap.from('.nav-container', {
            y: -100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });

        gsap.from('.nav-link', {
            y: -20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            delay: 0.5,
            ease: 'back.out(1.7)'
        });
    };

    // If loading screen is already hidden, animate immediately
    if (loadingScreen.classList.contains('hidden')) {
        animateNavbar();
    } else {
        // Otherwise wait for it to hide
        const observer = new MutationObserver((mutations) => {
            if (loadingScreen.classList.contains('hidden')) {
                animateNavbar();
                observer.disconnect();
            }
        });
        observer.observe(loadingScreen, { attributes: true, attributeFilter: ['class'] });
    }

    // Animate section titles with glitch effect
    gsap.utils.toArray('.section-title').forEach((title) => {
        gsap.to(title, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Animate content wrappers with stagger
    gsap.utils.toArray('.content-wrapper').forEach((wrapper) => {
        gsap.to(wrapper, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            delay: 0.3,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: wrapper,
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Animate skill cards with advanced effects
    gsap.utils.toArray('.skill-category').forEach((card, index) => {
        gsap.from(card, {
            opacity: 0,
            y: 80,
            rotationY: -15,
            scale: 0.8,
            duration: 1,
            delay: index * 0.08,
            ease: 'elastic.out(1, 0.6)',
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });

        // Add hover animation
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Animate project cards with 3D effects
    gsap.utils.toArray('.project-card').forEach((card, index) => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });

        tl.from(card, {
            opacity: 0,
            scale: 0.5,
            rotationX: -45,
            y: 100,
            duration: 1.2,
            ease: 'power4.out'
        });

        // Interactive hover with 3D tilt
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            gsap.to(card, {
                rotationX: rotateX,
                rotationY: rotateY,
                duration: 0.3,
                transformPerspective: 1000
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotationX: 0,
                rotationY: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    });

    // Animate certification cards with wave effect
    gsap.utils.toArray('.cert-card').forEach((card, index) => {
        gsap.from(card, {
            opacity: 0,
            x: index % 2 === 0 ? -150 : 150,
            rotation: index % 2 === 0 ? -20 : 20,
            scale: 0.5,
            duration: 1.2,
            delay: index * 0.08,
            ease: 'back.out(1.2)',
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Animate contact links with bounce
    gsap.from('.contact-link', {
        opacity: 0,
        scale: 0,
        rotation: 180,
        duration: 0.8,
        stagger: 0.1,
        ease: 'elastic.out(1, 0.5)',
        scrollTrigger: {
            trigger: '.contact-links',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

    // Animate social links with spiral effect
    gsap.utils.toArray('.social-link').forEach((link, index) => {
        const angle = (index / 6) * Math.PI * 2;
        const radius = 100;
        
        gsap.from(link, {
            opacity: 0,
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius,
            scale: 0,
            rotation: 720,
            duration: 1.2,
            delay: index * 0.1,
            ease: 'back.out(1.5)',
            scrollTrigger: {
                trigger: '.social-links',
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Smooth scroll for navigation links with easing
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                gsap.to(window, {
                    duration: 1.8,
                    scrollTo: {
                        y: targetSection,
                        offsetY: 80
                    },
                    ease: 'power4.inOut'
                });

                // Add active state animation
                gsap.to(link, {
                    scale: 1.1,
                    duration: 0.2,
                    yoyo: true,
                    repeat: 1
                });
            }
        });
    });

    // Advanced parallax effect for sections
    gsap.utils.toArray('.section').forEach((section, index) => {
        const bg = section.querySelector('.container');
        
        gsap.to(bg, {
            y: 150,
            ease: 'none',
            scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });
    });

    // Parallax for section titles
    gsap.utils.toArray('.section-title').forEach((title) => {
        gsap.to(title, {
            y: -50,
            ease: 'none',
            scrollTrigger: {
                trigger: title,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });
    });

    // Navigation background on scroll with blur
    ScrollTrigger.create({
        start: 'top -80px',
        end: 99999,
        toggleClass: {
            className: 'scrolled',
            targets: '.nav-container'
        }
    });

    // Animate HUD corners on load
    gsap.from('.hud-corner', {
        scale: 0,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'back.out(1.7)',
        delay: 1
    });

    // Create random glitch effect on page load
    setInterval(() => {
        const glitchElements = document.querySelectorAll('.glitch');
        glitchElements.forEach(el => {
            if (Math.random() > 0.7) {
                gsap.to(el, {
                    x: Math.random() * 4 - 2,
                    duration: 0.05,
                    yoyo: true,
                    repeat: 3,
                    ease: 'none'
                });
            }
        });
    }, 3000);

    // Holographic flicker animation
    gsap.utils.toArray('.hologram-text').forEach(el => {
        gsap.to(el, {
            opacity: 0.7,
            duration: 0.1,
            repeat: -1,
            yoyo: true,
            repeatDelay: Math.random() * 3 + 2
        });
    });
});

export {};
