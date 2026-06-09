// LENIS SCROLL
if (document.querySelector('script[src*="lenis"]')) {
  const lenis = new Lenis({ autoRaf: true });
  lenis.on('scroll', (e) => { console.log(e); });
}




// CURSOR
const cursor = document.getElementById('cursor');
if (cursor) {
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.12;
    cursorY += (mouseY - cursorY) * 0.12;
    cursor.style.transform = `translate(calc(${cursorX}px - 50%), calc(${cursorY}px - 50%))`;
    requestAnimationFrame(animateCursor);
  }

  animateCursor();
}




// PRELOADER
// kill browser scroll restoration
history.scrollRestoration = 'manual';
// lock scroll immediately on page load
document.body.style.overflow = 'hidden';
// strip hash
if (window.location.hash) {
  history.replaceState(null, '', window.location.pathname);
  window.scrollTo(0, 0);
}

const preloader = document.querySelector('.preloader');
const logo = document.querySelector('.preloader-logo');
const copy = document.querySelector('.preloader-copy');
const words = document.querySelectorAll('.word');
// step 2: fade in logo + copy
setTimeout(() => {
  logo.style.opacity = '1';
  copy.style.opacity = '1';
}, 200);
// step 3: words slide up one by one
words.forEach((word, i) => {
  setTimeout(() => {
    word.style.translate = '0 0';
  }, 400 + i * 200); // stagger each word
});
// step 4: wipe exit
setTimeout(() => {
  preloader.classList.add('exit');
}, 1500);
// remove from DOM after exit
setTimeout(() => {
  preloader.remove();
  document.body.style.overflow = ''; // re-enable scroll if you locked it
  lenis.start();
}, 2000);