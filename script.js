///// Declarations /////
// Nav Mobile
const navListItems = document.querySelector('.nav_list--container');
const navListToggle = document.querySelector('.nav_menu-toggle');
const navLinks = document.querySelectorAll('.nav-link');

// Light / Dark //
const lightDarkToggle = document.querySelector('.light_dark--toggle');
const body = document.querySelector('body');
const moon = document.querySelector('.moon');
const sun = document.querySelector('.sun');

// About Tabs //
const aboutTabs = document.querySelector('#about__tabs');
const articles = document.querySelectorAll('.content');
const btns = document.querySelectorAll('.tab-btn');

// Projects //
const nextBtn = document.querySelector('.arrow-btn.next');
const prevBtn = document.querySelector('.arrow-btn.prev');
const track = document.getElementById('projectsTrack');

// Reveal //
const reveals = document.querySelectorAll('.reveal');
const revealsLeft = document.querySelectorAll('.reveal-left');
const revealsRight = document.querySelectorAll('.reveal-right');

// Form //
const formContainer = document.querySelector('.form__container');

// Year //
const yearEl = document.querySelector('.current-year');

///// Navbar Mobile Menu Toggle /////
navListToggle.addEventListener('click', () => {
  navListToggle.classList.toggle('toggle-active');
  navListItems.classList.toggle('toggle-active');
  body.classList.toggle('non-scroll');
})

///// Close mobile menu on link click ////
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navListToggle.classList.remove('toggle-active');
    navListItems.classList.remove('toggle-active');
    body.classList.remove('non-scroll');
  })
})

///// Dark Mode Toggle /////
lightDarkToggle.addEventListener('click', () => {
  if (body.classList.contains('dark-mode')) {
    body.classList.remove('dark-mode');
    sun.classList.add('inactive');
    moon.classList.remove('inactive');
  } else {
    body.classList.add('dark-mode');
    sun.classList.remove('inactive');
    moon.classList.add('inactive');
  }
  localStorage.setItem('mode', body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode');
});

// Local Storage //
const savedMode = localStorage.getItem('mode');
if (savedMode) {
  body.classList.add(savedMode);
  if (savedMode === 'dark-mode') {
    sun.classList.remove('inactive');
    moon.classList.add('inactive');
  } else {
    sun.classList.add('inactive');
    moon.classList.remove('inactive');
  }
}

///// About Container Tabs /////
aboutTabs.addEventListener('click', function (e) {
  const id = e.target.dataset.id;
  if (id) {
    // remove active from other buttons
    btns.forEach(function (btn) {
      btn.classList.remove('active-btn');
      e.target.classList.add('active-btn');
    })
    // hide other articles
    articles.forEach(function (article) {
      article.classList.remove('active-content');
    })
    const element = document.getElementById(id);
    element.classList.add('active-content');
  }
});

///// Carousel /////
function getStep() {
  const firstCard = track.querySelector('.card');
  if (!firstCard) return 0;
  const styles = getComputedStyle(track);
  const gap = parseFloat(styles.columnGap || styles.gap || 0);
  const cardWidth = firstCard.getBoundingClientRect().width;
  return cardWidth + gap;
}

function updateButtons() {
  // disable prev when at far left, next when at far right
  const maxScrollLeft = track.scrollWidth - track.clientWidth;
  prevBtn.disabled = track.scrollLeft <= 0;
  nextBtn.disabled = track.scrollLeft >= maxScrollLeft - 1;
}

function scrollByStep(direction = 1) {
  const step = getStep();
  track.scrollBy({ left: step * direction, behavior: 'smooth' });
}

nextBtn.addEventListener('click', () => scrollByStep(1));
prevBtn.addEventListener('click', () => scrollByStep(-1));

// Keep buttons accurate during manual scroll/resize
track.addEventListener('scroll', updateButtons, { passive: true });
window.addEventListener('resize', updateButtons);

// Keyboard support: left/right arrows when track is focused
track.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') { e.preventDefault(); scrollByStep(1); }
  if (e.key === 'ArrowLeft') { e.preventDefault(); scrollByStep(-1); }
});

// Initial state
updateButtons();

///// Element Reveal on Scroll /////
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      // Optional: unobserve so it only animates once
      observer.unobserve(entry.target);
      console.log('intersected');
    }
  });
}, { threshold: 0.8 });

reveals.forEach(reveal => observer.observe(reveal));
revealsLeft.forEach(reveal => observer.observe(reveal));
revealsRight.forEach(reveal => observer.observe(reveal));

///// emailJS /////
function sendEmail() {
  const templateParams = {
    name: document.querySelector('#name').value,
    email: document.querySelector('#email').value,
    subject: document.querySelector('#subject').value,
    message: document.querySelector('#message').value,
  };

  emailjs
    .send(`service_jhg4th6`, 'template_aqo74hy', templateParams,).then(
      () => alert('Email sent!').catch(() => alert('Email not sent...')));
}


///// Element Reveal on Scroll /////
const currentYear = new Date();
yearEl.textContent = currentYear.getFullYear();