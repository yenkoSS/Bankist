const body = document.querySelector("body");

async function fetchAccount() {
  const request = await fetch("http://127.0.0.1:8000/api/v1/user/myaccount");
  const response = await request.json();
  console.log(response);
  if (response.status === 401) {
    renderLoginForm();
  } else {
    renderDashboard();
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
                                    <input type="email" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label for="">Enter your password</label>
                                    <input type="text" class="form-control">
                                </div>
                                <button class="btn btn-primary mb-4">Log in</button>
                                <a class="d-block" href="#" onclick="switchToRegister()">Don't have an account? Sign up!</a>
                            </div>
                        </div>
                        <!--Register form-->
                        <div id="register-col" class="col-lg-4 col-md-8 col-sm-10">
                            <div class="form">
                                <div class="form-group">
                                    <label for="">Enter your Email</label>
                                    <input type="email" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label for="">Enter your password</label>
                                    <input type="text" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label for="">Confirm your password</label>
                                    <input type="text" class="form-control">
                                </div>
                                <button class="btn btn-danger mb-4">Sign up</button>
                                <a href="#" class="d-block" onclick="switchToLogin()">Already have an account? Log in!</a>
                            </div>
                        </div>
                    </div>
                  </div>`;

  body.insertAdjacentElement("beforebegin", html);
}

function renderDashboard() {
  const html = `<div class="app">
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
                          <button class="form-btn">Send</button>
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
                          <button class="form-btn">Request</button>
                        </form>
                        <p class="text-muted">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.2/dist/chart.umd.min.js"></script>
                <script src="app.js"></script>`;
  body.insertAdjacentElement("beforebegin", html);
}

fetchAccount();
