const heroVideo = document.querySelector(".hero__video");
const mainContent = document.querySelector("main");
const siteFooter = document.querySelector(".site-footer");

const aboutButtons = document.querySelectorAll(".about-button");
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

  if (siteFooter && mainContent) {
    const { bottom } = mainContent.getBoundingClientRect();
    const footerHeight = siteFooter.offsetHeight;
    const reveal = Math.min(
      Math.max((viewportHeight - bottom) / footerHeight, 0),
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

if (aboutButtons.length && aboutPanel) {
  let lockedScrollY = 0;
  let activeFooterButton = null;
  let footerButtonParent = null;
  let footerButtonNextSibling = null;

  const moveFooterButtonToOverlay = (button) => {
    if (!button.classList.contains("about-button--footer")) return;

    activeFooterButton = button;
    footerButtonParent = button.parentNode;
    footerButtonNextSibling = button.nextSibling;

    button.classList.add("is-overlay-control");
    document.body.appendChild(button);
  };

  const restoreFooterButton = () => {
    if (!activeFooterButton || !footerButtonParent) return;

    activeFooterButton.classList.remove("is-overlay-control");
    activeFooterButton.classList.add("has-loaded");

    if (footerButtonNextSibling) {
      footerButtonParent.insertBefore(
        activeFooterButton,
        footerButtonNextSibling
      );
    } else {
      footerButtonParent.appendChild(activeFooterButton);
    }

    activeFooterButton = null;
    footerButtonParent = null;
    footerButtonNextSibling = null;
  };

  const setAboutState = (isOpen, triggerButton = null) => {
    if (isOpen) {
      lockedScrollY = window.scrollY;

      if (triggerButton) {
        moveFooterButtonToOverlay(triggerButton);
      }

      document.documentElement.classList.add("is-about-open");
      document.body.classList.add("is-about-open");

      document.body.style.top = `-${lockedScrollY}px`;
    } else {
      document.documentElement.classList.remove("is-about-open");
      document.body.classList.remove("is-about-open");

      document.body.style.top = "";
      window.scrollTo(0, lockedScrollY);

      restoreFooterButton();
    }

    aboutPanel.classList.toggle("is-open", isOpen);

    aboutButtons.forEach((button) => {
      button.classList.toggle("is-open", isOpen);
      button.textContent = isOpen ? "×" : "About";
      button.setAttribute("aria-expanded", String(isOpen));
    });

    aboutPanel.setAttribute("aria-hidden", String(!isOpen));
  };

  aboutButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const isOpen = aboutPanel.classList.contains("is-open");
      setAboutState(!isOpen, button);
    });
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
