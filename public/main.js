const firebaseConfig = {
  apiKey: "AIzaSyD-WQZY0zjJyepEGoZfzGyOUG-gRrQKuhE",
  authDomain: "popcorn-reservation.firebaseapp.com",
  databaseURL: "https://popcorn-reservation.firebaseio.com",
  projectId: "popcorn-reservation",
  storageBucket: "popcorn-reservation.appspot.com",
  messagingSenderId: "553121852864",
  appId: "1:553121852864:web:6d7a4f5a1adff53288ec25",
  measurementId: "G-CSM3041QGB"
}
firebase.initializeApp(firebaseConfig)
const messagesRef = firebase.database().ref('registrations')

const form = document.querySelector('#contactForm')
const alertMsg = document.querySelector('.alert')

let dbKeysArray = []
let previouslyRegisteredArr = []
let haveCheckedForPriorRegistrations = false
let userAlreadyExists = false

// adds all prior usernames and emails to an array to prohibit registration conflicts
const populateListOfPreviousRegistrations = () => {
  if (!haveCheckedForPriorRegistrations){
  haveCheckedForPriorRegistrations = true
  messagesRef.on('value', snapshot => {
    for (key in snapshot.val()){
        dbKeysArray.push(key)
      }
    for (let i = 0; i < dbKeysArray.length; i++){
        previouslyRegisteredArr.push(snapshot.val()[dbKeysArray[i]].email, snapshot.val()[dbKeysArray[i]].username)
      }
    })
  }
}
// const can't be used as an IFFE? must be named with 'function'
populateListOfPreviousRegistrations()

const submitForm = e => {
  e.preventDefault()

  const name = getInputVal('name')
  const username = getInputVal('username')
  const email = getInputVal('email')

  if (!checkForPriorRegistrations(username, email)) {
    alertMsg.style.display = 'block'
    saveMessageToDB(name, username, email)
  } else {
    form.reset()
    return
  }
  // doesn't allow multiple registrations without refresh
  form.style.display = 'none'
}
form.addEventListener('submit', submitForm)

const getInputVal = id => document.getElementById(id).value

const checkForPriorRegistrations = (username, email) => {
  if (checkIfValueExists(previouslyRegisteredArr, username)) {
    updateAlertMessage(username)
  }
  if (checkIfValueExists(previouslyRegisteredArr, email)) {
    updateAlertMessage(email)
  }
  return userAlreadyExists
}

const checkIfValueExists = (arr, value) => arr.includes(value)

const updateAlertMessage = value => {
  alertMsg.innerHTML = `${value} is already in use.`
  alertMsg.style.display = 'block'
  alertMsg.style.background = 'red'
  form.reset()
  userAlreadyExists = true
}

const saveMessageToDB = (name, username, email) => {
  const newMessageRef = messagesRef.push()
  newMessageRef.set({
    name: name,
    username: username,
    email :email
  })
  setTimeout(exitAnimation, 1500)
}

const exitAnimation = () => {
  const wrapper = document.querySelector('.wrapper')
  wrapper.classList.remove('pulse')
  wrapper.classList.add('zoomOutRight')
}
