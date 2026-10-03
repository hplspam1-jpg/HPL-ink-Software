// Przycisk "Buy Me a Coffee" + okno z adresem PayPal.
// Strona glowna: przycisk w pasku nawigacji.
// Strony programow: przycisk obok przycisku pobierania (ostatnia sekcja z pobieraniem).
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

    function makeButton(modal) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'coffee-btn';
        btn.textContent = '☕ Buy Me a Coffee';
        btn.addEventListener('click', modal.open);
        return btn;
    }

    function init() {
        if (document.querySelector('.coffee-btn')) { return; }
        var modal = buildModal();
        var isProductPage = !!document.querySelector('.product-layout');

        if (isProductPage) {
            // Obok przycisku pobierania programu (ostatnia sekcja z .download-box).
            var boxes = document.querySelectorAll('.download-box');
            var box = boxes.length ? boxes[boxes.length - 1] : null;
            if (box) {
                var dl = box.querySelector('a.download-btn, span.download-btn');
                var btn = makeButton(modal);
                if (dl) {
                    var wrap = document.createElement('div');
                    wrap.className = 'dl-actions';
                    dl.parentNode.insertBefore(wrap, dl);
                    wrap.appendChild(dl);
                    wrap.appendChild(btn);
                } else {
                    box.appendChild(btn);
                }
                return;
            }
        }

        // Strona glowna (lub brak sekcji pobierania) - przycisk w nawigacji.
        var nav = document.querySelector('.navlinks');
        if (!nav) { return; }
        var navBtn = makeButton(modal);
        var langSwitch = nav.querySelector('.lang-switch');
        if (langSwitch) { nav.insertBefore(navBtn, langSwitch); } else { nav.appendChild(navBtn); }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
