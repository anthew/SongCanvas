import { PasswordInputToggle } from "./PasswordInputToggle.js";

document.addEventListener("DOMContentLoaded", () => {
  initializePasswordInputToggle();
});

function initializePasswordInputToggle() {
  const eyeButton = document.getElementById("password-toggle");
  const passwordInput = document.getElementById("password-input");

  if (eyeButton && passwordInput) {
    new PasswordInputToggle(eyeButton, passwordInput);
  }
}

// check if the user has a password and username filled in the textfields

/*
Method used for determining if a user exists
function checkCredentials()
{
    //Read from the text fields

    //Query data from users table

    //Return the result 
    If result exists
        return true
    else
     false
}
*/