import supabase from "../../../utils/supabase.js";
import { protectPage } from "../../../utils/auth-guard.js";

window.addEventListener("DOMContentLoaded", async () => {
  await protectPage();

  const { data } = await supabase.auth.getUser();
  const { data: establishment_user, error } = await supabase.from("establishment_users").select("email").eq("email", data.user.email);

  if(error) {
    alert(error);
    return;
  }

  if(establishment_user.length === 0) {
    location.replace("../input_credentials/index.html");
  }
});
