(() => {

  "use strict";


  const WISHLIST_KEY =
    "ecstasyWishlist";



  function readWishlist() {

    try {

      const value =
        JSON.parse(
          localStorage.getItem(
            WISHLIST_KEY
          )
        );


      return Array.isArray(value)
        ? [...new Set(value)]
        : [];

    } catch {

      return [];

    }

  }



  function updateWishlistCount() {

    const count =
      readWishlist().length;


    document
      .querySelectorAll(
        "[data-wishlist-count]"
      )
      .forEach(
        (element) => {


          element.textContent =
            count;


          element.hidden =
            count === 0;

        }
      );

  }



  window.addEventListener(
    "ecstasy:wishlist-updated",
    updateWishlistCount
  );


  window.addEventListener(
    "storage",
    (event) => {


      if (
        event.key === WISHLIST_KEY
      ) {

        updateWishlistCount();

      }

    }
  );


  updateWishlistCount();


})();