var toast = document.querySelector(".toast");
var close = document.querySelector(".toast-close");
var progress = document.querySelector(".progress");


setTimeout(() =>{
  toast.classList.remove("active");
}, 5000)

setTimeout(() =>{
  progress.classList.remove("active");
}, 5300)

close.addEventListener("click", () =>{
  toast.classList.add("active");

  setTimeout(() =>{
    progress.classList.remove("active");
  }, 300)
})