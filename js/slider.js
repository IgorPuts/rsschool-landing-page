const buttonBack = document.querySelector('.left-button');
const buttonForward = document.querySelector('.right-button');
const sliderInner = document.querySelector('.slider-inner-content');
const sliderLines = document.querySelectorAll('.slider-line');

let carts = document.querySelectorAll('.slider-cart');
const realCount = carts.length;

let count = 1;
let cartWidth = 0;


function initSlider() {
  if (!carts || carts.length === 0) return;
  cartWidth = carts[0].offsetWidth;
  rollSlider(false);
}

function cloneSlides() {
  const firstClone = carts[0].cloneNode(true);
  const lastClone = carts[carts.length - 1].cloneNode(true);

  firstClone.classList.add('clone');
  lastClone.classList.add('clone');

  sliderInner.appendChild(firstClone);
  sliderInner.insertBefore(lastClone, carts[0]);


  carts = document.querySelectorAll('.slider-cart');
}

cloneSlides();
initSlider();

function rollSlider(animate = true) {
  if (animate) {
    sliderInner.style.transition = 'transform 0.5s ease';
  } else {
    sliderInner.style.transition = 'none';
  }
  sliderInner.style.transform = `translateX(-${count * cartWidth}px)`;
}

function activeLine() {
  const realIndex = (count - 1 + realCount) % realCount;
  sliderLines.forEach(line => line.classList.remove('is-active'));
  sliderLines[realIndex].classList.add('is-active');
}

buttonForward.addEventListener('click', () => {
  if (count >= carts.length - 1) return; // защита от двойного клика
  count++;
  rollSlider();
  activeLine();
});

buttonBack.addEventListener('click', () => {
  if (count <= 0) return;
  count--;
  rollSlider();
  activeLine();
});


sliderInner.addEventListener('transitionend', () => {
  // Если дошли до клона первого (последний элемент)
  if (count >= carts.length - 1) {
    count = 1;
    rollSlider(false);
  }
  // Если дошли до клона последнего (первый элемент)
  if (count <= 0) {
    count = realCount;
    rollSlider(false);
  }
});


sliderLines.forEach((line, i) => {
  line.addEventListener('click', () => {
    count = i + 1; // +1, потому что 0 — клон
    rollSlider();
    activeLine();
  });
});


let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    initSlider();
  }, 50);
});

