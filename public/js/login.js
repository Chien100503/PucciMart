const btn_login = document.getElementById("btn_login")

if(btn_login != null){
  btn_login.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
  
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    const login = {
      email: email,
      password: password
    };
    //https://637b118c10a6f23f7f9e9bfc.mockapi.io/BTL/api/Students
    fetch("/api/login", {
      method: "POST", //or PUT or DELETE
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(login),
    })
      .then((res) => res.json())
      .then((data) => {

        // document.getElementById("user_name").innerText = data.user.name
        // alert(data.user.name)
        // Chuyển hướng đến trang chủ
        if(data.status == "success"){
          function dangNhapThanhCong() {
            window.location.href = "/";
          }
          dangNhapThanhCong()
        }
  
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
          // success.classList.remove("actives");
          error.classList.add("active");
  
          progressError.classList.add("actions");
          errorText.innerText = data.error;
        } 
        // else {
        //   error.classList.remove("active");
        //   success.classList.add("actives");
  
        //   progress.classList.add("actions");
        //   successText.innerText = data.success;
        // }
  
        // closeSuccess.addEventListener("click", () =>{
        //   error.classList.remove("active");
        //   success.classList.remove("active");
        
        //   progress.classList.remove("actions");
        // })
  
        closeError.addEventListener("click", () =>{
          error.classList.remove("active");
          success.classList.remove("active");
        
          progress.classList.remove("actions");
        })
      })
  });
}