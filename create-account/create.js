document.addEventListener("DOMContentLoaded", function() {
    const eyeButton = document.getElementById("password-toggle");
    const passwordInput = document.getElementById("password-input");
    const eyeButton2 = document.getElementById("confirm-password-toggle");
    const passwordInput2 = document.getElementById("confirm-password-input");
    const submit_button = document.getElementById("submit-button");
    const passwordStrength = document.getElementById("password-strength");

    let isPasswordVisible = false;
    let isConfirmPasswordVisible = false;

    // add css styles for eye class
    eyeButton.style.position = "absolute";
    eyeButton.style.width = "36px";
    eyeButton.style.height = "36px";
    eyeButton.style.top = "10px";
    eyeButton.style.left = "88%"
    eyeButton.style.backgroundImage = "url(/images/EyeHide.png)"
    eyeButton.style.backgroundSize = "cover";
    eyeButton.style.border = "none";
    eyeButton.style.cursor = "pointer";
    eyeButton.style.backgroundColor = "#d9d9d9"

    // add css styles for the password textfields
    passwordInput.style.position = "absolute";
    passwordInput.style.width = "80%";
    passwordInput.style.top = "17%";
    passwordInput.style.left = "2%";
    passwordInput.style.fontFamily = "\"Kalam\", cursive";
    passwordInput.style.fontWeight = "400";
    passwordInput.style.color = "black";
    passwordInput.style.fontSize = "24px";
    passwordInput.style.letterSpacing = "0";
    passwordInput.style.lineHeight = "normal";
    
    // css for eye-button class
    eyeButton2.style.position = "absolute";
    eyeButton2.style.width = "36px";
    eyeButton2.style.height = "36px";
    eyeButton2.style.top = "10px";
    eyeButton2.style.left = "88%"
    eyeButton2.style.backgroundImage = "url(/images/EyeHide.png)"
    eyeButton2.style.backgroundSize = "cover";
    eyeButton2.style.border = "none";
    eyeButton2.style.cursor = "pointer";
    eyeButton2.style.backgroundColor = "#d9d9d9"

    //css for password textfield
    passwordInput2.style.position = "absolute";
    passwordInput2.style.width = "80%";
    passwordInput2.style.top = "17%";
    passwordInput2.style.left = "2%";
    passwordInput2.style.fontFamily = "\"Kalam\", cursive";
    passwordInput2.style.fontWeight = "400";
    passwordInput2.style.color = "black";
    passwordInput2.style.fontSize = "24px";
    passwordInput2.style.letterSpacing = "0";
    passwordInput2.style.lineHeight = "normal";

    eyeButton.addEventListener("click", () => {
        isPasswordVisible = !isPasswordVisible;
        if(isPasswordVisible) {
            passwordInput.type = "text"; //show password
            eyeButton.style.backgroundImage = 'url(/images/EyeShow.png)';
        } else {
            passwordInput.type = "password"; //show password
            eyeButton.style.backgroundImage = 'url(/images/EyeHide.png)';
        }
    });

    eyeButton2.addEventListener("click", () => {
        isConfirmPasswordVisible = !isConfirmPasswordVisible;
        if(isConfirmPasswordVisible) {
            passwordInput2.type = "text"; //show password
            eyeButton2.style.backgroundImage = 'url(/images/EyeShow.png)';
        } else {
            passwordInput2.type = "password"; //show password
            eyeButton2.style.backgroundImage = 'url(/images/EyeHide.png)';
        }
    });

    function checkPasswordStrength(password) {
        const numbersCount = (password.match(/\d/g) || []).length; // Count of digits
        const specialCharCount = (password.match(/[!@#$%^&*]/g) || []).length; // Count of special characters

        if(password.length >= 8 && numbersCount >= 3 && specialCharCount >= 2) {
            return "<span class=\"strong\">Strong</span>";
        } else if (password.length >= 8 && (numbersCount >= 3 || specialCharCount >= 3)) {
            return "<span class=\"average\">Average</span>";
        } else {
            return "<span class=\"weak\">Weak</span>";
        }
    }

    function updatePasswordUI() {
        const passwordVal = passwordInput.value;
        const strength = checkPasswordStrength(passwordVal);
        passwordStrength.innerHTML = `<label class=\"ps\">Password Strength:&emsp;</label>${strength}`;
    }

    passwordInput.addEventListener("input", updatePasswordUI);

    submit_button.addEventListener("click", function(event) {
        const passwordValue = passwordInput.value;
        const confirmPasswordValue = passwordInput2.value;
    
        // Reset error messages
        const errorMessages = document.getElementById("error-messages");
        errorMessages.innerHTML = "";
    
        if (passwordValue !== confirmPasswordValue) {
            event.preventDefault();
            displayErrorMessage("Password and Confirm Password do not match. Please ensure both passwords match.");
        } else if (!passwordValue && !confirmPasswordValue) {
            event.preventDefault();
            displayErrorMessage("Please fill out a password and confirm it.");
        } else if (passwordValue.length < 8 || !/\W/.test(passwordValue)) {
            event.preventDefault();
            displayErrorMessage("Your password does not fit the criteria. Please enter again.");
        }
    });
    
    function displayErrorMessage(message) {
        const errorMessages = document.getElementById("error-messages");
        errorMessages.style.display = "block"; // Show the container
        const errorMessage = document.createElement("div");
        errorMessage.className = "error-message";
        errorMessage.textContent = message;
        errorMessages.appendChild(errorMessage);
    }
    
    


});