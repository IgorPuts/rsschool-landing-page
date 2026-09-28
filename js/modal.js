import { menuData } from './carts.js';

document.addEventListener('DOMContentLoaded', () => {
  const modal       = document.querySelector('.modal__background');
  const modalImg    = modal.querySelector('.modal__img img');
  const modalTitle  = modal.querySelector('.modal__content-header h3');
  const modalDesc   = modal.querySelector('.modal__content-header p');
  const modalTabsSize = modal.querySelector('.modal__content-size .modal-tabs');
  const modalTabsAdd  = modal.querySelector('.modal__content-additives .modal-tabs');
  const modalTotal  = modal.querySelector('.modal__content-total .size-type:last-child');
  const closeBtn    = modal.querySelector('.modal-close-btn');

  let currentItem = null;
  let currentSize = 's';
  let currentAdds = new Set();

  //////////////////////////////////////////////////////////////////////////////
//check
  //////////////////////////////////////////////////////////////////////////////
  document.addEventListener('click', (e) => {
    const cart = e.target.closest('.cart__preview');
    if (!cart) return;

    const id = cart.dataset.id;
    const item = menuData.find(i => i.name === id);
    if (item) openModal(item);
  });

  //////////////////////////////////////////////////////////////////////////////
  //openModal//
  //////////////////////////////////////////////////////////////////////////////
  function openModal(item) {
    currentItem = item;
    currentSize = 's';
    currentAdds.clear();


    const cartImg = document.querySelector(`.cart__preview[data-id="${item.name}"] img`);
    modalImg.src = cartImg ? cartImg.src : './assets/img/placeholder.png';
    modalImg.alt = item.name;

    modalTitle.textContent = item.name;
    modalDesc.textContent = item.description;

    renderSizes(item);
    renderAdditives(item);
    updateTotal();

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  function renderSizes(item) {
    modalTabsSize.innerHTML = '';

    Object.entries(item.sizes).forEach(([key, value]) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `modal-tab ${key}${key === currentSize ? ' modal-active-tab' : ''}`;
      btn.innerHTML = `
        <span class="action-link">${key.toUpperCase()}</span>
        <span class="action-link">${value.size}</span>
      `;
      btn.addEventListener('click', () => {
        currentSize = key;
        modalTabsSize.querySelectorAll('.modal-tab')
          .forEach(t => t.classList.remove('modal-active-tab'));
        btn.classList.add('modal-active-tab');
        updateTotal();
      });
      modalTabsSize.appendChild(btn);
    });
  }

  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  function renderAdditives(item) {
    modalTabsAdd.innerHTML = '';

    item.additives.forEach((add, index) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'modal-tab add';
      btn.innerHTML = `
        <span class="action-link">${index + 1}</span>
        <span class="action-link">${add.name}</span>
      `;
      btn.addEventListener('click', () => {
        if (currentAdds.has(add.name)) {
          currentAdds.delete(add.name);
          btn.classList.remove('modal-active-tab');
        } else {
          currentAdds.add(add.name);
          btn.classList.add('modal-active-tab');
        }
        updateTotal();
      });
      modalTabsAdd.appendChild(btn);
    });
  }

  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  function updateTotal() {
    if (!currentItem) return;

    let total = parseFloat(currentItem.price);

    const sizeData = currentItem.sizes[currentSize];
    if (sizeData) total += parseFloat(sizeData['add-price']);

    currentAdds.forEach(name => {
      const add = currentItem.additives.find(a => a.name === name);
      if (add) total += parseFloat(add['add-price']);
    });

    modalTotal.textContent = `$${total.toFixed(2)}`;
  }

  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    currentItem = null;
    currentAdds.clear();
  }

  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });
});