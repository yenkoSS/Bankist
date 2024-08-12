// switch to Register form function

function switchToRegister() {
  document.getElementById('login-col').style.display = 'none';
  document.getElementById('register-col').style.display = 'block';
}

// switch to LogIn form function

function switchToLogin() {
  document.getElementById('register-col').style.display = 'none';
  document.getElementById('login-col').style.display = 'block';
}

// elements queries

const emailLogInElement = document.querySelector('.emailLogIn');
const passwordLogInElement = document.querySelector('.passwordlogIn');

const emailSignUpElement = document.querySelector('.emailSignUp');
const passworSignUpElement = document.querySelector('.passwordSignUp');
const confirmedPasswordElement = document.querySelector(
  '.confirmPasswordSignUp'
);

// isBlank validator

const isBlank = (value) => (value.length > 0 ? false : true);

// isEmail validator
const isEmail = function (value) {
  const regex =
    /[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/;
  return regex.test(value);
};

// isComplex validator

const isComplex = function (value) {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
  return regex.test(value);
};

// isConfirmedPassword validator
const isConfirmedPassword = (passwordValue, confirmedPasswordVAlue) =>
  passwordValue === confirmedPasswordVAlue ? true : false;

// Email Validator

function emailValidator(emailEl) {
  const emailValue = emailEl.value;

  if (isBlank(emailValue)) {
    showError(emailEl, 'You must provide an email address.');
    return;
  }

  if (!isEmail(emailValue)) {
    showError(emailEl, 'You must provide a valid email address.');
    return;
  }

  removeError(emailEl);
  return true;
}

// LogIn Password Validator

function passwordLogInValidator(passwordEl) {
  const passwordValue = passwordEl.value;

  if (isBlank(passwordValue)) {
    showError(passwordEl, 'You must enter your password.');
    return;
  }

  removeError(passwordEl);
  return true;
}

// Register Password Validator

function passwordRegisterValidator(passwordEl) {
  const passwordValue = passwordEl.value;

  if (isBlank(passwordValue)) {
    showError(passwordEl, 'You must provide a password.');
    return;
  }

  if (!isComplex(passwordValue)) {
    showError(
      passwordEl,
      `Make sure your password contains:
      At least one lowercase alphabet
      At least one uppercase alphabet
      At least one numeric digit
      At least one special character
      Also, the total length must be in the range [8-15]`
    );

    return;
  }

  removeError(passwordEl);
  return true;
}

// Register Confirm Password Validator

function confirmPasswordValidator(passwordEl, confirmedPasswordEl) {
  const passwordValue = passwordEl.value;
  const confirmedPasswordValue = confirmedPasswordEl.value;

  if (isBlank(confirmedPasswordValue)) {
    showError(confirmedPasswordEl, 'You must confirm your password!');
    return;
  }

  if (!isConfirmedPassword(passwordValue, confirmedPasswordValue)) {
    showError(confirmedPasswordEl, 'Password not matching!');
    return;
  }

  removeError(confirmedPasswordEl);
  return true;
}

// Show error function

function showError(element, message) {
  element.style.borderColor = 'red';
  const parentElement = element.parentElement;
  const errorElement = parentElement.children[2];

  errorElement.innerText = message;
}

// Remove error function

function removeError(element) {
  element.style.borderColor = '#ced4da';
  const parentElement = element.parentElement;
  const errorElement = parentElement.children[2];
  errorElement.innerText = ' ';
}

// Show server message function

function showServerError(errMsg) {
  const serverMsgEl = document.querySelector('.serverMsg');
  serverMsgEl.innerText = errMsg;
  serverMsgEl.style.display = 'block';
}

// Remove server message function

function removeServerError() {
  const serverMsg = document.querySelector('.serverMsg');
  serverMsg.innerText = '';
  serverMsg.style.display = 'none';
}

// Fetch functions //
// Sign In
async function fetchSignIn(emailValue, passwordValue) {
  try {
    const request = await fetch(`http://127.0.0.1:8000/api/v1/user/signup`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: emailValue, password: passwordValue }),
    });

    const response = await request.json();
    if (response.code === 409) {
      showError(emailSignUpElement, response.message);
    }

    if (
      response.code === 401 &&
      response.message.startsWith('You must provide an email address')
    ) {
      showError(emailSignUpElement, response.message);
    }

    if (
      response.code === 401 &&
      response.message.startsWith('You must provide a password.')
    ) {
      showError(passworSignUpElement, response.message);
    }
  } catch (err) {
    showServerError(err.message);
  }
}

// Log In
async function fetchLogIn(emailValue, passwordValue) {
  try {
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

    if (response.code === 200) {
      window.location.replace('http://127.0.0.1:8000/dashboard');
    }

    if (
      response.code === 401 &&
      response.message === 'You must enter your email address'
    ) {
      showError(emailLogInElement, response.message);
    }

    if (response.code === 404) {
      showError(emailLogInElement, response.message);
    }

    if (
      response.code === 401 &&
      response.message === 'You must enter your password.'
    ) {
      showError(passwordLogInElement, response.message);
    }

    if (response.code === 401 && response.message === 'Invalid password.') {
      showError(passwordLogInElement, response.message);
    }
  } catch (err) {
    showServerError(err.message);
  }
}

// Buttons events //
// Log In event

const logInBtn = document.querySelector('.logInBtn');

logInBtn.addEventListener('click', function (event) {
  event.preventDefault();

  /*const isFormValid =
    emailValidator(emailLogInElement) &&
    passwordLogInValidator(passwordLogInElement); */
  if (true) {
    fetchLogIn(emailLogInElement.value, passwordLogInElement.value);
  }
});

// Register event

const signUpBtn = document.querySelector('.btnSignUp');

signUpBtn.addEventListener('click', function (event) {
  event.preventDefault();

  /*const isFormValid =
    emailValidator(emailSignUpElement) &&
    passwordRegisterValidator(passworSignUpElement) && 
  confirmPasswordValidator(passworSignUpElement, confirmedPasswordElement); */
  if (true) {
    fetchSignIn(emailSignUpElement.value, passworSignUpElement.value);
  }
});
