import { setRouter } from "../router/router.js";

// Set Router
setRouter();

// Backend URL
const backendURL = "https://611c-103-80-142-206.ngrok-free.app";


function showAdminPages(){
  if(localStorage.getItem("role") == "admin"){
    document.getElementById(
      "nav_admin_pages"
      ).innerHTML = `<a class="waves-effect" href="users.html">User</a>`;
  }
}

function showAddButton() {
  if (localStorage.getItem("role") === "admin") {
    document.getElementById("btn_show").innerHTML = `
    <div class="col-sm-6" hidden style="text-align:right;">
    <a id="show_modal" class="waves-effect waves-light btn modal-trigger" href="#modal1">Add New Appointment</a>
  </div>`;
  } else if (localStorage.getItem("role") === "customer") {
    document.getElementById("btn_show").innerHTML = `
    <div class="col-sm-6" style="text-align:right;">
                  <a id="show_modal" class="waves-effect waves-light btn modal-trigger" href="#modal1">Add New Appointment</a>
                </div>`;
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
  document.querySelector("#error-message-local").classList.remove("d-none");
  document.querySelector("#error-message-local").classList.add("d-block");
  document.querySelector("#error-message-local").innerHTML = message;

  if (seconds != 0) {
    setTimeout(function () {
      document.querySelector("#error-message").classList.remove("d-block");
      document.querySelector("#error-message").classList.add("d-none");
    }, seconds * 1000);
  }
}

export { backendURL, showAdminPages ,showAdminStatus , showAddButton , successNotification, errorNotification };