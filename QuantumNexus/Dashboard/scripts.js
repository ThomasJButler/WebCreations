function createQuantumParticle(x, y) {
    const particle = document.createElement('div');
    particle.classList.add('quantum-particle');
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    document.body.appendChild(particle);

    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 3;
    let opacity = 0.7;

    function animateParticle() {
      if (opacity <= 0) {
        particle.remove();
        return;
      }

      const dx = Math.cos(angle) * speed;
      const dy = Math.sin(angle) * speed;
      
      particle.style.left = (parseFloat(particle.style.left) + dx) + 'px';
      particle.style.top = (parseFloat(particle.style.top) + dy) + 'px';
      
      opacity -= 0.01;
      particle.style.opacity = opacity;

      requestAnimationFrame(animateParticle);
    }

    animateParticle();
  }

  document.addEventListener('mousemove', (e) => {
    if (Math.random() < 0.1) {
      createQuantumParticle(e.clientX, e.clientY);
    }
  });

  document.querySelectorAll('.quantum-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      el.style.transform = `scale(1.05) rotate(${Math.random() * 2 - 1}deg)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'none';
    });
  });