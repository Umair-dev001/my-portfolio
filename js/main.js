(function () {
  "use strict";

  const menuToggle = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  const mobileLinks = document.querySelectorAll(".mobile-nav a, .nav-links a");
  // const revealEls = document.querySelectorAll(".reveal");

    const featuredGrid =
    document.querySelector(".featured-grid");

  if (featuredGrid && window.ECSTASY_PRODUCTS) {

    featuredGrid.innerHTML =
      Object.values(window.ECSTASY_PRODUCTS)
        .map((product, index) => {

          const delayClass =
            index % 3 === 1
              ? " reveal-delay-1"
              : index % 3 === 2
                ? " reveal-delay-2"
                : "";

          return `
            <a
              class="featured-card reveal${delayClass}"
              data-product-card="${product.id}"
              href="Productpage/index.html?product=${encodeURIComponent(product.id)}"
            >

              <div class="featured-image-wrap">

                <img
                  class="featured-image"
                  src="${product.image}"
                  alt="${product.name}"
                  loading="lazy"
                >

                <span class="featured-badge">
                  ${product.badge}
                </span>

                <span class="featured-arrow">
                  ↗
                </span>

              </div>


              <div class="featured-product-content">

                <div>

                  <p class="featured-category">
                    ${product.category}
                  </p>

                  <h3 class="featured-product-name">
                    ${product.name}
                  </h3>

                </div>

                <p class="featured-price">
                  $${product.price}
                </p>

              </div>

            </a>
          `;
        })
        .join("");
  }

  const revealEls =
    document.querySelectorAll(".reveal");
  const videoBtn = document.querySelector("[data-video-open]");
  const modal = document.querySelector(".modal");
  const modalClose = document.querySelector(".modal-close");
  const fashionVideo = document.querySelector("#fashionVideo");
  const stepCards = document.querySelectorAll(".step-card");

  const siteSearch =
    document.querySelector("#siteSearch");

  const searchSuggestions =
    document.querySelector("#searchSuggestions");


  /* Mobile navigation */

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
      const open =
        menuToggle.getAttribute("aria-expanded") === "true";

      menuToggle.setAttribute(
        "aria-expanded",
        String(!open)
      );

      mobileNav.classList.toggle("is-open", !open);
    });

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.setAttribute("aria-expanded", "false");
        mobileNav.classList.remove("is-open");
      });
    });
  }


  /* Scroll reveal */
  const prefersReduced =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!prefersReduced && revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* Video modal stub */
  function openModal() {
    if (modal) {
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");

      fashionVideo.currentTime = 0;
      fashionVideo.play();

      modalClose?.focus();
    }
  }

  function closeModal() {
    if (modal) {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");

      fashionVideo.pause();
      fashionVideo.currentTime = 0;

      videoBtn?.focus();
    }
  }

  videoBtn?.addEventListener("click", openModal);
  modalClose?.addEventListener("click", closeModal);

  fashionVideo?.addEventListener("ended", closeModal);

  modal?.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal?.classList.contains("is-open")) {
      closeModal();
    }
  });

  /* How it works — highlight active step on hover/focus */
  stepCards.forEach((card, index) => {
    card.addEventListener("mouseenter", () => setActiveStep(index));
    card.addEventListener("focusin", () => setActiveStep(index));
  });

  function setActiveStep(activeIndex) {
    stepCards.forEach((card, i) => {
      card.classList.toggle("is-active", i === activeIndex);
    });
  }

  /* Default active step (center card like reference) */
  if (stepCards.length >= 2) {
    setActiveStep(1);
  }

  /* Product Search */

  // const searchableProducts = [

  //   {
  //     id: "jacket",
  //     name: "Urban Leather Jacket",
  //     category: "Outerwear / Premium",
  //     keywords: "jacket leather coat outerwear black"
  //   },

  //   {
  //     id: "shirt",
  //     name: "Signature Casual Shirt",
  //     category: "Casual / Essentials",
  //     keywords: "shirt casual white top clothing"
  //   },

  //   {
  //     id: "trouser",
  //     name: "Tailored Everyday Trouser",
  //     category: "Bottoms / Modern",
  //     keywords: "trouser trousers pants bottom beige"
  //   }

  // ];

  const searchableProducts =
  Object.values(window.ECSTASY_PRODUCTS);


  siteSearch?.addEventListener("input", () => {

    const value =
      siteSearch.value
        .trim()
        .toLowerCase();


    if (!value) {

      searchSuggestions.innerHTML = "";

      searchSuggestions.classList.remove(
        "is-open"
      );

      return;
    }


    const matches =
      searchableProducts.filter((product) => {

        const text =
          `${product.name}
         ${product.category}
         ${product.keywords}`
            .toLowerCase();

        return text.includes(value);

      });


    if (!matches.length) {

      searchSuggestions.innerHTML = `
      <p class="search-no-result">
        No products found
      </p>
    `;

    } else {

      searchSuggestions.innerHTML =
        matches.map((product) => `

        <button
          type="button"
          class="search-suggestion-item"
          data-product="${product.id}"
        >

          <span class="search-suggestion-name">
            ${product.name}
          </span>

          <span class="search-suggestion-category">
            ${product.category}
          </span>

        </button>

      `).join("");

    }


    searchSuggestions.classList.add(
      "is-open"
    );

  });


  searchSuggestions?.addEventListener(
    "click",
    (event) => {

      const item =
        event.target.closest(
          ".search-suggestion-item"
        );

      if (!item) return;

      const productId =
        item.dataset.product;

      if (!productId) return;

      searchSuggestions.classList.remove(
        "is-open"
      );

      window.location.href =
        `Productpage/index.html?product=${encodeURIComponent(productId)}`;

    }
  );


  document.addEventListener(
    "click",
    (event) => {

      if (!event.target.closest(".search-pill")) {

        searchSuggestions?.classList.remove(
          "is-open"
        );

      }

    }
  );
})();


