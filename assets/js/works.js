/*
 * Creative Works: category filter for the project cards.
 * Clicking a card opens the full screenshot through the existing
 * portfolio modal in index.html (it listens for .portfolio-item clicks).
 */
(function () {
    'use strict';

    var root = document.querySelector('.works');
    if (!root) return;

    var filters = root.querySelectorAll('.works__filter');
    var items = root.querySelectorAll('.works__item');
    var empty = root.querySelector('.works__empty');
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var hideTimer;

    function countFor(filter) {
        if (filter === 'all') return items.length;
        return root.querySelectorAll('.works__item[data-category="' + filter + '"]').length;
    }

    // Show how many projects each filter has, and hide filters with none
    filters.forEach(function (btn) {
        var n = countFor(btn.getAttribute('data-filter'));
        btn.querySelector('.works__count').textContent = n;
        if (n === 0) btn.hidden = true;
    });

    function apply(filter) {
        var shown = 0;
        window.clearTimeout(hideTimer);

        items.forEach(function (item) {
            var match = filter === 'all' || item.getAttribute('data-category') === filter;
            if (match) {
                shown++;
                item.hidden = false;
                // next frame so the fade-in transition runs after un-hiding
                window.requestAnimationFrame(function () { item.classList.remove('is-out'); });
            } else {
                item.classList.add('is-out');
            }
        });

        // Remove filtered-out cards from the layout once they have faded
        hideTimer = window.setTimeout(function () {
            items.forEach(function (item) {
                if (item.classList.contains('is-out')) item.hidden = true;
            });
        }, reduceMotion ? 0 : 250);

        if (empty) empty.hidden = shown > 0;
    }

    filters.forEach(function (btn) {
        btn.addEventListener('click', function () {
            filters.forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
            apply(btn.getAttribute('data-filter'));
        });
    });
})();
