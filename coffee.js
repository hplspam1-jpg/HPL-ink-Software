// Przycisk "Buy Me a Coffee" + okno z adresem PayPal.
// Wstawiany na każdą stronę przez jeden plik, bez dublowania w HTML.
(function () {
    var PAYPAL = 'noname8745@protonmail.com';

    function buildModal() {
        var overlay = document.createElement('div');
        overlay.className = 'coffee-modal';
        overlay.hidden = true;
        overlay.innerHTML =
            '<div class="coffee-dialog" role="dialog" aria-modal="true" aria-label="Buy Me a Coffee">' +
            '<button type="button" class="coffee-close" aria-label="Close">×</button>' +
            '<div class="coffee-emoji">☕</div>' +
            '<h3><span class="lang-en">Do you want to support what I do?</span>' +
            '<span class="lang-pl">Chcesz wesprzeć to, co robię?</span></h3>' +
            '<p class="coffee-paypal">PayPal: <strong>' + PAYPAL + '</strong></p>' +
            '<button type="button" class="coffee-copy"><span class="lang-en">Copy address</span>' +
            '<span class="lang-pl">Kopiuj adres</span></button>' +
            '</div>';
        document.body.appendChild(overlay);

        function close() { overlay.hidden = true; }
        overlay.addEventListener('click', function (e) { if (e.target === overlay) { close(); } });
        overlay.querySelector('.coffee-close').addEventListener('click', close);
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { close(); } });

        var copy = overlay.querySelector('.coffee-copy');
        copy.addEventListener('click', function () {
            try {
                navigator.clipboard.writeText(PAYPAL);
                copy.classList.add('done');
            } catch (e) { }
        });

        return { open: function () { overlay.hidden = false; } };
    }

    function init() {
        var nav = document.querySelector('.navlinks');
        if (!nav || nav.querySelector('.coffee-btn')) { return; }

        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'coffee-btn';
        btn.textContent = '☕ Buy Me a Coffee';

        var langSwitch = nav.querySelector('.lang-switch');
        if (langSwitch) { nav.insertBefore(btn, langSwitch); } else { nav.appendChild(btn); }

        var modal = buildModal();
        btn.addEventListener('click', modal.open);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
