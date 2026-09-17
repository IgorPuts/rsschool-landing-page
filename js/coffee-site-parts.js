const headerHTML = `
    <div class="wrapper">
      <div class="header__menu">
        <div class="header__logo"></div>
        <nav class="nav">
          <ul class="nav-list">
            <li class="nav-item"><a href="gifts.html" class="nav-link">Favorite coffee</a></li>
            <li class="nav-item"><a href="#about" class="nav-link">About</a></li>
            <li class="nav-item"><a href="#best" class="nav-link">Mobile app</a></li>
            <li class="nav-item"><a href="#contacts" class="nav-link">Contact us</a></li>
          </ul>
        </nav>
        <div class="header__actions">
          <div class="theme-switch"></div>
          <div class="burger-menu"></div>
        </div>
      </div>
    </div>
`;

const footerHTML = `
  <div class="wrapper">
    <div class="footer-container">
      <div class="footer__offer">
        <h2><span class="for-dark-layouts-text">Sip, Savor, Smile.</span><br><span class="all-layuots-text">It’s coffee time!</span></h2>
        <div class="socials"></div>
      </div>
      <div class="contact-us">
        <h3>Contact us</h3>
        <div class="links">
          <a></a>
          <a></a>
          <a></a>
        </div>
      </div>
    </div>
  </div>
`;




// Функция для вставки
function injectPartials() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');

    if (headerPlaceholder) headerPlaceholder.innerHTML = headerHTML;
    if (footerPlaceholder) footerPlaceholder.innerHTML = footerHTML;
}

// Вставка при загрузке
document.addEventListener('DOMContentLoaded', injectPartials);