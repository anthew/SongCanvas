class PasswordInputToggle {
  constructor(eyeButton, passwordInput) {
    this.eyeButton = eyeButton;
    this.passwordInput = passwordInput;
    this.isPasswordVisible = false;

    this.initializeStyles();
    this.addEventListeners();
  }

  initializeStyles() {
    this.eyeButton.style.position = "absolute";
    this.eyeButton.style.width = "36px";
    this.eyeButton.style.height = "36px";
    this.eyeButton.style.top = "13px";
    this.eyeButton.style.right = "12px";
    this.eyeButton.style.backgroundSize = "cover";
    this.eyeButton.style.border = "none";
    this.eyeButton.style.cursor = "pointer";
    this.eyeButton.style.backgroundColor = "#d9d9d9";
    this.eyeButton.style.backgroundImage = 'url(/images/EyeHide.png)';

    this.passwordInput.style.position = "absolute";
    this.passwordInput.style.top = "15px";
    this.passwordInput.style.width = "80%";
    this.passwordInput.style.fontSize = "16px";
    this.passwordInput.style.right = "90px";
    this.passwordInput.style.fontFamily = "\"Kalam\", cursive";
    this.passwordInput.style.fontWeight = "400";
    this.passwordInput.style.color = "black";
    this.passwordInput.style.fontSize = "24.2px";
    this.passwordInput.style.letterSpacing = "0";
    this.passwordInput.style.lineHeight = "normal";
  }

  addEventListeners() {
    this.eyeButton.addEventListener("click", () => this.togglePasswordVisibility());
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.passwordInput.type = this.isPasswordVisible ? "text" : "password";
    this.eyeButton.style.backgroundImage = `url(/images/Eye${this.isPasswordVisible ? 'Show' : 'Hide'}.png)`;
  }
}

function initializePasswordInputToggle() {
  const eyeButton = document.getElementById("password-toggle");
  const passwordInput = document.getElementById("password-input");

  if (eyeButton && passwordInput) {
    new PasswordInputToggle(eyeButton, passwordInput);
  }
}

document.addEventListener("DOMContentLoaded", initializePasswordInputToggle);

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