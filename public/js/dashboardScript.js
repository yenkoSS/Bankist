$(function () {
  'use strict';
  // ==============================================================
  // Gender Js
  // ==============================================================

  Morris.Donut({
    element: 'gender_donut',
    data: [
      { value: 60, label: 'Female' },
      { value: 40, label: 'Male' },
    ],

    labelColor: '#5969ff',
    colors: ['#5969ff', '#ff407b'],

    formatter: function (x) {
      return x + '%';
    },
  });

  // ==============================================================
  //  chart bar horizontal
  // ==============================================================
  var ctx = document.getElementById('chartjs_bar_horizontal').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'horizontalBar',

    data: {
      labels: ['US', 'Brazil', 'Canada', 'UK', 'Australia', 'India', 'China'],
      datasets: [
        {
          label: 'Country',
          data: [2800, 24000, 19000, 17000, 14000, 10000, 7000],
          backgroundColor: 'rgba(89, 105, 255, 1)',
        },
      ],
    },
    options: {
      responsive: true,
      hover: false,
      legend: {
        display: true,
        position: 'bottom',

        labels: {
          fontColor: '#71748d',
          fontFamily: 'Circular Std Book',
          fontSize: 14,
        },
      },
      scales: {
        legend: {
          display: false,
        },
        yAxes: [
          {
            gridLines: {
              drawOnChartArea: false,
            },
            ticks: {
              fontSize: 14,
              fontFamily: 'Circular Std Book',
              fontColor: '#71748d',
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              drawOnChartArea: false,
            },
            ticks: {
              fontSize: 14,
              fontFamily: 'Circular Std Book',
              fontColor: '#71748d',
            },
          },
        ],
      },
    },
  });
});

async function fetchUser() {
  const cookie = document.cookie.split('=');
  const userId = cookie[1];
  console.log(userId);
  const request = await fetch(`http://127.0.0.1:8000/api/v1/user/${userId}`);
  const response = await request.json();
  console.log(response);

  displayIncomes(calcIncomes(response.data));
  displayOutcomes(calcOutcomes(response.data));
  displayTotal(calcTotal(response.data));
  displayUser(response.data.email);
}

fetchUser();

function calcIncomes(user) {
  const incomes = user.movements
    .map((mov) => mov.amount)
    .filter((amount) => amount > 0)
    .reduce((acc, curr) => acc + curr, 0);
  return incomes;
}

function calcOutcomes(user) {
  const outcomes = user.movements
    .map((mov) => mov.amount)
    .filter((amount) => amount < 0)
    .reduce((acc, curr) => acc + curr, 0);
  return Math.abs(outcomes);
}

function calcTotal(user) {
  const total = user.movements
    .map((mov) => mov.amount)
    .reduce((acc, curr), acc + curr, 0);
  return total;
}

function displayIncomes(value) {
  const incomesEl = document.querySelector('.incomes');
  incomesEl.textContent = value;
}

function displayOutcomes(value) {
  const outcomesEl = document.querySelector('.outcomes');
  outcomesEl = textContent = value;
}

function displayTotal(value) {
  const totalEl = document.querySelector('.total');
  totalEl.textContent = value;
}

function displayUser(value) {
  const usernameEl = document.querySelector('.username');
  usernameEl.textContent = value.split('@')[0];
}
