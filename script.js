// DOM elements (reuse your existing variables or replace with these)
const welcomeSection = document.getElementById('welcome-section');
const optionAButton = document.getElementById('option-a-btn');
const optionBButton = document.getElementById('option-b-btn');
const formContainer = document.getElementById('form-container');
const externalForm = document.getElementById('external-form');
const captchaQuestion = document.getElementById('captcha-question');
const captchaAnswer = document.getElementById('captcha-answer');
const submitBtn = document.getElementById('submit-btn');
const form = document.getElementById('crm_lead-form_2');
const thankYou = document.getElementById('thank-you-message');
const externalEmbed = document.getElementById('external-embed');

let correctAnswer;

// helper to generate captcha
function generateCaptcha() {
  const a = Math.floor(Math.random() * 5) + 1;
  const b = Math.floor(Math.random() * 5) + 1;
  correctAnswer = a + b;
  if (captchaQuestion) captchaQuestion.textContent = `What is ${a} + ${b}?`;
  if (captchaAnswer) captchaAnswer.value = '';
  if (submitBtn) submitBtn.classList.add('hidden');
}

// central view switcher
function showView(view) {
  // view: 'welcome' | 'a' | 'b'
  welcomeSection.classList.toggle('hidden', view !== 'welcome');
  formContainer.classList.toggle('hidden', view !== 'a');
  externalForm.classList.toggle('hidden', view !== 'b');

  // if showing internal form, (re)generate captcha
  if (view === 'a') {
    generateCaptcha();
  }
}

// push a history state and show view
function goTo(view, urlPath) {
  // only push state if the current path is different (avoids duplicate entries)
  if (location.pathname !== urlPath) {
    history.pushState({ view }, "", urlPath);
  } else {
    // replace state so popstate works properly if needed
    history.replaceState({ view }, "", urlPath);
  }
  showView(view);
}

// Option A - Show normal form + change URL
optionAButton.addEventListener('click', () => {
  goTo('a', '/news');
});

// Option B - Show external form + change URL
optionBButton.addEventListener('click', () => {
  goTo('b', '/updates');

  // If externally embedding code dynamically, inject it here.
  // Example: externalEmbed.innerHTML = '<iframe src="..."></iframe>';
  // If your embed is already present in HTML, you can optionally adjust
  // an iframe min-height to be viewport-friendly:
  const iframe = externalEmbed.querySelector('iframe');
  if (iframe) {
    // set a safe max height so embed doesn't overflow the page
    iframe.style.minHeight = Math.min(window.innerHeight * 0.75, 1000) + 'px';
  }
});

// When user uses Back/Forward buttons, popstate fires — update UI
window.addEventListener('popstate', (event) => {
  // Prefer state if available; otherwise derive from location.pathname
  const state = event.state;
  if (state && state.view) {
    showView(state.view);
    return;
  }
  // Fallback by pathname
  const path = location.pathname.replace(/\/$/, ""); // remove trailing slash
  if (path === '/something') {
    showView('a');
  } else if (path === '/otherthing') {
    showView('b');
  } else {
    showView('welcome');
  }
});

// On initial load, show view based on URL
(function initFromPath() {
  // ensure there's a reasonable state for popstate navigation
  const path = location.pathname.replace(/\/$/, "");
  if (path === '/something') {
    history.replaceState({ view: 'a' }, "", path || "/news");
    showView('a');
  } else if (path === '/otherthing') {
    history.replaceState({ view: 'b' }, "", path || "/updates");
    showView('b');
  } else {
    history.replaceState({ view: 'welcome' }, "", path || "/");
    showView('welcome');
  }
})();

// CAPTCHA validation to reveal submit button (same logic as before)
if (captchaAnswer) {
  captchaAnswer.addEventListener('input', () => {
    if (parseInt(captchaAnswer.value, 10) === correctAnswer) {
      submitBtn.classList.remove('hidden');
    } else {
      submitBtn.classList.add('hidden');
    }
  });
}

// Form submission
if (form) {
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    form.classList.add('hidden');
    thankYou.classList.remove('hidden');
    console.log("Form submitted successfully");
  });
}
