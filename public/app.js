const button = document.querySelector('[data-menu]');
const nav = document.querySelector('[data-nav]');
button?.addEventListener('click', () => nav?.classList.toggle('is-open'));
