// L O G I N  /  R E G I S T E R  S W I T C H E R

function switchToRegister() {
  document.getElementById('login-col').style.display = 'none';
  document.getElementById('register-col').style.display = 'block';
}

function switchToLogin() {
  document.getElementById('register-col').style.display = 'none';
  document.getElementById('login-col').style.display = 'block';
}

// V A L I D A T O R S

const isBlank = (value) => (value.length > 0 ? false : true);
const isEmail = (value) =>
  value.match('/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$/')
    ? true
    : false;

const isComplex = (value) =>
  value.match('/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;')
    ? true
    : false;

const isBetween = (value) => (value.length >= 8 ? true : false);

function emailLogInValidator(emailEl, passwordEl) {
  const emailValue = emailEl.value;

  if (isBlank(emailValue)) {
    showError(emailEl, 'You must provide an email address.');
  }

  if (!isEmail(emailValue)) {
    showError(emailEl, 'You must provide a valid email address.');
  }

  return true;
}

function passwordLogInValidator(passwordEl) {
  const passwordValue = passwordEl.value;

  if (isBlank(passwordValue)) {
    showError(passwordEl, 'You must provide a password.');
  }

  return true;
}

function showError(element, message) {
  element.style.borderColor = 'red';
  const parentElement = element.parentElement;
  const errorElement = parentElement.children[2];
  errorElement.style.display = 'block';
  errorElement.innerText = message;
}

function removeError(element) {
  element.style.borderColor = '#ced4da';
  const parentElement = (element.parentElement.children[2].style.display =
    'hidden');
}

async function fetchSignIn(emailValue, passwordValue) {
  try {
    const request = fetch(`http://127.0.0.1:8000/api/v1/user/signup`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: emailValue, password: passwordValue }),
    });

    const response = await response.json();
    console.log(response);
  } catch (err) {
    console.log(err);
  }
}

async function fetchLogIn(emailValue, passwordValue) {
  try {
    /*
    const emailField = document.querySelector('.emailLogIn').value;
    const passwordField = document.querySelector('.passwordlogIn').value;

    /if (!emailValue || !passwordValue) {
      return alert('You must provide an email address and a password.');
    }

    */

    const request = await fetch(`http://127.0.0.1:8000/api/v1/user/login`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: emailValue,
        password: passwordValue,
      }),
    });

    const response = await request.json();
    console.log(response);
    if ((response.status = 200)) {
      window.location.replace('http://127.0.0.1:8000/dashboard');
    }
  } catch (err) {
    alert(err);
  }
}

const logInBtn = document.querySelector('.logInBtn');

logInBtn.addEventListener('click', () => {
  const emailElement = document.querySelector('.emailLogIn');
  const passwordElement = document.querySelector('.passwordlogIn');
  const isFormValid = true && passwordLogInValidator(passwordElement);
  if (isFormValid) {
    fetchLogIn(emailElement.value, passwordElement.value);
  }
});

const signUpBtn = document.querySelector('.btnSignUp');

signUpBtn.addEventListener('click', () => {
  const emailElement = document.querySelector('.emailSignUp');
  const passwordElement = document.querySelector('.passwordSignUp');
  const isFormValid = true && passwordLogInValidator(passwordElement);
  if (isFormValid) {
    fetchSignIn(emailElement.value, passwordElement.value);
    alert('User created!');
  }
});

/*

const emailEl = document.querySelector("#email");
const passwordEl = document.querySelector("#password");
const confirmPasswordEl = document.querySelector("#confirm-password");

const form = document.querySelector("#signup");

const checkEmail = () => {
  let valid = false;
  const email = emailEl.value.trim();
  if (!isRequired(email)) {
    showError(emailEl, "Email cannot be blank.");
  } else if (!isEmailValid(email)) {
    showError(emailEl, "Email is not valid.");
  } else {
    showSuccess(emailEl);
    valid = true;
  }
  return valid;
};

const checkPassword = () => {
  let valid = false;

  const password = passwordEl.value.trim();

  if (!isRequired(password)) {
    showError(passwordEl, "Password cannot be blank.");
  } else if (!isPasswordSecure(password)) {
    showError(
      passwordEl,
      "Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)"
    );
  } else {
    showSuccess(passwordEl);
    valid = true;
  }

  return valid;
};

const checkConfirmPassword = () => {
  let valid = false;
  // check confirm password
  const confirmPassword = confirmPasswordEl.value.trim();
  const password = passwordEl.value.trim();

  if (!isRequired(confirmPassword)) {
    showError(confirmPasswordEl, "Please enter the password again");
  } else if (password !== confirmPassword) {
    showError(confirmPasswordEl, "The password does not match");
  } else {
    showSuccess(confirmPasswordEl);
    valid = true;
  }

  return valid;
};

const isEmailValid = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const isPasswordSecure = (password) => {
  const re = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  return re.test(password);
};

const isRequired = (value) => (value === "" ? false : true);
const isBetween = (length, min, max) =>
  length < min || length > max ? false : true;

const showError = (input, message) => {
  // get the form-field element
  const formField = input.parentElement;
  // add the error class
  formField.classList.remove("success");
  formField.classList.add("error");

  // show the error message
  const error = formField.querySelector("small");
  error.textContent = message;
};

const showSuccess = (input) => {
  // get the form-field element
  const formField = input.parentElement;

  // remove the error class
  formField.classList.remove("error");
  formField.classList.add("success");

  // hide the error message
  const error = formField.querySelector("small");
  error.textContent = "";
};

form.addEventListener("submit", function (e) {
  // prevent the form from submitting
  e.preventDefault();

  // validate fields
  let isEmailValid = checkEmail(),
    isPasswordValid = checkPassword(),
    isConfirmPasswordValid = checkConfirmPassword();

  let isFormValid = isEmailValid && isPasswordValid && isConfirmPasswordValid;

  // submit to the server if the form is valid
  if (isFormValid) {
  }
});

const debounce = (fn, delay = 500) => {
  let timeoutId;
  return (...args) => {
    // cancel the previous timer
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    // setup a new timer
    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

form.addEventListener(
  "input",
  debounce(function (e) {
    switch (e.target.id) {
      case "email":
        checkEmail();
        break;
      case "password":
        checkPassword();
        break;
      case "confirm-password":
        checkConfirmPassword();
        break;
    }
  })
);

const btnSubmitEl = document.querySelector(".btn-submit");

btnSubmitEl.addEventListener("click", () => {
  const emailValue = document.querySelector(".emailInput").value;
  const passwordValue = document.querySelector(".passwordInput").value;
  console.log(emailValue, passwordValue);
  async function postSign() {
    const req = fetch(
      "127.0.0.1:8000/signUp",
      { method: "POST" },
      { body: { emailValue, passwordValue } }
    );
  }

  postSign();
});
*/

// V A L I D A T O R S
