document.addEventListener('DOMContentLoaded', () => {
    console.log('Document loaded and scripts running!');

    // Matrix Effect
    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const katakana = 'アカサタナハマヤラワガザダバパイキシチニヒミリギジヂビピウクスツヌフムユルグズヅブプエケセテネヘメレゲゼデベペオコソトノホモヨロヲゴゾドボポヴッ';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const alphabet = katakana + latin + nums;

    const fontSize = 16;
    const columns = canvas.width / fontSize;

    const rainDrops = Array.from({ length: columns }).fill(1);

    const drawMatrix = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0F0';
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < rainDrops.length; i++) {
            const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

            if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                rainDrops[i] = 0;
            }
            rainDrops[i]++;
        }
    };

    setInterval(drawMatrix, 30);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            document.body.classList.add('scrolled');
        }
    });

    // Hide matrix effect on hover or click
    const matrix = document.getElementById('matrix');
    matrix.addEventListener('mouseover', () => {
        document.body.classList.add('scrolled');
    });
    matrix.addEventListener('click', () => {
        document.body.classList.add('scrolled');
    });

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            document.querySelector(link.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Hover Effects for Grid Items
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
        item.addEventListener('mouseover', () => {
            item.style.transform = 'scale(1.05)';
            item.style.backgroundColor = '#222';
        });
        item.addEventListener('mouseout', () => {
            item.style.transform = 'scale(1)';
            item.style.backgroundColor = '#111';
        });
    });

    // Form Submission Alert
    const form = document.querySelector('form');
    form.addEventListener('submit', event => {
        event.preventDefault();
        alert('Message sent!');
    });

    // Scroll Animations for Sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transition = 'opacity 1s ease-in-out';
    });

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + window.innerHeight;
        sections.forEach(section => {
            if (scrollPosition > section.offsetTop) {
                section.style.opacity = 1;
            }
        });
    });

    // Open external links in a new tab
    const links = document.querySelectorAll('a[target="_blank"]');
    links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            window.open(link.href, '_blank');
        });
    });

    // GSAP Animations
    gsap.from("header h1", {duration: 2, opacity: 0, y: -50, ease: "power3.out"});
    gsap.from("header h3", {duration: 2, opacity: 0, y: 50, ease: "power3.out", delay: 0.5});
    gsap.from("header p", {duration: 2, opacity: 0, y: 50, ease: "power3.out", delay: 1});
    gsap.from("nav ul li", {duration: 1, opacity: 0, y: 30, ease: "power3.out", stagger: 0.2, delay: 1.5});

    // ScrollMagic Controller
    const controller = new ScrollMagic.Controller();

    // Section Titles Animation
    document.querySelectorAll('.section-title').forEach((title) => {
        const scene = new ScrollMagic.Scene({
            triggerElement: title,
            triggerHook: 0.9,
            reverse: false
        })
        .setTween(gsap.from(title, {duration: 1.5, opacity: 0, y: 50, ease: "power3.out"}))
        .addTo(controller);
    });

    // Content Text Animation
    document.querySelectorAll('.content-text').forEach((text, index) => {
        const scene = new ScrollMagic.Scene({
            triggerElement: text,
            triggerHook: 0.9,
            reverse: false
        })
        .setTween(gsap.from(text, {duration: 1.5, opacity: 0, y: 50, ease: "power3.out", delay: index * 0.3}))
        .addTo(controller);
    });

    // Gallery Images Animation
    document.querySelectorAll('.grid-item').forEach((item, index) => {
        const scene = new ScrollMagic.Scene({
            triggerElement: item,
            triggerHook: 0.9,
            reverse: false
        })
        .setTween(gsap.from(item, {duration: 1.5, opacity: 0, scale: 0.5, ease: "power3.out", delay: index * 0.3}))
        .addTo(controller);
    });
});
