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

const name = document.querySelector("#first-name");
const errorName = document.querySelector(".name-error");

const email = document.querySelector("#email");
const errorEmail = document.querySelector(".email-error");

const pass = document.querySelector("#password");
const errorPass = document.querySelector(".pass-error");

const passConf = document.querySelector("#conf-password");
const errorPassConf = document.querySelector(".conf-pass-error");

// EVENTS
form.addEventListener("submit", () => console.log("Done")); //non credo serva
submitBtn.addEventListener("click", btnChecker);

name.addEventListener("keyup", delay(validateName, 300));

email.addEventListener("keyup", delay(validateEmail, 300));
email.addEventListener("focus", () => {
  if (email.value !== "") {
    validateEmail;
  }
});
email.addEventListener("blur", () => removeOkSign(errorEmail));

pass.addEventListener("keyup", delay(validatePass, 300));

passConf.addEventListener("keyup", delay(validateConfPass, 300));
passConf.addEventListener("focus", () => {
  if (email.value !== "") {
    validateConfPass;
  }
});
passConf.addEventListener("blur", () => removeOkSign(errorPassConf));

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
  if (name.value === "") {
    checkEmpty(name, errorName);
  } else {
    inputFull(name, errorName);
  }
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
  /*
  OCCHIO CHE quando scrivi, deve anche controllare il confirm pass e farlo diventare wrong,
  
  // Cambia dinamicamente anche il Conf Pass
  if(confirmpass.value !== "") {
    if (passConf.value !== pass.value) {
    wrongValidation(passConf, errorPassConf);
  } else {
    correctValidation(passConf, errorPassConf);
  }
}
    */
}

function validateConfPass() {
  inputFull(passConf, errorPassConf);

  if (passConf.value === "" || passConf.value !== pass.value) {
    wrongValidation(passConf, errorPassConf);
  }

  if (pass.value !== "" && passConf.value === pass.value) {
    correctValidation(passConf, errorPassConf);
  }
}

function btnChecker(e) {
  e.preventDefault();

  checkEmpty(name, errorName);
  checkEmpty(email, errorEmail);
  checkEmpty(pass, errorPass);
  checkEmpty(passConf, errorPassConf);

  /*
  Altre cose da fare??
  Se è tutto completato invia il form e basta(?);
  Tanto per la validazione dei singoli input la si farà mentre si scrive
  */
}

function wrongValidation(input, error) {
  let message = changeErrorMessage(input);

  input.classList.remove("correct-input");
  input.classList.add("wrong-input");
  error.classList.remove("correct");
  error.innerText = message;
}

function changeErrorMessage(input) {
  let message = "Please complete this field";

  switch (input) {
    case email:
      if (email.value !== "") {
        message = "Please enter a valid email address";
      }
      break;

    case pass:
      "sdf";
      break;

    case passConf:
      if (passConf.value !== "") {
        message = "Password mismatch";
      }
      break;
  }

  return message;
}

function correctValidation(input, error) {
  input.classList.remove("wrong-input");
  input.classList.add("correct-input");
  error.classList.add("correct");
  error.innerText = "✓";
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

function removeOkSign(error) {
  error.classList.remove("correct");
  if (error.innerText === "✓") {
    error.innerText = "";
  }
}
