(() => {
  "use strict";

  // /* ========================================
  //    Product Data
  //    One source powers every product detail view.
  //    ======================================== */
  // const products = {
  //   jacket: {
  //     id: "jacket",
  //     name: "Urban Leather Jacket",
  //     category: "Outerwear / Premium",
  //     price: 129,
  //     compareAt: 169,
  //     badge: "Best Seller",
  //     rating: 4.8,
  //     reviews: 120,
  //     image: "../assets/images/featured/jacket.jpg",
  //     description:
  //       "A confident outerwear essential designed for modern styling, everyday comfort, and an elevated finish that works from casual afternoons to evening plans.",
  //     details:
  //       "Structured silhouette, clean finishing, easy layering proportions, and a versatile neutral palette designed to pair with everyday wardrobe staples.",
  //     features: [
  //       "Premium statement outerwear silhouette",
  //       "Comfortable everyday layering fit",
  //       "Clean modern detailing",
  //       "Designed for versatile seasonal styling"
  //     ],
  //     sizes: ["S", "M", "L", "XL"],
  //     colors: [
  //       { name: "Black", value: "#171717" },
  //       { name: "Brown", value: "#9a5f3a" },
  //       { name: "Stone", value: "#d8c4ae" },
  //       { name: "Mist", value: "#d8dce2" }
  //     ],
  //     views: [
  //       { label: "Full view", position: "50% 50%", scale: 1 },
  //       { label: "Upper detail", position: "50% 26%", scale: 1.22 },
  //       { label: "Texture detail", position: "34% 42%", scale: 1.34 },
  //       { label: "Lower detail", position: "58% 72%", scale: 1.18 }
  //     ],
  //     related: ["shirt", "trouser"]
  //   },

  //   shirt: {
  //     id: "shirt",
  //     name: "Signature Casual Shirt",
  //     category: "Casual / Essentials",
  //     price: 69,
  //     compareAt: 89,
  //     badge: "New",
  //     rating: 4.7,
  //     reviews: 86,
  //     image: "../assets/images/featured/shirt.jpg",
  //     description:
  //       "An easy everyday shirt with a refined shape, clean styling, and a relaxed character made for simple layering and effortless outfits.",
  //     details:
  //       "Lightweight visual profile, versatile everyday styling, balanced proportions, and a clean essential look designed for repeat wear.",
  //     features: [
  //       "Easy everyday essential",
  //       "Clean relaxed silhouette",
  //       "Designed for simple layering",
  //       "Versatile neutral styling"
  //     ],
  //     sizes: ["S", "M", "L", "XL"],
  //     colors: [
  //       { name: "White", value: "#f8fafc" },
  //       { name: "Sky", value: "#b9d8ee" },
  //       { name: "Sand", value: "#d8c5a7" }
  //     ],
  //     views: [
  //       { label: "Full view", position: "50% 50%", scale: 1 },
  //       { label: "Collar detail", position: "50% 22%", scale: 1.24 },
  //       { label: "Fabric detail", position: "38% 43%", scale: 1.32 }
  //     ],
  //     related: ["jacket", "trouser"]
  //   },

  //   trouser: {
  //     id: "trouser",
  //     name: "Tailored Everyday Trouser",
  //     category: "Bottoms / Modern",
  //     price: 79,
  //     compareAt: 99,
  //     badge: "Bestseller",
  //     rating: 4.6,
  //     reviews: 94,
  //     image: "../assets/images/featured/trouser.jpg",
  //     description:
  //       "A clean tailored trouser that balances polished structure with an easy everyday feel, designed to move naturally between smart and casual styling.",
  //     details:
  //       "Modern tailored shape, versatile neutral tone, clean waistband styling, and a balanced silhouette for everyday combinations.",
  //     features: [
  //       "Modern tailored silhouette",
  //       "Everyday wardrobe versatility",
  //       "Clean minimal detailing",
  //       "Easy smart-to-casual styling"
  //     ],
  //     sizes: ["S", "M", "L", "XL"],
  //     colors: [
  //       { name: "Beige", value: "#c9aa80" },
  //       { name: "Charcoal", value: "#4b5563" },
  //       { name: "Black", value: "#171717" }
  //     ],
  //     views: [
  //       { label: "Full view", position: "50% 50%", scale: 1 },
  //       { label: "Waist detail", position: "50% 18%", scale: 1.26 },
  //       { label: "Fabric detail", position: "44% 48%", scale: 1.32 }
  //     ],
  //     related: ["jacket", "shirt"]
  //   }
  // };

  const products = Object.fromEntries(
    Object.entries(window.ECSTASY_PRODUCTS).map(
      ([id, product]) => [
        id,
        {
          ...product,
          image: `../${product.image}`
        }
      ]
    )
  );


  /* ========================================
     Elements
     ======================================== */
  const productImage = document.querySelector("#productImage");
  const zoomImage = document.querySelector("#zoomImage");
  const productThumbnails = document.querySelector("#productThumbnails");

  const breadcrumbProduct = document.querySelector("#breadcrumbProduct");
  const productBadge = document.querySelector("#productBadge");
  const productPill = document.querySelector("#productPill");
  const productCategory = document.querySelector("#productCategory");
  const productTitle = document.querySelector("#productTitle");
  const productPrice = document.querySelector("#productPrice");
  const productOldPrice = document.querySelector("#productOldPrice");
  const productDiscount = document.querySelector("#productDiscount");
  const productRating = document.querySelector("#productRating");
  const productReviews = document.querySelector("#productReviews");
  const productSummary = document.querySelector("#productSummary");

  const selectedColorLabel = document.querySelector("#selectedColorLabel");
  const colorOptions = document.querySelector("#colorOptions");
  const sizeOptions = document.querySelector("#sizeOptions");
  const sizeMessage = document.querySelector("#sizeMessage");

  const quantityValue = document.querySelector("#quantityValue");
  const quantityMinus = document.querySelector("#quantityMinus");
  const quantityPlus = document.querySelector("#quantityPlus");

  const addToBag = document.querySelector("#addToBag");
  const wishlistButton = document.querySelector("#wishlistButton");
  const cartButton = document.querySelector("#cartButton");
  const bagCount = document.querySelector("#bagCount");

  const tabDescription = document.querySelector("#tabDescription");
  const tabDetails = document.querySelector("#tabDetails");
  const featureList = document.querySelector("#featureList");
  const reviewScore = document.querySelector("#reviewScore");
  const reviewText = document.querySelector("#reviewText");

  const relatedProducts = document.querySelector("#relatedProducts");

  const galleryPrev = document.querySelector("#galleryPrev");
  const galleryNext = document.querySelector("#galleryNext");
  const zoomButton = document.querySelector("#zoomButton");

  const zoomDialog = document.querySelector("#zoomDialog");
  const sizeDialog = document.querySelector("#sizeDialog");
  const sizeGuideButton = document.querySelector("#sizeGuideButton");

  const productToast = document.querySelector("#productToast");


  /* ========================================
     Current Product State
     ======================================== */
  const params = new URLSearchParams(window.location.search);
  const requestedId = params.get("product");
  const product = products[requestedId] || products.jacket;

  let selectedView = 0;
  let selectedColor = product.colors[0];
  let selectedSize = null;
  let quantity = 1;

  const CART_KEY = "ecstasyCart";
  const WISHLIST_KEY = "ecstasyWishlist";


  /* ========================================
     Helpers
     ======================================== */
  function money(value) {
    return `$${Number(value).toFixed(2)}`;
  }

  function readStorage(key, fallback = []) {
    try {
      return JSON.parse(localStorage.getItem(key)) || fallback;
    } catch {
      return fallback;
    }
  }

  function writeStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  let toastTimer;

  function showToast(message) {
    if (!productToast) return;

    clearTimeout(toastTimer);

    productToast.textContent = message;
    productToast.classList.add("is-visible");

    toastTimer = setTimeout(() => {
      productToast.classList.remove("is-visible");
    }, 2800);
  }

  function calculateDiscount() {
    if (!product.compareAt || product.compareAt <= product.price) {
      return 0;
    }

    return Math.round(
      ((product.compareAt - product.price) / product.compareAt) * 100
    );
  }


  /* ========================================
     Render Main Product
     ======================================== */
  function renderProduct() {
    document.title = `${product.name} — Ecstasy`;

    breadcrumbProduct.textContent = product.name;
    productBadge.textContent = product.badge;
    productPill.textContent = product.badge;
    productCategory.textContent = product.category;
    productTitle.textContent = product.name;

    productPrice.textContent = money(product.price);

    if (product.compareAt) {
      productOldPrice.textContent = money(product.compareAt);
      productOldPrice.hidden = false;
    } else {
      productOldPrice.hidden = true;
    }

    const discount = calculateDiscount();

    if (discount > 0) {
      productDiscount.textContent = `${discount}% OFF`;
      productDiscount.hidden = false;
    } else {
      productDiscount.hidden = true;
    }

    productRating.textContent = product.rating.toFixed(1);
    productReviews.textContent = `${product.reviews} reviews`;
    productSummary.textContent = product.description;

    tabDescription.textContent = product.description;
    tabDetails.textContent = product.details;

    featureList.innerHTML = product.features
      .map((feature) => `<li>${feature}</li>`)
      .join("");

    reviewScore.textContent = product.rating.toFixed(1);
    reviewText.textContent =
      `Based on ${product.reviews} customer reviews in this portfolio demo.`;

    renderGallery();
    renderColors();
    renderSizes();
    renderRelatedProducts();
    renderWishlistState();
    updateBagCount();
  }


  /* ========================================
     Gallery
     ======================================== */
  function renderGallery() {
    productThumbnails.innerHTML = product.views
      .map((view, index) => `
        <button
          type="button"
          class="product-thumb${index === selectedView ? " is-active" : ""}"
          data-view-index="${index}"
          aria-label="${view.label}"
          aria-pressed="${index === selectedView}"
        >
          <img
            src="${product.image}"
            alt=""
            style="object-position:${view.position}; transform:scale(${view.scale});"
          >
        </button>
      `)
      .join("");

    applyGalleryView();
  }

  function applyGalleryView() {
    const view = product.views[selectedView];

    productImage.src = product.image;
    productImage.alt = product.name;
    productImage.style.objectPosition = view.position;
    productImage.style.transform = `scale(${view.scale})`;

    zoomImage.src = product.image;
    zoomImage.alt = `${product.name} enlarged view`;
    zoomImage.style.objectPosition = view.position;

    productThumbnails
      .querySelectorAll(".product-thumb")
      .forEach((button, index) => {
        const active = index === selectedView;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", String(active));
      });
  }

  productThumbnails?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-view-index]");
    if (!button) return;

    selectedView = Number(button.dataset.viewIndex);
    applyGalleryView();
  });

  galleryPrev?.addEventListener("click", () => {
    selectedView =
      (selectedView - 1 + product.views.length) % product.views.length;

    applyGalleryView();
  });

  galleryNext?.addEventListener("click", () => {
    selectedView =
      (selectedView + 1) % product.views.length;

    applyGalleryView();
  });


  /* ========================================
     Colors
     ======================================== */
  function renderColors() {
    colorOptions.innerHTML = product.colors
      .map((color, index) => `
        <button
          type="button"
          class="color-swatch${index === 0 ? " is-active" : ""}"
          style="--swatch:${color.value}"
          data-color-index="${index}"
          aria-label="${color.name}"
          aria-pressed="${index === 0}"
          title="${color.name}"
        ></button>
      `)
      .join("");

    selectedColorLabel.textContent = selectedColor.name;
  }

  colorOptions?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-color-index]");
    if (!button) return;

    const colorIndex = Number(button.dataset.colorIndex);
    selectedColor = product.colors[colorIndex];

    selectedColorLabel.textContent = selectedColor.name;

    colorOptions
      .querySelectorAll(".color-swatch")
      .forEach((swatch, index) => {
        const active = index === colorIndex;
        swatch.classList.toggle("is-active", active);
        swatch.setAttribute("aria-pressed", String(active));
      });
  });


  /* ========================================
     Sizes
     ======================================== */
  function renderSizes() {
    sizeOptions.innerHTML = product.sizes
      .map((size) => `
        <button
          type="button"
          class="size-btn"
          data-size="${size}"
          aria-pressed="false"
        >
          ${size}
        </button>
      `)
      .join("");
  }

  sizeOptions?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-size]");
    if (!button) return;

    selectedSize = button.dataset.size;
    sizeMessage.textContent = "";

    sizeOptions
      .querySelectorAll(".size-btn")
      .forEach((sizeButton) => {
        const active = sizeButton.dataset.size === selectedSize;
        sizeButton.classList.toggle("is-active", active);
        sizeButton.setAttribute("aria-pressed", String(active));
      });
  });


  /* ========================================
     Quantity
     ======================================== */
  function updateQuantity() {
    quantityValue.textContent = quantity;
    quantityMinus.disabled = quantity <= 1;
    quantityPlus.disabled = quantity >= 10;
  }

  quantityMinus?.addEventListener("click", () => {
    quantity = Math.max(1, quantity - 1);
    updateQuantity();
  });

  quantityPlus?.addEventListener("click", () => {
    quantity = Math.min(10, quantity + 1);
    updateQuantity();
  });


  /* ========================================
     Cart / Add to Bag
     ======================================== */
  function updateBagCount() {
    const cart = readStorage(CART_KEY);

    const totalItems = cart.reduce(
      (total, item) => total + Number(item.quantity || 0),
      0
    );

    bagCount.textContent = totalItems;
  }

  addToBag?.addEventListener("click", () => {
    if (!selectedSize) {
      sizeMessage.textContent = "Please select a size before adding this item.";
      sizeOptions.querySelector(".size-btn")?.focus();
      return;
    }

    const cart = readStorage(CART_KEY);

    const existing = cart.find((item) =>
      item.productId === product.id &&
      item.size === selectedSize &&
      item.color === selectedColor.name
    );

    if (existing) {
      existing.quantity = Math.min(
        10,
        Number(existing.quantity || 0) + quantity
      );
    } else {
      cart.push({
        productId: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        size: selectedSize,
        color: selectedColor.name,
        quantity
      });
    }

    writeStorage(CART_KEY, cart);
    updateBagCount();

    showToast(
      `${quantity} × ${product.name} added to your bag.`
    );
  });


  /* ========================================
     Wishlist
     ======================================== */
  function renderWishlistState() {
    const wishlist = readStorage(WISHLIST_KEY);
    const active = wishlist.includes(product.id);

    wishlistButton.classList.toggle("is-active", active);
    wishlistButton.setAttribute("aria-pressed", String(active));
    wishlistButton.setAttribute(
      "aria-label",
      active ? "Remove product from wishlist" : "Add product to wishlist"
    );

    wishlistButton.querySelector("span").textContent = active ? "♥" : "♡";
  }

  wishlistButton?.addEventListener("click", () => {
    const wishlist = readStorage(WISHLIST_KEY);
    const active = wishlist.includes(product.id);

    const nextWishlist = active
      ? wishlist.filter((id) => id !== product.id)
      : [...wishlist, product.id];

    writeStorage(WISHLIST_KEY, nextWishlist);
    window.dispatchEvent(
  new CustomEvent("ecstasy:wishlist-updated")
);
    renderWishlistState();

    showToast(
      active
        ? "Removed from wishlist."
        : "Saved to wishlist."
    );
  });


  /* ========================================
     Tabs
     ======================================== */
  document.querySelectorAll(".product-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      const tabName = tab.dataset.tab;

      document.querySelectorAll(".product-tab").forEach((item) => {
        const active = item === tab;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-selected", String(active));
      });

      document.querySelectorAll(".product-tab-panel").forEach((panel) => {
        const active =
          panel.id.toLowerCase().startsWith(tabName.toLowerCase());

        panel.classList.toggle("is-active", active);
        panel.hidden = !active;
      });
    });
  });


  /* ========================================
     Related Products
     ======================================== */
  function renderRelatedProducts() {
    relatedProducts.innerHTML = product.related
      .map((relatedId) => products[relatedId])
      .filter(Boolean)
      .map((related) => `
        <a
          class="related-card"
          href="index.html?product=${encodeURIComponent(related.id)}"
          aria-label="View ${related.name}"
        >
          <div class="related-card-image">
            <img src="${related.image}" alt="${related.name}" loading="lazy">
          </div>

          <div class="related-card-copy">
            <p class="related-card-category">${related.category}</p>
            <h3>${related.name}</h3>
            <p class="related-card-price">${money(related.price)}</p>
          </div>
        </a>
      `)
      .join("");
  }


  /* ========================================
     Dialogs
     ======================================== */
  zoomButton?.addEventListener("click", () => {
    zoomDialog?.showModal();
  });

  sizeGuideButton?.addEventListener("click", () => {
    sizeDialog?.showModal();
  });

  document.querySelectorAll("[data-dialog-close]").forEach((button) => {
    button.addEventListener("click", () => {
      button.closest("dialog")?.close();
    });
  });

  [zoomDialog, sizeDialog].forEach((dialog) => {
    dialog?.addEventListener("click", (event) => {
      if (event.target === dialog) {
        dialog.close();
      }
    });
  });


  /* ========================================
     Keyboard Gallery Navigation
     ======================================== */
  document.addEventListener("keydown", (event) => {
    if (zoomDialog?.open || sizeDialog?.open) return;

    if (event.key === "ArrowLeft") {
      galleryPrev?.click();
    }

    if (event.key === "ArrowRight") {
      galleryNext?.click();
    }
  });


  /* ========================================
     Start
     ======================================== */
  renderProduct();
  updateQuantity();
})();
