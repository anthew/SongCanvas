import { PasswordInputToggle } from "./PasswordInputToggle.js";
// import { UserDB } from "./database.js";

document.addEventListener("DOMContentLoaded", () => {
  initializePasswordInputToggle();

  document.getElementById("login-form");

});

function initializePasswordInputToggle() {
  const eyeButton = document.getElementById("password-toggle");
  const passwordInput = document.getElementById("password-input");

  if (eyeButton && passwordInput) {
    new PasswordInputToggle(eyeButton, passwordInput);
  }
}
