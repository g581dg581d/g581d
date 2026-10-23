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
  let lockedScrollY = 0;

  const setAboutState = (isOpen) => {
    if (isOpen) {
      lockedScrollY = window.scrollY;

      document.documentElement.classList.add("is-about-open");
      document.body.classList.add("is-about-open");

      document.body.style.top = `-${lockedScrollY}px`;
    } else {
      document.documentElement.classList.remove("is-about-open");
      document.body.classList.remove("is-about-open");

      document.body.style.top = "";
      window.scrollTo(0, lockedScrollY);
    }

    aboutPanel.classList.toggle("is-open", isOpen);
    aboutButton.classList.toggle("is-open", isOpen);

    aboutButton.textContent = isOpen ? "×" : "About";
    aboutButton.setAttribute("aria-expanded", String(isOpen));
    aboutPanel.setAttribute("aria-hidden", String(!isOpen));
  };

  aboutButton.addEventListener("click", () => {
    setAboutState(!aboutPanel.classList.contains("is-open"));
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      aboutPanel.classList.contains("is-open")
    ) {
      setAboutState(false);
    }
  });
}
