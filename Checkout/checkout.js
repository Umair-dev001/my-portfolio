(() => {

  "use strict";


  /* ========================================
     SETTINGS
     ======================================== */

  const CART_KEY =
    "ecstasyCart";

  const MAX_QUANTITY =
    10;

  const EXPRESS_SHIPPING =
    9.99;

  const STANDARD_SHIPPING =
    4.99;

  const FREE_SHIPPING_TARGET =
    50;

  const PROMO_CODE =
    "ECSTASY20";

  const PROMO_DISCOUNT =
    20;



  /* ========================================
     ELEMENTS
     ======================================== */

  const checkoutContent =
    document.querySelector(
      "#checkoutContent"
    );

  const checkoutForm =
    document.querySelector(
      "#checkoutForm"
    );

  const checkoutItems =
    document.querySelector(
      "#checkoutItems"
    );

  const checkoutItemCount =
    document.querySelector(
      "#checkoutItemCount"
    );

  const checkoutSubtotal =
    document.querySelector(
      "#checkoutSubtotal"
    );

  const checkoutShipping =
    document.querySelector(
      "#checkoutShipping"
    );

  const checkoutDiscount =
    document.querySelector(
      "#checkoutDiscount"
    );

  const checkoutTotal =
    document.querySelector(
      "#checkoutTotal"
    );

  const discountRow =
    document.querySelector(
      "#discountRow"
    );

  const standardDeliveryPrice =
    document.querySelector(
      "#standardDeliveryPrice"
    );

  const promoCode =
    document.querySelector(
      "#promoCode"
    );

  const applyPromo =
    document.querySelector(
      "#applyPromo"
    );

  const promoMessage =
    document.querySelector(
      "#promoMessage"
    );

  const cardFields =
    document.querySelector(
      "#cardFields"
    );

  const cardNumber =
    document.querySelector(
      "#cardNumber"
    );

  const cardExpiry =
    document.querySelector(
      "#cardExpiry"
    );

  const cardCvv =
    document.querySelector(
      "#cardCvv"
    );

  const placeOrder =
    document.querySelector(
      "#placeOrder"
    );

  const orderSuccess =
    document.querySelector(
      "#orderSuccess"
    );

  const successOrderNumber =
    document.querySelector(
      "#successOrderNumber"
    );

  const successEmail =
    document.querySelector(
      "#successEmail"
    );

  const checkoutToast =
    document.querySelector(
      "#checkoutToast"
    );



  /* ========================================
     STATE
     ======================================== */

  let promoApplied =
    false;

  let toastTimer =
    null;



  /* ========================================
     STORAGE
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



  function writeCart(cart) {

    localStorage.setItem(
      CART_KEY,
      JSON.stringify(cart)
    );


    window.dispatchEvent(
      new CustomEvent(
        "ecstasy:cart-updated"
      )
    );

  }



  /* ========================================
     HELPERS
     ======================================== */

  function money(value) {

    return `$${Number(value).toFixed(2)}`;

  }



  function escapeHtml(value = "") {

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



  function checkoutImagePath(
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


    return cleaned
      ? `../${cleaned}`
      : "";

  }



  function productUrl(productId) {

    return (
      `../Productpage/index.html?product=${encodeURIComponent(productId)}`
    );

  }



  function totalItems(cart) {

    return cart.reduce(

      (total, item) =>

        total
        +
        Number(
          item.quantity || 0
        ),

      0

    );

  }



  function subtotal(cart) {

    return cart.reduce(

      (total, item) =>

        total
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



  function selectedDelivery() {

    return (
      document.querySelector(
        'input[name="delivery"]:checked'
      )?.value
      ||
      "standard"
    );

  }



  function selectedPayment() {

    return (
      document.querySelector(
        'input[name="payment"]:checked'
      )?.value
      ||
      "card"
    );

  }



  function shippingCost(
    subtotalValue
  ) {

    if (
      selectedDelivery()
      ===
      "express"
    ) {

      return EXPRESS_SHIPPING;

    }


    return subtotalValue
      >=
      FREE_SHIPPING_TARGET

      ? 0

      : STANDARD_SHIPPING;

  }



  function discountAmount(
    subtotalValue
  ) {

    if (!promoApplied) {

      return 0;

    }


    return Math.min(
      PROMO_DISCOUNT,
      subtotalValue
    );

  }



  /* ========================================
     TOAST
     ======================================== */

  function showToast(message) {

    clearTimeout(
      toastTimer
    );


    checkoutToast.textContent =
      message;


    checkoutToast.classList.add(
      "is-visible"
    );


    toastTimer =
      window.setTimeout(
        () => {

          checkoutToast.classList.remove(
            "is-visible"
          );

        },
        2600
      );

  }



  /* ========================================
     RENDER PRODUCTS
     ======================================== */

  function renderItems() {

    const cart =
      readCart();


    const itemCount =
      totalItems(cart);


    checkoutItemCount.textContent =
      `${itemCount} item${itemCount === 1 ? "" : "s"}`;


    placeOrder.disabled =
      cart.length === 0;


    if (!cart.length) {

      checkoutItems.innerHTML = `

        <div class="checkout-empty">

          <span aria-hidden="true">
            🛍
          </span>

          <h3>
            Your bag is empty
          </h3>

          <p>
            Add products to your bag before
            continuing to checkout.
          </p>

          <a href="../index.html#featured">
            Continue shopping →
          </a>

        </div>

      `;


      promoApplied =
        false;


      renderTotals();


      return;

    }



    checkoutItems.innerHTML =
      cart
        .map(
          (item, index) => {


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
                class="checkout-item"
                data-checkout-index="${index}"
              >


                <a
                  class="checkout-item-image"
                  href="${productUrl(item.productId)}"
                  aria-label="View ${escapeHtml(item.name)}"
                >

                  <img
                    src="${checkoutImagePath(item.image)}"
                    alt="${escapeHtml(item.name)}"
                  >

                </a>


                <div class="checkout-item-content">


                  <div class="checkout-item-top">

                    <div>

                      <a
                        href="${productUrl(item.productId)}"
                        class="checkout-item-name"
                      >
                        ${escapeHtml(item.name)}
                      </a>


                      <p class="checkout-item-meta">

                        <span>
                          ${escapeHtml(item.color || "—")}
                        </span>

                        <span>
                          /
                        </span>

                        <span>
                          ${escapeHtml(item.size || "—")}
                        </span>

                      </p>

                    </div>


                    <p class="checkout-item-price">
                      ${money(itemTotal)}
                    </p>

                  </div>


                  <div class="checkout-item-bottom">


                    <div
                      class="checkout-item-quantity"
                      aria-label="Quantity for ${escapeHtml(item.name)}"
                    >

                      <button
                        type="button"
                        data-checkout-action="minus"
                        data-checkout-index="${index}"
                        aria-label="Decrease quantity"
                        ${quantity <= 1 ? "disabled" : ""}
                      >
                        −
                      </button>


                      <span>
                        ${quantity}
                      </span>


                      <button
                        type="button"
                        data-checkout-action="plus"
                        data-checkout-index="${index}"
                        aria-label="Increase quantity"
                        ${quantity >= MAX_QUANTITY ? "disabled" : ""}
                      >
                        +
                      </button>

                    </div>


                    <button
                      type="button"
                      class="checkout-item-remove"
                      data-checkout-action="remove"
                      data-checkout-index="${index}"
                      aria-label="Remove ${escapeHtml(item.name)}"
                    >
                      Remove
                    </button>


                  </div>


                </div>

              </article>

            `;

          }
        )
        .join("");


    renderTotals();

  }



  /* ========================================
     TOTALS
     ======================================== */

  function renderTotals() {

    const cart =
      readCart();


    const subtotalValue =
      subtotal(cart);


    const shippingValue =
      cart.length

        ? shippingCost(
            subtotalValue
          )

        : 0;


    const discountValue =
      discountAmount(
        subtotalValue
      );


    const totalValue =
      Math.max(
        0,
        subtotalValue
        +
        shippingValue
        -
        discountValue
      );



    checkoutSubtotal.textContent =
      money(
        subtotalValue
      );


    checkoutShipping.textContent =
      shippingValue === 0

        ? "Free"

        : money(
            shippingValue
          );


    standardDeliveryPrice.textContent =
      subtotalValue
      >=
      FREE_SHIPPING_TARGET

        ? "Free"

        : money(
            STANDARD_SHIPPING
          );


    discountRow.hidden =
      discountValue <= 0;


    checkoutDiscount.textContent =
      `-${money(discountValue)}`;


    checkoutTotal.textContent =
      money(
        totalValue
      );

  }



  /* ========================================
     QUANTITY + REMOVE
     ======================================== */

  checkoutItems.addEventListener(
    "click",
    (event) => {


      const button =
        event.target.closest(
          "[data-checkout-action]"
        );


      if (!button) {

        return;

      }


      const index =
        Number(
          button.dataset.checkoutIndex
        );


      const action =
        button.dataset.checkoutAction;


      const cart =
        readCart();


      const item =
        cart[index];


      if (!item) {

        return;

      }



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


        renderItems();


        showToast(
          `${removedName} removed from your order.`
        );


        return;

      }



      writeCart(
        cart
      );


      renderItems();

    }
  );



  /* ========================================
     DELIVERY
     ======================================== */

  document
    .querySelectorAll(
      'input[name="delivery"]'
    )
    .forEach(
      (radio) => {

        radio.addEventListener(
          "change",
          renderTotals
        );

      }
    );



  /* ========================================
     PAYMENT METHOD
     ======================================== */

  function updatePaymentFields() {

    const cardSelected =
      selectedPayment()
      ===
      "card";


    cardFields.hidden =
      !cardSelected;


    [
      cardNumber,
      cardExpiry,
      cardCvv
    ]
      .forEach(
        (input) => {

          input.required =
            cardSelected;

        }
      );

  }



  document
    .querySelectorAll(
      'input[name="payment"]'
    )
    .forEach(
      (radio) => {

        radio.addEventListener(
          "change",
          updatePaymentFields
        );

      }
    );



  /* ========================================
     CARD FORMATTING
     ======================================== */

  cardNumber.addEventListener(
    "input",
    () => {


      const digits =
        cardNumber.value

          .replace(
            /\D/g,
            ""
          )

          .slice(
            0,
            16
          );


      cardNumber.value =
        digits

          .replace(
            /(\d{4})(?=\d)/g,
            "$1 "
          );

    }
  );



  cardExpiry.addEventListener(
    "input",
    () => {


      const digits =
        cardExpiry.value

          .replace(
            /\D/g,
            ""
          )

          .slice(
            0,
            4
          );


      cardExpiry.value =
        digits.length > 2

          ? `${digits.slice(0, 2)}/${digits.slice(2)}`

          : digits;

    }
  );



  cardCvv.addEventListener(
    "input",
    () => {


      cardCvv.value =
        cardCvv.value

          .replace(
            /\D/g,
            ""
          )

          .slice(
            0,
            4
          );

    }
  );



  /* ========================================
     PROMO CODE
     ======================================== */

  applyPromo.addEventListener(
    "click",
    () => {


      const enteredCode =
        promoCode.value

          .trim()

          .toUpperCase();


      promoMessage.classList.remove(
        "is-success",
        "is-error"
      );


      if (!enteredCode) {

        promoApplied =
          false;


        promoMessage.textContent =
          "Enter a promo code.";


        promoMessage.classList.add(
          "is-error"
        );


        renderTotals();


        return;

      }



      if (
        enteredCode === PROMO_CODE
      ) {

        promoApplied =
          true;


        promoMessage.textContent =
          "$20 discount applied.";


        promoMessage.classList.add(
          "is-success"
        );


        renderTotals();


        return;

      }



      promoApplied =
        false;


      promoMessage.textContent =
        "Promo code is not valid.";


      promoMessage.classList.add(
        "is-error"
      );


      renderTotals();

    }
  );



  /* ========================================
     PLACE ORDER
     ======================================== */

  checkoutForm.addEventListener(
    "submit",
    (event) => {


      event.preventDefault();


      const cart =
        readCart();


      if (!cart.length) {

        showToast(
          "Your bag is empty."
        );


        return;

      }



      if (
        !checkoutForm.checkValidity()
      ) {

        checkoutForm.reportValidity();


        return;

      }



      const email =
        document.querySelector(
          "#checkoutEmail"
        ).value.trim();


      const orderNumber =
        `#EC-${String(Date.now()).slice(-6)}`;



      /*
        Portfolio checkout only.
        No real payment information is saved.
      */


      localStorage.removeItem(
        CART_KEY
      );



      checkoutContent.hidden =
        true;


      successOrderNumber.textContent =
        orderNumber;


      successEmail.textContent =
        email

          ? `Order confirmation would be sent to ${email}.`

          : "";


      orderSuccess.hidden =
        false;



      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }
  );



  /* ========================================
     STORAGE SYNC
     ======================================== */

  window.addEventListener(
    "storage",
    (event) => {

      if (
        event.key === CART_KEY
      ) {

        renderItems();

      }

    }
  );



  /* ========================================
     START
     ======================================== */

  updatePaymentFields();

  renderItems();


})();