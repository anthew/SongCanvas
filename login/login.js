document.addEventListener("DOMContentLoaded", function () {
  const eyeButton = document.getElementById("password-toggle");
  const passwordInput = document.getElementById("password-input");

  let isPasswordVisible = false;

  // css for eye-button class
  eyeButton.style.position = "absolute";
  eyeButton.style.width = "36px";
  eyeButton.style.height = "36px";
  eyeButton.style.top = "13px"; // Adjust this value to match your design
  eyeButton.style.right = "12px"; // Adjust this value to move the eye button to the right
  eyeButton.style.backgroundSize = "cover";
  eyeButton.style.border = "none";
  eyeButton.style.cursor = "pointer";
  eyeButton.style.backgroundColor = "#d9d9d9";
  eyeButton.style.backgroundImage = 'url(/images/EyeHide.png)';

  passwordInput.style.position = "absolute";
  passwordInput.style.top = "15px"; // Adjust this value to match your design
  passwordInput.style.width = "80%";
  passwordInput.style.fontSize = "16px";
  passwordInput.style.right = "90px"; // Adjust this value to make space for the eye button
  passwordInput.style.fontFamily = "\"Kalam\", cursive";
  passwordInput.style.fontWeight = "400";
  passwordInput.style.color = "black";
  passwordInput.style.fontSize = "24.2px";
  passwordInput.style.letterSpacing = "0";
  passwordInput.style.lineHeight = "normal";

  eyeButton.addEventListener("click", () => {
    isPasswordVisible = !isPasswordVisible;
    if (isPasswordVisible) {
      passwordInput.type = "text"; // Show the password
      eyeButton.style.backgroundImage = 'url(/images/EyeShow.png)';
    } else {
      passwordInput.type = "password"; // Hide the password
      eyeButton.style.backgroundImage = 'url(/images/EyeHide.png)';
    }
  });
});

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