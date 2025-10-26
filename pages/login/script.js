const ip_username = document.getElementsByClassName("ip-username")[0];
const ip_password = document.getElementsByClassName("ip-password")[0];
const login_btn = document.getElementById("login-btn");

const togglePassword = document.getElementById("togglePassword");
const login_password = document.getElementById("login-password");

login_btn.addEventListener("click", (e) => {
    e.preventDefault();

    let username = ip_username.value.trim();
    let password = ip_password.value.trim();

    if(username === undefined || username === null || username === ""){
        alert("Please enter your username.");
        return;
    }
    
    if(password === undefined || password === null || password === ""){
        alert("Please enter your password.");
        return;
    }

    if(username.length < 8 && password.length < 8){
        alert("Password should be at least 8 characters.");
        return;
    }

    // TEMPORARY ACCOUNT TO ACCESS PAGE
    const DEFAULT_USERNAME = "admin";
    const DEFAULT_PASSWORD = "12345678";

    if (username === DEFAULT_USERNAME && password === DEFAULT_PASSWORD){
        window.location.href = "../dashboard/overview/index.html";
    } else {
        alert("Incorrect username or password!");
        return;
    }
});

togglePassword.addEventListener("click", () => {
  const isPassword = login_password.type === "password";
  login_password.type = isPassword ? "text" : "password";
  
  // Toggle icon
  togglePassword.classList.toggle("fa-eye");
  togglePassword.classList.toggle("fa-eye-slash");
});