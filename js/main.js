// === Данные для галерей ===
const galleries = {
  vhs: [
    { src: "assets/works/vhs-01.webp", title: "VHS Fragment #01", desc: "Analog decay with hidden signal." },
    { src: "assets/works/vhs-02.webp", title: "VHS Fragment #02", desc: "Magnetic distortion, encrypted layer." },
    { src: "assets/works/vhs-03.webp", title: "VHS Fragment #03", desc: "Time-stretched reality glitch." },
    { src: "assets/works/vhs-04.webp", title: "VHS Fragment #04", desc: "Signal lost in tape warp." },
    { src: "assets/works/vhs-05.webp", title: "VHS Fragment #05", desc: "Ghost frame from parallel broadcast." },
    { src: "assets/works/vhs-06.webp", title: "VHS Fragment #06", desc: "Digital rupture in analog shell." }
  ],
  matrix: [
    { src: "assets/works/matrix-01.webp", title: "Rupture #01", desc: "Matrix code breach with hidden layer." },
    { src: "assets/works/matrix-02.webp", title: "Rupture #02", desc: "Reality fracture in 4K noise." },
    { src: "assets/works/matrix-03.webp", title: "Rupture #03", desc: "Encrypted motion in digital void." },
    { src: "assets/works/matrix-04.webp", title: "Rupture #04", desc: "Signal from the other side." },
    { src: "assets/works/matrix-05.webp", title: "Rupture #05", desc: "Glitch as poetic artifact." },
    { src: "assets/works/matrix-06.webp", title: "Rupture #06", desc: "Forbidden animation in noise." }
  ]
};

// === Инициализация каруселей ===
function initCarousel(containerId, items) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const inner = container.querySelector('.inner');
  const quantity = items.length;
  inner.style.setProperty('--quantity', quantity);
  inner.setAttribute('data-quantity', quantity);

  inner.innerHTML = ''; // очистка

  items.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.setProperty('--index', index);
    card.style.setProperty('--color-card', '255, 255, 255'); // можно менять

    const imgDiv = document.createElement('div');
    imgDiv.className = 'img';
    imgDiv.style.backgroundImage = `url(${item.src})`;

    card.appendChild(imgDiv);
    inner.appendChild(card);

    // Клик — открыть модалку
    card.addEventListener('click', () => {
      openModal(item);
    });

    // Наведение — остановить и выделить
    card.addEventListener('mouseenter', () => {
      inner.classList.add('paused');
      // Снять active у всех
      container.querySelectorAll('.card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });

    card.addEventListener('mouseleave', () => {
      inner.classList.remove('paused');
      card.classList.remove('active');
    });
  });
}

// === Модальное окно ===
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-description');
const modalClose = document.querySelector('.modal-close');
const modalBtns = document.querySelectorAll('.modal-actions .btn');

function openModal(item) {
  modalImage.src = item.src;
  modalTitle.textContent = item.title;
  modalDesc.textContent = item.desc;
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('show');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

modalBtns.forEach(btn => {
  btn.addEventListener('click', closeModal);
});

// === Переключение вкладок ===
document.querySelectorAll('.nav-btn').forEach(button => {
  button.addEventListener('click', () => {
    const targetPage = button.getAttribute('data-page');

    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));

    button.classList.add('active');
    document.getElementById(targetPage).classList.add('active');

    // Инициализировать карусель при первом открытии
    if (targetPage === 'vhs' && !document.getElementById('carousel-vhs').hasAttribute('data-initialized')) {
      initCarousel('carousel-vhs', galleries.vhs);
      document.getElementById('carousel-vhs').setAttribute('data-initialized', 'true');
    }
    if (targetPage === 'matrix' && !document.getElementById('carousel-matrix').hasAttribute('data-initialized')) {
      initCarousel('carousel-matrix', galleries.matrix);
      document.getElementById('carousel-matrix').setAttribute('data-initialized', 'true');
    }
  });
});

// === Инициализация главной страницы ===
document.getElementById('home').classList.add('active');
document.querySelector('.nav-btn[data-page="home"]').classList.add('active');
