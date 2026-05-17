(() => {
  const form = document.querySelector('#cta form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const panel = form.parentElement;
    if (!panel) return;

    panel.innerHTML = "<div class=\"flex flex-col items-start gap-3 py-6\"><div class=\"flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-circle-check h-5 w-5\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"10\"></circle><path d=\"m9 12 2 2 4-4\"></path></svg></div><h3 class=\"text-2xl text-primary-foreground\">You're on the list.</h3><p class=\"text-sm opacity-80\">We'll reach out shortly to schedule your walkthrough.</p></div>";
  });
})();
