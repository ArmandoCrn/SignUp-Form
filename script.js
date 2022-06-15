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

// name.addEventListener("input", );

// FUNCTIONs

/*
    Creare un add event listener per ogni singolo input type input
    setTime dopo qualche secondo 0.3/0.5s
    e SE ha la classe empty-imput RIMUOVILA 
    e ovviamente rimuovi il contenuto dell'error, almeno per quanto riguardo
    l'essere un input vuoto
    Cerca di automatizzare anche questo, visto che c'è un botto di codice da ripetere
  */

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
  let content = input.value;
  let error;

  switch (input) {
    case name:
      error = errorName;
      break;

    case email:
      error = errorEmail;
      break;

    case pass:
      error = errorPass;
      break;

    case passConf:
      error = errorConfPass;
      break;
  }

  if (content === "") {
    error.innerText = "Please complete this field";
    input.classList.add("empty-imput");
  }
}
