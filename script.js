document.addEventListener("DOMContentLoaded", () => {
  const formTitle = document.getElementById("form-title");
  const authForm = document.getElementById("authForm");
  const submitButton = document.getElementById("submitButton");
  const toggleFormLink = document.getElementById("toggleForm");
  const confirmPasswordGroup = document.getElementById("confirmPasswordGroup");
  const errorMessage = document.getElementById("error-message");

  let isSignUp = false;

  toggleFormLink.addEventListener("click", (e) => {
    e.preventDefault();
    isSignUp = !isSignUp;

    formTitle.textContent = isSignUp ? "Create Account" : "Sign In";
    submitButton.textContent = isSignUp ? "Sign Up" : "Sign In";
    confirmPasswordGroup.classList.toggle("hidden", !isSignUp);
    toggleFormLink.textContent = isSignUp
      ? "Already have an account? Sign In"
      : "Don't have an account? Create Account";

    errorMessage.textContent = "";
    authForm.reset();
  });

  authForm.addEventListener("submit", (e) => {
    e.preventDefault();
    errorMessage.textContent = "";

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document
      .getElementById("confirmPassword")
      ?.value.trim();

    const usernameRegex = /^[A-Za-z]+$/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    if (!usernameRegex.test(username)) {
      errorMessage.textContent = "Username must contain only letters.";
      return;
    }

    if (!specialCharRegex.test(password)) {
      errorMessage.textContent =
        "Password must contain at least one special character.";
      return;
    }

    if (isSignUp) {
      if (!username || !password || !confirmPassword) {
        errorMessage.textContent = "All fields are required.";
        return;
      }
      if (password !== confirmPassword) {
        errorMessage.textContent = "Passwords do not match.";
        return;
      }

      // Save credentials to Local Storage
      localStorage.setItem(username, password);

      alert("Account created successfully! You can now sign in.");
      toggleFormLink.click(); // Automatically switch to login
    } else {
      if (!username || !password) {
        errorMessage.textContent = "Please enter your credentials.";
        return;
      }

      // Fetch stored password
      const storedPassword = localStorage.getItem(username);

      if (!storedPassword) {
        errorMessage.textContent =
          "You don't have an account. Please create one.";
        return;
      }

      if (storedPassword !== password) {
        errorMessage.textContent = "Incorrect password. Please try again.";
        return;
      }

      // Login successful
      window.location.href = "homepage.html";
    }

    authForm.reset();
  });

  document.getElementById("guestLogin").addEventListener("click", () => {
    window.location.href = "homepage.html";
  });
});
