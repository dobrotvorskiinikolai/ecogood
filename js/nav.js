// Load shared navigation, highlight current page and show current-location label
(function () {
    const placeholder = document.getElementById('nav-placeholder');
    if (!placeholder) return;

    // Create navigation HTML directly instead of loading from file
    const navHtml = `
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand d-flex align-items-center" href="index.html">
                    <span>EcoGoods</span>
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="mainNav">
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li class="nav-item"><a class="nav-link" href="index.html">Главная</a></li>
                        <li class="nav-item"><a class="nav-link" href="about.html">О нас</a></li>
                        <li class="nav-item"><a class="nav-link" href="shop.html">Каталог</a></li>
                        <li class="nav-item"><a class="nav-link" href="order.html">Заказать</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    `;

    // robust active-link detection
    const links = Array.from(document.querySelectorAll('#mainNav .nav-link'));
    const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    links.forEach(a => {
        a.classList.remove('active');
        a.removeAttribute('aria-current');
        const href = (a.getAttribute('href') || '').toLowerCase();
        // match exactly or match when index served as '/'
        if (href && (href === path || (href === 'index.html' && (path === '' || path === 'index.html')) || location.href.toLowerCase().endsWith(href))) {
            a.classList.add('active');
            a.setAttribute('aria-current', 'page');
        }
    });

    // show current location text in navbar (user-friendly)
    const container = document.querySelector('#nav-placeholder .container-fluid');
    if (container) {
        let loc = container.querySelector('#nav-current');
        if (!loc) {
            loc = document.createElement('span');
            loc.id = 'nav-current';
            loc.className = 'navbar-text ms-3';
            container.appendChild(loc);
        }
        const active = document.querySelector('#mainNav .nav-link.active');
        loc.textContent = active ? `Вы на странице: ${active.textContent.trim()}` : '';
    }
})();
