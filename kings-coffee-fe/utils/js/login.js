$(document).ready(function() {
  requestCall('user', 'GET', 'checkLoggedIn', null, null, function(res) {
   if (res) {
    window.location = "index.html";
   }
  });
});
$("#btn-login").click(function() {
  if ($("#username").val() && $("#password").val()) {
    // Collect data from the employee form fields
    var formData = {
      "username": $("#username").val(),
      "password": $("#password").val(),
    };
    requestCall('user', 'POST', 'login', formData, null, function(res) {
      if (!res.ok) {
        alert("Wrong username or password!");
      } else {
        alert("Login successful!");
        window.location = "index.html";
      }
    });
  } else {
    alert("Please input username and password!");
  }
});