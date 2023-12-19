import {
    backendURL,
    successNotification,
    errorNotification,
    showAdminPages,
   
  } from "../../utils/utils.js";

  //show user for admin
  showAdminPages();



  getUser();
  async function getUser() {
    // Get user data
    const response = await fetch(backendURL + "/api/user", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  
    if (response.ok) {
      const json = await response.json();
  
      // Initialize DataTable
      $('#userTable').DataTable().clear().draw();
  
      json.forEach((element) => {
        const date = element.created_at.substr(0, 10);
        const startTime = new Date(`${date}T${element.start_time}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        const endTime = new Date(`${date}T${element.end_time}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

          // Format the created_at date using toLocaleDateString with 'en-CA' locale to get 'YYYY-MM-DD' format
     const createdDate = new Date(element.created_at);
     const formattedCreatedDate = createdDate.toLocaleDateString('en-CA');
  
        const container = `
          <tr>
            <td>${element.id}</td>
            <td>${element.name}</td>
            <td>${element.phone}</td>
            <td>${element.organization}</td>
            <td>${element.email}</td>
            <td>${formattedCreatedDate}</td>
            <td>
              <a href="#" class="btn-small"  id="btn_edit" data-id="${element.id}">Edit</a>
              <a href="#" class="btn-small red" id="btn_delete" data-id="${element.id}">Delete</a>
            </td>
          </tr>`;

          $('#userTable').DataTable().row.add($(container)).draw();
      });
  
      document.getElementById("get_data").innerHTML = container;
  
      // Add event listeners for edit and delete actions
      document.querySelectorAll("#btn_edit").forEach((element) => {
        element.addEventListener("click", editAction);
      });
  
      document.querySelectorAll("#btn_delete").forEach((element) => {
        element.addEventListener("click", deleteAction);
      });
  
      // Initialize DataTable
      $(document).ready(function() {
        $('#userTable').DataTable();
      });
    } else {
      errorNotification("HTTP-Error: " + response.status);
    }
  }
  
    //Log Out Button
    document.addEventListener("DOMContentLoaded", function () {
      const btn_logout = document.getElementById("btn_logout");
      btn_logout.onclick = async () => {
  
  
        // Access Logout API Endpoint
        const response = await fetch(backendURL + "/api/logout", {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
      
        // Get response if 200-299 status code
        if (response.ok) {
          // Clear Tokens
          localStorage.clear();
      
          successNotification("Logout Successful.");
          // Redirect Page
          window.location.pathname = "/";
        }
        // Get response if 400 or 500 status code
        else {
          const json = await response.json();
      
          errorNotification(json.message, 10);
        }
      };
    });