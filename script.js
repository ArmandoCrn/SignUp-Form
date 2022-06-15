/*
Cosa scrivere quando si valida il form
Se premiamo il pulstante send e il campo è vuoto bisogna mostrare:
"Please complete this field"


altrimenti passiamo alla validazione mentre scriviamo, sempre col timer
dopo tipo 0.3/0.5 secondi che sia finito l'event input
se ci sono cose sbagliate nell'email, password e confirm pass
faremo comparire sotto ciò che è sbagliato:
i p saranne tutte rosse, avendo già in automatico la classe error

EMAIL: "Please enter a valid email address (min 6 caratteri)"; 

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

// COMPONENTS
const form = document.querySelector("form"); // Non so se serve
const submitBtn = document.querySelector("#submit");

const name = document.querySelector("#first-name");
const errorName = document.querySelector(".name-error");

const email = document.querySelector("#email");
const errorEmail = document.querySelector(".email-error");

const pass = document.querySelector("#password");
const errorPass = document.querySelector(".pass-error");

const passConf = document.querySelector("#conf-password");
const errorConfPass = document.querySelector(".conf-pass-error");

// EVENTS
form.addEventListener("submit", (e) => console.log("non so")); //non credo serva
submitBtn.addEventListener("click", btnChecker);

name.addEventListener("keyup", delay(validateName, 300));
email.addEventListener("keyup", delay(validateEmail, 300));
pass.addEventListener("keyup", delay(validatePass, 300));
passConf.addEventListener("keyup", delay(validateConfPass, 300));

// FUNCTIONS
function delay(callback, ms) {
  let timer = 0;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
}

function validateName() {
  inputFull(name);
}

function validateEmail() {
  inputFull(email);
  //FIXME: cerca online validation email
  //Bisogna fscrivere a manina una regexp per la @ ecc ecc
  //errore dirà "Please enter a valid email address"
}

function validatePass() {
  inputFull(pass);
  //FIXME: cerca online validation pass
}

function validateConfPass() {
  inputFull(passConf);
  /*
  FIXME: if (text di questo field !== a testo di pass) {
    scrive cosa succede qui
  }
*/
}

function inputFull(input) {
  if (input.className) {
    input.classList.remove("empty-imput");
    let error = errorType(input);
    error.innerText = "";
  }
}

function btnChecker(e) {
  e.preventDefault();

  checkEmpty(name);
  checkEmpty(email);
  checkEmpty(pass);
  checkEmpty(passConf);

  /*
  Altre cose da fare??
  Se è tutto completato invia il form e basta(?);
  Tanto per la validazione dei singoli input la si farà mentre si scrive
  */
}

function checkEmpty(input) {
  let error = errorType(input);

  if (input.value === "") {
    error.innerText = "Please complete this field";
    input.classList.add("empty-imput");
  }
}

// Capisce che classe deve usare per modificare l'innerText
function errorType(input) {
  let result;

  switch (input) {
    case name:
      result = errorName;
      break;

    case email:
      result = errorEmail;
      break;

    case pass:
      result = errorPass;
      break;

    case passConf:
      result = errorConfPass;
      break;
  }

  return result;
}
