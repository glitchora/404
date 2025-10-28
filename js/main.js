// Динамически создаём медиа-элементы только при наведении
// Это экономит трафик и скрывает контент до взаимодействия

document.querySelectorAll('.fragment').forEach(fragment => {
  const src = fragment.getAttribute('data-src');
  let mediaLoaded = false;

  fragment.addEventListener('mouseenter', () => {
    if (!mediaLoaded && src) {
      const media = document.createElement('img');
      media.classList.add('fragment-media');
      media.src = src;
      media.alt = 'Signal fragment';
      fragment.appendChild(media);
      mediaLoaded = true;
    }
  });
});

// Опционально: добавить "секретный жест" (например, тройной клик)
let clickCount = 0;
let clickTimer = null;

document.body.addEventListener('click', () => {
  clickCount++;
  if (clickCount === 3) {
    clearTimeout(clickTimer);
    // Активировать что-то особое (например, открыть скрытую галерею)
    console.log('Rupture activated.');
    clickCount = 0;
  } else {
    clearTimeout(clickTimer);
    clickTimer = setTimeout(() => {
      clickCount = 0;
    }, 600);
  }
});