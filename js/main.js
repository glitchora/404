// Переключение вкладок
document.querySelectorAll('.nav-btn').forEach(button => {
  button.addEventListener('click', () => {
    const targetPage = button.getAttribute('data-page');

    // Убираем активный класс у всех
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));

    // Добавляем активный класс
    button.classList.add('active');
    document.getElementById(targetPage).classList.add('active');
  });
});

// Опционально: ленивая загрузка изображений
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
});
