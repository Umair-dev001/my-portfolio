(function () {
  "use strict";

  const menuToggle = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  const mobileLinks = document.querySelectorAll(".mobile-nav a, .nav-links a");
 
  /* ========================================
   Featured Collection
   Filters + Sorting + View Switching
   ======================================== */

  const featuredGrid =
    document.querySelector(".featured-grid");

  const collectionFilterButtons =
    document.querySelectorAll(
      "[data-collection-filter]"
    );

  const collectionSort =
    document.querySelector(
      "#collectionSort"
    );

  const collectionResultCount =
    document.querySelector(
      "#collectionResultCount"
    );

  const collectionViewButtons =
    document.querySelectorAll(
      "[data-view-mode]"
    );


  const collectionProducts =
    Object.values(
      window.ECSTASY_PRODUCTS || {}
    );


  let activeCollectionFilter =
    "all";

  let activeCollectionSort =
    "featured";

  let activeCollectionView =
    "grid";


  /* Determine main shopping category */

  function getProductGroup(product) {

    const category =
      String(product.category || "")
        .trim()
        .toLowerCase();


    if (
      category.startsWith("outerwear")
    ) {
      return "outerwear";
    }


    if (
      category.startsWith("bottoms")
    ) {
      return "bottoms";
    }


    return "tops";
  }


  /* Update numbers inside filter pills */

  function updateCollectionFilterCounts() {

    const counts = {
      all: collectionProducts.length,
      outerwear: 0,
      tops: 0,
      bottoms: 0
    };


    collectionProducts.forEach(
      (product) => {

        const group =
          getProductGroup(product);


        if (
          Object.prototype.hasOwnProperty.call(
            counts,
            group
          )
        ) {
          counts[group] += 1;
        }

      }
    );


    document
      .querySelectorAll(
        "[data-filter-count]"
      )
      .forEach((element) => {

        const group =
          element.dataset.filterCount;


        element.textContent =
          counts[group] ?? 0;

      });

  }


  /* Filter + sort products */

  function getVisibleCollectionProducts() {

    let products =
      activeCollectionFilter === "all"

        ? [...collectionProducts]

        : collectionProducts.filter(
          (product) =>
            getProductGroup(product)
            ===
            activeCollectionFilter
        );


    switch (
    activeCollectionSort
    ) {

      case "price-low":

        products.sort(
          (a, b) =>
            Number(a.price)
            -
            Number(b.price)
        );

        break;


      case "price-high":

        products.sort(
          (a, b) =>
            Number(b.price)
            -
            Number(a.price)
        );

        break;


      case "rating":

        products.sort(
          (a, b) =>
            Number(b.rating)
            -
            Number(a.rating)
        );

        break;


      case "name":

        products.sort(
          (a, b) =>
            String(a.name)
              .localeCompare(
                String(b.name)
              )
        );

        break;


      default:

        /*
          Featured keeps the original
          products.js order.
        */

        break;

    }


    return products;
  }


  /* Render product cards */

  function renderCollection() {

    if (!featuredGrid) {
      return;
    }


    const products =
      getVisibleCollectionProducts();


    featuredGrid.classList.toggle(
      "is-list-view",
      activeCollectionView === "list"
    );


    if (!products.length) {

      featuredGrid.innerHTML = `
        <div class="collection-empty">
          No products found in this collection.
        </div>
      `;

    } else {

      featuredGrid.innerHTML =
        products
          .map((product) => `

            <a
              class="featured-card"
              data-product-card="${product.id}"
              href="Productpage/index.html?product=${encodeURIComponent(product.id)}"
              aria-label="View ${product.name}"
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

                <span
                  class="featured-arrow"
                  aria-hidden="true"
                >
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
                  $${Number(product.price).toFixed(0)}
                </p>

              </div>

            </a>

          `)
          .join("");

    }


    if (collectionResultCount) {

      collectionResultCount.textContent =
        `Showing ${products.length} product${products.length === 1 ? "" : "s"}`;

    }

  }


  /* Filter buttons */

  collectionFilterButtons.forEach(
    (button) => {

      button.addEventListener(
        "click",
        () => {

          activeCollectionFilter =
            button.dataset.collectionFilter;


          collectionFilterButtons.forEach(
            (item) => {

              const active =
                item === button;


              item.classList.toggle(
                "is-active",
                active
              );


              item.setAttribute(
                "aria-pressed",
                String(active)
              );

            }
          );


          renderCollection();

        }
      );

    }
  );


  /* Sort */

  collectionSort?.addEventListener(
    "change",
    () => {

      activeCollectionSort =
        collectionSort.value;


      renderCollection();

    }
  );


  /* Grid / list buttons */

  collectionViewButtons.forEach(
    (button) => {

      button.addEventListener(
        "click",
        () => {

          activeCollectionView =
            button.dataset.viewMode;


          collectionViewButtons.forEach(
            (item) => {

              const active =
                item === button;


              item.classList.toggle(
                "is-active",
                active
              );


              item.setAttribute(
                "aria-pressed",
                String(active)
              );

            }
          );


          renderCollection();

        }
      );

    }
  );


  /* Initial collection */

  updateCollectionFilterCounts();

  renderCollection();

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


