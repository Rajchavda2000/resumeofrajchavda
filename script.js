document.addEventListener('DOMContentLoaded', () => {
    // --- Custom Cursor ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-dot-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: 'forwards' });
    });

    // --- Theme Switcher ---
    const themeSwitch = document.getElementById('checkbox');
    const currentTheme = localStorage.getItem('theme');

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (theme === 'dark') {
            themeSwitch.checked = true;
        } else {
            themeSwitch.checked = false;
        }
    }

    if (currentTheme) {
        setTheme(currentTheme);
    } else {
        setTheme('light'); // Default theme
    }

    themeSwitch.addEventListener('change', () => {
        if (themeSwitch.checked) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    });

    // --- Typing Animation ---
    new Typed('#typed-text', {
        strings: ['BCA Student', 'Web Enthusiast', 'Problem Solver'],
        typeSpeed: 70,
        backSpeed: 40,
        loop: true,
        startDelay: 500,
        backDelay: 1500,
    });
    
    // --- Scroll Animations for sections ---
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });

    // --- Back to Top Button ---
    const backToTopButton = document.getElementById('back-to-top');

    window.onscroll = () => {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    };

    backToTopButton.onclick = () => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    };

    // --- Parallax Header ---
    const headerContent = document.querySelector('.header-content');
    window.addEventListener('scroll', () => {
        const scrollOffset = window.pageYOffset;
        headerContent.style.transform = `translateY(${scrollOffset * 0.5}px)`;
    });

    // --- 3D Tilt Effect on Sections ---
    const sectionsToTilt = document.querySelectorAll('.section');

    sectionsToTilt.forEach(section => {
        section.addEventListener('mousemove', (e) => {
            const { top, left, width, height } = section.getBoundingClientRect();
            const x = e.clientX - left;
            const y = e.clientY - top;

            const rotateX = -1 * ((y - height / 2) / (height / 2)) * 10; // Max rotation 10deg
            const rotateY = ((x - width / 2) / (width / 2)) * 10;

            section.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        section.addEventListener('mouseleave', () => {
            section.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}); 