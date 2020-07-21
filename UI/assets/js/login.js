document.getElementById("login").addEventListener("click", function (event) {
    event.stopImmediatePropagation();
    alert('yes');
    if(document.getElementById("email").value == "admin@admin.com"){
      window.location.href = "admin_dashboard.html"
    }else{
      window.location.href = "dashboard.html";
    }
  
  });