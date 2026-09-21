import { menuData } from './carts.js';

document.addEventListener('DOMContentLoaded', () => {

  let theCurrentTab;
  let menuCarts = document.querySelector('.menu-carts'),
  coffeeCarts = [],
  teaCarts = [],
  dessertCarts = [];
  //////////////////////////////////////////////////////////////////////////////////

  function filterByCategory () {//фильтрация по категориям json (вне потока)
    coffeeCarts = menuData.filter(item => item.category === 'coffee');
    teaCarts = menuData.filter(item => item.category === 'tea');
    dessertCarts = menuData.filter(item => item.category === 'dessert');
  }
  filterByCategory()

   function getActiveTab() {//сделать активным тот таб по которому кликнули(1)
    let tabs = document.querySelectorAll('.tab');
    tabs.forEach(item => {
      item.addEventListener('click', (e) => {
        tabs.forEach(tab => tab.classList.remove('active-tab'));
        e.currentTarget.classList.add('active-tab');
          getCategoryTab();
          fillMenuCarts(theCurrentTab, coffeeCarts, teaCarts, dessertCarts);
      });
    });
  }

  function getCategoryTab() {//получить продуктовое название активного таба(2)
    let tabs = document.querySelectorAll('.tab');//вызвать после установки активного таба

    for(let tab of tabs) {
      if (!tab.classList.contains('active-tab')) continue;

      if (tab.classList.contains('tab-coffee')) {
        theCurrentTab = 'coffee';
      } ;
      if (tab.classList.contains('tab-tea')) {
        theCurrentTab = 'tea';
      } ;
      if (tab.classList.contains('tab-dessert')) {
        theCurrentTab = 'dessert';
      } ;

    }
    return null;
  }

  function fillMenuCarts(tabActive, coffeeArr,teaArr,dessertArr) {//заполнение меню карточками
    menuCarts.innerHTML = '';
    let clickedTab = [];

    if(tabActive === 'coffee') {
      clickedTab = coffeeArr;

    }
    if(tabActive === 'tea') {
      clickedTab = teaArr;

    }
    if(tabActive === 'dessert') {
      clickedTab = dessertArr;

    };

    clickedTab.forEach((item,i) => {
      const newCart = `
        <div class="cart__preview">
          <div class="cart__img">
            <img src="./assets/img/${item.category}-${i+1}.png">
          </div>
          <div class="cart__title">
            <div class="cart-description">
              <h3>${item.name}</h3>
              <p>${item.description}</p>
            </div>
            <p class="cart__price">${item.price}</p>
          </div>
        </div>
      `;
      menuCarts.insertAdjacentHTML('beforeend', newCart);
    });
  }

  //////////////////////////////////////////////////////////////////////////////////

  filterByCategory()
  getActiveTab();
  getCategoryTab();
  fillMenuCarts(theCurrentTab, coffeeCarts, teaCarts, dessertCarts);
});

