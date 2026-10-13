(() => {

  "use strict";


  /* ========================================
     SETTINGS
     ======================================== */


  const CART_KEY =
    "ecstasyCart";


  const FREE_SHIPPING_TARGET =
    50;


  const MAX_QUANTITY =
    10;



  let lastFocusedElement =
    null;


  let toastTimer =
    null;



  /* ========================================
     READ CART
     ======================================== */


  function readCart() {


    try {


      const value =
        JSON.parse(
          localStorage.getItem(
            CART_KEY
          )
        );


      return Array.isArray(value)
        ? value
        : [];


    } catch {


      return [];


    }


  }



  /* ========================================
     SAVE CART
     ======================================== */


  function writeCart(cart) {


    localStorage.setItem(

      CART_KEY,

      JSON.stringify(
        cart
      )

    );


    window.dispatchEvent(

      new CustomEvent(
        "ecstasy:cart-updated"
      )

    );


  }



  /* ========================================
     CHECK WHICH PAGE WE ARE ON
     ======================================== */


  function isProductPage() {


    return window.location.pathname
      .toLowerCase()
      .includes(
        "/productpage/"
      );


  }



  /* ========================================
     CORRECT IMAGE PATH
     ======================================== */


  function resolveCartImage(
    imagePath = ""
  ) {


    const cleaned =

      String(imagePath)

        .replace(
          /\\/g,
          "/"
        )

        .replace(
          /^(\.\.\/)+/,
          ""
        )

        .replace(
          /^\.?\//,
          ""
        );



    if (!cleaned) {


      return "";


    }



    return isProductPage()

      ? `../${cleaned}`

      : cleaned;


  }



  /* ========================================
     PRODUCT PAGE URL
     ======================================== */


  function productUrl(
    productId
  ) {


    return isProductPage()

      ? `index.html?product=${encodeURIComponent(productId)}`

      : `Productpage/index.html?product=${encodeURIComponent(productId)}`;


  }



  /* ========================================
     CREATE CART DRAWER HTML
     ======================================== */


  function buildDrawer() {


    if (
      document.querySelector(
        "#cartDrawer"
      )
    ) {


      return;


    }



    document.body.insertAdjacentHTML(

      "beforeend",

      `

      <div
        class="cart-overlay"
        id="cartOverlay"
        aria-hidden="true">
      </div>


      <aside
        class="cart-drawer"
        id="cartDrawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cartDrawerTitle"
        aria-hidden="true">


        <!-- HEADER -->

        <div class="cart-drawer-header">


          <div class="cart-drawer-heading">


            <h2 id="cartDrawerTitle">

              Your Bag

            </h2>


            <span
              class="cart-header-count"
              id="cartHeaderCount">

              0

            </span>


          </div>


          <button
            type="button"
            class="cart-close"
            id="cartClose"
            aria-label="Close shopping bag">

            ×

          </button>


        </div>



        <!-- SHIPPING PROGRESS -->

        <div class="cart-shipping">


          <div class="cart-shipping-copy">


            <span id="cartShippingMessage">

              Add items for free delivery.

            </span>


            <strong id="cartShippingAmount">

              $0 / $${FREE_SHIPPING_TARGET}

            </strong>


          </div>


          <div
            class="cart-progress"
            aria-hidden="true">


            <div
              class="cart-progress-bar"
              id="cartProgressBar">
            </div>


          </div>


        </div>



        <!-- PRODUCTS -->

        <div
          class="cart-drawer-body"
          id="cartDrawerBody">
        </div>



        <!-- FOOTER -->

        <div class="cart-drawer-footer">


          <div class="cart-footer-actions-row">


            <span id="cartFooterItems">

              0 items

            </span>


            <button
              type="button"
              class="cart-clear"
              id="cartClear">

              Clear bag

            </button>


          </div>



          <div class="cart-summary-row">


            <span>

              Subtotal

            </span>


            <strong id="cartSubtotal">

              $0.00

            </strong>


          </div>



          <p class="cart-summary-note">

            Shipping and taxes are calculated
            at checkout.

          </p>



          <button
            type="button"
            class="cart-checkout"
            id="cartCheckout"
            disabled>


            Checkout


            <span aria-hidden="true">

              →

            </span>


          </button>



          <button
            type="button"
            class="cart-continue"
            id="cartContinue">


            Continue shopping


          </button>


        </div>


      </aside>



      <div
        class="cart-toast"
        id="cartToast"
        role="status"
        aria-live="polite">
      </div>

      `

    );


  }



  /* ========================================
     CREATE DRAWER
     ======================================== */


  buildDrawer();



  /* ========================================
     GET ELEMENTS
     ======================================== */


  const overlay =
    document.querySelector(
      "#cartOverlay"
    );


  const drawer =
    document.querySelector(
      "#cartDrawer"
    );


  const closeButton =
    document.querySelector(
      "#cartClose"
    );


  const drawerBody =
    document.querySelector(
      "#cartDrawerBody"
    );


  const headerCount =
    document.querySelector(
      "#cartHeaderCount"
    );


  const footerItems =
    document.querySelector(
      "#cartFooterItems"
    );


  const subtotalElement =
    document.querySelector(
      "#cartSubtotal"
    );


  const clearButton =
    document.querySelector(
      "#cartClear"
    );


  const checkoutButton =
    document.querySelector(
      "#cartCheckout"
    );


  const continueButton =
    document.querySelector(
      "#cartContinue"
    );


  const shippingMessage =
    document.querySelector(
      "#cartShippingMessage"
    );


  const shippingAmount =
    document.querySelector(
      "#cartShippingAmount"
    );


  const progressBar =
    document.querySelector(
      "#cartProgressBar"
    );


  const cartToast =
    document.querySelector(
      "#cartToast"
    );



  /* ========================================
     FIND BOTH BAG BUTTONS
     ======================================== */


  function getCartOpeners() {


    return [

      ...document.querySelectorAll(

        `
        [data-cart-open],
        #cartButton,
        .icon-btn[aria-label="Shopping bag"]
        `

      )

    ];


  }



  /* ========================================
     ADD COUNT TO HOME PAGE BAG
     ======================================== */


  function prepareHomeBagCount() {


    const homeBagButton =

      document.querySelector(

        '.icon-btn[aria-label="Shopping bag"]'

      );



    if (

      homeBagButton

      &&

      !homeBagButton.querySelector(
        "[data-cart-count]"
      )

    ) {


      const count =

        document.createElement(
          "span"
        );



      count.className =

        "cart-trigger-count is-empty";



      count.dataset.cartCount =
        "";



      count.textContent =
        "0";



      count.setAttribute(

        "aria-hidden",

        "true"

      );



      homeBagButton.append(
        count
      );


    }


  }



  /* ========================================
     CONNECT BAG BUTTONS
     ======================================== */


  function bindCartOpeners() {


    prepareHomeBagCount();



    getCartOpeners().forEach(
      (button) => {


        if (
          button.dataset.cartBound
          ===
          "true"
        ) {


          return;


        }



        button.dataset.cartBound =
          "true";



        button.addEventListener(

          "click",

          (event) => {


            event.preventDefault();


            /*
              This prevents the old
              Productpage Bag click
              behavior from running.
            */


            event.stopImmediatePropagation();


            openCart();


          },

          true

        );


      }
    );


  }



  /* ========================================
     TOTAL ITEMS
     ======================================== */


  function totalItems(
    cart
  ) {


    return cart.reduce(

      (
        sum,
        item
      ) =>

        sum
        +
        Number(
          item.quantity || 0
        ),

      0

    );


  }



  /* ========================================
     SUBTOTAL
     ======================================== */


  function subtotal(
    cart
  ) {


    return cart.reduce(

      (
        sum,
        item
      ) =>


        sum

        +

        Number(
          item.price || 0
        )

        *

        Number(
          item.quantity || 0
        ),

      0

    );


  }



  /* ========================================
     MONEY FORMAT
     ======================================== */


  function money(
    value
  ) {


    return `$${Number(value).toFixed(2)}`;


  }



  /* ========================================
     COUNT DISPLAY
     ======================================== */


  function renderCounts(
    cart
  ) {


    const count =
      totalItems(
        cart
      );



    document

      .querySelectorAll(

        `
        [data-cart-count],
        #bagCount
        `

      )

      .forEach(
        (element) => {


          element.textContent =
            count;



          if (

            element.classList.contains(
              "cart-trigger-count"
            )

          ) {


            element.classList.toggle(

              "is-empty",

              count === 0

            );


          }


        }
      );



    headerCount.textContent =
      count;



    footerItems.textContent =

      `${count} item${count === 1 ? "" : "s"}`;


  }



  /* ========================================
     SHIPPING PROGRESS
     ======================================== */


  function renderShipping(
    cart
  ) {


    const value =
      subtotal(
        cart
      );



    const progress =

      Math.min(

        100,

        (
          value
          /
          FREE_SHIPPING_TARGET
        )
        *
        100

      );



    progressBar.style.width =
      `${progress}%`;



    shippingAmount.textContent =

      `${money(
        Math.min(
          value,
          FREE_SHIPPING_TARGET
        )
      )} / ${money(
        FREE_SHIPPING_TARGET
      )}`;



    if (
      value
      >=
      FREE_SHIPPING_TARGET
    ) {


      shippingMessage.innerHTML =

        "<strong>Free delivery unlocked.</strong>";


    } else {


      const remaining =

        FREE_SHIPPING_TARGET
        -
        value;



      shippingMessage.innerHTML =

        `Add <strong>${money(remaining)}</strong> more for free delivery.`;


    }


  }



  /* ========================================
     HTML ESCAPE
     ======================================== */


  function escapeHtml(
    value = ""
  ) {


    return String(value)

      .replaceAll(
        "&",
        "&amp;"
      )

      .replaceAll(
        "<",
        "&lt;"
      )

      .replaceAll(
        ">",
        "&gt;"
      )

      .replaceAll(
        '"',
        "&quot;"
      )

      .replaceAll(
        "'",
        "&#039;"
      );


  }



  /* ========================================
     RENDER CART
     ======================================== */


  function renderCart() {


    const cart =
      readCart();



    renderCounts(
      cart
    );


    renderShipping(
      cart
    );



    const value =
      subtotal(
        cart
      );



    subtotalElement.textContent =
      money(
        value
      );



    checkoutButton.disabled =
      cart.length === 0;



    clearButton.hidden =
      cart.length === 0;



    /* EMPTY CART */


    if (
      !cart.length
    ) {


      drawerBody.innerHTML = `


        <div class="cart-empty">


          <div class="cart-empty-inner">


            <div
              class="cart-empty-icon"
              aria-hidden="true">

              🛍

            </div>


            <h3>

              Your bag is empty

            </h3>


            <p>

              Add a few pieces you love
              and they will appear here.

            </p>


            <button
              type="button"
              class="cart-empty-button"
              data-cart-continue>

              Continue shopping

            </button>


          </div>


        </div>


      `;


      return;


    }



    /* CART PRODUCTS */


    drawerBody.innerHTML = `


      <div class="cart-items">


        ${cart.map(

          (
            item,
            index
          ) => {


            const quantity =

              Number(
                item.quantity || 1
              );



            const itemTotal =

              Number(
                item.price || 0
              )

              *

              quantity;



            return `


              <article
                class="cart-item"
                data-cart-index="${index}">


                <!-- IMAGE -->


                <a
                  class="cart-item-media"
                  href="${productUrl(item.productId)}"
                  aria-label="View ${escapeHtml(item.name)}">


                  <img
                    src="${resolveCartImage(item.image)}"
                    alt="${escapeHtml(item.name)}">


                </a>



                <!-- CONTENT -->


                <div class="cart-item-content">


                  <div class="cart-item-top">


                    <h3 class="cart-item-name">


                      <a
                        href="${productUrl(item.productId)}">


                        ${escapeHtml(item.name)}


                      </a>


                    </h3>



                    <p class="cart-item-price">


                      ${money(itemTotal)}


                    </p>


                  </div>



                  <p class="cart-item-meta">


                    <span>

                      Size:
                      ${escapeHtml(
                        item.size || "—"
                      )}

                    </span>


                    <span>

                      Color:
                      ${escapeHtml(
                        item.color || "—"
                      )}

                    </span>


                  </p>



                  <div class="cart-item-controls">


                    <!-- QUANTITY -->


                    <div
                      class="cart-qty"
                      aria-label="Quantity for ${escapeHtml(item.name)}">


                      <button
                        type="button"
                        data-cart-action="minus"
                        data-cart-index="${index}"
                        aria-label="Decrease quantity"

                        ${
                          quantity <= 1
                            ? "disabled"
                            : ""
                        }>

                        −

                      </button>


                      <span>

                        ${quantity}

                      </span>


                      <button
                        type="button"
                        data-cart-action="plus"
                        data-cart-index="${index}"
                        aria-label="Increase quantity"

                        ${
                          quantity >= MAX_QUANTITY
                            ? "disabled"
                            : ""
                        }>

                        +

                      </button>


                    </div>



                    <!-- REMOVE -->


                    <button
                      type="button"
                      class="cart-remove"
                      data-cart-action="remove"
                      data-cart-index="${index}">

                      Remove

                    </button>


                  </div>


                </div>


              </article>


            `;


          }

        ).join("")}


      </div>


    `;


  }



  /* ========================================
     OPEN CART
     ======================================== */


  function openCart() {


    lastFocusedElement =
      document.activeElement;



    renderCart();



    drawer.classList.add(
      "is-open"
    );


    overlay.classList.add(
      "is-open"
    );



    drawer.setAttribute(

      "aria-hidden",

      "false"

    );


    overlay.setAttribute(

      "aria-hidden",

      "false"

    );



    document.body.classList.add(

      "cart-drawer-open"

    );



    window.setTimeout(

      () => {


        closeButton.focus();


      },

      60

    );


  }



  /* ========================================
     CLOSE CART
     ======================================== */


  function closeCart() {


    drawer.classList.remove(
      "is-open"
    );


    overlay.classList.remove(
      "is-open"
    );



    drawer.setAttribute(

      "aria-hidden",

      "true"

    );


    overlay.setAttribute(

      "aria-hidden",

      "true"

    );



    document.body.classList.remove(

      "cart-drawer-open"

    );



    lastFocusedElement
      ?.focus?.();


  }



  /* CLOSE BUTTON */


  closeButton.addEventListener(

    "click",

    closeCart

  );



  /* OVERLAY CLICK */


  overlay.addEventListener(

    "click",

    closeCart

  );



  /* CONTINUE SHOPPING */


  continueButton.addEventListener(

    "click",

    closeCart

  );



  drawerBody.addEventListener(

    "click",

    (event) => {


      if (

        event.target.closest(
          "[data-cart-continue]"
        )

      ) {


        closeCart();


      }


    }

  );



  /* ========================================
     QUANTITY + REMOVE
     ======================================== */


  drawerBody.addEventListener(

    "click",

    (event) => {


      const button =

        event.target.closest(
          "[data-cart-action]"
        );



      if (!button) {


        return;


      }



      const index =

        Number(
          button.dataset.cartIndex
        );



      const action =

        button.dataset.cartAction;



      const cart =
        readCart();



      const item =
        cart[index];



      if (!item) {


        return;


      }



      /* PLUS */


      if (
        action === "plus"
      ) {


        item.quantity =

          Math.min(

            MAX_QUANTITY,

            Number(
              item.quantity || 1
            )
            +
            1

          );


      }



      /* MINUS */


      if (
        action === "minus"
      ) {


        item.quantity =

          Math.max(

            1,

            Number(
              item.quantity || 1
            )
            -
            1

          );


      }



      /* REMOVE */


      if (
        action === "remove"
      ) {


        const removedName =
          item.name;



        cart.splice(

          index,

          1

        );



        writeCart(
          cart
        );


        renderCart();



        showCartToast(

          `${removedName} removed from your bag.`

        );


        return;


      }



      writeCart(
        cart
      );


      renderCart();


    }

  );



  /* ========================================
     CLEAR BAG
     ======================================== */


  clearButton.addEventListener(

    "click",

    () => {


      const cart =
        readCart();



      if (
        !cart.length
      ) {


        return;


      }



      writeCart(
        []
      );


      renderCart();



      showCartToast(

        "Your bag has been cleared."

      );


    }

  );



  /* ========================================
     CHECKOUT
     ======================================== */


  // checkoutButton.addEventListener(

  //   "click",

  //   () => {


  //     if (
  //       !readCart().length
  //     ) {


  //       return;


  //     }



  //     showCartToast(

  //       "Cart is ready — checkout page is the next step."

  //     );


  //   }

  // );

    /* ========================================
     CHECKOUT
     ======================================== */


  checkoutButton.addEventListener(

    "click",

    () => {


      const cart =
        readCart();


      if (!cart.length) {

        return;

      }


      window.location.href =

        isProductPage()

          ? "../Checkout/index.html"

          : "Checkout/index.html";


    }

  );



  /* ========================================
     CART TOAST
     ======================================== */


  function showCartToast(
    message
  ) {


    clearTimeout(
      toastTimer
    );



    cartToast.textContent =
      message;



    cartToast.classList.add(

      "is-visible"

    );



    toastTimer =

      window.setTimeout(

        () => {


          cartToast.classList.remove(

            "is-visible"

          );


        },

        2600

      );


  }



  /* ========================================
     ESC KEY + KEYBOARD FOCUS
     ======================================== */


  document.addEventListener(

    "keydown",

    (event) => {


      if (

        !drawer.classList.contains(
          "is-open"
        )

      ) {


        return;


      }



      /* ESC */


      if (
        event.key === "Escape"
      ) {


        closeCart();


        return;


      }



      /* TAB FOCUS */


      if (
        event.key !== "Tab"
      ) {


        return;


      }



      const focusable =

        [

          ...drawer.querySelectorAll(

            `
            a[href],
            button:not([disabled]),
            [tabindex]:not([tabindex="-1"])
            `

          )

        ]

        .filter(

          (element) =>

            !element.hidden

            &&

            element.offsetParent
            !==
            null

        );



      if (
        !focusable.length
      ) {


        return;


      }



      const first =
        focusable[0];


      const last =

        focusable[
          focusable.length - 1
        ];



      if (

        event.shiftKey

        &&

        document.activeElement
        ===
        first

      ) {


        event.preventDefault();


        last.focus();


      } else if (

        !event.shiftKey

        &&

        document.activeElement
        ===
        last

      ) {


        event.preventDefault();


        first.focus();


      }


    }

  );



  /* ========================================
     UPDATE WHEN CART CHANGES
     ======================================== */


  window.addEventListener(

    "ecstasy:cart-updated",

    renderCart

  );



  /* MULTIPLE BROWSER TABS */


  window.addEventListener(

    "storage",

    (event) => {


      if (
        event.key === CART_KEY
      ) {


        renderCart();


      }


    }

  );



  /* ========================================
     START
     ======================================== */


  bindCartOpeners();


  renderCart();


})();