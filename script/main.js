// Nav turns solid once scrolled past the hero band
var nav = document.querySelector('.nav');
function navState() {
  if (!nav) return;
  nav.classList.toggle('is-solid', window.scrollY > 40);
}
navState();
window.addEventListener('scroll', navState, { passive: true });

// Mobile menu
var burger = document.querySelector('[data-burger]');
var menu = document.getElementById('menu');
if (burger && menu) {
  burger.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
  });
}

// Scroll reveal
var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var targets = document.querySelectorAll('.reveal, .wue');
if (reduce || !('IntersectionObserver' in window)) {
  targets.forEach(function (el) { el.classList.add('is-in'); });
} else {
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  targets.forEach(function (el) { io.observe(el); });
}

// Phone fields: drop anything that isn't a digit, space, +, ( ) or -
document.querySelectorAll('input[type="tel"]').forEach(function (el) {
  el.addEventListener('input', function () {
    var clean = el.value.replace(/[^0-9 +()\-]/g, '');
    if (clean !== el.value) el.value = clean;
  });
});

// Enquiry form — point this at your CRM / email endpoint
document.querySelectorAll('[data-enquiry]').forEach(function (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var firstBad = null;
    form.querySelectorAll('input, select, textarea').forEach(function (el) {
      var field = el.closest('.field');
      var err = field.querySelector('.field__err');
      if (err) err.remove();
      field.classList.remove('is-invalid');
      el.removeAttribute('aria-invalid');
      if (el.required && !el.value.trim()) el.value = '';
      if (el.checkValidity()) return;
      var v = el.validity;
      var msg = v.valueMissing ? 'This field is required.'
        : v.typeMismatch ? 'Enter a valid email address.'
        : v.patternMismatch ? 'Enter a valid phone number.'
        : v.tooShort ? 'Please enter at least ' + el.minLength + ' characters.'
        : el.validationMessage;
      err = document.createElement('span');
      err.className = 'field__err';
      err.id = el.id + '-err';
      err.textContent = msg;
      field.appendChild(err);
      field.classList.add('is-invalid');
      el.setAttribute('aria-invalid', 'true');
      el.setAttribute('aria-describedby', err.id);
      if (!firstBad) firstBad = el;
    });
    if (firstBad) { firstBad.focus(); return; }
    var note = form.querySelector('[data-result]');
    if (note) {
      note.textContent = 'Thank you — your enquiry has been received. Our team will respond within one business day.';
      note.style.color = '#1668D6';
    }
    form.reset();
  });
});
