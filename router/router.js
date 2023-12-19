function setRouter() {
    switch (window.location.pathname) {
      // If you are logged in you cant access outside pages; redirect to dashboard
      case "/":
      case "/index.html":
      case "/register.html":
        if (localStorage.getItem("token")) {
          window.location.pathname = "/dashboard.html";
        }
        break;
      // If you are not logged in you cant access dashboard pages; redirect to /
      case "/dashboard.html":
      case "/appointment.html":
      case "/about.html":
        case "/contact.html":
          case "/users.html":
        if (!localStorage.getItem("token")) {
          window.location.pathname = "/";
        }
        break;
  
        case "/users.html":
          if(localStorage.getItem("role") != "admin"){
            window.location.pathname = "dashboard.html";
          }
      default:
        break;
    }
  }
  
  export { setRouter };