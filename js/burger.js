//gamburgerMenu//

  (function openCloseBurger () {
    const burgerButton = document.querySelector('.burger-button');//кнопка для открытия/закрытия меню
    const navMenu = document.querySelector('.nav');//получаем блок меню чтобы добавить/удалить ему класс
    const menuLink = document.querySelector('.menu-link-copy');//кнопка менюлинк
    const navItem = document.querySelectorAll('.nav-item');//получаем все заголовки меню бургера

      if (!navMenu.classList.contains('opened-burger-menu')) {//открыть
        navMenu.classList.add('opened-burger-menu');
        burgerButton.classList.add('crossed-lines');
        document.body.style.overflow = 'hidden';
      } else {//убрать
        navMenu.classList.remove('opened-burger-menu');
        burgerButton.classList.remove('crossed-lines');
        document.body.style.overflow = '';
      }

//делаем кнопку закрыть и показываем бергур меню с навигацией при клике
    burgerButton.addEventListener('click', () => {
      if (!navMenu.classList.contains('opened-burger-menu')) {
        navMenu.classList.add('opened-burger-menu');
        burgerButton.classList.add('crossed-lines');
        document.body.style.overflow = 'hidden';
      } else {//убрать
        navMenu.classList.remove('opened-burger-menu');
        burgerButton.classList.remove('crossed-lines');
        document.body.style.overflow = '';
      }
    });

  //убираем бургер меню при клике на любой элемент из навигации
    navItem.forEach(item => {
      item.addEventListener('click', () => {
        navMenu.classList.remove('opened-burger-menu');
        burgerButton.classList.remove('crossed-lines');
        document.body.style.overflow = '';
      });
    });

  //убираем бургер меню при клике на ссылку menu
    menuLink.addEventListener('click', () => {
      navMenu.classList.remove('opened-burger-menu');
      burgerButton.classList.remove('crossed-lines');
      document.body.style.overflow = '';
    });

      //убираем бургер меню при нажатии Escape
    document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('opened-burger-menu')) {
      navMenu.classList.remove('opened-burger-menu');
      burgerButton.classList.remove('crossed-lines');
      document.body.style.overflow = '';
    }
    });

    window.addEventListener('resize', () => {//фикс бага при изменении разрешения с открытым бургером
      if (window.innerWidth > 768 && document.body.style.overflow === 'hidden') {
        navMenu.classList.remove('opened-burger-menu');
        burgerButton.classList.remove('crossed-lines');
        document.body.style.overflow = '';
      }
    });

  })();



