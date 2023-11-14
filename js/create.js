class PasswordToggle {
    constructor(eyeButton, passwordInput) {
        this.eyeButton = eyeButton;
        this.passwordInput = passwordInput;
        this.isPasswordVisible = false;

        this.eyeButton.classList.add("eye-button");
        this.eyeButton.style.backgroundImage = "url(/images/EyeHide.png)";
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

        this.passwordInput.classList.add("input-field");
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

        this.successMessageContainer = document.getElementById("success-messages");
        this.errorMessagesContainer = document.getElementById("error-messages");

        this.eyeButton2.classList.add("eye-button");
        this.eyeButton2.style.backgroundImage = "url(/images/EyeHide.png)";

        this.confirmPasswordInput.classList.add("input-field");

        this.form.addEventListener("submit", (event) => this.validateForm(event));
    }

    validateForm(event) {
        this.errorMessagesContainer.innerHTML = "";

        const passwordValue = this.passwordInput.value;
        const confirmPasswordValue = this.confirmPasswordInput.value;
        const emailValue = this.emailInput.value;
        const firstNameInput = this.firstNameInput.value;
        const lastNameInput = this.lastNameInput.value;

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
                this.displayErrorMessage(rule.message);
                event.preventDefault();
                return;
            }
        }
    }

    isValidEmail(email) {
        const email_thangs = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return email_thangs.test(email);
    }

    isCopyAndPaste(password) {
        return password !== this.passwordInput.defaultValue;
    }

    displayErrorMessage(message) {
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
