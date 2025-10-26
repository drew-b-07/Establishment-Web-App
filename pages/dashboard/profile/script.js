// POP UP MODAL
function EditName() {
  document.getElementById("changeNameModal").style.display = "block";
  document.getElementById("overlay").style.display = "block";
}

function EditEstName(){
  document.getElementById("changeEstNameModal").style.display = "block";
  document.getElementById("overlay").style.display = "block";
}

function EditPhoneNumber(){
  document.getElementById("changePNumModal").style.display = "block";
  document.getElementById("overlay").style.display = "block";
}

function ChangePassword(){
  document.getElementById("changePassModal").style.display = "block";
  document.getElementById("overlay").style.display = "block";
}

function ChangePinLocation(){
  document.getElementById("changeLocationModal").style.display = "block";
  document.getElementById("overlay").style.display = "block";
}

// CLOSE MODAL
function closeModal() {
  document.getElementById("changeNameModal").style.display = "none";
  document.getElementById("changeEstNameModal").style.display = "none";
  document.getElementById("changePNumModal").style.display = "none";
  document.getElementById("changePassModal").style.display = "none";
  document.getElementById("changeLocationModal").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}

// Optional: close when clicking outside modal
// document.getElementById("overlay").addEventListener("click", closeModal);

//HIDE PASSWORD FUNCTION
const togglePassword1 = document.getElementById("togglePassword1");
const currentPassword = document.getElementById("currentPassword");

const togglePassword2 = document.getElementById("togglePassword2");
const newPassword = document.getElementById("newPassword");

const togglePassword3 = document.getElementById("togglePassword3");
const confirmPassword = document.getElementById("confirmPassword");


function toggleVisibility(toggleIcon, inputField) {
  const isPassword = inputField.type === "password";
  inputField.type = isPassword ? "text" : "password";
  toggleIcon.classList.toggle("fa-eye");
  toggleIcon.classList.toggle("fa-eye-slash");
}

togglePassword1.addEventListener("click", () => toggleVisibility(togglePassword1, currentPassword));
togglePassword2.addEventListener("click", () => toggleVisibility(togglePassword2, newPassword));
togglePassword3.addEventListener("click", () => toggleVisibility(togglePassword3, confirmPassword));

//BACK FUNCTION
const backPageFunction = document.getElementById("back-function");

backPageFunction.addEventListener("click" ,function(){
  window.history.back();
});