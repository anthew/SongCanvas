import { PasswordInputToggle } from "./PasswordInputToggle.js";
// import { UserDB } from "./database.js";

document.addEventListener("DOMContentLoaded", () => {
  initializePasswordInputToggle();

  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", validateCredentials);
  }
});

function initializePasswordInputToggle() {
  const eyeButton = document.getElementById("password-toggle");
  const passwordInput = document.getElementById("password-input");

  if (eyeButton && passwordInput) {
    new PasswordInputToggle(eyeButton, passwordInput);
  }
}

async function validateCredentials(event) {
  event.preventDefault();

  const emailInput = document.getElementById("email-input");
  const passwordInput = document.getElementById("password-input");

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    alert("Email and password are required.");
    return;
  }

  try {
    const response = await fetch('/login.html', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    // const responseData = await response.json();
    if (response.ok) {
      // const responseData = await response.json();
      alert('Authentication successful');
      // Redirect or perform other actions on success
      window.location.href = '/html/dashboard.html';
    } else {
      alert('Authentication failed.');
    }
  } catch (error) {
    console.error('Error during authentication:', error);
    alert(email + " and " + password);//pirnt
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", validateCredentials);
  }
});

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