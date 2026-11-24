/*
 * Theme switcher: accent color + light/dark mode, saved in localStorage.
 * The inline snippet in <head> applies the saved theme before first paint;
 * this file builds the floating picker and handles changes.
 */
(function () {
    'use strict';

    var STORAGE_KEY = 'portfolio-theme';
    var DEFAULTS = { color: 'orange', mode: 'auto' };
    var COLORS = [
        { id: 'orange', name: 'Orange', hex: '#D17500' },
        { id: 'blue', name: 'Blue', hex: '#2f6fdf' },
        { id: 'emerald', name: 'Emerald', hex: '#0e9a6c' },
        { id: 'purple', name: 'Purple', hex: '#7a4ee6' },
        { id: 'rose', name: 'Rose', hex: '#e0244f' },
        { id: 'teal', name: 'Teal', hex: '#0f8f8a' }
    ];
    var MODES = ['auto', 'light', 'dark']; // 'auto' follows the OS setting
    var systemDark = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
    var root = document.documentElement;

    function load() {
        var saved = {};
        try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch (e) { /* ignore */ }
        return {
            color: COLORS.some(function (c) { return c.id === saved.color; }) ? saved.color : DEFAULTS.color,
            mode: MODES.indexOf(saved.mode) > -1 ? saved.mode : DEFAULTS.mode
        };
    }

    function save(theme) {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(theme)); } catch (e) { /* storage disabled */ }
    }

    function apply(theme, animate) {
        if (animate) {
            root.classList.add('theme-transition');
            window.setTimeout(function () { root.classList.remove('theme-transition'); }, 400);
        }
        root.setAttribute('data-theme', theme.color);
        root.setAttribute('data-mode', resolveMode(theme.mode));
    }

    function resolveMode(mode) {
        if (mode !== 'auto') return mode;
        return systemDark && systemDark.matches ? 'dark' : 'light';
    }

    function build(theme) {
        var wrap = document.createElement('div');
        wrap.className = 'theme-switcher';
        wrap.innerHTML =
            '<div class="theme-switcher__panel" id="theme-switcher-panel" role="dialog" aria-label="Theme settings">' +
                '<span class="theme-switcher__label">Mode</span>' +
                '<div class="theme-switcher__mode">' +
                    '<button type="button" data-mode="auto">System</button>' +
                    '<button type="button" data-mode="light">Light</button>' +
                    '<button type="button" data-mode="dark">Dark</button>' +
                '</div>' +
                '<span class="theme-switcher__label" id="theme-switcher-colors">Color</span>' +
                '<div class="theme-switcher__swatches" role="radiogroup" aria-labelledby="theme-switcher-colors">' +
                    COLORS.map(function (c) {
                        return '<button type="button" role="radio" class="theme-switcher__swatch" data-color="' + c.id +
                            '" style="--swatch:' + c.hex + '" aria-label="' + c.name + '" title="' + c.name + '"></button>';
                    }).join('') +
                '</div>' +
            '</div>' +
            '<button type="button" class="theme-switcher__toggle" aria-label="Change theme" aria-expanded="false" aria-controls="theme-switcher-panel">' +
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
                    '<path d="M12 22a10 10 0 1 1 10-10c0 2.8-2.2 4-4 4h-1.8a2 2 0 0 0-1.4 3.4A1.6 1.6 0 0 1 12 22z"/>' +
                    '<circle cx="7.5" cy="10.5" r="1.2"/><circle cx="12" cy="7" r="1.2"/><circle cx="16.5" cy="10.5" r="1.2"/>' +
                '</svg>' +
            '</button>';
        document.body.appendChild(wrap);

        var toggle = wrap.querySelector('.theme-switcher__toggle');

        function sync() {
            wrap.querySelectorAll('[data-mode]').forEach(function (b) {
                b.setAttribute('aria-pressed', String(b.getAttribute('data-mode') === theme.mode));
            });
            wrap.querySelectorAll('[data-color]').forEach(function (b) {
                b.setAttribute('aria-checked', String(b.getAttribute('data-color') === theme.color));
            });
        }

        function setOpen(open) {
            wrap.classList.toggle('is-open', open);
            toggle.setAttribute('aria-expanded', String(open));
        }

        toggle.addEventListener('click', function () {
            setOpen(!wrap.classList.contains('is-open'));
        });

        wrap.addEventListener('click', function (e) {
            var btn = e.target.closest('button[data-mode], button[data-color]');
            if (!btn || !wrap.contains(btn)) return;
            if (btn.hasAttribute('data-mode')) theme.mode = btn.getAttribute('data-mode');
            if (btn.hasAttribute('data-color')) theme.color = btn.getAttribute('data-color');
            apply(theme, true);
            save(theme);
            sync();
        });

        document.addEventListener('click', function (e) {
            if (!wrap.contains(e.target)) setOpen(false);
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && wrap.classList.contains('is-open')) {
                setOpen(false);
                toggle.focus();
            }
        });

        sync();
    }

    var theme = load();
    apply(theme, false);

    // Re-apply when the OS switches light/dark while the user is on 'auto'
    if (systemDark) {
        var onSystemChange = function () { if (theme.mode === 'auto') apply(theme, true); };
        if (systemDark.addEventListener) systemDark.addEventListener('change', onSystemChange);
        else if (systemDark.addListener) systemDark.addListener(onSystemChange);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { build(theme); });
    } else {
        build(theme);
    }
})();
