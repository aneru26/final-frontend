import { setRouter } from "../router/router.js";

// Set Router
setRouter();

// Backend URL
const backendURL = "http://127.0.0.1:8000";


function showAdminPages(){
  if(localStorage.getItem("role") == "admin"){
    document.getElementById(
      "nav_admin_pages"
      ).innerHTML = `<a class="waves-effect" href="users.html">User</a>`;
  }
}

function showAdminStatus() {
  if (localStorage.getItem("role") === "admin") {
    document.getElementById("nav_admin_status").innerHTML = `
      <div class="form-group col-md-12">
        <label for="status">Status</label>
        <select class="form-control" name="status" id="status" required>
          <option value="pending">Select status</option> 
          <option value="accept">Accept</option>
          <option value="decline">Decline</option>
        </select>
      </div>`;
  } else if (localStorage.getItem("role") === "customer") {
    document.getElementById("nav_admin_status").innerHTML = `
      <div class="form-group col-md-12" hidden>
        <label for="status">Status</label>
        <select class="form-control" name="status" id="status" required>
          <option value="pending">Select status</option> 
          <option value="accept">Accept</option>
          <option value="decline">Decline</option>
        </select>
      </div>`;
  }
}


// Notifications
function successNotification(message, seconds = 0) {
  document.querySelector("#success-message").classList.remove("d-none");
  document.querySelector("#success-message").classList.add("d-block");
  document.querySelector("#success-message").innerHTML = message;

  if (seconds != 0) {
    setTimeout(function () {
      document.querySelector("#success-message").classList.remove("d-block");
      document.querySelector("#success-message").classList.add("d-none");
    }, seconds * 1000);
  }
}

function errorNotification(message, seconds = 0) {
  document.querySelector("#error-message").classList.remove("d-none");
  document.querySelector("#error-message").classList.add("d-block");
  document.querySelector("#error-message").innerHTML = message;

  if (seconds != 0) {
    setTimeout(function () {
      document.querySelector("#error-message").classList.remove("d-block");
      document.querySelector("#error-message").classList.add("d-none");
    }, seconds * 1000);
  }
}

export { backendURL, showAdminPages ,showAdminStatus, successNotification, errorNotification };