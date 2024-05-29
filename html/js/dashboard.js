const navButtons = document.querySelectorAll(".nav-buttons");

const incomesEl = document.querySelector(".incomes");
const outcomesEl = document.querySelector(".outcomes");
const totalEl = document.querySelector(".total");
const transactionsBoxEl = document.querySelector(".transactions-box");
const calendarEl = document.querySelector(".calendar");
const cookie = document.cookie;

const user = {
  username: "yenkoSS",
  password: "myPassword",
  movements: [
    { date: "1/2/2024", amount: 1850, category: "Salary" },
    { date: "2/2/2024", amount: -80, category: "Taxes" },
    { date: "3/2/2024", amount: -50, category: "Food" },
    { date: "4/2/2024", amount: -330, category: "Bills" },
    { date: "4/2/2024", amount: -1000, category: "Iphone 15 Pro Max" },
    { date: "4/2/2024", amount: -1000, category: "Iphone 15 Pro Max" },
  ],
};

const data = {
  labels: [1, 2, 3, 4, 5, 6], //movements.map((el) => el.date),
  datasets: [
    {
      label: "Latest transactions",
      data: [10, 20, 8, 15, 25, 60], //movements.map((el) => el.amount),
      fill: true,
      tension: 0.3,
    },
  ],
};

const config = {
  type: "line",
  data: data,
};

const dataDough = {
  labels: ["Bills", "Food", "Taxes", "Others"],
  datasets: [
    {
      label: "Doghnut Data",
      data: [300, 400, 267, 160],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(49, 172, 0)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
      ],
      hoverOffset: 4,
    },
  ],
};

const configDoghnut = {
  type: "doughnut",
  data: dataDough,
};

Chart.backgroundColor = "black";

const chart = new Chart(document.getElementById("myChart"), config);
const doghnutChart = new Chart(
  document.getElementById("doghnutChart"),
  configDoghnut
);

navButtons.forEach((btn) => {
  btn.addEventListener("hover", () => {
    nav;
  });
});

function calcIncome(user) {
  const incomes = user.movements
    .map((mov) => mov.amount)
    .filter((movement) => movement > 0)
    .reduce((curr, acc) => acc + curr, 0);
  return incomes;
}

function calcOutcome(user) {
  const outcomes = user.movements
    .map((mov) => mov.amount)
    .filter((mov) => mov < 0)
    .reduce((acc, curr) => acc + curr, 0);
  return Math.abs(outcomes);
}

function calcTotal(user) {
  const total = user.movements
    .map((mov) => mov.amount)
    .reduce((acc, curr) => acc + curr, 0);

  return total;
}

function displayIncomes() {
  incomesEl.textContent = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "usd",
  }).format(calcIncome(user));
}

function displayOutcomes() {
  outcomesEl.textContent = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(calcOutcome(user));
}

function displayTotal() {
  totalEl.textContent = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(calcTotal(user));
}

function displayLatestTransactions() {
  user.movements.map((mov) => {
    const transactionType = mov.amount > 0 ? "label-income" : "label-outcome";
    const html = `
            <div class="transaction-box">
              <div class=${transactionType}>
                2/2/2024
              </div>
              <p class="text-transaction">${mov.category}</p>
              <p class="text-price">${mov.amount}</p>
            </div>
    `;
    transactionsBoxEl.insertAdjacentHTML("beforeend", html);
  });
}

displayIncomes();
displayOutcomes();
displayTotal();
displayLatestTransactions();
/*
const fetchData = async function () {
  const url = `http://localhost:8000/api/v1/user/login`;
  const data = await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      email: "myemail@email.com",
      password: "mypassword",
    }),
  });
  const response = await data.json();
  console.log(response);
  console.log(document.cookie);
};

fetchData();
*/
