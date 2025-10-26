import supabase from "../../utils/supabase.js";
import { redirectIfLoggedIn } from "../../utils/auth-guard.js";

window.addEventListener("DOMContentLoaded", async () => {
  await redirectIfLoggedIn();
});

const email = document.getElementById("email");
const pw = document.getElementById("password");
const submit = document.getElementById("submit");

const checkInputNull = (input) => !input || input.length === 0;

submit.addEventListener("click", async (e) => {
  e.preventDefault();

  let s_email = email.value.trim();
  let s_pw = pw.value.trim();

  if(checkInputNull(s_email)) {
    alert("Do not leave email blank.");
    return;
  }

  if(checkInputNull(s_pw)) {
    alert("Do not leave password blank.");
    return;
  }

  if(!s_email.includes("@")) {
    alert("Enter valid email address.");
    return;
  }

  if(s_pw.length < 8) {
    alert("Password must be at least 8 characters.");
    return;
  }

  const { data, error } = await supabase.auth.signInWithPassword({email: s_email, password: s_pw});

  if(error) {
    alert(error.message);
    return;
  }
  
  location.replace("../dashboard/overview/index.html");
});