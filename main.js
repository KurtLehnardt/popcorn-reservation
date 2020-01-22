// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyD-WQZY0zjJyepEGoZfzGyOUG-gRrQKuhE",
  authDomain: "popcorn-reservation.firebaseapp.com",
  databaseURL: "https://popcorn-reservation.firebaseio.com",
  projectId: "popcorn-reservation",
  storageBucket: "popcorn-reservation.appspot.com",
  messagingSenderId: "553121852864",
  appId: "1:553121852864:web:6d7a4f5a1adff53288ec25",
  measurementId: "G-CSM3041QGB"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
  var messagesRef = firebase.database().ref('registrations');
  // Listen for form submit
  const form = document.querySelector('#contactForm')
  form.addEventListener('submit', submitForm);
  // Submit form
  function submitForm(e){

    e.preventDefault(); // stops page from automatically reloading
    // Get values
    var name = getInputVal('name');
    var username = getInputVal('username');
    var email = getInputVal('email');

    // Save message
    saveMessage(name, username, email);
    // Show alert
    document.querySelector('.alert').style.display = 'block';
    // Hide alert after 3 seconds
    setTimeout(function(){
      document.querySelector('.alert').style.display = 'none';
    },3000);
    // Clear form
    form.reset();
  }

  // Function to get get form values
  function getInputVal(id){
    return document.getElementById(id).value;
  }

  // Save message to firebase
  function saveMessage(name, username, email){
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
      name: name,
      username: username,
      email :email
    });
  }
