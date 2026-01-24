const menuButton = document.querySelector('#menuButton');
const nav = document.querySelector('nav');

menuButton.addEventListener('click', () => {
  nav.classList.toggle('open');

  menuButton.textContent = nav.classList.contains('open') ? '✖' : '☰';
});