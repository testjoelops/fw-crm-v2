// --- MAIN ELEMENTS ---
const welcomeSection = document.getElementById('welcome-section');
const optionAButton = document.getElementById('option-a-btn');
const optionBButton = document.getElementById('option-b-btn');
const formContainer = document.getElementById('form-container');
const externalForm = document.getElementById('external-form');
const captchaQuestion = document.getElementById('captcha-question');
const captchaAnswer = document.getElementById('captcha-answer');
const submitBtn = document.getElementById('submit-btn');
const form = document.getElementById('crm_lead-form');
const thankYou = document.getElementById('thank-you-message');

// --- CAPTCHA VARIABLES ---
let correctAnswer;

// Generate random captcha
function generateCaptcha() {
    const a = Math.floor(Math.random() * 5) + 1; // 1–5
    const b = Math.floor(Math.random() * 5) + 1;
    correctAnswer = a + b;
    captchaQuestion.textContent = `What is ${a} + ${b}?`;
}

// Option A - Show normal form
optionAButton.addEventListener('click', () => {
    welcomeSection.classList.add('hidden');
    externalForm.classList.add('hidden');
    formContainer.classList.remove('hidden');

    generateCaptcha();
});

// Option B - Show external form
optionBButton.addEventListener('click', () => {
    welcomeSection.classList.add('hidden');
    formContainer.classList.add('hidden');
    externalForm.classList.remove('hidden');
});

// CAPTCHA validation (show submit button only if correct)
captchaAnswer.addEventListener('input', () => {
    if (parseInt(captchaAnswer.value) === correctAnswer) {
        submitBtn.classList.remove('hidden');
    } else {
        submitBtn.classList.add('hidden');
    }
});

// Form submission
form.addEventListener('submit', function(event) {
    event.preventDefault();
    form.classList.add('hidden');
    thankYou.classList.remove('hidden');
    console.log("Form submitted successfully");
});
