import {
    backendURL,
    successNotification,
    errorNotification,
    showAdminPages,
    showAdminStatus,
   
  } from "../../utils/utils.js";
  
  //userforadmin
  showAdminPages();

  //showadminstatus
  showAdminStatus();

  // Get All Appointment
getDatas();

async function getDatas() {
  //if the role is admin
  const isAdmin = localStorage.getItem("role") === "admin";

  // Choose the appropriate API endpoint based on the user's role
  const apiEndpoint = isAdmin ? "/api/allappointment" : "/api/appointment";
  
  //get Appointment
  const response = await fetch(backendURL + apiEndpoint, {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  if (response.ok) {
    const json = await response.json();

    // Initialize DataTable
    $('#appointmentTable').DataTable().clear().draw();

    json.forEach((element) => {

      const status = element.status || "pending";

      // Format the time using toLocaleTimeString
    const startTime = new Date(`2023-01-01 ${element.start_time}`);
    const endTime = new Date(`2023-01-01 ${element.end_time}`);

     // Format the created_at date using toLocaleDateString with 'en-CA' locale to get 'YYYY-MM-DD' format
     const createdDate = new Date(element.created_at);
     const formattedCreatedDate = createdDate.toLocaleDateString('en-CA');

      const container = `
        <tr>
          <td>${element.appointment_no}</td>
          <td>${element.area}</td>
          <td>${element.event_name}</td>
          <td>${element.event_date}</td>
          <td>${startTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</td>
          <td>${endTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</td>
          <td>${status}</td>
          <td>${formattedCreatedDate}</td>
          <td>
              <a href="#" class="btn-small"  id="btn_edit" data-id="${element.appointment_no}">Edit</a>
              <a href="#" class="btn-small red" id="btn_delete" data-id="${element.appointment_no}">Delete</a>
            </td>
        </tr>`;

      $('#appointmentTable').DataTable().row.add($(container)).draw();
    });

    // Add event listeners for edit and delete actions
    document.querySelectorAll("#btn_edit").forEach((element) => {
      element.addEventListener("click", editAction);
    });

    document.querySelectorAll("#btn_delete").forEach((element) => {
      element.addEventListener("click", deleteAction);
    });
  } else {
    errorNotification("HTTP-Error: " + response.status);
  }
}


// Close Modal Function
const closeModal = () => {
  const modalCloseButton = document.getElementById("modal_close");
  modalCloseButton.click();
};

 // Create/Update Appointment
 const appointment_form = document.getElementById("appointment_form");
 appointment_form.onsubmit = async (e) => {
   e.preventDefault();
 
 
   //Disable Button
   document.querySelector("#appointment_form button[type='submit']").disabled = true;
   document.querySelector("#appointment_form button[type='submit'").innerHTML = `<div class="spinner-border me-2" role="status">
   <span class="sr-only">Loading...</span>
 </div> <span> Loading...</span>`;


 // Get values from the form data
 const formData = new FormData(appointment_form);
 

 let response;

 //check for_update id if empty
 if(for_update_id == "") {
 
   //Fetch Api
      response = await fetch( backendURL + "/api/appointment",
       {
         method:"POST",
         headers: {
           Accept: "application/json",
           Authorization: "Bearer " + localStorage.getItem("token"),
         },
         body: formData,
       }
     );
 }
 //else for update
 else {
      // Fetch Api
      response = await fetch(backendURL + "/api/appointment/" + for_update_id, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/x-www-form-urlencoded", // Set the content type
        },
        body: new URLSearchParams(formData).toString(), // Convert FormData to URL-encoded string
    });
}
 
 // Get response if 200-299 status code
   if (response.ok) {
     const json = await response.json();
     console.log(json);
    //reset form

    
     appointment_form.reset();

     //reset for_update_id
     for_update_id = "";


     // Display the success message
const successMessage = document.getElementById("success-message-local");
successMessage.innerText = json.message; // Assuming the success message is stored in the "message" property
successMessage.style.display = "block";

// Hide the error message if it was previously displayed
const errorMessage = document.getElementById("error-message-local");
errorMessage.style.display = "none";



    // close modal
    closeModal();

    //reload page
     getDatas();
 
     
 
   } 
   // Get response if 422 status code
   else if (response.status == 422) {
     const json = await response.json();
     console.error(json);

   // close modal
    closeModal();
     
    // Display the success message
    const successMessage = document.getElementById("success-message");
    successMessage.innerText = json.success;
    successMessage.style.display = "block";
 
    // Hide the error message if it was previously displayed
    const errorMessage = document.getElementById("error-message");
    errorMessage.style.display = "none";
     
   }
 
  // Enable button
   document.querySelector("#appointment_form button").disabled = false;
   document.querySelector("#appointment_form button").innerHTML = "Submit";
 };
 

// Delete Appointment
const deleteAction = async (e) => {
  console.log("Delete action triggered");
  //confirmation
  if (confirm("Are you sure you want to delete?")) {

    //get id from data-id attribute within the delete
    const id = e.target.getAttribute("data-id");


      //Fetch Api
    const response = await fetch ( backendURL + "/api/appointment/" + id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    // Get response if 200-299 status code
    if (response.ok) {
      // const json = await response.json();
      // console.log(json);

 
    // Display the success message
    const successMessage = document.getElementById("success-message");
    successMessage.innerText = json.success;
    successMessage.style.display = "block";
 
    // Hide the error message if it was previously displayed
    const errorMessage = document.getElementById("error-message");
    errorMessage.style.display = "none";

      //remove the data
      document.querySelector(`[data-id="${id}"]`).remove();
      

    } else {
      // Display the error message at the top of the form
      const errorMessage = document.getElementById("error-message");
      errorMessage.innerText = json.message;
      errorMessage.style.display = "block";
 
      // Hide the success message if it was previously displayed
      const successMessage = document.getElementById("success-message");
      successMessage.style.display = "none";
    }
  }
};

 // Update Message
 const editAction = async (e) => {
  const id = e.target.getAttribute("data-id");

  showData(id)

  document.getElementById("show_modal").click();
 
};
//to store appointment id
let for_update_id = "";

// Show Data
const showData = async (id) => {


  //feth api
  const response = await fetch(backendURL + "/api/appointment/" + id, {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  //if response is 200
  if (response.ok) {
    const json = await response.json();
    console.log(json)

    
    //for the appointmen id
    for_update_id = json.appointment_no;
    //get the date by its ID
    document.getElementById("area").value = json.area;
    document.getElementById("event_name").value = json.event_name;

    document.getElementById("start_time").value = json.start_time;
    document.getElementById("end_time").value = json.end_time;

    document.getElementById("event_date").value = json.event_date;  
    document.getElementById("status").value = json.status;  
    document.getElementById("Appointment_title").innerHTML = "Update Appointment";
    //change button to update
    document.querySelector("#appointment_form button[type='submit']").innerHTML = "Update Appointment";
  } 
  //if response is 422
  else {
    // Display the error message at the top of the form
    const errorMessage = document.getElementById("error-message");
    errorMessage.innerText = json.message;
    errorMessage.style.display = "block";

    // Hide the success message if it was previously displayed
    const successMessage = document.getElementById("success-message");
    successMessage.style.display = "none";
  }
};

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
    
        // Display the error message at the top of the form
      const errorMessage = document.getElementById("error-message");
      errorMessage.innerText = json.message;
      errorMessage.style.display = "block";
 
      // Hide the success message if it was previously displayed
      const successMessage = document.getElementById("success-message");
      successMessage.style.display = "none";
      }
    };
  });