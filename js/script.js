
  // ===== Typed.js for hero text =====
 if (window.Typed) {
  const typed = new Typed('.typed-text-output', {
    strings: [
      'Front-End Developer',
      'GATE Qualified',
      'Data Analytics Enthusiast',
      'DSA Problem Solver'
    ],
    typeSpeed: 60,          // typing speed (ms per character)
    backSpeed: 40,          // deleting speed
    backDelay: 1500,        // pause before deleting
    startDelay: 500,        // delay before starting typing
    loop: true,             // loop infinitely
    showCursor: true,       // show the blinking cursor
    cursorChar: '|',        // cursor style
    smartBackspace: true,   // only delete what's different between phrases
    preStringTyped: (arrayPos, self) => {
      // Optional: add separator before typing next string
      if(arrayPos > 0) self.el.innerHTML = '· '; 
    }
  });
}


  // ===== Auto-update footer year =====
  document.getElementById('year').textContent = new Date().getFullYear();

  // ===== Animate progress bars =====
  let progressAnimated = false;
  function animateProgress() {
    if(progressAnimated) return;
    document.querySelectorAll('.progress-bar').forEach(bar => {
      const value = bar.getAttribute('aria-valuenow');
      bar.style.width = value + '%';
    });
    progressAnimated = true;
  }
  window.addEventListener('load', animateProgress);

  // ===== Scroll fade-in effect =====
  function revealOnScroll() {
    const elements = document.querySelectorAll('.fade-in, .work-card, .testimonial-card');
    const windowHeight = window.innerHeight;
    elements.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < windowHeight - 100) el.classList.add('visible');
    });
  }
  window.addEventListener('scroll', () => { revealOnScroll(); animateProgress(); });
  window.addEventListener('load', () => { revealOnScroll(); animateProgress(); });

  // ===== Dark mode toggle with localStorage =====
  const darkToggle = document.getElementById('darkModeToggle');
  function setDarkMode(isDark) {
    document.body.classList.toggle('dark-mode', !!isDark);
    const icon = darkToggle.querySelector('i');
    if(icon){
      icon.classList.toggle('fa-moon', !isDark);
      icon.classList.toggle('fa-sun', isDark);
    }
    darkToggle.setAttribute('aria-pressed', !!isDark);
    localStorage.setItem('theme', (isDark ? 'dark' : 'light'));
  }
  (function(){
    const saved = localStorage.getItem('theme');
    if(saved === 'dark') setDarkMode(true);
    else if(saved === 'light') setDarkMode(false);
    else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
    }
  })();
  if(darkToggle) darkToggle.addEventListener('click', () => {
    setDarkMode(!document.body.classList.contains('dark-mode'));
  });

  // ===== CONTACT FORM: show modal, wait 5s, scroll home =====
  (function(){
    const form = document.getElementById('contact-form');
    const modal = document.getElementById('form-modal');
    const modalText = document.getElementById('form-modal-text');
    const modalOk = document.getElementById('form-modal-ok');

    function showModal(text, success = true) {
      modalText.textContent = text;
      modal.classList.add('open');
      modal.setAttribute('aria-hidden','false');
      if(success) modal.querySelector('.form-modal-box').classList.add('success');
    }
    function hideModal() {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden','true');
      modal.querySelector('.form-modal-box').classList.remove('success');
    }

    if(form){
      form.addEventListener('submit', function(e){
        e.preventDefault();
        const name = form.querySelector('input[name="name"]').value.trim();
        const email = form.querySelector('input[name="email"]').value.trim();
        const message = form.querySelector('textarea[name="message"]').value.trim();

        if(!name || !email || !message){
          document.getElementById('contact').scrollIntoView({behavior:'smooth'});
          showModal('⚠️ Please fill all required fields.', false);
          return;
        }

        showModal('✅ Your message has been sent successfully!');
        form.reset();

        // Wait 5 seconds, then hide modal and scroll home
        setTimeout(()=>{
          hideModal();
          const home = document.getElementById('home');
          if(home) home.scrollIntoView({behavior:'smooth'});
        },5000);
      });
    }

    // Click OK to hide modal & scroll home
    if(modalOk){
      modalOk.addEventListener('click', function(){
        hideModal();
        const home = document.getElementById('home');
        if(home) home.scrollIntoView({behavior:'smooth'});
      });
    }

    // Close modal with ESC
    document.addEventListener('keydown', function(ev){
      if(ev.key==='Escape') hideModal();
    });
  })();

