(() => {

  "use strict";


  const WISHLIST_KEY =
    "ecstasyWishlist";

  const RECENT_KEY =
    "ecstasyRecentlyViewed";


  const products =
    window.ECSTASY_PRODUCTS || {};


  const wishlistGrid =
    document.querySelector(
      "#wishlistGrid"
    );

  const savedItemsCount =
    document.querySelector(
      "#savedItemsCount"
    );

  const viewButtons =
    document.querySelectorAll(
      "[data-wishlist-view]"
    );

  const menuToggle =
    document.querySelector(
      ".menu-toggle"
    );

  const mobileNav =
    document.querySelector(
      ".mobile-nav"
    );

  const searchInput =
    document.querySelector(
      "#wishlistSearch"
    );

  const searchSuggestions =
    document.querySelector(
      "#wishlistSearchSuggestions"
    );


  let activeView =
    "saved";



  /* ========================================
     STORAGE
     ======================================== */

  function readIds(key) {

    try {

      const value =
        JSON.parse(
          localStorage.getItem(key)
        );


      return Array.isArray(value)
        ? [...new Set(value)]
        : [];

    } catch {

      return [];

    }

  }



  function writeWishlist(ids) {

    localStorage.setItem(
      WISHLIST_KEY,
      JSON.stringify(ids)
    );


    window.dispatchEvent(
      new CustomEvent(
        "ecstasy:wishlist-updated"
      )
    );

  }



  /* ========================================
     HELPERS
     ======================================== */

  function escapeHtml(value = "") {

    return String(value)

      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  }



  function money(value) {

    return `$${Number(value).toFixed(2)}`;

  }



  function productUrl(id) {

    return (
      `../Productpage/index.html?product=${encodeURIComponent(id)}`
    );

  }



  function imageUrl(path = "") {

    const cleaned =
      String(path)

        .replace(
          /^(\.\.\/)+/,
          ""
        )

        .replace(
          /^\.?\//,
          ""
        );


    return cleaned
      ? `../${cleaned}`
      : "";

  }



  function getViewProducts() {

    const ids =
      activeView === "saved"

        ? readIds(
            WISHLIST_KEY
          )

        : readIds(
            RECENT_KEY
          );


    return ids

      .map(
        (id) =>
          products[id]
      )

      .filter(Boolean);

  }



  /* ========================================
     COUNT
     ======================================== */

  function updateSavedCount() {

    savedItemsCount.textContent =
      readIds(
        WISHLIST_KEY
      ).length;

  }



  /* ========================================
     CARD
     ======================================== */

  function productCard(product) {

    const saved =
      readIds(
        WISHLIST_KEY
      )
        .includes(
          product.id
        );


    const category =
      String(
        product.category || ""
      )
        .split("/")[0]
        .trim();


    const colors =
      Array.isArray(
        product.colors
      )

        ? product.colors.slice(
            0,
            4
          )

        : [];


    return `

      <article class="wishlist-card">


        <a
          class="wishlist-card-media"
          href="${productUrl(product.id)}"
          aria-label="View ${escapeHtml(product.name)}"
        >

          <img
            src="${imageUrl(product.image)}"
            alt="${escapeHtml(product.name)}"
            loading="lazy"
          >

        </a>


        <button
          type="button"
          class="wishlist-card-heart${saved ? " is-saved" : ""}"
          data-wishlist-toggle="${product.id}"
          aria-label="${saved ? "Remove from wishlist" : "Save to wishlist"}"
          aria-pressed="${saved}"
        >
          ${saved ? "♥" : "♡"}
        </button>


        <div class="wishlist-card-content">


          <p class="wishlist-card-category">
            ${escapeHtml(category)}
          </p>


          <h2 class="wishlist-card-title">

            <a
              href="${productUrl(product.id)}"
            >
              ${escapeHtml(product.name)}
            </a>

          </h2>


          <p class="wishlist-card-price">
            ${money(product.price)}
          </p>


          <div
            class="wishlist-card-colors"
            aria-label="Available colors"
          >

            ${colors
              .map(
                (color) => `

                  <span
                    class="wishlist-color-dot"
                    style="--wishlist-color:${color.value}"
                    title="${escapeHtml(color.name)}"
                    aria-label="${escapeHtml(color.name)}"
                  ></span>

                `
              )
              .join("")}

          </div>


          <div class="wishlist-card-actions">


            <a
              class="wishlist-view-product"
              href="${productUrl(product.id)}"
            >

              View Product

              <span
                class="wishlist-view-arrow"
                aria-hidden="true"
              >
                →
              </span>

            </a>


            <button
              type="button"
              class="wishlist-remove"
              data-wishlist-toggle="${product.id}"
            >

              <span aria-hidden="true">
                ${saved ? "♡" : "+"}
              </span>

              ${
                saved
                  ? "Remove"
                  : "Save Item"
              }

            </button>


          </div>


        </div>


      </article>

    `;

  }



  /* ========================================
     RENDER
     ======================================== */

  function renderWishlist() {

    updateSavedCount();


    const visibleProducts =
      getViewProducts();


    if (!visibleProducts.length) {

      const savedView =
        activeView === "saved";


      wishlistGrid.innerHTML = `

        <div class="wishlist-empty">


          <div
            class="wishlist-empty-heart"
            aria-hidden="true"
          >
            ♡
          </div>


          <h2>

            ${
              savedView
                ? "Your wishlist is empty"
                : "No recently viewed pieces yet"
            }

          </h2>


          <p>

            ${
              savedView

                ? "Save pieces you love and they'll appear here."

                : "Open some products and they will appear here for quick access."
            }

          </p>


          <a href="../index.html#featured">
            Explore Collection →
          </a>


        </div>

      `;


      return;

    }


    wishlistGrid.innerHTML =
      visibleProducts

        .map(
          productCard
        )

        .join("");

  }



  /* ========================================
     SAVE / REMOVE
     ======================================== */

  wishlistGrid.addEventListener(
    "click",
    (event) => {


      const button =
        event.target.closest(
          "[data-wishlist-toggle]"
        );


      if (!button) {

        return;

      }


      const productId =
        button.dataset.wishlistToggle;


      const wishlist =
        readIds(
          WISHLIST_KEY
        );


      const exists =
        wishlist.includes(
          productId
        );


      const nextWishlist =
        exists

          ? wishlist.filter(
              (id) =>
                id !== productId
            )

          : [
              ...wishlist,
              productId
            ];


      writeWishlist(
        nextWishlist
      );


      renderWishlist();

    }
  );



  /* ========================================
     TABS
     ======================================== */

  viewButtons.forEach(
    (button) => {


      button.addEventListener(
        "click",
        () => {


          activeView =
            button.dataset.wishlistView;


          viewButtons.forEach(
            (item) => {


              const active =
                item === button;


              item.classList.toggle(
                "is-active",
                active
              );


              item.setAttribute(
                "aria-selected",
                String(active)
              );

            }
          );


          renderWishlist();

        }
      );

    }
  );



  /* ========================================
     MOBILE MENU
     ======================================== */

  if (
    menuToggle
    &&
    mobileNav
  ) {

    menuToggle.addEventListener(
      "click",
      () => {


        const open =
          menuToggle.getAttribute(
            "aria-expanded"
          )
          ===
          "true";


        menuToggle.setAttribute(
          "aria-expanded",
          String(!open)
        );


        mobileNav.classList.toggle(
          "is-open",
          !open
        );

      }
    );

  }



  /* ========================================
     SEARCH
     ======================================== */

  searchInput?.addEventListener(
    "input",
    () => {


      const value =
        searchInput.value
          .trim()
          .toLowerCase();


      if (!value) {

        searchSuggestions.innerHTML =
          "";


        searchSuggestions.classList.remove(
          "is-open"
        );


        return;

      }



      const matches =
        Object.values(products)

          .filter(
            (product) => {


              const text =
                `${product.name}
                 ${product.category}
                 ${product.keywords || ""}`
                  .toLowerCase();


              return text.includes(
                value
              );

            }
          )

          .slice(
            0,
            6
          );



      if (!matches.length) {

        searchSuggestions.innerHTML = `

          <p class="search-no-result">
            No products found
          </p>

        `;

      } else {

        searchSuggestions.innerHTML =
          matches

            .map(
              (product) => `

                <button
                  type="button"
                  class="search-suggestion-item"
                  data-search-product="${product.id}"
                >

                  <span class="search-suggestion-name">
                    ${escapeHtml(product.name)}
                  </span>

                  <span class="search-suggestion-category">
                    ${escapeHtml(product.category)}
                  </span>

                </button>

              `
            )

            .join("");

      }


      searchSuggestions.classList.add(
        "is-open"
      );

    }
  );



  searchSuggestions?.addEventListener(
    "click",
    (event) => {


      const item =
        event.target.closest(
          "[data-search-product]"
        );


      if (!item) {

        return;

      }


      window.location.href =
        productUrl(
          item.dataset.searchProduct
        );

    }
  );



  document.addEventListener(
    "click",
    (event) => {


      if (
        !event.target.closest(
          ".search-pill"
        )
      ) {

        searchSuggestions
          ?.classList.remove(
            "is-open"
          );

      }

    }
  );



  /* ========================================
     CROSS-TAB STORAGE SYNC
     ======================================== */

  window.addEventListener(
    "storage",
    (event) => {


      if (
        event.key === WISHLIST_KEY
        ||
        event.key === RECENT_KEY
      ) {

        renderWishlist();

      }

    }
  );



  /* ========================================
     START
     ======================================== */

  renderWishlist();


})();