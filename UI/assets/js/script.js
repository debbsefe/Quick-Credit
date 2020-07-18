let mainNav = document.getElementById("js-menu");
let navBarToggle = document.getElementById("js-navbar-toggle");

let firstName = document.getElementById("first-name");
let lastName = document.getElementById("last-name");
let email = document.getElementById("email");
let password = document.getElementById("password");
let signup = document.getElementById("signup");
let firstBlank = document.querySelector(".firstBlank");
let lastBlank = document.querySelector(".lastBlank");
let emailBlank = document.querySelector(".emailBlank");
let passwordBlank = document.querySelector(".passwordBlank");
let letters = /^[a-z]*$/i;
let emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let spinner = document.getElementById("spinner");

let menuIcon = document.querySelector(".menu-icon");
let sidenavOpen = document.querySelector('.sidenav');
let sidenavClose = document.querySelector('.sidenav__close-icon');


menuIcon.addEventListener("click", function () {
  sidenavOpen.classList.toggle("active");
});
sidenavClose.addEventListener("click", function () {
  sidenavOpen.classList.toggle("active");
});

navBarToggle.addEventListener("click", function () {
  mainNav.classList.toggle("active");
});

signup.addEventListener("click", function (e) {
  e.preventDefault();
  // spinner.style.display = "inline-block";
  firstName.value == "" ?
    firstBlank.innerText = "First Name cannot be empty" : firstName.value.length < 2 ?
      firstBlank.innerText = "First Name cannot be less than 2 characters" :
      !firstName.value.match(letters) ?
        firstBlank.innerText = "First Name cannot contain numbers" :
        firstBlank.innerText = "";

  lastName.value == "" ?
    lastBlank.innerText = "Last Name cannot be empty" :
    lastName.value.length < 2 ?
      lastBlank.innerText = "Last Name cannot be less than 2 characters" :
      !lastName.value.match(letters) ?
        lastBlank.innerText = "Last Name cannot contain numbers" :
        lastBlank.innerText = "";

  email.value == "" ?
    emailBlank.innerText = "Email cannot be empty" :
    emailregex.test(email.value) == false ?
      emailBlank.innerText = "Please supply a valid email" :
      emailBlank.innerText = "";

  password.value == "" ?
    passwordBlank.innerText = "Password cannot be empty" :
    password.value.length < 6 ?
      passwordBlank.innerText = "Password cannot be less than 6 characters" :
      passwordBlank.innerText = "";

  if (passwordBlank.innerText == "" && emailBlank.innerText == "" && lastBlank.innerText == "" && firstBlank.innerText == "") {
    spinner.style.display == "inline-block"
    window.location.href = "dashboard.html";
  }

});
