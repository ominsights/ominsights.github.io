(() => {
  const form = document.querySelector('#lead-form');
  if (!form) {
    return;
  }

  const endpoint = 'https://docs.google.com/forms/d/e/1FAIpQLScEwR41A03jGxikXqxtWz4mdYCtBhimOJ1J6vubNaqjoh2x-Q/formResponse';
  const fieldMap = {
    full_name: 'entry.1659241752',
    email: 'entry.1597987213',
    role: 'entry.715056374',
    firm: 'entry.1343436238',
  };

  const button = form.querySelector('button[type="submit"]');
  const message = form.querySelector('.form-message');

  const showMessage = (text, tone) => {
    if (!message) return;
    message.textContent = text;
    message.dataset.tone = tone;
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    showMessage('', '');

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    if (String(formData.get('website') || '').trim()) {
      showMessage("You're on the list. We'll reach out shortly to schedule your walkthrough.", 'success');
      form.reset();
      return;
    }

    const payload = new URLSearchParams();
    for (const [localName, googleField] of Object.entries(fieldMap)) {
      payload.append(googleField, String(formData.get(localName) || '').trim());
    }

    if (button) {
      button.disabled = true;
      button.dataset.originalText = button.textContent || '';
      button.textContent = 'Submitting...';
    }

    try {
      await fetch(endpoint, {
        method: 'POST',
        mode: 'no-cors',
        body: payload,
      });

      form.reset();
      showMessage("You're on the list. We'll reach out shortly to schedule your walkthrough.", 'success');
    } catch (error) {
      showMessage('We could not submit the request. Please email hello@ominsights.in and we will schedule it manually.', 'error');
    } finally {
      if (button) {
        button.disabled = false;
        button.innerHTML = 'Join the Demo List <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>';
      }
    }
  });
})();
