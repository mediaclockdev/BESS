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

// Enquiry form — point this at your CRM / email endpoint
document.querySelectorAll('[data-enquiry]').forEach(function (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var note = form.querySelector('[data-result]');
    if (note) {
      note.textContent = 'Thank you — your enquiry has been received. Our team will respond within one business day.';
      note.style.color = '#1668D6';
    }
    form.reset();
  });
});
