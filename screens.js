// Automatyczne wykrywanie grafik w screenshots/.
// Kazdy .screen-slot z atrybutem data-screen probuje wczytac wskazany plik.
// Jesli plik istnieje - podmienia placeholder na zdjecie. Jesli nie - placeholder zostaje.
(function () {
    function showImage(slot, src, alt) {
        slot.innerHTML =
            '<a class="screen-link" href="' + src + '" target="_blank">' +
            '<img src="' + src + '" alt="' + alt + '"></a>';
        slot.classList.add('has-image');
    }

    function initSlot(slot) {
        var src = slot.getAttribute('data-screen');
        if (!src) return;
        var alt = slot.getAttribute('data-alt') || '';
        var probe = new Image();
        probe.onload = function () {
            if (probe.naturalWidth > 0) { showImage(slot, src, alt); }
        };
        probe.src = src;
    }

    function init() {
        var slots = document.querySelectorAll('.screen-slot[data-screen]');
        for (var i = 0; i < slots.length; i++) { initSlot(slots[i]); }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
