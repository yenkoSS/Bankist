$(function () {
  'use strict';
  // ==============================================================
  // Incomes/Outcomes Raport Js
  // ==============================================================

  Morris.Donut({
    element: 'statistics_donut',
    data: [
      { value: 60, label: 'Incomes' },
      { value: 40, label: 'Outcomes' },
    ],

    labelColor: '#5969ff',
    colors: ['#5969ff', '#ff407b'],

    formatter: function (x) {
      return x + '%';
    },
  });
});

async function fetchUser() {
  const cookie = document.cookie.split('=');
  const userId = cookie[1];

  const request = await fetch(`http://127.0.0.1:8000/api/v1/user/${userId}`);
  const response = await request.json();

  displayUserDetails(response.data);
  displayIncomes(calcIncomes(response.data));
  displayOutcomes(calcOutcomes(response.data));
  displayTotal(calcTotal(response.data));
  displayTotalDebt(calcTotalDebt(response.data));
  displayTransactions(response.data);
}

fetchUser();

function displayUserDetails(value) {
  const usernameEl = document.querySelector('.username');
  const joinDateEl = document.querySelector('.joinDate');
  const accountBadgeEl = document.querySelector('.accountBadge');

  usernameEl.textContent = 'Welcome,' + ' ' + value.email.split('@')[0];
  joinDateEl.textContent = 'Joining date:' + ' ' + value.joindate;
  accountBadgeEl.textContent = value.accountType;
}

function calcIncomes(user) {
  const incomes = user.movements
    .map((mov) => mov.amount)
    .filter((amount) => amount > 0)
    .reduce((acc, curr) => acc + curr, 0);
  return formatCurrency(incomes);
}

function calcOutcomes(user) {
  const outcomes = user.movements
    .map((mov) => mov.amount)
    .filter((amount) => amount < 0)
    .reduce((acc, curr) => acc + curr, 0);
  return formatCurrency(Math.abs(outcomes));
}

function calcTotal(user) {
  const total = user.movements
    .map((mov) => mov.amount)
    .reduce((acc, curr) => acc + curr, 0);
  return formatCurrency(total);
}

function calcTotalDebt(user) {
  const totalDebt = user.movements
    .filter((mov) => mov.transactionName === 'Credit')
    .map((mov) => mov.amount)
    .reduce((acc, curr) => acc + curr, 0);
  return formatCurrency(totalDebt);
}

function displayIncomes(value) {
  const incomesEl = document.querySelector('.incomes');
  incomesEl.textContent = value;
}

function displayOutcomes(value) {
  const outcomesEl = document.querySelector('.outcomes');
  outcomesEl.textContent = value;
}

function displayTotal(value) {
  const totalEl = document.querySelector('.total');
  totalEl.textContent = value;
}

function displayTotalDebt(value) {
  const totalDebtEl = document.querySelector('.totalDebt');
  totalDebtEl.textContent = value;
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

function displayTransactions(transactions) {
  const transactionsContainer = document.querySelector(
    '.transactionsContainer'
  );
  transactions.movements.forEach((transaction) => {
    const badge = transaction.amount > 0 ? 'income' : 'outcome';
    const formatedAmount = formatCurrency(transaction.amount);
    const html = `<tr>
                    <td>
                      <div class=${badge}></div>
                    </td>
                    <td>${transaction.transactionName}</td>
                    <td class="transactionAmount">${formatedAmount}</td>
                    <td class="transactionDate">${transaction.date}</td>
                  </tr>`;
    transactionsContainer.insertAdjacentHTML('afterbegin', html);
  });
}
