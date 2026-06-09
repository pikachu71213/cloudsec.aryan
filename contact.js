const EMAILJS_PUBLIC_KEY = 'O84XvhD_6Vbf5y5Uu';
const EMAILJS_SERVICE_ID = 'service_b4g0v4h';
const CONTACT_TEMPLATE_ID = 'template_kec0nvd';
const AUTOREPLY_TEMPLATE_ID = 'template_u0mbcdc';

emailjs.init({
  publicKey: EMAILJS_PUBLIC_KEY
});

const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const successPopup = document.getElementById('success-popup');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  submitBtn.disabled = true;

  try {

    // Send to you
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      CONTACT_TEMPLATE_ID,
      {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message
      }
    );

    // Send auto reply
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      AUTOREPLY_TEMPLATE_ID,
      {
        from_name: name,
        from_email: email,
        subject: subject
      }
    );

    contactForm.reset();
    successPopup.classList.add('show');

  } catch (error) {
    console.error(error);
    alert("Email sending failed. Check console.");
  }

  submitBtn.disabled = false;
});