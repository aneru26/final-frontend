
import {
  backendURL,
  successNotification,
  errorNotification,
} from "../../utils/utils.js";

// Form Login
document.addEventListener("DOMContentLoaded", function() {

const form_login = document.getElementById("form_login");
form_login.onsubmit = async (e) => {
  e.preventDefault();

  // Disable button
  document.querySelector("#form_login button").disabled = true;
  document.querySelector("#form_login button").innerHTML = `<div class="spinner-border me-2" role="status">
  <span class="sr-only">Loading...</span>
</div> <span> Loading...</span>`;

  // Get values of form
  const formData = new FormData(form_login);

  // Fetch api user register
  const response = await fetch(backendURL + "/api/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: formData,
  });

  // Get response if 200-299 status code
  if (response.ok) {
    const json = await response.json();

    //Store Token
    localStorage.setItem("token", json.token);

    //store Role
    localStorage.setItem("role", json.user.role);

    form_login.reset();

   // Display the success message
   const successMessage = document.getElementById("success-message");
   successMessage.innerText = json.success;
   successMessage.style.display = "block";

   // Hide the error message if it was previously displayed
   const errorMessage = document.getElementById("error-message");
   errorMessage.style.display = "none";

    //Redirect Page
      window.location.pathname = "dashboard.html";

//Get Response if 422 status code
  } else if (response.status == 422) {
    const json = await response.json();

      // Display the error message at the top of the form
      const errorMessage = document.getElementById("error-message");
      errorMessage.innerText = json.message;
      errorMessage.style.display = "block";
 
      // Hide the success message if it was previously displayed
      const successMessage = document.getElementById("success-message");
      successMessage.style.display = "none";
  }

  // Enable button
  document.querySelector("#form_login button").disabled = false;
  document.querySelector("#form_login button").innerHTML = `Sign In`;
};

});
