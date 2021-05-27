//Panel Movement Controller
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});


//SignIng validation
// Real-time username checks
$('#email').keyup(function() {
  checkSpaces($(this));
  checkRemoveLengthError($(this));
  checkAvailability($(this));
  checkRemovePresenceError($(this));
});

// Real-time password checks
$('#password').keyup(function() {
  checkRemoveLengthError($(this));
  checkRemovePresenceError($(this));
});

// Check lengths on blur
$('#email, #password').blur(function() {
  checkLength($(this));
});

// Check all on submit
$('#submit').click(function(event) {
  event.preventDefault();

  var valid_email = checkSpaces($('#email')) &&
                       checkLength($('#email')) &&
                       checkPresence($('#email')) &&
                       checkAvailability($('#email'));
  var valid_password = checkLength($('#password')) &&
                       checkPresence($('#password'));

  if (valid_email && valid_password) {
    alert('Success!');
  }
});

// Error checking functions





//Validation 
var myInput = document.getElementById("psw");
var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("length");

// When the user clicks on the password field, show the message box
myInput.onfocus = function() {
  document.getElementById("message").style.display = "block";
}

// When the user clicks outside of the password field, hide the message box
myInput.onblur = function() {
  document.getElementById("message").style.display = "none";
}



// When the user starts to type something inside the password field
myInput.onkeyup = function() {
  // Validate lowercase letters
  var lowerCaseLetters = /[a-z]/g;
  if(myInput.value.match(lowerCaseLetters)) {  
    letter.classList.remove("invalid");
    letter.classList.add("valid");
  } else {
    letter.classList.remove("valid");
    letter.classList.add("invalid");
  }
  
  // Validate capital letters
  var upperCaseLetters = /[A-Z]/g;
  if(myInput.value.match(upperCaseLetters)) {  
    capital.classList.remove("invalid");
    capital.classList.add("valid");
  } else {
    capital.classList.remove("valid");
    capital.classList.add("invalid");
  }

  // Validate numbers
  var numbers = /[0-9]/g;
  if(myInput.value.match(numbers)) {  
    number.classList.remove("invalid");
    number.classList.add("valid");
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
  }
  
  // Validate length
  if(myInput.value.length >= 8) {
    length.classList.remove("invalid");
    length.classList.add("valid");
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
    printError("mobileErr", "Please enter a valid 10 digit mobile number");
  }

   //character data validation
   if(!isNaN(nmyInput)){
    document.getElementById("blankMsg").innerHTML = "**Only characters are allowed";
    return false;
  }
}