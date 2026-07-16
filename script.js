const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}

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

const galleryTrack = document.querySelector(".gallery-track");
const galleryPrev = document.querySelector(".gallery-prev");
const galleryNext = document.querySelector(".gallery-next");

if (galleryTrack && galleryPrev && galleryNext) {
  const slideGallery = (direction) => {
    const slide = galleryTrack.querySelector(".gallery-slide");

    if (!slide) {
      return;
    }

    const gap = 16;
    const distance = slide.offsetWidth + gap;

    galleryTrack.scrollBy({
      left: direction * distance,
      behavior: "smooth"
    });
  };

  galleryPrev.addEventListener("click", () => slideGallery(-1));
  galleryNext.addEventListener("click", () => slideGallery(1));
}