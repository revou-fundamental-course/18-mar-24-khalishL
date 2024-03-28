// untuk navigation
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
} // wait until the document is ready

function ready() {
  cartSlide();
  paketButtons();
  removeCartItem();
  quantityInput();
  clickAddToCart();
  purchase();
    slider();
}

 function slider(){
  let counter = 1;
  setInterval(function(){
    document.getElementById('radio' + counter).checked = true;
    counter++;
    if(counter>4){
      counter = 1;
    }
  }, 5000);
}

function cartSlide() {
  const shoppingCart = document.querySelector(".shopping-cart");
  const cart = document.querySelector(".cart");
  const mainPage = document.querySelector(".main-page");

  // Toggle cart
  shoppingCart.addEventListener("click", togglecart);
  mainPage.addEventListener("click", removecart);

  function togglecart() {
    cart.classList.toggle("cart-active");
    mainPage.classList.toggle("blur");
  }
  function removecart() {
    cart.classList.remove("cart-active");
    // burger.classList.toggle('toggle');
  }
}

function paketButtons() {
  const paketLiburan = document.querySelectorAll(".paket");
  // console.log(paketLiburan);

  paketLiburan.forEach(function (paket) {
    // const btn = paket.querySelector('.paket-btn');
    const btn = paket.querySelector(".paket-title");
    btn.addEventListener("click", function () {
      // cek kalau ada paket lain yang kebuka
      // paketLiburan.forEach(function (item) {
      //   if (item !== paket) {
      //     item.classList.remove('show-text');
      //   }
      // })
      // tunjukin teks keterangan
      paket.classList.toggle("show-text");
    });
  });
}

function clickAddToCart() {
  let addToCartButton = document.getElementsByClassName("shop-item-button");
  for (let i = 0; i < addToCartButton.length; i++) {
    let button = addToCartButton[i];
    button.addEventListener("click", function addToCartClicked(event) {
      let cartButton = event.target;
      let shopItem = cartButton.parentElement.parentElement;
      let title =
        shopItem.getElementsByClassName("shop-item-title")[0].innerText;
      let price =
        shopItem.getElementsByClassName("shop-item-price")[0].innerText;
      addItemToCart(title, price);
      updateCartTotal();
    });
  }
}

function addItemToCart(title, price) {
  let cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  let cartItems = document.getElementsByClassName("cart-items")[0];
  let cartItemNames = cartItems.getElementsByClassName("cart-item-title");
  for (let i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText === title) {
      alert("Tujuan wisata tersebut sudah ada di keranjang");
      return;
    }
  }
  let cartRowContents = `
          <div class="cart-item cart-column">
            <span class="cart-item-title">${title}</span>
          </div>
          <span class="cart-price cart-column">${price}</span>
          <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">
            <i class="fa fa-times" aria-hidden="true"></i>
            </button>
          </div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow
    .getElementsByClassName("btn-danger")[0]
    .addEventListener("click", removeCartItem());
  cartRow
    .getElementsByClassName("cart-quantity-input")[0]
    .addEventListener("change", quantityInput());
}

function removeCartItem() {
  let removeCartItemButton = document.getElementsByClassName("btn-danger");
  // console.log(removeCartItemButton);
  for (let i = 0; i < removeCartItemButton.length; i++) {
    const button = removeCartItemButton[i];
    button.addEventListener("click", function (event) {
      let buttonClicked = event.target;
      buttonClicked.parentElement.parentElement.parentElement.remove();
      updateCartTotal();
    });
  }
}

function updateCartTotal() {
  let cartItemContainer = document.getElementsByClassName("cart-items")[0];
  let cartRows = cartItemContainer.getElementsByClassName("cart-row");
  let totalPrice = 0;
  for (let i = 0; i < cartRows.length; i++) {
    const cartRow = cartRows[i];
    let priceElement = cartRow.getElementsByClassName("cart-price")[0];
    let quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    let price = Number(priceElement.innerText.replace("$", ""));
    let quantity = quantityElement.value;
    totalPrice += price * quantity;
  }
  totalPrice = Math.round((totalPrice + Number.EPSILON) * 100) / 100;
  document.getElementsByClassName("cart-total-price")[0].innerText =
    "$ " + totalPrice;
}

function quantityInput() {
  let quantityInputs = document.getElementsByClassName("cart-quantity-input");
  //array input quantity di cart
  // console.log(quantityInputs);
  for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i];
    input.addEventListener("change", function quantityChanged(event) {
      let input = event.target;
      if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
      }
      updateCartTotal();
    });
  }
}

function purchase() {
  document
    .getElementsByClassName("btn-purchase")[0]
    .addEventListener("click", function purchaseClicked() {
      let totalHarga = document.getElementsByClassName("cart-total-price")[0];
      let hargaBersih = Number(totalHarga.innerText.replace("$", ""));
      if (hargaBersih === 0) {
        alert("Keranjang anda masih kosong");
      } else {
        alert("Selamat menikmati liburan anda");
      }
      let cartItems = document.getElementsByClassName("cart-items")[0];
      while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
      }
      updateCartTotal();
    });
}
