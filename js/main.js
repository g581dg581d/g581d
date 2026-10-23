/* --------------------------------------------------
   Footer Reveal
-------------------------------------------------- */

const siteFooter = document.querySelector(".site-footer");
const accentPanel = document.querySelector(".accent-panel");

if (siteFooter && accentPanel) {
  let footerTicking = false;

  const updateFooterReveal = () => {
    const { bottom } = accentPanel.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    const progress = Math.min(
      Math.max((viewportHeight - bottom) / viewportHeight, 0),
      1
    );

    siteFooter.style.setProperty("--footer-reveal", progress.toFixed(3));
    footerTicking = false;
  };

  const requestFooterRevealUpdate = () => {
    if (footerTicking) return;

    footerTicking = true;
    window.requestAnimationFrame(updateFooterReveal);
  };

  updateFooterReveal();

  window.addEventListener("scroll", requestFooterRevealUpdate, {
    passive: true
  });

  window.addEventListener("resize", requestFooterRevealUpdate);
}


/* --------------------------------------------------
   Hero Video Fade
-------------------------------------------------- */

const heroVideo = document.querySelector(".hero__video");

if (heroVideo) {
  const updateHeroVideoOpacity = () => {
    const startOpacity = 0.5;
    const fadeDistance = window.innerHeight * 0.25;
    const opacity = startOpacity * (1 - window.scrollY / fadeDistance);

    heroVideo.style.opacity = Math.max(opacity, 0);
  };

  updateHeroVideoOpacity();

  window.addEventListener("scroll", updateHeroVideoOpacity, {
    passive: true
  });
}


/* --------------------------------------------------
   About Panel
-------------------------------------------------- */

const aboutButton = document.querySelector(".about-button");
const aboutPanel = document.querySelector(".about-panel");
const aboutVideo = document.querySelector(".about-panel__video");

if (aboutVideo) {
  aboutVideo.load();
}

if (aboutButton && aboutPanel) {
  let lockedScrollY = window.scrollY;

  const preventAboutScroll = (event) => {
    event.preventDefault();
  };

  const lockAboutScroll = () => {
    lockedScrollY = window.scrollY;

    window.addEventListener("wheel", preventAboutScroll, { passive: false });
    window.addEventListener("touchmove", preventAboutScroll, { passive: false });
  };

  const unlockAboutScroll = () => {
    window.removeEventListener("wheel", preventAboutScroll);
    window.removeEventListener("touchmove", preventAboutScroll);
    window.scrollTo(0, lockedScrollY);
  };

  const setAboutState = (isOpen) => {
    if (isOpen) {
      lockAboutScroll();
    } else {
      unlockAboutScroll();
    }

    aboutPanel.classList.toggle("is-open", isOpen);
    aboutButton.classList.toggle("is-open", isOpen);

    aboutButton.textContent = isOpen ? "×" : "About";
    aboutButton.setAttribute("aria-expanded", String(isOpen));
    aboutPanel.setAttribute("aria-hidden", String(!isOpen));

    document.documentElement.classList.toggle("is-about-open", isOpen);
    document.body.classList.toggle("is-about-open", isOpen);
  };

  aboutButton.addEventListener("click", () => {
    setAboutState(!aboutPanel.classList.contains("is-open"));
  });

  document.addEventListener("keydown", (event) => {
    const isOpen = aboutPanel.classList.contains("is-open");

    if (event.key === "Escape" && isOpen) {
      setAboutState(false);
      return;
    }

    if (
      isOpen &&
      ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(event.key)
    ) {
      event.preventDefault();
    }
  });
}
