const buttonBack = document.querySelector('.left-button');
const buttonForward = document.querySelector('.right-button');
const sliderWrapper = document.querySelector('.slider');
const carts = document.querySelectorAll('.slider-cart');
const cartsNumber = carts.length;

let sliderWidth = document.querySelector('.slider-inner-content');
let count = 0;
let cartWidth;


function initSlider() {
  if (!carts || carts.length === 0) return;
  cartWidth = carts[0].offsetWidth;
}
initSlider();

function resizeWindow() {
  let resizeTimeout;

  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      initSlider();
      rollSlider()
    }, 50);
  });
}
resizeWindow();


buttonBack.addEventListener('click', ()=> {
  count--;
  if (count < 0) {
    count = cartsNumber - 1;
  }
  rollSlider()
  activeLine();
});

buttonForward.addEventListener('click', ()=> {
  count++;
  if (count >= cartsNumber) {
    count = 0;
  }
  rollSlider()
  activeLine();
});

function rollSlider() {
  sliderWidth.style.transform = `translateX(-${count * cartWidth}px)`;
}

///////////////////////////////////pagination////////////////////////////

const sliderLines = document.querySelectorAll('.slider-line');

function activeLine() {
  sliderLines.forEach(line => {
    line.classList.remove('is-active');
  });
  sliderLines[count].classList.add('is-active');
}


sliderLines.forEach((line, i) => {
  line.addEventListener('click', (e)=>{
    if (!line) return;
    if (e.target === line) {
      count = i;
    }
    activeLine();
    rollSlider();
  });
});

