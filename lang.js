// Prosty przełącznik języka EN/PL. Domyślny język: angielski.
// Wybór jest zapamiętywany w localStorage pod kluczem "hpl-lang".
(function () {
    function apply(lang) {
        document.body.classList.toggle('pl', lang === 'pl');
        document.documentElement.lang = lang;
        var buttons = document.querySelectorAll('.lang-switch button');
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].classList.toggle('active', buttons[i].getAttribute('data-setlang') === lang);
        }
        try { localStorage.setItem('hpl-lang', lang); } catch (e) { }
    }

    function init() {
        var lang = 'en';
        try { lang = localStorage.getItem('hpl-lang') || 'en'; } catch (e) { }
        if (lang !== 'pl') { lang = 'en'; }
        apply(lang);
        var buttons = document.querySelectorAll('.lang-switch button');
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', function () {
                apply(this.getAttribute('data-setlang'));
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
