document.addEventListener('DOMContentLoaded', function () {
    // Initialize sidenav
    var sidenavElems = document.querySelectorAll('.sidenav');
    var sidenavInstances = M.Sidenav.init(sidenavElems, {});

    // Initialize modal
    var modalElems = document.querySelectorAll('.modal');
    var modalInstances = M.Modal.init(modalElems, {});

    // Initialize select dropdown
    var selectElems = document.querySelectorAll('select');
    var selectInstances = M.FormSelect.init(selectElems, {});
  });



  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {});
  });

  