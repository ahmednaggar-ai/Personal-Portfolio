/*
 * Contact form: the site is static (no server), so sending opens the visitor's
 * email app with the message pre-filled, addressed to the portfolio owner.
 */
(function () {
    'use strict';

    var TO = 'ahossamnaggar@gmail.com';
    var form = document.getElementById('contactForm');
    if (!form) return;

    var status = form.querySelector('.contact__status');
    var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function fieldError(input, message) {
        var field = input.closest('.contact__field');
        field.classList.toggle('has-error', !!message);
        input.setAttribute('aria-invalid', message ? 'true' : 'false');
    }

    function validate() {
        var firstBad = null;
        form.querySelectorAll('input, textarea').forEach(function (input) {
            var value = input.value.trim();
            var bad = !value || (input.type === 'email' && !EMAIL_RE.test(value));
            fieldError(input, bad);
            if (bad && !firstBad) firstBad = input;
        });
        return firstBad;
    }

    // Clear an error as soon as the field is fixed
    form.addEventListener('input', function (e) {
        var field = e.target.closest('.contact__field');
        if (field && field.classList.contains('has-error')) validate();
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        var firstBad = validate();
        if (firstBad) {
            status.textContent = 'Please fill in all fields with a valid email.';
            status.className = 'contact__status is-error';
            firstBad.focus();
            return;
        }

        var f = form.elements;
        var name = f.namedItem('name').value.trim();
        var email = f.namedItem('email').value.trim();
        var subject = f.namedItem('subject').value.trim();
        var message = f.namedItem('message').value.trim();

        var body = message + '\n\n— ' + name + ' (' + email + ')';
        window.location.href = 'mailto:' + TO +
            '?subject=' + encodeURIComponent(subject) +
            '&body=' + encodeURIComponent(body);

        status.textContent = 'Your email app should open now. If it doesn’t, write to ' + TO + '.';
        status.className = 'contact__status is-ok';
    });
})();
