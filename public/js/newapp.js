const body = document.querySelector('body');

function queryElement(element) {
  return document.querySelector(element);
}

async function fetchAccount() {
  const request = await fetch('http://127.0.0.1:8000/api/v1/user/myaccount', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const response = await request.json();
  if (response.status === 'fail') {
    renderLoginForm();
  } else if (response.status === 'success') {
    console.log(response);
    renderDashboard(response.data.movements);
  }
}

function renderLoginForm() {
  const html = `<div class="container">
                  <div class="row min-vh-100 justify-content-center d-flex align-items-center">
                        <div class="col-lg-4">
                            <div class="img-container d-lg-block d-md-none">
                                <img class="img-fluid" src="img/LoginCover.jpg" alt="">
                            </div>
                        </div>
                        <div id="login-col" class="col-lg-4 col-md-8 col-sm-10">
                            <div class="form">
                                <div class="form-group">
                                    <label for="">Enter your email address</label>
                                    <input type="email" class="form-control emailLogIn">
                                    <div class="errorMsg"></div>
                                </div>
                                <div class="form-group">
                                    <label for="">Enter your password</label>
                                    <input type="text" class="form-control passwordlogIn">
                                    <div class="errorMsg">Error</div>
                                </div>
                                <button class="btn btn-primary mb-4 logInBtn">Log in</button>
                                <a class="d-block" href="#" onclick="switchToRegister()">Don't have an account? Sign up!</a>
                            </div>
                        </div>
                        <!--Register form-->
                        <div id="register-col" class="col-lg-4 col-md-8 col-sm-10">
                            <div class="form">
                                <div class="form-group">
                                    <label for="">Enter your Email</label>
                                    <input type="email" class="form-control emailSignup">
                                </div>
                                <div class="form-group">
                                    <label for="">Enter your password</label>
                                    <input type="text" class="form-control passwordSignup">
                                </div>
                                <div class="form-group">
                                    <label for="">Confirm your password</label>
                                    <input type="text" class="form-control passwordConfirmSignup">
                                </div>
                                <button class="btn btn-danger mb-4 signUpBtn">Sign up</button>
                                <a href="#" class="d-block" onclick="switchToLogin()">Already have an account? Log in!</a>
                            </div>
                        </div>
                    </div>
                  </div>
                  <!--Login Register Form script-->
                  <script type="text/javascript" src="/js/loginRegForm.js"></script>`;

  body.insertAdjacentHTML('beforeend', html);
  const signUpBtn = document.querySelector('.signUpBtn');
  const logInBtn = document.querySelector('.logInBtn');
  signUpBtn.addEventListener('click', () => {
    fetchSignUp();
  });

  logInBtn.addEventListener('click', () => {
    const emailElement = document.querySelector('.emailLogIn');
    const passwordElement = document.querySelector('.passwordlogIn');
    const isFormValid =
      emailLogInValidator(emailElement) &&
      passwordLogInValidator(passwordElement);
    if (isFormValid) {
      fetchLogIn(emailElement.value, passwordElement.value);
    }
  });
}

function renderDashboard(userData) {
  const html = `<script type="text/javascript" src="/js/dashboard.js"></script>
                <div class="app">
                  <nav class="navbar">
                    <a href="#" class="navbar-logo">
                      <i class="bi bi-bank2"></i>
                    </a>
                    <ul class="navbar-items">
                      <li>
                        <i class="bi bi-speedometer2"></i>
                        <a href="#" class="nav-button">Dashboard</a>
                      </li>
                      <li>
                        <i class="bi bi-currency-bitcoin"></i>
                        <a href="#" class="nav-button">Crypto</a>
                      </li>
                      <li>
                        <i class="bi bi-calendar-day"></i>
                        <a href="#" class="nav-button">Calendar</a>
                      </li>
                      <li>
                        <i class="bi bi-envelope"></i>
                        <a href="#" class="nav-button">Messages</a>
                      </li>
                      <li>
                        <i class="bi bi-credit-card"></i>
                        <a href="#" class="nav-button">Cards</a>
                      </li>
                    </ul>
                    <div class="navbar-bottom">
                      <a href="#" class="nav-button">Log out</a>
                      <i class="bi bi-box-arrow-right"></i>
                    </div>
                  </nav>
                  <div class="container" style="padding: 2rem; row-gap: 2rem;">
                    <div class="row">
                      <div class="col-sm-12 col-md-4 col-lg-4">
                        <div class="box" style="border-left:7px solid orangered">
                          <div class="box-text">
                            <h3 class="heading-3" style="margin-bottom: 3rem">Incomes</h3>
                            <h2 class="heading-2 incomes"></h2>
                          </div>
                          <img src="icons/income.png" alt="" />
                        </div>
                      </div>
                      <div class="col-sm-12 col-md-4 col-lg-4">
                        <div class="box" style="border-left:7px solid orangered">
                          <div class="box-text">
                            <h3 class="heading-3" style="margin-bottom: 3rem">Outcomes</h3>
                            <h2 class="heading-2 outcomes"></h2>
                          </div>
                          <img src="icons/outcomes.png" alt="" />
                        </div>
                      </div>
                      <div class="col-sm-12 col-md-4 col-lg-4">
                        <div class="box" style="border-left:7px solid orangered">
                          <div class="box-text">
                            <h3 class="heading-3" style="margin-bottom: 3rem">Total</h3>
                            <h2 class="heading-2 total"></h2>
                          </div>
                          <img src="icons/total.png" alt="" />
                        </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-6">
                      <div class="box">
                        <canvas id="myChart"></canvas>
                      </div>          
                    </div>
                    <div class="col-md-6 col-lg-6">
                      <div class="box transactions-box" style="display:flex; flex-direction: column; height:100%;">
                        <h4 class="heading-4" style="text-align:center; ">Your latest transactions</h4>          
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="d-sm-none d-lg-block col-lg-3">
                      <div class="box">
                        <canvas id="doghnutChart"></canvas> 
                      </div>        
                    </div>
                    <div class="col-md-6 col-lg-4">
                      <div class="box" style="display:flex; flex-direction: column; height:100%">
                        <h4 class="heading-4">Transfer money</h4>
                        <form action="#">
                          <div class="form-box">
                            <label for="">IBAN number</label>
                          <input type="text" placeholder="Enter IBAN number...">
                          </div>
                          <div class="form-box">
                            <label for="">Amount</label>
                          <input type="text" placeholder="Enter amount of money to be transfered...">
                          </div>
                          <button class="form-btn sendBtn">Send</button>
                        </form>
                      </div>
                    </div>
                    <div class="col-md-6 col-lg-4">
                      <div class="box" style="display:flex; flex-direction: column; justify-content: space-between; height:100%">
                        <h4 class="heading-4">Request money</h4>
                        <form action="#">
                          <div class="form-box">
                            <label for="">Amount</label>
                            <input type="text" placeholder="Enter amount of money that you need...">
                          </div>
                          <button class="form-btn reqBtn">Request</button>
                        </form>
                        <p class="text-muted">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <script src="/js/dashboard.js" type="text/javascript"></script>`;
  body.insertAdjacentHTML('beforeend', html);
  if (userData.movements) {
    displayIncomes(userData.movements);
    displayOutcomes(userData.movements);
    displayTotal(userData.movements);
    displayLatestTransactions(userData.movements);
  }

  const reqBtn = document.querySelector('.reqBtn');
  reqBtn.addEventListener('click', reqAmount(userData._id));
}

async function reqAmount(userId) {
  const request = await fetch(
    'http://127.0.0.1:8000/api/v1/user/requestAmount',
    { method: 'POST', body: { id: userId } }
  );
}

// loginform script

function switchToRegister() {
  document.getElementById('login-col').style.display = 'none';
  document.getElementById('register-col').style.display = 'block';
}

function switchToLogin() {
  document.getElementById('register-col').style.display = 'none';
  document.getElementById('login-col').style.display = 'block';
}

async function fetchSignUp() {
  const emailField = document.querySelector('.emailSignup').value;
  const passwordField = document.querySelector('.passwordSignup').value;
  const confirmPasswordField = document.querySelector(
    '.passwordConfirmSignup'
  ).value;

  if (passwordField != confirmPasswordField) {
    return alert('Password not matching.');
  }

  const request = await fetch(`http://127.0.0.1:8000/api/v1/user/signup`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: emailField,
      password: passwordField,
    }),
  });

  const response = await request.json();
  alert('User created.');
  switchToLogin();
}

// FETCH FUNCTIONS

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
    if ((response.message = 'success')) {
      fetchAccount(response.user);
    } else {
      alert(response.message);
    }
  } catch (err) {
    alert(err);
  }
}

// dashboard script

const user = {
  username: 'yenkoSS',
  password: 'myPassword',
  movements: [
    { date: '1/2/2024', amount: 1850, category: 'Salary' },
    { date: '2/2/2024', amount: -80, category: 'Taxes' },
    { date: '3/2/2024', amount: -50, category: 'Food' },
    { date: '4/2/2024', amount: -330, category: 'Bills' },
    { date: '4/2/2024', amount: -1000, category: 'Iphone 15 Pro Max' },
    { date: '4/2/2024', amount: -1000, category: 'Iphone 15 Pro Max' },
  ],
};

function calcIncome(userData) {
  const incomes = userData.movements
    .map((mov) => mov.amount)
    .filter((movement) => movement > 0)
    .reduce((curr, acc) => acc + curr, 0);
  return incomes;
}

function calcOutcome(userData) {
  const outcomes = userData.movements
    .map((mov) => mov.amount)
    .filter((mov) => mov < 0)
    .reduce((acc, curr) => acc + curr, 0);
  return Math.abs(outcomes);
}

function calcTotal(userData) {
  const total = userData.movements
    .map((mov) => mov.amount)
    .reduce((acc, curr) => acc + curr, 0);

  return total;
}

function displayIncomes(userData) {
  const incomesEl = document.querySelector('.incomes');
  incomesEl.textContent = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'usd',
  }).format(calcIncome(userData));
  console.log('function DisplayIncomes activated.');
}

function displayOutcomes(userData) {
  const outcomesEl = document.querySelector('.outcomes');
  outcomesEl.textContent = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(calcOutcome(userData));
}

function displayTotal(userData) {
  const totalEl = document.querySelector('.total');
  totalEl.textContent = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(calcTotal(userData));
}

function displayLatestTransactions(userData) {
  const transactionsBoxEl = document.querySelector('.transactions-box');
  userData.movements.map((mov) => {
    const transactionType = mov.amount > 0 ? 'label-income' : 'label-outcome';
    const html = `
            <div class="transaction-box">
              <div class=${transactionType}>
                2/2/2024
              </div>
              <p class="text-transaction">${mov.category}</p>
              <p class="text-price">${mov.amount}</p>
            </div>
    `;
    transactionsBoxEl.insertAdjacentHTML('beforeend', html);
  });
}

fetchAccount();

async function requestAmount(requestedAmount) {
  const request = await fetch(
    'http://127.0.0.1:8000/api/v1/user/requestAmount',
    {
      method: 'POST',
      body: JSON.stringify({ amount: requestedAmount }),
    }
  );
  const response = await request.json();
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
