/* =====================================================
   Viewport Height Fix for Mobile Browsers
   Sets --vh CSS variable to actual viewport height
===================================================== */
function setVhProperty() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setVhProperty();

window.addEventListener('resize', setVhProperty);
window.addEventListener('orientationchange', setVhProperty);
// setInterval(setVhProperty, 500);

/* =====================================================
   Resume section tabs and tab contents
===================================================== */
const resumeTabs = document.querySelector(".resume-tabs");
const resumePortfolioTabBtns = resumeTabs.querySelectorAll(".tab-btn");
const resumeTabContents = document.querySelectorAll(".resume-tab-content");

var resumeTabNav = function(resumeTabClick){
   resumeTabContents.forEach((resumeTabContent) => {
      resumeTabContent.style.display = "none";
      resumeTabContent.classList.remove("active");
   });

   resumePortfolioTabBtns.forEach((resumePortfolioTabBtn) => {
      resumePortfolioTabBtn.classList.remove("active");
   });

   resumeTabContents[resumeTabClick].style.display = "flex";

   setTimeout(() => {
      resumeTabContents[resumeTabClick].classList.add("active");
   }, 100);
   
   resumePortfolioTabBtns[resumeTabClick].classList.add("active");
}

resumePortfolioTabBtns.forEach((resumePortfolioTabBtn, i) => {
   resumePortfolioTabBtn.addEventListener("click", () => {
      resumeTabNav(i);
   });
});

/* =====================================================
   Service modal open/close function
===================================================== */
const serviceCardWithModals = document.querySelectorAll(".service-container .card-with-modal");

serviceCardWithModals.forEach((serviceCardWithModal) => {
   const serviceCard = serviceCardWithModal.querySelector(".service-card");
   const serviceBackDrop = serviceCardWithModal.querySelector(".service-modal-backdrop");
   const serviceModal = serviceCardWithModal.querySelector(".service-modal");
   const modalCloseBtn = serviceCardWithModal.querySelector(".modal-close-btn");

   serviceCard.addEventListener("click", () => {
      serviceBackDrop.style.display = "flex";

      setTimeout(() => {
         serviceBackDrop.classList.add("active");
      }, 100);

      setTimeout(() => {
         serviceModal.classList.add("active");
      }, 300);
   });

   modalCloseBtn.addEventListener("click", () => {
      setTimeout(() => {
         serviceBackDrop.style.display = "none";
      }, 500);

      setTimeout(() => {
         serviceBackDrop.classList.remove("active");
         serviceModal.classList.remove("active");
      }, 100);
   });

   // Close modal when clicking outside the modal content
   serviceBackDrop.addEventListener("click", (e) => {
      if (e.target === serviceBackDrop) {
         setTimeout(() => {
            serviceBackDrop.style.display = "none";
         }, 500);

         setTimeout(() => {
            serviceBackDrop.classList.remove("active");
            serviceModal.classList.remove("active");
         }, 100);
      }
   });
});

/* =====================================================
   Portfolio modals, tabs and cards
===================================================== */

// Filter portfolio cards according to portfolio tabs.
document.addEventListener("DOMContentLoaded", () => {
  const portfolioTabs = document.querySelector(".portfolio-tabs");
  const portfolioTabBtns = portfolioTabs.querySelectorAll(".tab-btn");
  const cardWithModals = document.querySelectorAll(".portfolio-container .card-with-modal");

  portfolioTabBtns.forEach((tabBtn) => {
    tabBtn.addEventListener("click", () => {
      const filter = tabBtn.getAttribute("data-filter");

      cardWithModals.forEach((cardWithModal) => {
        if (filter === "all" || cardWithModal.classList.contains(filter)) {
          cardWithModal.classList.remove("hidden");
          setTimeout(() => {
            cardWithModal.style.opacity = "1";
            cardWithModal.style.transition = ".5s ease";
          }, 1);
        } else {
          cardWithModal.classList.add("hidden");
          setTimeout(() => {
            cardWithModal.style.opacity = "0";
            cardWithModal.style.transition = ".5s ease";
          }, 1);
        }
      });

      portfolioTabBtns.forEach((btn) => btn.classList.remove("active"));
      tabBtn.classList.add("active");
    });
  });
});

function pauseAllYouTubeVideos() {
  const iframes = document.querySelectorAll(".modal-swiper iframe");
  iframes.forEach((iframe) => {
    iframe.contentWindow.postMessage(
      '{"event":"command","func":"pauseVideo","args":""}',
      "*"
    );
  });
}

// Open/Close Portfolio modals with video pause support
const portfolioCardWithModals = document.querySelectorAll(".portfolio-container .card-with-modal");

portfolioCardWithModals.forEach((portfolioCardWithModal) => {
  const portfolioCard = portfolioCardWithModal.querySelector(".portfolio-card");
  const portfolioBackdrop = portfolioCardWithModal.querySelector(".portfolio-modal-backdrop");
  const portfolioModal = portfolioCardWithModal.querySelector(".portfolio-modal");
  const modalCloseBtn = portfolioCardWithModal.querySelector(".modal-close-btn");

  portfolioCard.addEventListener("click", () => {
    portfolioBackdrop.style.display = "flex";

    setTimeout(() => {
      portfolioBackdrop.classList.add("active");
    }, 300);

    setTimeout(() => {
      portfolioModal.classList.add("active");
    }, 300);
  });

  function closeModal() {
    pauseAllYouTubeVideos();

    setTimeout(() => {
      portfolioBackdrop.style.display = "none";
    }, 500);

    setTimeout(() => {
      portfolioBackdrop.classList.remove("active");
      portfolioModal.classList.remove("active");
    }, 100);
  }

  modalCloseBtn.addEventListener("click", closeModal);

  portfolioBackdrop.addEventListener("click", (e) => {
    if (e.target === portfolioBackdrop) {
      closeModal();
    }
  });
});

// Initialize Swipers for each modal
const modalSwipers = document.querySelectorAll('.modal-swiper');

modalSwipers.forEach((swiperEl) => {
  new Swiper(swiperEl, {
    loop: true,
    navigation: {
      nextEl: swiperEl.querySelector('.modal-swiper-next'),
      prevEl: swiperEl.querySelector('.modal-swiper-prev'),
    },
    spaceBetween: 10,
    on: {
      slideChange: function () {
        pauseAllYouTubeVideos();
      }
    }
  });
});

/* =====================================================
   Testimonial Swiper
===================================================== */
var swiper = new Swiper(".sa-client-swiper", {
   slidesPerView: 1,
   spaceBetween: 30,
   loop: true,
   pagination: {
      el: ".swiper-pagination",
      clickable: true,
   },
   navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
   },
});

/* =====================================================
   Send/Receive emails from contact form - EmailJS
===================================================== */
(function () {
  emailjs.init({
    publicKey: "eoWxq9yJfkZW7VsQU",
  });
})();

const saContactForm = document.getElementById("sa-contact-form");
const saContactFormAlert = document.querySelector(".contact-form-alert");
const submitBtn = saContactForm.querySelector(".submit-btn");

saContactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    // On mobile: fade out the submit button
    submitBtn.classList.add("fade-out");
    submitBtn.classList.remove("fade-in");

    setTimeout(() => {
      // Fade in alert message
      saContactFormAlert.classList.add("fade-in");
      saContactFormAlert.classList.remove("fade-out");
    }, 400);
  } else {
    // On desktop: just fade in alert message, button stays visible
    saContactFormAlert.classList.add("fade-in");
    saContactFormAlert.classList.remove("fade-out");
  }

  emailjs.sendForm("sajibclarke", "template_eobktyq", "#sa-contact-form")
    .then(() => {
      saContactFormAlert.innerHTML = "<span>Your message sent successfully!</span> <i class='ri-checkbox-circle-fill'></i>";
      saContactForm.reset();

      setTimeout(() => {
        // Fade out alert message
        saContactFormAlert.classList.remove("fade-in");
        saContactFormAlert.classList.add("fade-out");

        if (isMobile) {
          // Fade button back in on mobile
          setTimeout(() => {
            submitBtn.classList.remove("fade-out");
            submitBtn.classList.add("fade-in");
            saContactFormAlert.innerHTML = "";
          }, 400);
        } else {
          // Clear alert content on desktop
          saContactFormAlert.innerHTML = "";
        }
      }, 5000);
    })
    .catch((error) => {
      saContactFormAlert.innerHTML = "<span>Message not sent</span> <i class='ri-error-warning-fill'></i>";
      saContactFormAlert.title = error;

      setTimeout(() => {
        // Fade out alert message
        saContactFormAlert.classList.remove("fade-in");
        saContactFormAlert.classList.add("fade-out");

        if (isMobile) {
          // Fade button back in on mobile
          setTimeout(() => {
            submitBtn.classList.remove("fade-out");
            submitBtn.classList.add("fade-in");
            saContactFormAlert.innerHTML = "";
          }, 400);
        } else {
          // Clear alert content on desktop
          saContactFormAlert.innerHTML = "";
        }
      }, 5000);
    });
});

/* =====================================================
   Logo Height Matching (Updated for Responsiveness)
===================================================== */
function setLogoHeight() {
    const saLogo = document.querySelector(".sa-logo");
    
    // Select both the button and the icon
    const letsTalkBtn = document.querySelector(".lets-talk-btn"); 
    const letsTalkIcon = document.querySelector(".lets-talk-icon");

    let referenceElement = null;

    if (letsTalkBtn && window.getComputedStyle(letsTalkBtn).display !== 'none') {
        referenceElement = letsTalkBtn;
    } else if (letsTalkIcon && window.getComputedStyle(letsTalkIcon).display !== 'none') {
        referenceElement = letsTalkIcon;
    }

    if (saLogo && referenceElement) {
        const refHeight = referenceElement.offsetHeight;

        saLogo.style.height = `${refHeight}px`;
    }
}

/* =====================================================
   Shrink the height of the header on scroll
===================================================== */
window.addEventListener("scroll", () => {
   const saHeader = document.querySelector(".sa-header");

   // Keep your existing shrink logic
   saHeader.classList.toggle("shrink", window.scrollY > 0);
   // Call the new, smart height-setting function
   setLogoHeight();
});

document.addEventListener("DOMContentLoaded", setLogoHeight);

window.addEventListener("resize", setLogoHeight);

/* =====================================================
   Bottom navigation menu
===================================================== */

// Each bottom navigation menu items active on page scroll.
window.addEventListener("scroll", () => {
   const navMenuSections = document.querySelectorAll(".nav-menu-section");
   const scrollY = window.pageYOffset;

   navMenuSections.forEach((navMenuSection) => {
      let sectionHeight = navMenuSection.offsetHeight;
      let sectionTop = navMenuSection.offsetTop - 50;
      let id = navMenuSection.getAttribute("id");

      if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
         document.querySelector(".bottom-nav .menu li a[href*=" + id + "]").classList.add("current");
      }else{
         document.querySelector(".bottom-nav .menu li a[href*=" + id + "]").classList.remove("current");
      }
   });
});

// Javascript to show bottom navigation menu on home(page load).
window.addEventListener("DOMContentLoaded", () => {
   const bottomNav = document.querySelector(".bottom-nav");

   bottomNav.classList.toggle("active", window.scrollY < 10);
});

// Javascript to show/hide bottom navigation menu on home(scroll).
const bottomNav = document.querySelector(".bottom-nav");
const menuHideBtn = document.querySelector(".menu-hide-btn");
const menuShowBtn = document.querySelector(".menu-show-btn");
var navTimeout;

window.addEventListener("scroll", () => {
   bottomNav.classList.add("active");
   menuShowBtn.classList.remove("active");

   if(window.scrollY < 10){
      menuHideBtn.classList.remove("active");

      function scrollStopped(){
         bottomNav.classList.add("active");
      }

      clearTimeout(navTimeout);
      navTimeout = setTimeout(scrollStopped, 2500);
   }

   if(window.scrollY > 10){
      menuHideBtn.classList.add("active");

      function scrollStopped(){
         bottomNav.classList.remove("active");
         menuShowBtn.classList.add("active");
      }

      clearTimeout(navTimeout);
      navTimeout = setTimeout(scrollStopped, 2500);
   }
});

// Hide bottom navigation menu on click menu-hide-btn.
menuHideBtn.addEventListener("click", () => {
   bottomNav.classList.toggle("active");
   menuHideBtn.classList.toggle("active");
   menuShowBtn.classList.toggle("active");
});

// Show bottom navigation menu on click menu-show-btn.
menuShowBtn.addEventListener("click", () => {
   bottomNav.classList.toggle("active");
   menuHideBtn.classList.add("active");
   menuShowBtn.classList.toggle("active");
});

/* =====================================================
   To-top-button with scroll indicator bar
===================================================== */
window.addEventListener("scroll", () => {
   const toTopBtn = document.querySelector(".to-top-btn");

   toTopBtn.classList.toggle("active", window.scrollY > 0);

   // scroll indicator bar
   const scrollIndicatorBar = document.querySelector(".scroll-indicator");

   const pageScroll = document.body.scrollTop || document.documentElement.scrollTop;
   const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

   const scrollValue = (pageScroll / height) * 100;

   scrollIndicatorBar.style.height = scrollValue + "%";
});

/* =====================================================
   Customized cursor on mousemove
===================================================== */
const cursor = document.querySelector(".cursor");
const cursorDot = cursor.querySelector(".cursor-dot");
const cursorCircle = cursor.querySelector(".cursor-circle");

document.addEventListener("mousemove", (e) => {
   let x = e.clientX;
   let y = e.clientY;

   cursorDot.style.top = y + "px";
   cursorDot.style.left = x + "px";
   cursorCircle.style.top = y + "px";
   cursorCircle.style.left = x + "px";
});

// Cursor effects on hover website elements.
const cursorHoverlinks = document.querySelectorAll("body a, .theme-btn, .sa-main-btn, .portfolio-card, .swiper-button-next, .swiper-button-prev, .swiper-pagination, .service-card, .contact-social-links li, .contact-form, .submit-btn, .menu-show-btn, .menu-hide-btn");

cursorHoverlinks.forEach((cursorHoverlink) => {
   cursorHoverlink.addEventListener("mouseover",() => {
      cursorDot.classList.add("large");
      cursorCircle.style.display = "none";
   });
});

cursorHoverlinks.forEach((cursorHoverlink) => {
   cursorHoverlink.addEventListener("mouseout",() => {
      cursorDot.classList.remove("large");
      cursorCircle.style.display = "block";
   });
});

/* =====================================================
   Website dark/light theme
===================================================== */

// Change theme and save current theme on click the theme button.
const themeBtn = document.querySelector(".theme-btn");

themeBtn.addEventListener("click", () => {
   // change theme icon and theme on click theme button.
   themeBtn.classList.toggle("active-sun-icon");
   document.body.classList.toggle("light-theme");

   // save theme icon and theme on click theme button.
   const getCurrentIcon = () => themeBtn.classList.contains("active-sun-icon") ? "sun" : "moon";
   const getCurrentTheme = () => document.body.classList.contains("light-theme") ? "light" : "dark";

   localStorage.setItem("sa-saved-icon", getCurrentIcon());
   localStorage.setItem("sa-saved-theme", getCurrentTheme());
});

// Get saved theme icon and theme on document loaded.
const savedIcon = localStorage.getItem("sa-saved-icon");
const savedTheme = localStorage.getItem("sa-saved-theme");

document.addEventListener("DOMContentLoaded", () => {
   themeBtn.classList[savedIcon === "sun" ? "add" : "remove"]("active-sun-icon");
   document.body.classList[savedTheme === "light" ? "add" : "remove"]("light-theme");
});

/* =====================================================
   ScrollReveal JS animations
===================================================== */

// Common reveal options to create reveal animations.
ScrollReveal({ 
   // reset: true,
   distance: '60px',
   duration: 2500,
   delay: 400
});

// Target elements and specify options to create reveal animations.
ScrollReveal().reveal('.avatar-img', { delay: 100, origin: 'top' });
ScrollReveal().reveal('.avatar-info, .section-title', { delay: 300, origin: 'top' });
ScrollReveal().reveal('.home-social, .home-scroll-btn, .copy-right', { delay: 600, origin: 'bottom' });
ScrollReveal().reveal('.about-img', { delay: 700, origin: 'top' });
ScrollReveal().reveal('.about-info, .sa-footer .sa-logo-footer', { delay: 300, origin: 'bottom' });
ScrollReveal().reveal('.pro-card, .about-buttons .sa-main-btn, .resume-tabs .tab-btn, .portfolio-tabs .tab-btn', { delay: 500, origin: 'right', interval: 200 });
ScrollReveal().reveal('#resume .section-content', { delay: 700, origin: 'bottom' });
ScrollReveal().reveal('.service-card, .portfolio-card, .contact-item, .contact-social-links li, .footer-menu .menu-item', { delay: 300, origin: 'bottom', interval: 300 });
ScrollReveal().reveal('.sa-client-swiper, .contact-form-body', { delay: 700, origin: 'right' });
ScrollReveal().reveal('.contact-info h3', { delay: 100, origin: 'bottom', interval: 300 });