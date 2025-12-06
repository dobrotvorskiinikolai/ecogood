(function () {
    const form = document.getElementById('orderForm');
    if (!form) return;
    const q = new URLSearchParams(location.search);
    const qProduct = q.get('product');
    if (qProduct) {
        const el = document.getElementById('product_name');
        if (el && !el.value) el.value = qProduct;
    }

    form.addEventListener('submit', async (ev) => {
        ev.preventDefault();
        const product = (form.product_name.value || '').trim();
        const quantity = Number(form.quantity.value) || 1;
        const delivery = form.delivery.value || 'pickup';
        if (!product) {
            alert('Введите наименование товара.');
            return;
        }

        const payload = { product_name: product, quantity, delivery, comment: form.comment.value || '' };

        try {
            const btn = document.getElementById('submitBtn');
            btn.disabled = true;
            btn.textContent = 'Отправка...';
            const res = await fetch('https://httpbin.org/post', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const json = await res.json();
            document.getElementById('result').innerHTML = '<h4>Сервер ответил</h4><pre>' + escapeHtml(JSON.stringify(json.json, null, 2)) + '</pre>';
        } catch (err) {
            document.getElementById('result').textContent = 'Ошибка отправки: ' + err;
        } finally {
            const btn = document.getElementById('submitBtn');
            btn.disabled = false;
            btn.textContent = 'Отправить заказ';
        }
    });

    function escapeHtml(s) { return s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;'); }
})();
