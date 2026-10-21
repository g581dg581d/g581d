/* --------------------------------------------------
   Footer Reveal
-------------------------------------------------- */

const siteFooter = document.querySelector(".site-footer");

if (siteFooter) {
  const footerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          siteFooter.classList.add("is-visible");
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  footerObserver.observe(siteFooter);
}


/* --------------------------------------------------
   Hero Video Fade on Scroll
-------------------------------------------------- */

const heroVideo = document.querySelector(".hero__video");

if (heroVideo) {
  const updateHeroVideoOpacity = () => {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;

    const startOpacity = 0.5;

    const opacity =
      startOpacity *
      (1 - scrollY / (viewportHeight * 0.25));

    heroVideo.style.opacity = Math.max(opacity, 0);
  };

  updateHeroVideoOpacity();

  window.addEventListener(
    "scroll",
    updateHeroVideoOpacity,
    {
      passive: true
    }
  );
}


/* --------------------------------------------------
   About Panel
-------------------------------------------------- */

const aboutButton = document.querySelector(".about-button");
const aboutPanel = document.querySelector(".about-panel");

if (aboutButton && aboutPanel) {
  const openAbout = () => {
    aboutPanel.classList.add("is-open");
    aboutButton.classList.add("is-open");

    aboutButton.textContent = "Close";

    aboutButton.setAttribute("aria-expanded", "true");
    aboutPanel.setAttribute("aria-hidden", "false");

    document.documentElement.classList.add("is-about-open");
    document.body.classList.add("is-about-open");
  };

  const closeAbout = () => {
    aboutPanel.classList.remove("is-open");
    aboutButton.classList.remove("is-open");

    aboutButton.textContent = "About";

    aboutButton.setAttribute("aria-expanded", "false");
    aboutPanel.setAttribute("aria-hidden", "true");

    document.documentElement.classList.remove("is-about-open");
    document.body.classList.remove("is-about-open");
  };

  aboutButton.addEventListener("click", () => {
    const isOpen = aboutPanel.classList.contains("is-open");

    if (isOpen) {
      closeAbout();
    } else {
      openAbout();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      aboutPanel.classList.contains("is-open")
    ) {
      closeAbout();
    }
  });
}
