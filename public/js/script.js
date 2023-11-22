// open search
let search_icon = document.querySelector(".search_icon");
let search_nav = document.querySelector(".search_nav");
let account_icon = document.querySelector(".account_icon");
let account = document.querySelector(".account");

search_icon.addEventListener("click", () => {
  search_nav.classList.toggle("active");
  account.classList.remove("active");
});

if (account_icon != null) {
  account_icon.addEventListener("click", () => {
    account.classList.toggle("active");
    search_nav.classList.remove("active");
  });
}

// account_icon.addEventListener("click", () => {
//   account.classList.toggle("active");
//   search_nav.classList.remove("active");
// });

// backTop
// Show the button when the user scrolls down 20px from the top of the document
const btnScrollToTop = document.querySelector("#backTop");
btnScrollToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

window.addEventListener("scroll", () => {
  if (window.scrollY >= 300) {
    btnScrollToTop.style.display = "block";
  } else {
    btnScrollToTop.style.display = "none";
  }
});

// Circular Navigation Menu
const nav = document.querySelector("nav");
const toggleBtn = nav.querySelector(".toggle-btn");

toggleBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
});

//open and close modal_cart
const modal_cart = document.querySelector(".modal_cart");
const close_modalCart = document.querySelector(".close_modalCart");
const cart_icon = document.querySelector(".bi-cart3");

if(cart_icon != null){
  cart_icon.addEventListener("click", () => {
    modal_cart.classList.add("active");
  });
  
  close_modalCart.addEventListener("click", () => {
    modal_cart.classList.remove("active");
  });
}

// open reponsive sidebar
const menu_icon = document.querySelector(".menu_icon i");
const sidebar = document.querySelector(".sidebar");

menu_icon.addEventListener("click", () => {
  sidebar.classList.toggle("opens");
});

// dark mode
let isDarkMode = localStorage.getItem("isDarkMode") === "true";

if(document.querySelector(".toggle_btn") != null){
  document.querySelector(".toggle_btn").addEventListener("click", function () {
    isDarkMode = !isDarkMode;
    localStorage.setItem("isDarkMode", isDarkMode);
    applyStyle(isDarkMode);
  });  
}

if (account_icon != null) {
  function applyStyle(isDarkMode) {
    let body = document.querySelector("body"),
      button = document.querySelector(".toggle_btn");
  
    if (isDarkMode) {
      body.classList.add("dark_mode");
      button.classList.add("dark_mode");
    } else {
      body.classList.remove("dark_mode");
      button.classList.remove("dark_mode");
    }
  }
  applyStyle(isDarkMode);
}



