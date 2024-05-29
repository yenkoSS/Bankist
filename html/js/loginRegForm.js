const bodyEl = document.querySelector("body");

function switchToRegister() {
  document.getElementById("login-col").style.display = "none";
  document.getElementById("register-col").style.display = "block";
}

function switchToLogin() {
  document.getElementById("register-col").style.display = "none";
  document.getElementById("login-col").style.display = "block";
}

async function authentication() {
  const url = `http://127.0.0.1:8000/api/v1/user/login`;
  const data = await fetch(url, {
    credentials: "include",
    origin: "http://localhost:8000/",
    method: "POST",
    mode: "cors",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      email: "myemail@email.com",
      password: "mypassword",
    }),
  });
  const response = await data.json();
  console.log(document.cookies);
}
