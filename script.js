(() => {
  const pageLoader = document.getElementById("pageLoader");
  const header = document.getElementById("siteHeader");
  const navToggle = document.getElementById("navToggle");
  const nav = document.getElementById("navLinks");
  const sections = [...document.querySelectorAll("main section[id]")];
  const navLinks = [...document.querySelectorAll(".nav a")];
  const revealItems = document.querySelectorAll(".reveal");
  const year = document.getElementById("year");
  const animatedButtons = document.querySelectorAll(".btn-primary, .btn-outline");
  const tiltCards = document.querySelectorAll(".hero-card, .gallery-card, .service-card");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  window.addEventListener("load", () => {
    window.setTimeout(() => {
      pageLoader?.classList.add("is-hidden");
    }, 500);
  });

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const markActiveLink = () => {
    const scrollPoint = window.scrollY + 140;
    let currentId = sections[0]?.id;

    header?.classList.toggle("is-scrolled", window.scrollY > 24);

    sections.forEach((section) => {
      if (scrollPoint >= section.offsetTop) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${currentId}`);
    });
  };

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  animatedButtons.forEach((button) => {
    button.addEventListener("mousemove", (event) => {
      const rect = button.getBoundingClientRect();
      const moveX = (event.clientX - rect.left - rect.width / 2) * 0.08;
      const moveY = (event.clientY - rect.top - rect.height / 2) * 0.08;
      button.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "";
    });
  });

  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      if (window.innerWidth < 900) return;
      const rect = card.getBoundingClientRect();
      const rotateX = -((event.clientY - rect.top) / rect.height - 0.5) * 4;
      const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * 5;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });

  window.addEventListener("scroll", markActiveLink, { passive: true });
  markActiveLink();
})();
