/*
 * Scroll reveal: each section's title and content fade in as they scroll into view.
 * Items that enter the screen together (cards, list rows) come in one after another.
 * Styles live in assets/css/theme.css ("Scroll reveal").
 *
 * This replaces Elementor's entrance animations, which were removed from index.html.
 */
(function () {
    'use strict';

    // Without animation support, still mark everything as seen (skill bars show their level)
    function showAll() {
        document.querySelectorAll('.sk__card').forEach(function (el) { el.classList.add('is-seen'); });
    }
    if (!('IntersectionObserver' in window)) return showAll();
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return showAll();

    // [selector, effect]  effect: up (default) | left | right | zoom
    var TARGETS = [
        ['.fn_cs_main_title .title_holder', 'up'],

        // About
        ['.fn_cs_about_text_slider .left_part', 'left'],
        ['.fn_cs_about_text_slider .right_part .desc_holder', 'up'],
        ['.fn_cs_about_text_slider .info_list li', 'up'],
        ['.fn_cs_about_text_slider .btn_list', 'up'],

        // Skills
        ['.sk__intro', 'up'],
        ['.sk__card', 'up'],

        // Tech logos
        ['.tech-marquee__title', 'up'],
        ['.tech-marquee__row', 'up'],

        // Creative Works
        ['.works__filters', 'up'],
        ['.works__card', 'up'],

        // Call-to-action bars
        ['.fn_cs_call_to_action .cta_holder', 'up'],

        // Education
        ['.edu__degree', 'up'],
        ['.edu__subtitle', 'up'],
        ['.edu__cert', 'up'],

        // Experience
        ['.xp__item', 'up'],

        // Quote
        ['.fn_cs_single_testimonial_parallax .content_holder', 'zoom'],

        // Contact
        ['.contact__intro', 'up'],
        ['.contact__card', 'up'],
        ['.contact__social', 'up'],
        ['.contact__form', 'right']
    ];

    var STAGGER = 90;      // ms between items that appear together
    var MAX_DELAY = 540;

    var observer = new IntersectionObserver(function (entries) {
        var visible = entries
            .filter(function (e) { return e.isIntersecting; })
            .sort(function (a, b) {
                return (a.boundingClientRect.top - b.boundingClientRect.top) ||
                       (a.boundingClientRect.left - b.boundingClientRect.left);
            });

        visible.forEach(function (entry, i) {
            var el = entry.target;
            el.style.setProperty('--reveal-delay', Math.min(i * STAGGER, MAX_DELAY) + 'ms');
            el.classList.add('is-revealed', 'is-seen');   // is-seen stays (used by skill bars)
            observer.unobserve(el);
            // once finished, hand the element back to its own styles (hover transitions etc.)
            window.setTimeout(function () {
                el.removeAttribute('data-reveal');
                el.classList.remove('is-revealed');
                el.style.removeProperty('--reveal-delay');
            }, 1500);
        });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

    TARGETS.forEach(function (t) {
        document.querySelectorAll(t[0]).forEach(function (el) {
            if (el.hasAttribute('data-reveal')) return;
            el.setAttribute('data-reveal', t[1]);
            observer.observe(el);
        });
    });
})();
