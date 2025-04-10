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

      if (isSignUp) {
          formTitle.textContent = "Create Account";
          submitButton.textContent = "Sign Up";
          confirmPasswordGroup.classList.remove("hidden");
          toggleFormLink.textContent = "Already have an account? Sign In";
      } else {
          formTitle.textContent = "Sign In";
          submitButton.textContent = "Sign In";
          confirmPasswordGroup.classList.add("hidden");
          toggleFormLink.textContent = "Don't have an account? Create Account";
      }
  });

  authForm.addEventListener("submit", (e) => {
      e.preventDefault();
      errorMessage.textContent = ""; 

      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();
      const confirmPassword = document.getElementById("confirmPassword") ? document.getElementById("confirmPassword").value.trim() : "";

      if (isSignUp) {
          if (!username || !password || !confirmPassword) {
              errorMessage.textContent = "All fields are required.";
              return;
          }
          if (password !== confirmPassword) {
              errorMessage.textContent = "Passwords do not match.";
              return;
          }
          alert("Account created successfully! You can now sign in.");
          toggleFormLink.click();
      } else {
          if (!username || !password) {
              errorMessage.textContent = "Please enter your credentials.";
              return;
          }
        
          window.location.href = "homepage.html";
      }

      authForm.reset();
  });
});

