
window.addEventListener('load', () => {
    document.body.classList.remove('preload');
});

document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname;
  const menuLink = document.querySelector('.menu-link')
  const toMain = document.querySelector('.to-main');

  if (currentPath && currentPath === "/menu.html") {
    menuLink.classList.add('underline');
    menuLink.style.cursor = "default";
    menuLink.addEventListener('click', (e)=> {
      e.preventDefault();
    });
  }

  if (currentPath && currentPath === "/index.html") {
    menuLink.classList.remove('underline');
    toMain.style.cursor = "default";
    toMain.addEventListener('click', (e)=> {
      e.preventDefault();
    });
  }

});

