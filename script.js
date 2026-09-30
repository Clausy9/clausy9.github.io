const dialog = document.querySelector('#demo-dialog');
const video = dialog.querySelector('video');
const openButton = document.querySelector('#open-demo');
openButton.addEventListener('click', () => dialog.showModal());
dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
dialog.addEventListener('close', () => { video.pause(); openButton.focus(); });
const links = [...document.querySelectorAll('nav a')];
const observer = new IntersectionObserver(entries => {
  const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
  if (!visible.length) return;
  links.forEach(link => {
    if (link.hash === '#' + visible[0].target.id) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}, { rootMargin: '-10% 0px -60% 0px', threshold: 0 });
links.forEach(link => observer.observe(document.querySelector(link.hash)));
