/* Footer year */

const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}


/* Mobile navigation */

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");

    menuToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navMenu) {
      navMenu.classList.remove("open");
    }

    if (menuToggle) {
      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );
    }
  });
});


/* Reveal sections while scrolling */

const revealElements = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;

  revealElements.forEach((element) => {
    const elementTop =
      element.getBoundingClientRect().top;

    if (elementTop < windowHeight - 80) {
      element.classList.add("show");
    }
  });
};

window.addEventListener(
  "scroll",
  revealOnScroll,
  { passive: true }
);

window.addEventListener(
  "load",
  revealOnScroll
);


/* Gallery carousel */

const galleryTrack =
  document.querySelector(".gallery-track");

const galleryPrev =
  document.querySelector(".gallery-prev");

const galleryNext =
  document.querySelector(".gallery-next");

const gallerySlides =
  document.querySelectorAll(".gallery-slide");

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

    return (
      firstSlide.offsetWidth + galleryGap
    ) * getVisibleSlides();
  };

  const getMaximumScroll = () => {
    return (
      galleryTrack.scrollWidth -
      galleryTrack.clientWidth
    );
  };

  const slideGallery = (direction) => {
    const maximumScroll = getMaximumScroll();
    const distance = getScrollDistance();

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

  galleryPrev.addEventListener(
    "click",
    () => slideGallery(-1)
  );

  galleryNext.addEventListener(
    "click",
    () => slideGallery(1)
  );

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


/* Testimonials */

const testimonialQuote =
  document.querySelector("#testimonial-quote");

const testimonialAuthor =
  document.querySelector("#testimonial-author");

const testimonialDots =
  document.querySelectorAll(".testimonial-dot");

const testimonials = [
  {
    quote:
      "NGM Catering exceeded every expectation. The food was outstanding, the presentation was beautiful, and the service was flawless. Our guests are still raving!",
    author: "Jessica M."
  },
  {
    quote:
      "Replace this sample with a real client testimonial. The food, organization, and service made our corporate event easy and memorable.",
    author: "Client 2"
  },
  {
    quote:
      "Replace this sample with another real review from a wedding, corporate event, or private dining client.",
    author: "Client 3"
  }
];

let activeTestimonial = 0;
let testimonialTimer = null;

const displayTestimonial = (index) => {
  if (
    !testimonialQuote ||
    !testimonialAuthor
  ) {
    return;
  }

  activeTestimonial = index;

  testimonialQuote.style.opacity = "0";
  testimonialAuthor.style.opacity = "0";

  window.setTimeout(() => {
    testimonialQuote.textContent =
      testimonials[index].quote;

    testimonialAuthor.textContent =
      `— ${testimonials[index].author}`;

    testimonialDots.forEach(
      (dot, dotIndex) => {
        dot.classList.toggle(
          "active",
          dotIndex === index
        );
      }
    );

    testimonialQuote.style.opacity = "1";
    testimonialAuthor.style.opacity = "1";
  }, 200);
};

const restartTestimonialTimer = () => {
  window.clearInterval(testimonialTimer);

  testimonialTimer = window.setInterval(() => {
    const nextIndex =
      (activeTestimonial + 1) %
      testimonials.length;

    displayTestimonial(nextIndex);
  }, 6000);
};

testimonialDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const index =
      Number(dot.dataset.testimonial);

    if (
      Number.isInteger(index) &&
      testimonials[index]
    ) {
      displayTestimonial(index);
      restartTestimonialTimer();
    }
  });
});

if (
  testimonialQuote &&
  testimonialAuthor &&
  testimonialDots.length
) {
  displayTestimonial(0);
  restartTestimonialTimer();
}