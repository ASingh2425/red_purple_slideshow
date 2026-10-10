const slides = [...document.querySelectorAll('.slide')];
const current = document.querySelector('#current-slide');
const back = document.querySelector('#back');
const next = document.querySelector('#next');
let index = 0;

function showSlide(target) {
  index = Math.max(0, Math.min(target, slides.length - 1));
  slides.forEach((slide, i) => {
    const active = i === index;
    slide.classList.toggle('is-active', active);
    slide.setAttribute('aria-hidden', String(!active));
  });
  current.textContent = String(index + 1).padStart(2, '0');
  back.disabled = index === 0;
  next.disabled = index === slides.length - 1;
  next.style.visibility = index === slides.length - 1 ? 'hidden' : 'visible';
}

back.addEventListener('click', () => showSlide(index - 1));
next.addEventListener('click', () => showSlide(index + 1));
window.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') showSlide(index - 1);
  if (event.key === 'ArrowRight') showSlide(index + 1);
});

showSlide(0);
