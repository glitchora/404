document.addEventListener('DOMContentLoaded', () => {
  const galleries = {
  vhs: [
    { src: "https://glichorahost.pages.dev/Shylily.png", title: "VHS Glitch #01", desc: "Analog decay with hidden signal." },
    { src: "https://glichorahost.pages.dev/Shylily.png", title: "VHS Glitch #02", desc: "Magnetic distortion, encrypted layer." },
    { src: "https://glichorahost.pages.dev/Shylily.png", title: "VHS Glitch #03", desc: "Time-stretched reality glitch." },
    { src: "https://glichorahost.pages.dev/Shylily.png", title: "VHS Glitch #04", desc: "Signal lost in tape warp." },
    { src: "https://glichorahost.pages.dev/Shylily.png", title: "VHS Glitch #05", desc: "Ghost frame from parallel broadcast." },
    { src: "https://glichorahost.pages.dev/Shylily.png", title: "VHS Glitch #06", desc: "Digital rupture in analog shell." },
    { src: "https://glichorahost.pages.dev/Shylily.png", title: "VHS Glitch #07", desc: "Tape hiss artifact." },
    { src: "https://glichorahost.pages.dev/Shylily.png", title: "VHS Glitch #08", desc: "Vertical hold failure." },
    { src: "https://glichorahost.pages.dev/Shylily.png", title: "VHS Glitch #09", desc: "Chroma bleed signal." },
    { src: "https://glichorahost.pages.dev/Shylily.png", title: "VHS Glitch #10", desc: "Final frame corruption." }
  ],
  matrix: [
    { src: "https://glichorahost.pages.dev/Akai.png", title: "Rupture #01", desc: "Matrix code breach with hidden layer." },
    { src: "https://glichorahost.pages.dev/Akai.png", title: "Rupture #02", desc: "Reality fracture in 4K noise." },
    { src: "https://glichorahost.pages.dev/Akai.png", title: "Rupture #03", desc: "Encrypted motion in digital void." },
    { src: "https://glichorahost.pages.dev/Akai.png", title: "Rupture #04", desc: "Signal from the other side." },
    { src: "https://glichorahost.pages.dev/Akai.png", title: "Rupture #05", desc: "Glitch as poetic artifact." },
    { src: "https://glichorahost.pages.dev/Akai.png", title: "Rupture #06", desc: "Forbidden animation in noise." },
    { src: "https://glichorahost.pages.dev/Akai.png", title: "Rupture #07", desc: "Data stream collapse." },
    { src: "https://glichorahost.pages.dev/Akai.png", title: "Rupture #08", desc: "Recursive reality loop." },
    { src: "https://glichorahost.pages.dev/Akai.png", title: "Rupture #09", desc: "Neural net overflow." },
    { src: "https://glichorahost.pages.dev/Akai.png", title: "Rupture #10", desc: "Terminal signal received." }
  ]
};

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

  // === Переключение вкладок с хэшем ===
  function showPage(pageId) {
    // Сброс
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

    // Активация
    const page = document.getElementById(pageId);
    const btn = document.querySelector(`.nav-btn[data-page="${pageId}"]`);
    if (page && btn) {
      btn.classList.add('active');
      page.classList.add('active');

      // Инициализация галерей при необходимости
      if (pageId === 'vhs') initCarousel('carousel-vhs', galleries.vhs);
      if (pageId === 'matrix') initCarousel('carousel-matrix', galleries.matrix);
    }
  }

  // === Обработка кликов по кнопкам ===
  document.querySelectorAll('.nav-btn').forEach(button => {
    button.addEventListener('click', () => {
      const pageId = button.dataset.page;
      window.location.hash = pageId; // ← сохраняем в URL
      showPage(pageId);
    });
  });

  // === При загрузке — читаем хэш ===
  const hash = window.location.hash.replace('#', '') || 'home';
  showPage(hash);

  // === Если пользователь меняет хэш вручную (назад/вперёд) ===
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '') || 'home';
    showPage(hash);
  });
});

// === Точный hover для 3D-каруселей ===
function setupPreciseHover(carouselSelector) {
  const carousel = document.querySelector(carouselSelector);
  if (!carousel) return;

  const inner = carousel.querySelector('.inner');
  const cards = Array.from(carousel.querySelectorAll('.card'));

  // Кэшируем bounding rects при старте и при ресайзе
  let cardRects = [];

  function updateCardRects() {
    cardRects = cards.map(card => {
      const rect = card.getBoundingClientRect();
      return {
        card,
        centerX: rect.left + rect.width / 2,
        centerY: rect.top + rect.height / 2,
        distance: Infinity
      };
    });
  }

  // Обновляем позиции при загрузке и ресайзе
  updateCardRects();
  window.addEventListener('resize', updateCardRects);

  // Отслеживаем движение мыши ТОЛЬКО внутри карусели
  carousel.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Находим ближайшую карточку по расстоянию до центра
    let closest = null;
    let minDist = Infinity;

    for (const item of cardRects) {
      const dx = item.centerX - mouseX;
      const dy = item.centerY - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < minDist) {
        minDist = dist;
        closest = item.card;
      }
    }

    // Снимаем hovered со всех
    cards.forEach(c => c.classList.remove('hovered'));

    // Добавляем только если курсор достаточно близко (например, < 150px)
    if (closest && minDist < 150) {
      closest.classList.add('hovered');
    }
  });

  // Убираем hovered при выходе из карусели
  carousel.addEventListener('mouseleave', () => {
    cards.forEach(c => c.classList.remove('hovered'));
  });
}

// Применяем к обеим каруселям
document.addEventListener('DOMContentLoaded', () => {
  // Ждём, пока карточки не будут созданы (например, после initCarousels)
  setTimeout(() => {
    setupPreciseHover('#carousel-vhs');
    setupPreciseHover('#carousel-matrix');
  }, 500); // можно увеличить, если карточки грузятся дольше
});

