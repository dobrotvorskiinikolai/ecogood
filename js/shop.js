(function () {
    const products = [
        { id: 1, name: 'Бамбуковая щетка', price: 120, image: 'images/22b3e81599c611eab41e48a472b98150_33cd143ba0d011eb805a001a7dda7113.png' },
        { id: 2, name: 'Многоразовая бутылка', price: 850, image: 'images/bottle.jpg' },
        { id: 3, name: 'Набор многоразовых пакетов', price: 420, image: 'images/orig.webp' },
        { id: 4, name: 'Экологичная губка', price: 75, image: 'images/luffa-dish-washing-7.jpg' },
        { id: 5, name: 'Салфетки из бамбука', price: 200, image: 'images/bamboo.jpg' },
        { id: 6, name: 'Натуральное мыло', price: 160, image: 'images/mylo-lavanda.jpg' },
        { id: 7, name: 'Эко-лампа', price: 1250, image: 'images/eco-lamp.jpg' },
        { id: 8, name: 'Многоразовый стакан', price: 320, image: 'images/cap.webp' }
    ];

    const container = document.getElementById('products');
    if (!container) return;

    products.forEach(p => {
        const col = document.createElement('div');
        col.className = 'col-12 col-sm-6 col-md-4';
        col.innerHTML = `
      <div class="card h-100">
        <img src="${p.image}?w=600&q=60" class="card-img-top" alt="${p.name}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${p.name}</h5>
          <p class="card-text">Цена: ${p.price} ₽</p>
          <div class="mt-auto d-flex gap-2">
            <a class="btn btn-outline-primary btn-sm" href="order.html?product=${encodeURIComponent(p.name)}">Заказать</a>
            <button class="btn btn-success btn-sm add-cart" data-name="${p.name}" data-price="${p.price}">В корзину</button>
          </div>
        </div>
      </div>
    `;
        container.appendChild(col);
    });


    container.addEventListener('click', e => {
        if (e.target.matches('.add-cart')) {
            const name = e.target.dataset.name;
            const price = Number(e.target.dataset.price);
            const cart = JSON.parse(localStorage.getItem('ecogoods_cart') || '[]');
            cart.push({ name, price, ts: Date.now() });
            localStorage.setItem('ecogoods_cart', JSON.stringify(cart));
            e.target.textContent = 'Добавлено';
            e.target.disabled = true;
        }
    });
})();
