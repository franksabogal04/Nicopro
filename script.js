const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const year = document.querySelector("#year");

/* Current year in footer */
if (year) {
  year.textContent = new Date().getFullYear();
}

/* Mobile navigation */
if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");

    menuToggle.setAttribute(
      "aria-expanded",
      isOpen ? "true" : "false"
    );
  });
}

/* Close mobile navigation after clicking a link */
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navMenu) {
      navMenu.classList.remove("open");
    }

    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
});

/* Reveal sections while scrolling */
const revealElements = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;

  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;

    if (elementTop < windowHeight - 80) {
      element.classList.add("show");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

/* Gallery carousel */
const galleryTrack = document.querySelector(".gallery-track");
const galleryPrev = document.querySelector(".gallery-prev");
const galleryNext = document.querySelector(".gallery-next");
const gallerySlides = document.querySelectorAll(".gallery-slide");

if (
  galleryTrack &&
  galleryPrev &&
  galleryNext &&
  gallerySlides.length > 0
) {
  const galleryGap = 16;

  const getVisibleSlides = () => {
    if (window.innerWidth <= 820) {
      return 1;
    }

    if (window.innerWidth <= 1100) {
      return 2;
    }

    return 4;
  };

  const getScrollDistance = () => {
    const firstSlide = gallerySlides[0];
    const visibleSlides = getVisibleSlides();

    return (firstSlide.offsetWidth + galleryGap) * visibleSlides;
  };

  const getMaximumScroll = () => {
    return galleryTrack.scrollWidth - galleryTrack.clientWidth;
  };

  const slideGallery = (direction) => {
    const maximumScroll = getMaximumScroll();
    const distance = getScrollDistance();

    /*
      When the user reaches the final image and clicks next,
      return smoothly to the beginning.
    */
    if (
      direction === 1 &&
      galleryTrack.scrollLeft >= maximumScroll - 10
    ) {
      galleryTrack.scrollTo({
        left: 0,
        behavior: "smooth"
      });

      return;
    }

    /*
      When the user is at the beginning and clicks previous,
      move smoothly to the final gallery images.
    */
    if (
      direction === -1 &&
      galleryTrack.scrollLeft <= 10
    ) {
      galleryTrack.scrollTo({
        left: maximumScroll,
        behavior: "smooth"
      });

      return;
    }

    galleryTrack.scrollBy({
      left: direction * distance,
      behavior: "smooth"
    });
  };

  galleryPrev.addEventListener("click", () => {
    slideGallery(-1);
  });

  galleryNext.addEventListener("click", () => {
    slideGallery(1);
  });

  /*
    Recalculate the position when the screen size changes.
    This prevents the gallery from becoming misaligned when
    switching between desktop, tablet, and phone layouts.
  */
  window.addEventListener("resize", () => {
    const maximumScroll = getMaximumScroll();

    if (galleryTrack.scrollLeft > maximumScroll) {
      galleryTrack.scrollTo({
        left: maximumScroll,
        behavior: "auto"
      });
    }
  });
}