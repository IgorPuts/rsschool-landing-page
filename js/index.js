document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname;
  const menuLink = document.querySelector('.menu-link')

    if (currentPath && currentPath === "/menu.html") {
      menuLink.classList.add('underline');
    } else if (currentPath && currentPath !== "/menu.html")
      menuLink.classList.remove('underline');
  });