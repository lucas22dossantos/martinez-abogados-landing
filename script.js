// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Form submission (Formspree + modal)
const form = document.querySelector(".contact-form");
const modalBackdrop = document.getElementById("formModal");
const modalClose = modalBackdrop?.querySelector(".modal-close");
const modalAction = modalBackdrop?.querySelector(".modal-action");
const modalMessage = modalBackdrop?.querySelector(".modal-message");

const openModal = (message) => {
  if (!modalBackdrop) return;
  if (message && modalMessage) {
    modalMessage.textContent = message;
  }
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

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const action = form.getAttribute("action");
    const formData = new FormData(form);

    try {
      const response = await fetch(action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        openModal(
          "Hemos recibido su mensaje. Nos pondremos en contacto con usted a la brevedad.",
        );
        form.reset();
      } else {
        openModal(
          "Hubo un problema al enviar el formulario. Por favor, intente nuevamente.",
        );
      }
    } catch (error) {
      openModal(
        "No se pudo enviar la consulta. Revise su conexión e intente nuevamente.",
      );
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

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for animation
document
  .querySelectorAll(".area-card, .process-card, .team-card")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease-out";
    observer.observe(el);
  });
