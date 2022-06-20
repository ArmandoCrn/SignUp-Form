// COMPONENTS
const form = document.querySelector("form"); // Non so se serve
const submitBtn = document.querySelector("#submit");

const name = document.querySelector("#first-name");
const errorName = document.querySelector("#name-error");

const email = document.querySelector("#email");
const errorEmail = document.querySelector("#email-error");

const pass = document.querySelector("#password");
const errorPass = document.querySelector("#pass-error");
const passDisplay = document.querySelector(".pass-condition");
const showPassEye = document.querySelector("#first-eye");

const passConf = document.querySelector("#conf-password");
const errorPassConf = document.querySelector("#conf-pass-error");
const showPassConfEye = document.querySelector("#second-eye");

// EVENTS
form.addEventListener("submit", () => console.log("Done")); //non credo serva
submitBtn.addEventListener("click", btnChecker);

name.addEventListener("keyup", delay(validateName, 300));
name.addEventListener("focus", () => {
  if (name.value !== "") {
    validateName();
  }
});
name.addEventListener("blur", () => removeOkSign(errorName));

email.addEventListener("keyup", delay(validateEmail, 300));
email.addEventListener("focus", () => {
  if (email.value !== "") {
    validateEmail();
  }
});
email.addEventListener("blur", () => removeOkSign(errorEmail));

pass.addEventListener("keyup", delay(validatePass, 300));
pass.addEventListener("focus", passFocusEvent);
pass.addEventListener("blur", passBlurEvent);
showPassEye.addEventListener("click", showPass);

passConf.addEventListener("keyup", delay(validateConfPass, 300));
passConf.addEventListener("focus", () => {
  if (passConf.value !== "") {
    validateConfPass();
  }
});
passConf.addEventListener("blur", () => removeOkSign(errorPassConf));
showPassConfEye.addEventListener("click", showPass);

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
    wrongValidation(name, errorName);
  } else {
    inputFull(name, errorName);
    correctValidation(name, errorName);
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

function showPass(e) {
  const id = e.target.id;

  if (id === "first-eye") {
    changeType(pass);
  }

  if (id === "second-eye") {
    changeType(passConf);
  }
}

function changeType(input) {
  if (input.type === "password") {
    input.type = "text";
  } else {
    input.type = "password";
  }
}

function validatePass() {
  inputFull(pass, errorPass);
  const regexpPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(pass.value);

  if (!regexpPass) {
    wrongValidation(pass, errorPass);
    checkPass();
  } else {
    correctValidation(pass, errorPass);
    checkPass();
  }

  if (passConf.value !== "") {
    if (passConf.value !== pass.value) {
      wrongValidation(passConf, errorPassConf);
    } else {
      correctValidation(passConf, errorPassConf);
    }
  }
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
  checkEmpty(name, errorName);
  checkEmpty(email, errorEmail);
  checkEmpty(pass, errorPass);
  checkEmpty(passConf, errorPassConf);

  const nameState = finalCheck(name);
  const emailState = finalCheck(email);
  const passState = finalCheck(pass);
  const passConfState = finalCheck(passConf);

  if (!(nameState && emailState && passState && passConfState)) {
    e.preventDefault();
    console.log("Error");
  }
}

function finalCheck(input) {
  return input.classList.value === "correct-input";
}

function wrongValidation(input, error) {
  const message = changeErrorMessage(input);

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
      if (pass.value !== "") {
        message = "Please enter a valid password";
      }
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

//PASS FUNCTION
function passFocusEvent() {
  if (pass.value !== "") {
    validatePass();
  }
  errorPass.classList.remove("min-height");
  passDisplay.classList.remove("d-none");
}

function passBlurEvent() {
  if (pass.value !== "") {
    validatePass();
  }
  passDisplay.classList.add("d-none");
  errorPass.classList.add("min-height");
  removeOkSign(errorPass);
}

function checkPass() {
  const passValue = pass.value;
  const lengthSpan = document.querySelector(".span-length");
  const lowerSpan = document.querySelector(".span-lowercase");
  const upperSpan = document.querySelector(".span-uppercase");
  const numberSpan = document.querySelector(".span-number");

  if (passValue.length >= 8) {
    positiveCheck(lengthSpan);
  } else {
    negativeCheck(lengthSpan);
  }

  if (passValue.match(/[a-z]/)) {
    positiveCheck(lowerSpan);
  } else {
    negativeCheck(lowerSpan);
  }

  if (passValue.match(/[A-Z]/)) {
    positiveCheck(upperSpan);
  } else {
    negativeCheck(upperSpan);
  }

  if (passValue.match(/[0-9]/)) {
    positiveCheck(numberSpan);
  } else {
    negativeCheck(numberSpan);
  }
}

function positiveCheck(span) {
  span.innerText = "✓";
  span.classList.remove("error");
  span.classList.add("correct");
}

function negativeCheck(span) {
  span.innerText = "🗴";
  span.classList.add("error");
  span.classList.remove("correct");
}
