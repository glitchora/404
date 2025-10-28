document.addEventListener('DOMContentLoaded', () => {
  // === Данные галерей ===
  const galleries = {
    vhs: [
      { src: "https://glichorahost.pages.dev/pashalka6.webp", title: "VHS Glitch #01", desc: "Analog decay with hidden signal." },
      { src: "https://glichorahost.pages.dev/pashalka6.webp", title: "VHS Glitch #02", desc: "Magnetic distortion, encrypted layer." },
      { src: "https://glichorahost.pages.dev/pashalka6.webp", title: "VHS Glitch #03", desc: "Time-stretched reality glitch." },
      { src: "https://glichorahost.pages.dev/pashalka6.webp", title: "VHS Glitch #04", desc: "Signal lost in tape warp." },
      { src: "https://glichorahost.pages.dev/pashalka6.webp", title: "VHS Glitch #05", desc: "Ghost frame from parallel broadcast." },
      { src: "https://glichorahost.pages.dev/pashalka6.webp", title: "VHS Glitch #06", desc: "Digital rupture in analog shell." }
    ],
    matrix: [
      { src: "https://glichorahost.pages.dev/pashalka5.webp", title: "Rupture #01", desc: "Matrix code breach with hidden layer." },
      { src: "https://glichorahost.pages.dev/pashalka5.webp", title: "Rupture #02", desc: "Reality fracture in 4K noise." },
      { src: "https://glichorahost.pages.dev/pashalka5.webp", title: "Rupture #03", desc: "Encrypted motion in digital void." },
      { src: "https://glichorahost.pages.dev/pashalka5.webp", title: "Rupture #04", desc: "Signal from the other side." },
      { src: "https://glichorahost.pages.dev/pashalka5.webp", title: "Rupture #05", desc: "Glitch as poetic artifact." },
      { src: "https://glichorahost.pages.dev/pashalka5.webp", title: "Rupture #06", desc: "Forbidden animation in noise." }
    ]
  };

  // === Инициализация карусели ===
  function initCarousel(containerId, items) {
    const container = document.getElementById(containerId);
    if (!container || container.hasAttribute('data-loaded')) return;
    const inner = container.querySelector('.inner');
    const quantity = items.length;
    inner.style.setProperty('--quantity', quantity);
    inner.innerHTML = '';
    items.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.style.setProperty('--index', index);
      const imgDiv = document.createElement('div');
      imgDiv.className = 'img';
      imgDiv.style.backgroundImage = `url(${item.src})`;
      card.appendChild(imgDiv);
      inner.appendChild(card);

      card.addEventListener('click', () => {
        document.getElementById('modal-image').src = item.src;
        document.getElementById('modal-title').textContent = item.title;
        document.getElementById('modal-description').textContent = item.desc;
        document.getElementById('modal').classList.add('show');
        document.body.style.overflow = 'hidden';
      });

      card.addEventListener('mouseenter', () => {
        inner.classList.add('paused');
        container.querySelectorAll('.card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
      });

      card.addEventListener('mouseleave', () => {
        inner.classList.remove('paused');
        card.classList.remove('active');
      });
    });
    container.setAttribute('data-loaded', 'true');
  }

  // === Закрытие модалки ===
  function closeModal() {
    document.getElementById('modal').classList.remove('show');
    document.body.style.overflow = '';
  }

  const modal = document.getElementById('modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    const actionBtn = modal.querySelector('.btn');
    if (actionBtn) actionBtn.addEventListener('click', closeModal);
  }

  // === Переключение вкладок ===
  document.querySelectorAll('.nav-btn').forEach(button => {
    button.addEventListener('click', () => {
      const target = button.dataset.page;
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
      button.classList.add('active');
      const targetPage = document.getElementById(target);
      if (targetPage) targetPage.classList.add('active');

      if (target === 'rupture-vhs') initCarousel('carousel-vhs', galleries.vhs);
      if (target === 'rupture-matrix') initCarousel('carousel-matrix', galleries.matrix);
    });
  });
});
