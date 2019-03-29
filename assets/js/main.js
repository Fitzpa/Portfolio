// Select DOM items
const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');
const menuBranding = document.querySelector('.menu-branding');
const menuNav = document.querySelector('.menu-nav');
const navItems = document.querySelectorAll('.nav-item');

// Set initial State of Menu
let showMenu = false;

menuBtn.addEventListener('click', toggleMenu);

function toggleMenu() {
  if(!showMenu) {
    menuBtn.classList.add('close');
    menu.classList.add('show');
    menuBranding.classList.add('show');
    menuNav.classList.add('show');
    navItems.forEach(item => item.classList.add('show'));

    // Reset the menu this this state
    showMenu = true;
  } else {
    menuBtn.classList.remove('close');
    menu.classList.remove('show');
    menuBranding.classList.remove('show');
    menuNav.classList.remove('show');
    navItems.forEach(item => item.classList.remove('show'));

    // Reset the menu this this state
    showMenu = false;
  }
}
//--------------------------------FIREBASE-------------------------------------
// Initialize Firebase
var config = {
  apiKey: "AIzaSyAHfw1dgV-lETw6OLRkqK2SNX1FUO9NM1w",
  authDomain: "profilecontactform.firebaseapp.com",
  databaseURL: "https://profilecontactform.firebaseio.com",
  projectId: "profilecontactform",
  storageBucket: "",
  messagingSenderId: "349945662162"
};
firebase.initializeApp(config);

var messageRef = firebase.database().ref('messages');

// Listen for form submit
document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();

 

  // Get values
  var name = getInputVal("name");
  var company = getInputVal("company");
  var email = getInputVal("email");
  var message = getInputVal("message");
  console.log(name);

  // Save the messages to firebase
  saveMessage(name, company, email, message);

  // Alert user that the message was sent
  document.querySelector('.alert').style.display = 'block';

  //hide alert after a few seconds
  setTimeout(function() {
    document.querySelector(".alert").style.display = 'none';
  }, 3000);

  // Clears the form
  document.getElementById("contactForm").reset();
}

// Function to get get form values
function getInputVal(id) {
  return document.getElementById(id).value;
}

function saveMessage(name, company, email, message) {
  var newMessageRef = messageRef.push();
  newMessageRef.set({
    name: name,
    company: company,
    email: email,
    message: message
  });
}