/*

EMAIL: "Please enter a valid email address"; 

CONFIRM PASS: "Password mismatch"

PASSWORD:
Per la pass il discorso è diverso. Dovremo creare 3 p dove all'interno ci 
saranno rispettivamente
Minimum 8 characters
At least one number
At least one character

Man mano che le cose vengono rispettate aggiungeremo la class .correct,
facendo diventare verse il testo

OLTRE a far cambiare il testo, dovremo aggiungere agl'input sopracitati, tranne name
la classe .correct-input oppure .wrong-input

MI SA CHE L'ENTER NON DEVO METTERLO IO, C'è GIà IN AUTOMATICO.
*/
/*
per automatizzare la validazione di EMAIL PASS e CONFIRM PASS

il bordo diventa rosso quando è sbagliato intutti e 3

in EMAIL e conf pass compare sotto solo una stringa

in EMAIL la stringa sarà
"Please enter a valid email address"; 

in CONFIRM PASS la stringa sarà
"Password mismatch"
*/

// COMPONENTS
const form = document.querySelector("form"); // Non so se serve
const submitBtn = document.querySelector("#submit");
const needSign = document.querySelectorAll(".need-sign");

const name = document.querySelector("#first-name");
const errorName = document.querySelector(".name-error");

const email = document.querySelector("#email");
const errorEmail = document.querySelector(".email-error");

const pass = document.querySelector("#password");
const errorPass = document.querySelector(".pass-error");

const passConf = document.querySelector("#conf-password");
const errorConfPass = document.querySelector(".conf-pass-error");

// EVENTS
form.addEventListener("submit", () => console.log("Done")); //non credo serva
submitBtn.addEventListener("click", btnChecker);

name.addEventListener("keyup", delay(validateName, 300));
email.addEventListener("keyup", delay(validateEmail, 300));
email.addEventListener("focus", () => okSign(email, errorEmail));
email.addEventListener("blur", () => removeOkSign(email, errorEmail));

pass.addEventListener("keyup", delay(validatePass, 300));
passConf.addEventListener("keyup", delay(validateConfPass, 300));

// FUNCTIONS

//Funzione DELAY presa da stackoverflow:
//(https://stackoverflow.com/questions/1909441/how-to-delay-the-keyup-handler-until-the-user-stops-typing)
function delay(callback, ms) {
  let timer = 0;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
}

function validateName() {
  inputFull(name, errorName);
}

function validateEmail() {
  inputFull(email, errorEmail);
  const regexpEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value);

  if (!regexpEmail) {
    wrongValidation(email, errorEmail);
  } else {
    correctValidation(email, errorEmail);
  }
}

function showPass() {
  //TODO: una delle ultime cose da fare, poicè dovrà essere
  //pronto già il design finale
  //usa toggle per cambiare l'attributo type da pass a text
  // Automatizzalo per farlo funzionare sia per questo field,
  // che per conf pass, anzichè scrivere due volte la stessa roba
}

function validatePass() {
  inputFull(pass, errorPass);
  //FIXME: cerca online validation pass
}

function validateConfPass() {
  inputFull(passConf, errorConfPass);
  /*
  TODO: FAI prima questo che dovrebbe essere più semplice
  FIXME: if (text di questo field !== a testo di pass) {
    scrive cosa succede qui
  }
*/
}

function btnChecker(e) {
  e.preventDefault();

  checkEmpty(name, errorName);
  checkEmpty(email, errorEmail);
  checkEmpty(pass, errorPass);
  checkEmpty(passConf, errorConfPass);

  /*
  Altre cose da fare??
  Se è tutto completato invia il form e basta(?);
  Tanto per la validazione dei singoli input la si farà mentre si scrive
  */
}

function wrongValidation(input, error) {
  const dataset = input.dataset.state;
  let message;

  // Remove datalist "correct"
  if (dataset !== "") {
    input.dataset.state = "";
  }

  if (input === email) {
    message = "Please enter a valid email address";
  }

  input.classList.remove("correct-input");
  input.classList.add("wrong-input");
  error.classList.remove("correct");
  error.innerText = message;
}

function correctValidation(input, error) {
  const dataset = input.dataset.state;

  if (dataset === "") {
    input.dataset.state = "correct";
    okSign(input, error);
  }

  input.classList.remove("wrong-input");
  input.classList.add("correct-input");
}

function inputFull(input, error) {
  if (input.className) {
    input.classList.remove("wrong-input");
    error.innerText = "";
  }
}

function checkEmpty(input, error) {
  if (input.value === "") {
    error.innerText = "Please complete this field";
    input.classList.add("wrong-input");
  }
}

function okSign(input, error) {
  if (input.dataset.state === "correct") {
    error.classList.add("correct");
    error.innerText = "✓";
  }
}

function removeOkSign(input, error) {
  if (input.dataset.state === "correct") {
    error.classList.remove("correct");
    error.innerText = "";
  }
}
