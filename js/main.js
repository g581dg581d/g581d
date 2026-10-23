const heroVideo = document.querySelector(".hero__video");
const accentPanel = document.querySelector(".accent-panel");
const siteFooter = document.querySelector(".site-footer");

const aboutButton = document.querySelector(".about-button");
const aboutPanel = document.querySelector(".about-panel");

let scrollTicking = false;


/* --------------------------------------------------
   Scroll Effects
-------------------------------------------------- */

const updateScrollEffects = () => {
  const viewportHeight = window.innerHeight;

  if (heroVideo) {
    const startOpacity = 0.5;
    const fadeDistance = viewportHeight * 0.25;
    const opacity = startOpacity * (1 - window.scrollY / fadeDistance);

    heroVideo.style.opacity = Math.max(opacity, 0);
  }

  if (siteFooter && accentPanel) {
    const { bottom } = accentPanel.getBoundingClientRect();
    const reveal = Math.min(
      Math.max((viewportHeight - bottom) / viewportHeight, 0),
      1
    );

    siteFooter.style.setProperty("--footer-reveal", reveal.toFixed(3));
  }

  scrollTicking = false;
};

const requestScrollEffectsUpdate = () => {
  if (scrollTicking) return;

  scrollTicking = true;
  window.requestAnimationFrame(updateScrollEffects);
};

updateScrollEffects();

window.addEventListener("scroll", requestScrollEffectsUpdate, {
  passive: true
});

window.addEventListener("resize", requestScrollEffectsUpdate);


/* --------------------------------------------------
   About Panel
-------------------------------------------------- */

if (aboutButton && aboutPanel) {
  const blockedKeys = new Set([
    "ArrowUp",
    "ArrowDown",
    "PageUp",
    "PageDown",
    "Home",
    "End",
    " "
  ]);

  const preventScroll = (event) => {
    event.preventDefault();
  };

  const setScrollLock = (isLocked) => {
    const method = isLocked ? "addEventListener" : "removeEventListener";

    window[method]("wheel", preventScroll, { passive: false });
    window[method]("touchmove", preventScroll, { passive: false });
  };

  const setAboutState = (isOpen) => {
    setScrollLock(isOpen);

    aboutPanel.classList.toggle("is-open", isOpen);
    aboutButton.classList.toggle("is-open", isOpen);

    aboutButton.textContent = isOpen ? "×" : "About";
    aboutButton.setAttribute("aria-expanded", String(isOpen));
    aboutPanel.setAttribute("aria-hidden", String(!isOpen));

    document.documentElement.classList.toggle("is-about-open", isOpen);
    document.body.classList.toggle("is-about-open", isOpen);
  };

  aboutButton.addEventListener("click", () => {
    const isOpen = aboutPanel.classList.contains("is-open");
    setAboutState(!isOpen);
  });

  document.addEventListener("keydown", (event) => {
    const isOpen = aboutPanel.classList.contains("is-open");

    if (!isOpen) return;

    if (event.key === "Escape") {
      setAboutState(false);
      return;
    }

    if (blockedKeys.has(event.key)) {
      event.preventDefault();
    }
  });
}
