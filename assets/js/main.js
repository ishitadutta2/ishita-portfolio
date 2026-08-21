/*=============== SHOW & CLOSE MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Show menu */
if(navToggle){
   navToggle.addEventListener('click', () =>{
      navMenu.classList.add('show-menu')
   })
}

/* Hide menu */
if(navClose){
   navClose.addEventListener('click', () =>{
      navMenu.classList.remove('show-menu')
   })
}

/*=============== REMOVE MOBILE MENU ===============*/
const navLink = document.querySelectorAll('.nav__link, .nav__contact')

const linkAction = () =>{
   const navMenu = document.getElementById('nav-menu')
   // When we click on each nav__link, we remove the show-menu class
   navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== HOME TEXT CIRCULAR ===============*/
const homeText = document.getElementById('home-text')

if (homeText) {
   // Converts text into an array of characters
   const characters = homeText.dataset.text.split('')

   // Angle for each character; length counts the number of characters
   const angle = 360 / characters.length

   // Clears the original content
   homeText.innerHTML = ''

   // Iterates through each character
   characters.forEach((char, i) => {
      // Creates a <span> for each letter
      const span = document.createElement('span')

      // Inserts each character into the span
      span.textContent = char

      // Rotates each letter based on its index to form the circle
      span.style.transform = `rotate(${angle * i}deg)`

      // Appends the span to the main container
      homeText.appendChild(span)
   })
}

/*=============== HOME TYPED JS ===============*/
const homeTyped = document.getElementById('home-typed')

if (homeTyped && typeof Typed !== 'undefined') {
   // Insert professions
   new Typed('#home-typed', {
      strings: ['Web Developer', 'AI/ML Enthusiast', 'UI/UX Designer', 'Open Source Contributor'],
      typeSpeed: 70,
      backSpeed: 35,
      backDelay: 1400,
      loop: true
   })

   // Typed.js inserts its blinking cursor as a sibling right after the
   // #home-typed span. Since .home__role is a block element (so short and
   // long roles reliably start on their own line), that sibling cursor gets
   // pushed onto an empty line of its own below the role text. Moving it
   // inside the span keeps it glued to the end of the typed text instead.
   const attachCursor = () => {
      const cursorEl = homeTyped.parentNode.querySelector('.typed-cursor')
      if (cursorEl && cursorEl.parentNode !== homeTyped) {
         homeTyped.appendChild(cursorEl)
      }
   }
   attachCursor()
   new MutationObserver(attachCursor).observe(homeTyped.parentNode, { childList: true })
}

/*=============== CHANGE HEADER STYLES ===============*/
const header = document.getElementById('header')

const scrollHeader = () =>{
   if(header){
      if(window.scrollY >= 50) header.classList.add('scroll-header')
      else header.classList.remove('scroll-header')
   }
}
window.addEventListener('scroll', scrollHeader)

/*=============== SWIPER WORK ===============*/
try {
   if (typeof Swiper !== 'undefined' && document.querySelector('.work__swiper')) {
      new Swiper('.work__swiper', {
         loop: false,
         spaceBetween: 24,
         breakpoints: {
            0: { slidesPerView: 1 },
            540: { slidesPerView: 2 },
            1150: { slidesPerView: 3 }
         },
         pagination: {
            el: '.swiper-pagination',
            clickable: true
         }
      })
   }
} catch (err) {
   console.error('Swiper failed to initialize:', err)
}

/*=============== SERVICES ACCORDION ===============*/
const servicesHeaders = document.querySelectorAll('.services__header')

const closeAllServices = () => {
   document.querySelectorAll('.services__card').forEach(c => {
      c.classList.remove('services-open')
      c.querySelector('.services__data').style.maxHeight = null
   })
}

// It iterates over each button found
servicesHeaders.forEach((header) => {
   header.addEventListener('click', () => {
      const card = header.closest('.services__card')
      const data = card.querySelector('.services__data')

      // Get the class of the clicked button (.services__card) and check
      // already has the services-open class (Returns true or false)
      const isOpen = card.classList.contains('services-open')

      // Close all other services data
      closeAllServices()

      // If the clicked card was closed, open it and size it to its
      // real content height so nothing gets clipped
      if (!isOpen) {
         card.classList.add('services-open')
         data.style.maxHeight = data.scrollHeight + 'px'
      }
   })
})

// Keep open card sized correctly if content reflows (e.g. window resize)
window.addEventListener('resize', () => {
   const openCard = document.querySelector('.services-open')
   if (openCard) {
      openCard.querySelector('.services__data').style.maxHeight = 'none'
      const h = openCard.querySelector('.services__data').scrollHeight
      openCard.querySelector('.services__data').style.maxHeight = h + 'px'
   }
})

/*=============== CONTACT FORM ===============*/
/*
   Sends the contact form via FormSubmit (https://formsubmit.co), which needs
   no account and delivers straight to duttaishita112@gmail.com.

   IMPORTANT — one-time step: the very first submission to a new address goes
   to FormSubmit as an "activation" email instead of being forwarded, and
   FormSubmit's API still replies with a 200 OK for that case — it does NOT
   mean the message was delivered. The code below checks the actual
   `success` field in that response instead of trusting the HTTP status
   alone, so it can tell you honestly when that one-time step hasn't
   happened yet, rather than showing "sent" when nothing arrived.

   Open the activation email FormSubmit sends to duttaishita112@gmail.com
   (check spam too) and click "Activate Form" once; every submission after
   that delivers and reports success normally.

   The <form> itself has action/method set to FormSubmit directly, so it
   works as a real HTML form even without JavaScript. The code below upgrades
   that into an AJAX submit with an inline status message, and if the AJAX
   request can't go through at all (offline, blocked, CORS on a file://
   preview, etc.) it falls back to letting the form submit normally instead
   of silently failing.
*/
const contactForm = document.getElementById('contact-form')

if (contactForm) {
   contactForm.addEventListener('submit', function(e){
      const form = this
      const button = document.getElementById('contact-button')
      const status = document.getElementById('contact-status')

      // Simple honeypot check — if the hidden field got filled in, it's a
      // bot; let the native submit happen (FormSubmit's own spam handling
      // takes it from there) instead of pretending it sent.
      if (form._honey && form._honey.value) return

      // Prevent the page from reloading so we can show a status message
      e.preventDefault()

      const data = new FormData(form)

      button.textContent = 'Sending...'
      button.disabled = true
      status.style.display = 'none'

      fetch('https://formsubmit.co/ajax/duttaishita112@gmail.com', {
         method: 'POST',
         headers: { 'Accept': 'application/json' },
         body: data
      })
      .then(res => {
         if (!res.ok) return Promise.reject(new Error('http-error'))
         return res.json()
      })
      .then(json => {
         // FormSubmit returns HTTP 200 even when it hasn't actually
         // delivered the message (e.g. address not yet activated) — the
         // real result is in this `success` field, so check it explicitly.
         const delivered = json && (json.success === true || json.success === 'true')

         if (delivered) {
            status.textContent = 'Message sent successfully ✅'
            status.style.color = 'var(--first-color)'
            form.reset()
         } else {
            // Reached FormSubmit, but it says the message wasn't delivered —
            // almost always means this address hasn't been activated yet.
            status.textContent = "Almost there — FormSubmit needs a one-time confirmation. Check duttaishita112@gmail.com (and spam) for an activation email, click it once, then try again."
            status.style.color = '#F5A524'
         }

         status.style.display = 'block'
         button.textContent = 'Send message'
         button.disabled = false

         // Auto-hide after a bit — longer for the activation warning since
         // there's more to read and act on.
         setTimeout(() => { status.style.display = 'none' }, delivered ? 5000 : 12000)
      })
      .catch(() => {
         // The AJAX request itself couldn't go through (network/CORS issue) —
         // fall back to a real form submission so the message still has a
         // chance to send, rather than leaving the person thinking it failed
         // with no path forward.
         status.textContent = 'Submitting the form directly...'
         status.style.color = 'var(--text-color)'
         status.style.display = 'block'
         form.submit()
      })
   })
}

/*=============== RESUME MODAL (VIEW OR DOWNLOAD) ===============*/
const resumeModal = document.getElementById('resume-modal')
const resumeTriggers = document.querySelectorAll('.js-resume-trigger')
const resumeOverlay = document.getElementById('resume-modal-overlay')
const resumeClose = document.getElementById('resume-modal-close')
const resumeActions = document.querySelectorAll('.resume-modal__action')

const openResumeModal = (e) => {
   if (e) e.preventDefault()
   if (!resumeModal) return
   resumeModal.classList.add('show-modal')
   resumeModal.setAttribute('aria-hidden', 'false')
   // Close the mobile nav menu too, in case the trigger was inside it
   if (navMenu) navMenu.classList.remove('show-menu')
}

const closeResumeModal = () => {
   if (!resumeModal) return
   resumeModal.classList.remove('show-modal')
   resumeModal.setAttribute('aria-hidden', 'true')
}

resumeTriggers.forEach(t => t.addEventListener('click', openResumeModal))
if (resumeOverlay) resumeOverlay.addEventListener('click', closeResumeModal)
if (resumeClose) resumeClose.addEventListener('click', closeResumeModal)
// Once the person picks View or Download, let the click through (so the
// PDF actually opens/downloads) and just close the modal behind it
resumeActions.forEach(a => a.addEventListener('click', closeResumeModal))

document.addEventListener('keydown', (e) => {
   if (e.key === 'Escape') closeResumeModal()
})

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = document.getElementById('scroll-up')

const showScrollUp = () =>{
   if(scrollUp){
      if(window.scrollY >= 400) scrollUp.classList.add('show-scroll')
      else scrollUp.classList.remove('show-scroll')
   }
}
window.addEventListener('scroll', showScrollUp)

const scrollbar = document.getElementById('scrollbar')
const updateScrollbar = () => {
   if (scrollbar) {
      const h = document.documentElement
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100
      scrollbar.style.width = pct + '%'
   }
}
window.addEventListener('scroll', updateScrollbar)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('main section[id]')

const scrollActive = () =>{
   sections.forEach(sec =>{
      const sectionHeight = sec.offsetHeight
      const sectionTop = sec.offsetTop - 90
      const sectionId = sec.getAttribute('id')
      const sectionLink = document.querySelector(`.nav__menu a[href*="${sectionId}"]`)

      if(sectionLink){
         if(window.scrollY > sectionTop && window.scrollY <= sectionTop + sectionHeight){
            sectionLink.classList.add('active-link')
         } else {
            sectionLink.classList.remove('active-link')
         }
      }
   })
}
window.addEventListener('scroll', scrollActive)

/*=============== CUSTOM CURSOR ===============*/
const cursor = document.getElementById('cursor')
const cursorDot = document.getElementById('cursor-dot')

if (cursor && cursorDot && matchMedia('(hover: hover)').matches) {
   // Detects mouse movement and updates positions
   window.addEventListener('mousemove', (e) => {
      // Save position X
      const posX = e.clientX
      // Save position Y
      const posY = e.clientY

      // The dot snaps to the pointer instantly for precision...
      cursorDot.style.left = posX + 'px'
      cursorDot.style.top = posY + 'px'

      // ...while the outer ring eases toward it (its CSS transition on
      // left/top is what creates the soft trailing motion).
      cursor.style.left = posX + 'px'
      cursor.style.top = posY + 'px'
   })

   /* Grow + glow the ring on interactive elements, and hide the dot */
   document.querySelectorAll('a, button, .services__card, .about__card, .certifications__card').forEach(el => {
      el.addEventListener('mouseenter', () => {
         cursor.classList.add('link-hover')
         cursorDot.classList.add('link-hover')
      })
      el.addEventListener('mouseleave', () => {
         cursor.classList.remove('link-hover')
         cursorDot.classList.remove('link-hover')
      })
   })
}

/*=============== SCROLLREVEAL ANIMATION ===============*/
if (typeof ScrollReveal !== 'undefined') {
   const sr = ScrollReveal({
      origin: 'bottom',
      distance: '2rem',
      duration: 800,
      delay: 100,
      reset: false
   })

   sr.reveal('.home__data', {})
   sr.reveal('.home__image-container', { delay: 200 })
   sr.reveal('.about__card', { interval: 100 })
   sr.reveal('.about__info-item', { interval: 80 })
   sr.reveal('.work__card', { interval: 100 })
   sr.reveal('.services__card', { interval: 100 })
   sr.reveal('.skills__group', { interval: 100 })
   sr.reveal('.timeline__item', { interval: 120 })
   sr.reveal('.certifications__card', { interval: 100 })
   sr.reveal('.contact__data', {})
   sr.reveal('.contact__form', { delay: 200 })
   sr.reveal('.footer__title', {})
}
