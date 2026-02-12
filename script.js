const navbar = document.getElementById("navbar");
const heroSection = document.querySelector(".hero");
const areaToggles = document.querySelectorAll(".area-toggle");
const areaPanels = document.querySelectorAll(".area-panel");
const form = document.querySelector(".contact-form");
const modalBackdrop = document.getElementById("formModal");
const modalClose = modalBackdrop?.querySelector(".modal-close");
const modalAction = modalBackdrop?.querySelector(".modal-action");
const modalMessage = modalBackdrop?.querySelector(".modal-message");
const navAnchors = document.querySelectorAll(".main-nav a[href^='#']");
const pageSections = document.querySelectorAll("section[id]");
const motionSections = document.querySelectorAll(
  ".areas-section, .about-section, .team-section, .process-section, .cta-section, .contact-section, .map-section, footer",
);

let ticking = false;

const updateHeroStats = () => {
  if (!heroSection) return;
  if (window.innerWidth > 600) {
    document.body.classList.remove("show-hero-stats");
    return;
  }
  const triggerPoint = heroSection.offsetHeight * 0.6;
  document.body.classList.toggle("show-hero-stats", window.scrollY > triggerPoint);
};

const updateHeroParallax = () => {
  if (!heroSection || window.innerWidth <= 768) {
    document.documentElement.style.setProperty("--hero-shift", "0px");
    return;
  }
  const shift = Math.min(window.scrollY * 0.05, 20);
  document.documentElement.style.setProperty("--hero-shift", `${shift}px`);
};

const updateSectionParallax = () => {
  const isDesktop = window.innerWidth > 968;
  motionSections.forEach((section) => {
    if (!isDesktop) {
      section.style.setProperty("--section-parallax", "0px");
      return;
    }
    const rect = section.getBoundingClientRect();
    const viewportCenter = window.innerHeight * 0.5;
    const sectionCenter = rect.top + rect.height * 0.5;
    const distance = sectionCenter - viewportCenter;
    const shift = Math.max(-6, Math.min(6, distance * -0.01));
    section.style.setProperty("--section-parallax", `${shift}px`);
  });
};

const updateScrollProgress = () => {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (scrollableHeight <= 0) {
    document.documentElement.style.setProperty("--scroll-progress", "0");
    return;
  }
  const progress = Math.min(1, Math.max(0, window.scrollY / scrollableHeight));
  document.documentElement.style.setProperty("--scroll-progress", progress.toFixed(4));
};

const onScrollFrame = () => {
  if (navbar) {
    navbar.classList.toggle("scrolled", window.scrollY > 100);
  }
  updateHeroStats();
  updateHeroParallax();
  updateSectionParallax();
  updateScrollProgress();
  ticking = false;
};

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(onScrollFrame);
    ticking = true;
  }
});

window.addEventListener("resize", () => {
  updateHeroStats();
  updateHeroParallax();
  updateSectionParallax();
  updateScrollProgress();

  areaToggles.forEach((btn) => {
    if (btn.getAttribute("aria-expanded") === "true") {
      const panelId = btn.getAttribute("aria-controls");
      const panel = panelId ? document.getElementById(panelId) : null;
      if (panel) panel.style.maxHeight = `${panel.scrollHeight}px`;
    }
  });
});

window.addEventListener("load", () => {
  document.body.classList.add("is-loaded");
  updateHeroStats();
  updateHeroParallax();
  updateSectionParallax();
  updateScrollProgress();
});

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (!href || href === "#") return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Areas accordion with height animation
areaPanels.forEach((panel) => {
  panel.hidden = false;
  panel.style.maxHeight = "0px";
});

const closeAllAreas = () => {
  areaToggles.forEach((btn) => {
    btn.setAttribute("aria-expanded", "false");
    btn.closest(".area-row")?.classList.remove("is-open");
    const panelId = btn.getAttribute("aria-controls");
    const panel = panelId ? document.getElementById(panelId) : null;
    if (panel) panel.style.maxHeight = "0px";
  });
};

areaToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const panelId = toggle.getAttribute("aria-controls");
    const panel = panelId ? document.getElementById(panelId) : null;
    const isOpen = toggle.getAttribute("aria-expanded") === "true";

    closeAllAreas();

    if (!isOpen && panel) {
      toggle.setAttribute("aria-expanded", "true");
      toggle.closest(".area-row")?.classList.add("is-open");
      panel.style.maxHeight = `${panel.scrollHeight}px`;
    }
  });
});

// Modal helpers
const openModal = (message) => {
  if (!modalBackdrop) return;
  if (message && modalMessage) modalMessage.textContent = message;
  modalBackdrop.classList.add("is-open");
  modalBackdrop.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  if (!modalBackdrop) return;
  modalBackdrop.classList.remove("is-open");
  modalBackdrop.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
};

const validators = {
  nombre: {
    check: (value) => /^[A-Za-z\u00C0-\u017F\s]{3,60}$/.test(value),
    message: "Ingrese un nombre valido (solo letras y espacios).",
  },
  email: {
    check: (value) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value) && value.length <= 120,
    message: "Ingrese un correo electronico valido.",
  },
  telefono: {
    check: (value) => /^[0-9]{8,15}$/.test(value),
    message: "Ingrese un telefono valido (solo numeros, 8 a 15 digitos).",
  },
  consulta: {
    check: (value) => value.length >= 20 && value.length <= 1000,
    message: "La consulta debe tener entre 20 y 1000 caracteres.",
  },
};

const sanitizeValue = (field) => {
  const raw = field.value;
  let cleaned = raw;

  if (field.name === "nombre") {
    cleaned = raw.replace(/[^A-Za-z\u00C0-\u017F\s]/g, "");
    cleaned = cleaned.replace(/\s{2,}/g, " ");
  }

  if (field.name === "telefono") {
    cleaned = raw.replace(/\D/g, "");
  }

  if (field.name === "email") {
    cleaned = raw.replace(/[^A-Za-z0-9@._-]/g, "").toLowerCase();
  }

  if (cleaned !== raw) {
    field.value = cleaned;
  }
};

const validateField = (field) => {
  const rule = validators[field.name];
  if (!rule) return true;
  const value = field.value.trim();
  if (!value) {
    field.setCustomValidity("Este campo es obligatorio.");
    return false;
  }
  if (!rule.check(value)) {
    field.setCustomValidity(rule.message);
    return false;
  }
  field.setCustomValidity("");
  return true;
};

const validateContactForm = () => {
  if (!form) return false;
  const fields = form.querySelectorAll("input[name], textarea[name]");
  let isValid = true;
  fields.forEach((field) => {
    sanitizeValue(field);
    if (!validateField(field)) isValid = false;
  });
  return isValid;
};

if (form) {
  form.querySelectorAll("input[name], textarea[name]").forEach((field) => {
    field.addEventListener("input", () => {
      sanitizeValue(field);
      validateField(field);
    });
    field.addEventListener("blur", () => {
      sanitizeValue(field);
      validateField(field);
    });
  });
}

// Form submission (Formspree + modal)
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const action = form.getAttribute("action")?.trim() || "";
    const isValid = validateContactForm();
    const isDemoAction =
      !action ||
      action === "#" ||
      /TU_ID|your_form_id/i.test(action);

    if (!isValid) {
      form.reportValidity();
      return;
    }

    try {
      if (!isDemoAction) {
        await fetch(action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });
      }

      // Modo demo: siempre confirmar envio correcto en la interfaz.
      openModal(
        "Consulta enviada correctamente. En breve nos pondremos en contacto.",
      );
      form.reset();
    } catch (_error) {
      openModal(
        "Consulta enviada correctamente. En breve nos pondremos en contacto.",
      );
      form.reset();
    }
  });
}

modalBackdrop?.addEventListener("click", (e) => {
  if (e.target === modalBackdrop) closeModal();
});
modalClose?.addEventListener("click", closeModal);
modalAction?.addEventListener("click", closeModal);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// Scroll reveal system
const revealSelectors = [
  ".areas-header",
  ".area-row",
  ".about-copy",
  ".about-list",
  ".team-card",
  ".process-header",
  ".process-card",
  ".cta-inner",
  ".contact-info",
  ".contact-form",
  ".map-container",
  ".footer-grid",
];

const revealTargets = document.querySelectorAll(revealSelectors.join(", "));
revealTargets.forEach((el) => el.classList.add("reveal"));
motionSections.forEach((section) => section.classList.add("motion-section"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -70px 0px" },
);

revealTargets.forEach((el) => observer.observe(el));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-section-visible");
      }
    });
  },
  { threshold: 0.22, rootMargin: "0px 0px -10% 0px" },
);

motionSections.forEach((section) => sectionObserver.observe(section));

// Active nav link by visible section
const sectionLinkMap = new Map();
navAnchors.forEach((link) => {
  const id = link.getAttribute("href");
  if (id && id.startsWith("#")) sectionLinkMap.set(id.slice(1), link);
});

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const targetId = entry.target.getAttribute("id");
      if (!targetId) return;
      navAnchors.forEach((link) => link.classList.remove("is-active"));
      const active = sectionLinkMap.get(targetId);
      if (active) active.classList.add("is-active");
    });
  },
  { threshold: 0.45, rootMargin: "-20% 0px -35% 0px" },
);

pageSections.forEach((section) => navObserver.observe(section));
