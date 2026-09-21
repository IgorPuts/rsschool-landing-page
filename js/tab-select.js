import { menuData } from './carts.js';

function getActiveTab() {//сделать активным тот таб по которому кликнули
  let tabs = document.querySelectorAll('.tab');
  tabs.forEach(item => {
    item.addEventListener('click', (e) => {
      tabs.forEach(tab => tab.classList.remove('active-tab'));
      e.currentTarget.classList.add('active-tab');
        });
  });
}
getActiveTab();
//////////////////////////////////////////////////////////////////////////////////
function getCategoryTab() {//получить продуктовое название активного таба
  let tabs = document.querySelectorAll('.tab');

  for(let tab of tabs) {
    if (!tab.classList.contains('active-tab')) continue;

    if (tab.classList.contains('tab-coffee')) return 'coffee';
    if (tab.classList.contains('tab-tea')) return 'tea';
    if (tab.classList.contains('tab-dessert')) return 'dessert';
  }
  return null;
}
let theCurrentTab = getCategoryTab();
//////////////////////////////////////////////////////////////////////////////////

