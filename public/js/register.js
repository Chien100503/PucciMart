document.getElementById("btn_regis").addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();

  //https://637b118c10a6f23f7f9e9bfc.mockapi.io/BTL/api/Students
  let name = document.getElementById("name");
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  let phone = document.getElementById("phone");
  let address = document.getElementById("address");

  const register = {
    name: name.value,
    email: email.value,
    password: password.value,
    phone: phone.value,
    address: address.value,
  };
  fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(register),
  })
    .then((res) => res.json())
    .then((data) => {
      // Code xử lí dữ liệu trả về từ server
      let error = document.getElementById('error');
      let success = document.getElementById('success');

      let errorText = document.getElementById('error-text');
      let successText = document.getElementById('success-text');

      var progress = document.querySelector(".progress");
      var progressError = document.querySelector(".progress-error");
      var closeSuccess = document.querySelector(".close-success");
      var closeError = document.querySelector(".close-error");

      if (data.status == "error") {
        success.classList.remove("actives");
        error.classList.add("active");

        progressError.classList.add("actions");
        errorText.innerText = data.error;
      } else {
        error.classList.remove("active");
        success.classList.add("actives");

        progress.classList.add("actions");
        successText.innerText = data.success;
      }

      closeSuccess.addEventListener("click", () =>{
        error.classList.remove("active");
        success.classList.remove("active");
      
        progress.classList.remove("actions");
      })

      closeError.addEventListener("click", () =>{
        error.classList.remove("active");
        success.classList.remove("active");
      
        progress.classList.remove("actions");
      })
    });
});
