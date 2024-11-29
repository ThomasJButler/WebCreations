function createEntanglementOrb() {
    const orb = document.createElement('div');
    orb.classList.add('entanglement-orb');
    orb.style.left = Math.random() * window.innerWidth + 'px';
    orb.style.top = Math.random() * window.innerHeight + 'px';
    document.body.appendChild(orb);

    const targetOrb = document.createElement('div');
    targetOrb.classList.add('entanglement-orb');
    targetOrb.style.left = Math.random() * window.innerWidth + 'px';
    targetOrb.style.top = Math.random() * window.innerHeight + 'px';
    document.body.appendChild(targetOrb);

    setTimeout(() => {
      orb.style.left = targetOrb.style.left;
      orb.style.top = targetOrb.style.top;
      orb.style.transition = 'all 2s ease-in-out';
    }, 100);

    setTimeout(() => {
      orb.remove();
      targetOrb.remove();
    }, 2100);
  }

  setInterval(createEntanglementOrb, 1000);

  function createRealityPulse(x, y) {
    const pulse = document.createElement('div');
    pulse.classList.add('reality-pulse');
    pulse.style.left = x + 'px';
    pulse.style.top = y + 'px';
    document.body.appendChild(pulse);

    setTimeout(() => pulse.remove(), 2000);
  }

  document.addEventListener('click', (e) => {
    createRealityPulse(e.clientX, e.clientY);
  });

  document.querySelectorAll('.quantum-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = `scale(1.05) rotate(${Math.random() * 2 - 1}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'scale(1) rotate(0deg)';
    });
  });