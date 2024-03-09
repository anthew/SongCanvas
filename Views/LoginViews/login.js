import { PasswordInputToggle } from "./PasswordInputToggle.js";
// import { UserDB } from "./database.js";

document.addEventListener("DOMContentLoaded", () => {
  initializePasswordInputToggle();

  //loginForm = document.getElementById("login-form");
});

function initializePasswordInputToggle() {
  const eyeButton = document.getElementById("password-toggle");
  const passwordInput = document.getElementById("password-input");

  if (eyeButton && passwordInput) {
    new PasswordInputToggle(eyeButton, passwordInput);
  }
}

// function validateCredentials(event) {
//   // Prevent default form submission behavior
//   console.log("Validate Credentials function called")

//   event.preventDefault();

//   const emailInput = document.getElementById("email-input").value;
//   const passwordInput = document.getElementById("password-input").value;

//   // Call the checkCredentials function to validate against the database
//   UserDB.checkCredentials(emailInput, passwordInput)
//      .then((result) => {
//         if (result) {
//            // Credentials are valid
//            console.log('Credentials are valid');
//            // Manually submit the form
//            document.getElementById("login-form").submit();
//         } else {
//            // Credentials are invalid
//            console.log('Credentials are invalid');
//            // Add your logic for displaying an error message or other actions here
//         }
//      })
//      .catch((error) => {
//         console.error('Error checking credentials:', error.message);
//      });
// }