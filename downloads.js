// Liczba pobrań wersji Trial pobierana z GitHub Releases.
// Element z atrybutem data-release-tag dostaje tekst z licznikiem.
// Gdy API nie odpowie lub wyczerpie się limit zapytań - element pozostaje
// ukryty, więc strona wygląda normalnie, bez komunikatu o błędzie.
(function () {
    var API = 'https://api.github.com/repos/hplspam1-jpg/HPL-ink-Software/releases';

    function show(slot, count) {
        var n = count.toLocaleString('pl-PL');
        slot.innerHTML =
            '<span class="lang-en">Downloads: ' + n + '</span>' +
            '<span class="lang-pl">Liczba pobrań: ' + n + '</span>';
        slot.hidden = false;
    }

    function fill(slots, releases) {
        for (var i = 0; i < slots.length; i++) {
            var tag = slots[i].getAttribute('data-release-tag');
            for (var j = 0; j < releases.length; j++) {
                if (releases[j].tag_name !== tag) { continue; }
                var assets = releases[j].assets || [];
                var total = 0;
                for (var k = 0; k < assets.length; k++) {
                    total += assets[k].download_count || 0;
                }
                show(slots[i], total);
                break;
            }
        }
    }

    function init() {
        var slots = document.querySelectorAll('[data-release-tag]');
        if (!slots.length || !window.fetch) { return; }
        fetch(API)
            .then(function (res) { return res.ok ? res.json() : null; })
            .then(function (releases) {
                if (releases && releases.length) { fill(slots, releases); }
            })
            .catch(function () { });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
