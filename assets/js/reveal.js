/*
 * Scroll reveal: each section's title and content fade in as they scroll into view.
 * Items that enter the screen together (cards, list rows) come in one after another.
 * Styles live in assets/css/theme.css ("Scroll reveal").
 *
 * This replaces Elementor's entrance animations, which were removed from index.html.
 */
(function () {
    'use strict';

    if (!('IntersectionObserver' in window)) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // [selector, effect]  effect: up (default) | left | right | zoom
    var TARGETS = [
        ['.fn_cs_main_title .title_holder', 'up'],

        // About
        ['.fn_cs_about_text_slider .left_part', 'left'],
        ['.fn_cs_about_text_slider .right_part .desc_holder', 'up'],
        ['.fn_cs_about_text_slider .info_list li', 'up'],
        ['.fn_cs_about_text_slider .btn_list', 'up'],

        // Skills
        ['.elementor-widget-frel-progress-bar-with-desc .left_part', 'left'],
        ['.elementor-widget-frel-progress-bar-with-desc .right_part', 'right'],

        // Tech logos
        ['.tech-marquee__title', 'up'],
        ['.tech-marquee__row', 'up'],

        // Creative Works
        ['.works__filters', 'up'],
        ['.works__card', 'up'],

        // Call-to-action bars
        ['.fn_cs_call_to_action .cta_holder', 'up'],

        // Education
        ['.fn_cs_why_choose_us .left_part', 'left'],
        ['.fn_cs_why_choose_us .right_part .info_list li', 'up'],

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
            el.classList.add('is-revealed');
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
