const body = document.querySelector("body");

async function fetchDashboard() {
  const request = await fetch("http://127.0.0.1:8000/api/v1/user");
  const response = await request.json();
  console.log(response);

  if (response.status === "200") {
    const html = `<h1>You are logged in!</h1>`;
    body.insertAdjacentElement("afterend", html);
  } else {
    const html = `<h1>You must log in!</h1>`;
    body.insertAdjacentElement("afterend", html);
  }
}

fetchDashboard();
