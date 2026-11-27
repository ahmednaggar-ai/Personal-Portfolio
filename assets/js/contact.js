/*
 * Contact form submissions are sent through Web3Forms; the access key is
 * associated with the portfolio owner's email address.
 */
(function () {
    'use strict';

    var TO = 'ahossamnaggar@gmail.com';
    var form = document.getElementById('contactForm');
    if (!form) return;

    var status = form.querySelector('.contact__status');
    var submitButton = form.querySelector('[type="submit"]');
    var submitLabel = submitButton.querySelector('span');
    var originalLabel = submitLabel.textContent;
    var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function fieldError(input, message) {
        var field = input.closest('.contact__field');
        field.classList.toggle('has-error', !!message);
        input.setAttribute('aria-invalid', message ? 'true' : 'false');
    }

    function validate() {
        var firstBad = null;
        form.querySelectorAll('.contact__field input, .contact__field textarea').forEach(function (input) {
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

        status.textContent = '';
        status.className = 'contact__status';
        submitButton.disabled = true;
        submitLabel.textContent = 'Sending...';

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: new FormData(form)
        })
            .then(function (response) {
                return response.json().then(function (data) {
                    if (!response.ok || !data.success) {
                        throw new Error(data.message || 'Web3Forms rejected the submission.');
                    }
                    return data;
                });
            })
            .then(function () {
                status.textContent = 'Message sent successfully! I’ll get back to you soon.';
                status.className = 'contact__status is-ok';
                form.reset();
                form.querySelectorAll('.contact__field').forEach(function (field) {
                    field.classList.remove('has-error');
                    var input = field.querySelector('input, textarea');
                    if (input) input.setAttribute('aria-invalid', 'false');
                });
            })
            .catch(function (error) {
                console.error('Contact form submission failed:', error);
                status.textContent = 'Unable to send your message. Please try again or email ' + TO + ' directly.';
                status.className = 'contact__status is-error';
            })
            .then(function () {
                submitButton.disabled = false;
                submitLabel.textContent = originalLabel;
            });
    });
})();
