class PasswordToggle {
    constructor(eyeButton, passwordInput) {
        this.eyeButton = eyeButton;
        this.passwordInput = passwordInput;
        this.isPasswordVisible = false;

        this.eyeButton.style.position = "absolute";
        this.eyeButton.style.width = "36px";
        this.eyeButton.style.height = "36px";
        this.eyeButton.style.top = "10px";
        this.eyeButton.style.left = "88%";
        this.eyeButton.style.backgroundImage = "url(/images/EyeHide.png)";
        this.eyeButton.style.backgroundSize = "cover";
        this.eyeButton.style.border = "none";
        this.eyeButton.style.cursor = "pointer";
        this.eyeButton.style.backgroundColor = "#d9d9d9";

        this.eyeButton.addEventListener("click", () => this.togglePasswordVisibility());
    }

    
    togglePasswordVisibility() {
        this.isPasswordVisible = !this.isPasswordVisible;
        this.passwordInput.type = this.isPasswordVisible ? "text" : "password";
        this.eyeButton.style.backgroundImage = `url(/images/Eye${this.isPasswordVisible ? 'Show' : 'Hide'}.png)`;
    }

}

class PasswordStrengthChecker {
    constructor(passwordInput, passwordStrength) {
        this.passwordInput = passwordInput;
        this.passwordStrength = passwordStrength;

        this.passwordInput.style.position = "absolute";
        this.passwordInput.style.width = "80%";
        this.passwordInput.style.top = "17%";
        this.passwordInput.style.left = "2%";
        this.passwordInput.style.fontFamily = "\"Kalam\", cursive";
        this.passwordInput.style.fontWeight = "400";
        this.passwordInput.style.color = "black";
        this.passwordInput.style.fontSize = "24px";
        this.passwordInput.style.letterSpacing = "0";
        this.passwordInput.style.lineHeight = "normal";

        this.passwordInput.addEventListener("input", () => this.updatePasswordUI());
    }

    checkPasswordStrength(password) {
        const numbersCount = (password.match(/\d/g) || []).length;
        const specialCharCount = (password.match(/[!@#$%^&*]/g) || []).length;

        if (password.length >= 8 && numbersCount >= 3 && specialCharCount >= 2) {
            return "<span class=\"strong\">Strong</span>";
        } else if (password.length >= 8 && (numbersCount >= 3 || specialCharCount >= 1)) {
            return "<span class=\"average\">Average</span>";
        } else {
            return "<span class=\"weak\">Weak</span>";
        }
    }

    updatePasswordUI() {
        const passwordVal = this.passwordInput.value;
        const strength = this.checkPasswordStrength(passwordVal);
        this.passwordStrength.innerHTML = `<label class=\"ps\">Password Strength:&emsp;</label>${strength}`;
    }
}

class FormValidator {
    constructor(firstNameInput, lastNameInput, passwordInput, confirmPasswordInput, emailInput, submitButton, form, eyeButton2) {
        this.firstNameInput = firstNameInput;
        this.lastNameInput = lastNameInput;
        this.passwordInput = passwordInput;
        this.confirmPasswordInput = confirmPasswordInput;
        this.emailInput = emailInput;
        this.submitButton = submitButton;
        this.form = form;
        this.eyeButton2 = eyeButton2;
        // this.passwordInput2 = passwordInput2;

        this.successMessageContainer = document.getElementById("success-messages");
        this.errorMessagesContainer = document.getElementById("error-messages")

        // CSS styles (for eyeButton2 and passwordInput2)
        this.eyeButton2.style.position = "absolute";
        this.eyeButton2.style.width = "36px";
        this.eyeButton2.style.height = "36px";
        this.eyeButton2.style.top = "10px";
        this.eyeButton2.style.left = "88%";
        this.eyeButton2.style.backgroundImage = "url(/images/EyeHide.png)";
        this.eyeButton2.style.backgroundSize = "cover";
        this.eyeButton2.style.border = "none";
        this.eyeButton2.style.cursor = "pointer";
        this.eyeButton2.style.backgroundColor = "#d9d9d9";

        this.confirmPasswordInput.style.position = "absolute";
        this.confirmPasswordInput.style.width = "80%";
        this.confirmPasswordInput.style.top = "17%";
        this.confirmPasswordInput.style.left = "2%";
        this.confirmPasswordInput.style.fontFamily = "\"Kalam\", cursive";
        this.confirmPasswordInput.style.fontWeight = "400";
        this.confirmPasswordInput.style.color = "black";
        this.confirmPasswordInput.style.fontSize = "24px";
        this.confirmPasswordInput.style.letterSpacing = "0";
        this.confirmPasswordInput.style.lineHeight = "normal";

        this.form.addEventListener("submit", (event) => this.validateForm(event));
    }

    validateForm(event) {
        this.errorMessagesContainer.innerHTML = "";

        const passwordValue = this.passwordInput.value;
        const confirmPasswordValue = this.confirmPasswordInput.value;
        const emailValue = this.emailInput.value;
        const firstNameInput = this.firstNameInput.value;
        const lastNameInput = this.lastNameInput.value;
        // Reset error messages
        // const errorMessages = document.getElementById("error-messages");
        // errorMessages.innerHTML = "";

        const validationRules = [
            { condition: passwordValue !== confirmPasswordValue, message: "Password and Confirm Password do not match. Please ensure both passwords match." },
            { condition: !firstNameInput, message: "Please enter your first name." },
            { condition: !lastNameInput, message: "Please enter your last name." },
            { condition: !emailValue, message: "Please enter your email." },
            { condition: !passwordValue && !confirmPasswordValue, message: "Please fill out a password and confirm it." },
            { condition: passwordValue.length < 8 || !/\W/.test(passwordValue), message: "Your password does not fit the criteria. Please enter again." },
            { condition: !this.isValidEmail(emailValue), message: "Invalid email address." },
            { condition: !this.isCopyAndPaste(passwordValue), message: "Copying and pasting passwords is not allowed." },
            { condition: !this.form.checkValidity(), message: "Please fill out all required fields." },
        ];
    
        for (const rule of validationRules) {
            if (rule.condition) {
                this.displayErrorMessage(rule.message, 'error');
                event.preventDefault();
                return; // Stop further validation if any rule fails
            }
        }
        // Display success message
        // this.displayMessage("Success! Your inputs are correct.", 'success');

        // If all validations pass, navigate to the specified URL
        // const formAction = this.form.getAttribute("action");
        // window.location.href = formAction;
        // this.form.submit();
    }

    isValidEmail(email) {
        const email_thangs = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return email_thangs.test(email);
    }

    isCopyAndPaste(password) {
        // Implement a check for copy and paste
        // You can compare the initial value with the current value to detect copy and paste
        // This is a basic example and may not cover all scenarios
        return password !== this.passwordInput.defaultValue;
    }

    displayErrorMessage(message) {
        // const errorMessages = document.getElementById("error-messages");
        this.errorMessagesContainer.style.display = "block";
        const errorMessage = document.createElement("div");
        errorMessage.className = "error-message";
        errorMessage.textContent = message;
        this.errorMessagesContainer.appendChild(errorMessage);
    }

}

document.addEventListener("DOMContentLoaded", function () {
    const eyeButton = document.getElementById("password-toggle");
    const passwordInput = document.getElementById("password-input");
    const eyeButton2 = document.getElementById("confirm-password-toggle");
    const passwordInput2 = document.getElementById("confirm-password-input");
    const submit_button = document.getElementById("submit-button");
    const passwordStrength = document.getElementById("password-strength");
    const form = document.getElementById("signup-form");
    const emailInput = document.getElementById("email-input");
    const lastNameInput = document.getElementById("last-name-input");
    const firstNameInput = document.getElementById("first-name-input");

    const passwordToggle = new PasswordToggle(eyeButton, passwordInput);
    const confirmPasswordToggle = new PasswordToggle(eyeButton2, passwordInput2);
    const passwordStrengthChecker = new PasswordStrengthChecker(passwordInput, passwordStrength);
    const formValidator = new FormValidator(firstNameInput, lastNameInput, passwordInput, passwordInput2, emailInput, submit_button, form, eyeButton2);
});