document.addEventListener("DOMContentLoaded", function () {
    const eyeButton = document.getElementById("password-toggle");
    const passwordInput = document.getElementById("password-input");

    let isPasswordVisible = false;

    eyeButton.addEventListener("click", () => {
      isPasswordVisible = !isPasswordVisible;
      if (isPasswordVisible) {
        passwordInput.type = "text"; // Show the password
        eyeButton.style.backgroundImage = 'url("https://cdn.discordapp.com/attachments/1156053724377128970/1169339530361442405/EyeInvisible.png?ex=65550b4d&is=6542964d&hm=b92c912bc2d752a9d818693a22a8673060d3c9a9096bdf9fe3419d876109c44d&")';
      } else {
        passwordInput.type = "password"; // Hide the password
        eyeButton.style.backgroundImage = 'url("https://cdn.discordapp.com/attachments/1156053724377128970/1156059748051996766/Eye.png?ex=6513980a&is=6512468a&hm=b05fd8b10fd13b4d489dd8b1448d8ec5bf876cfac3361f61ede71b0c8f0a7682")';
      }
    });
});

// eye-invisible button: https://cdn.discordapp.com/attachments/1156053724377128970/1169339530361442405/EyeInvisible.png?ex=65550b4d&is=6542964d&hm=b92c912bc2d752a9d818693a22a8673060d3c9a9096bdf9fe3419d876109c44d&

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