// L O G I N  /  R E G I S T E R  S W I T C H   F U N C T I O N S

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
const isEmail = function (value) {
  const regex =
    /[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/;
  return regex.test(value);
};

const isComplex = function (value) {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
  return regex.test(value);
};

const isBetween = (value) => (value.length >= 8 ? true : false);

const isConfirmedPassword = (passwordValue, confirmedPasswordVAlue) =>
  passwordValue === confirmedPasswordVAlue ? true : false;

function emailValidator(emailEl) {
  const emailValue = emailEl.value;

  if (isBlank(emailValue)) {
    showError(emailEl, 'You must provide an email address.');
    return;
  }

  console.log(isBlank(emailValue));

  if (!isEmail(emailValue)) {
    showError(emailEl, 'You must provide a valid email address.');
    return;
  }

  console.log(isEmail(emailValue));

  removeError(emailEl);
  return true;
}

function passwordValidator(passwordEl) {
  const passwordValue = passwordEl.value;
  console.log(isBlank(passwordValue));
  if (isBlank(passwordValue)) {
    showError(passwordEl, 'You must provide a password.');
    return;
  }

  console.log(passwordValue);

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

function showError(element, message) {
  element.style.borderColor = 'red';
  const parentElement = element.parentElement;
  const errorElement = parentElement.children[2];

  errorElement.innerText = message;
}

function removeError(element) {
  element.style.borderColor = '#ced4da';
  const parentElement = element.parentElement;
  const errorElement = parentElement.children[2];
  errorElement.innerText = ' ';
}

// F E T C H   S I G N / L O G   I N

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

    const response = await request.json();
    console.log(response);
  } catch (err) {
    console.log(err);
  }
}

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
    console.log(response);
    if ((response.status = 200)) {
      window.location.replace('http://127.0.0.1:8000/dashboard');
    }
  } catch (err) {
    alert(err);
  }
}

// B T N   E V E N T S

const logInBtn = document.querySelector('.logInBtn');

logInBtn.addEventListener('click', function (event) {
  event.preventDefault();
  const emailElement = document.querySelector('.emailLogIn');
  const passwordElement = document.querySelector('.passwordlogIn');
  const isFormValid =
    emailValidator(emailElement) && passwordValidator(passwordElement);
  if (isFormValid) {
    fetchLogIn(emailElement.value, passwordElement.value);
  }
});

const signUpBtn = document.querySelector('.btnSignUp');

signUpBtn.addEventListener('click', function (event) {
  event.preventDefault();
  const emailElement = document.querySelector('.emailSignUp');
  const passwordElement = document.querySelector('.passwordSignUp');
  const confirmedPasswordElement = document.querySelector(
    '.confirmPasswordSignUp'
  );

  const isFormValid =
    emailValidator(emailElement) &&
    passwordValidator(passwordElement) &&
    confirmPasswordValidator(passwordElement, confirmedPasswordElement);
  if (isFormValid) {
    fetchSignIn(emailElement.value, passwordElement.value);
    alert('User created!');
  }
});
