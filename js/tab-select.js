import { menuData } from './carts.js';
//Лучше не лезть тут все очень замудрено//
document.addEventListener('DOMContentLoaded', () => {
  const refreshButton = document.querySelector('.refresh');
  let theCurrentTab;
  let resizeMenu;
  let refreshClicked = 0;
  let divideNumber = 1;
  let menuCarts = document.querySelector('.menu-carts'),
  coffeeCarts = [],
  teaCarts = [],
  dessertCarts = [];
  //////////////////////////////////////////////////////////////////////////////////

  function filterByCategory () {//создание массивов по категориям json (вне потока)
    coffeeCarts = menuData.filter(item => item.category === 'coffee');
    teaCarts = menuData.filter(item => item.category === 'tea');
    dessertCarts = menuData.filter(item => item.category === 'dessert');
  }

  function getActiveTab() {//сделать активным тот таб по которому кликнули(1)
    let tabs = document.querySelectorAll('.tab');
    tabs.forEach(item => {
      item.addEventListener('click', (e) => {
        tabs.forEach(tab => {
          tab.classList.remove('active-tab');
          tab.disabled = false;
        });
        e.currentTarget.classList.add('active-tab');
        e.currentTarget.disabled = true;
        refreshClicked = 0;
        divideNumber = 1;
        getCategoryTab();
        fillingMenu();
      });
    });
  }

  function getCategoryTab() {//получить продуктовое название активного таба(2)
    let tabs = document.querySelectorAll('.tab');//вызвать после установки активного таба

    for(let tab of tabs) {
      if (!tab.classList.contains('active-tab')) continue;

      if (tab.classList.contains('tab-coffee')) theCurrentTab = 'coffee';

      if (tab.classList.contains('tab-tea')) theCurrentTab = 'tea';

      if (tab.classList.contains('tab-dessert')) theCurrentTab = 'dessert';

    }
    return null;
  }

  function fillMenuCarts(tabActive, coffeeArr,teaArr,dessertArr) {//заполнение меню карточками
    hideRefreshButton();
    getCategoryTab();
    refreshClicked = 0;
    menuCarts.innerHTML = '';
    let clickedTab = [];

    if(tabActive === 'coffee') clickedTab = coffeeArr;

    if(tabActive === 'tea') clickedTab = teaArr;

    if(tabActive === 'dessert') clickedTab = dessertArr;


    clickedTab.forEach((item,i) => {
      const newCart = `
        <div class="cart__preview" style="animation-delay: ${Math.min(i * 0.2, 0.5)}s">
          <div class="cart__img">
            <img src="./assets/img/${item.category}-${i+1}.png">
          </div>
          <div class="cart__title">
            <div class="cart-description">
              <h3>${item.name}</h3>
              <p>${item.description}</p>
            </div>
            <p class="cart__price">$${item.price}</p>
          </div>
        </div>
      `;
      menuCarts.insertAdjacentHTML('beforeend', newCart);
    });

  }

  function fillMobileMenuCarts(tabActive, coffeeArr,teaArr,dessertArr) {
      getCategoryTab();
      showRefreshButton()
      menuCarts.innerHTML = '';
      let clickedTab = [];
      divideNumber = 2;


      if(refreshClicked === 1) {
        hideRefreshButton();
        divideNumber = 1;

        if(tabActive === 'coffee') clickedTab = coffeeArr;

        if(tabActive === 'tea') clickedTab = teaArr;

        if(tabActive === 'dessert') clickedTab = dessertArr;

      } else {

        if(tabActive === 'coffee') {
          clickedTab = coffeeArr;
          divideNumber = 2;

        }
        if(tabActive === 'tea') {
          clickedTab = teaArr;
          divideNumber = 1;
          hideRefreshButton();

        }
        if(tabActive === 'dessert') {
          clickedTab = dessertArr;
          divideNumber = 2;

        }

      }


      clickedTab.slice(0, clickedTab.length / divideNumber).forEach((item,i) => {
        const newCart = `
          <div class="cart__preview" style="animation-delay: ${Math.min(i * 0.2, 0.5)}s">
            <div class="cart__img">
              <img src="./assets/img/${item.category}-${i+1}.png">
            </div>
            <div class="cart__title">
              <div class="cart-description">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
              </div>
              <p class="cart__price">$${item.price}</p>
            </div>
          </div>
        `;
        menuCarts.insertAdjacentHTML('beforeend', newCart);
      });


  }

  function fillingMenu() {//проверка разрешения экрана с заполнением нужным количеством
  clearTimeout(resizeMenu);

  resizeMenu = setTimeout(() => {
    if (window.innerWidth <= 768) {
      fillMobileMenuCarts(theCurrentTab, coffeeCarts, teaCarts, dessertCarts);
    } else {
      fillMenuCarts(theCurrentTab, coffeeCarts, teaCarts, dessertCarts);
      refreshClicked = 0;
    }
  }, 300);
  }

  function hideRefreshButton() {
    refreshButton.style.display = 'none';
  }

  function showRefreshButton() {
    refreshButton.style.display = 'block';
  }


  filterByCategory();
  getActiveTab();
  getCategoryTab();
  fillingMenu();


  refreshButton.addEventListener('click', (e)=> {//добавить карточки
    if(!refreshButton || refreshButton !== e.currentTarget) return;
    refreshClicked = 1;
    fillMobileMenuCarts(theCurrentTab, coffeeCarts, teaCarts, dessertCarts);
  });

  window.addEventListener('resize', fillingMenu);
});
