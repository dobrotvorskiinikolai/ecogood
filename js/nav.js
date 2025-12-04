// Load shared navigation, highlight current page and show current-location label
(function () {
    const placeholder = document.getElementById('nav-placeholder');
    if (!placeholder) return;
    fetch('nav.html').then(r => r.text()).then(html => {
        placeholder.innerHTML = html;

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
    }).catch(err => console.error('nav load:', err));
})();
