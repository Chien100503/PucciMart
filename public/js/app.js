// add products to cart
const addToCart = document.getElementsByClassName('add_cart');
const productRow = document.getElementsByClassName('product-row');

for (var i = 0; i < addToCart.length; i++) {
    button = addToCart[i];
    button.addEventListener('click', addToCartClicked)
}

function addToCartClicked (event) {
    button = event.target;
    var cartItem = button.parentElement;
    var price = cartItem.getElementsByClassName('new_price')[0].innerText;
    var namePro = cartItem.getElementsByClassName('product_name')[0].innerText;
    
    var imageSrc = cartItem.getElementsByClassName('product_img__image')[0].src;
    addItemToCart (price, namePro, imageSrc);
    updateCartPrice()
}

function addItemToCart (price, namePro, imageSrc) {
    var productRow = document.createElement('div');
    productRow.classList.add('product-row');
    // var namePro = cartItem.getElementsByClassName('product_name')[0];
    var productRows = document.getElementsByClassName('cart_body__content')[0];
    var cartImage = document.getElementsByClassName('cart_image');
    
    for (var i = 0; i < cartImage.length; i++){
      if (cartImage[i].src == imageSrc){
        alert ('This item has already been added to the cart')
        return;
      }
    }

    var cartRowItems = `
                        <div class="cart_body__contentItem">
                            <div class="cart_body__contentItem__btn">
                                <img class="cart_image" src="${imageSrc}">
                                <h3 class="cart_body__contentItem__name">${namePro}</h3>
                            </div>
                            <button class="cart_body__contentItem__remove">Xoá</button>
                            <div class="cart_body__contentItem__btn"><span class="cart_price">${price}</span></div>
                            <div class="cart_body__contentItem__btn"><input class="product_quantity" type="number" min="1" value="1"></div>
                        </div>`

    productRow.innerHTML = cartRowItems;
    productRows.append(productRow);
    productRow.getElementsByClassName('cart_body__contentItem__remove')[0].addEventListener('click', removeItem)
    productRow.getElementsByClassName('product_quantity')[0].addEventListener('change', changeQuantity)
    updateCartPrice();
}

// Remove products from cart
const removeBtn = document.getElementsByClassName('cart_body__contentItem__remove');
for (var i = 0; i < removeBtn.length; i++) {
  button = removeBtn[i];
  button.addEventListener('click', removeItem);
}

function removeItem (event) {
    btnClicked = event.target;
    btnClicked.parentElement.parentElement.remove();
    updateCartPrice();
}

// update quantity input
var quantityInput = document.getElementsByClassName('product_quantity')[0];

for (var i = 0; i < quantityInput; i++){
  input = quantityInput[i]
  input.addEventListener('change', changeQuantity)
}

function changeQuantity(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0){
      input.value = 1
    }
    updateCartPrice()
}


// update total price
function updateCartPrice() {
    let total = 0;
    for (var i = 0; i < productRow.length; i++) {
        cartRow = productRow[i];
    var priceElement = cartRow.getElementsByClassName('cart_price')[0];
    var quantityElement = cartRow.getElementsByClassName('product_quantity')[0];
    var price = parseFloat(priceElement.innerText.replace('$', ''));
    var quantity = quantityElement.value;
    total = total + (price * quantity );
      
    }
    document.querySelector('.total_money').innerText = '$' + total;
  
    document.querySelector('.cart_quantity').textContent = i;
    document.querySelector('.cart_quantityS').textContent = i;
}

