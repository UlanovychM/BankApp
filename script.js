'use strict';

// Simply Bank App

const account1 = {
  userName: 'Cecil Ireland',
  transactions: [500, 250, -300, 5000, -850, -110, -170, 1100],
  interest: 1.5,
  pin: 1111,
  transactionsDates: [
    '2023-10-02T14:43:31.074Z',
    '2023-10-29T11:24:19.761Z',
    '2023-11-15T10:45:23.907Z',
    '2024-02-22T12:17:46.255Z',
    '2024-02-12T15:14:06.486Z',
    '2024-03-09T11:42:26.371Z',
    '2024-05-21T07:43:59.331Z',
    '2024-10-24T15:21:20.814Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account2 = {
  userName: 'Amani Salt',
  transactions: [2000, 6400, -1350, -70, -210, -2000, 5500, -30],
  interest: 1.3,
  pin: 2222,
  transactionsDates: [
    '2023-10-02T14:43:31.074Z',
    '2023-10-29T11:24:19.761Z',
    '2023-11-15T10:45:23.907Z',
    '2024-01-22T12:17:46.255Z',
    '2024-02-12T15:14:06.486Z',
    '2024-03-09T11:42:26.371Z',
    '2024-05-21T07:43:59.331Z',
    '2024-06-22T15:21:20.814Z',
  ],
  currency: 'UAH',
  locale: 'uk-UA',
};

const account3 = {
  userName: 'Corey Martinez',
  transactions: [900, -200, 280, 300, -200, 150, 1400, -400],
  interest: 0.8,
  pin: 3333,
  transactionsDates: [
    '2023-10-02T14:43:31.074Z',
    '2023-10-29T11:24:19.761Z',
    '2023-11-15T10:45:23.907Z',
    '2024-01-22T12:17:46.255Z',
    '2024-02-12T15:14:06.486Z',
    '2024-03-09T11:42:26.371Z',
    '2024-05-21T07:43:59.331Z',
    '2024-06-22T15:21:20.814Z',
  ],
  currency: 'UAH',
  locale: 'uk-UA',
};

const account4 = {
  userName: 'Kamile Searle',
  transactions: [530, 1300, 500, 40, 190],
  interest: 1,
  pin: 4444,
  transactionsDates: [
    '2023-10-02T14:43:31.074Z',
    '2023-10-29T11:24:19.761Z',
    '2023-11-15T10:45:23.907Z',
    '2024-01-22T12:17:46.255Z',
    '2024-02-12T15:14:06.486Z',
  ],
  currency: 'EUR',
  locale: 'fr-CA',
};

const account5 = {
  userName: 'Oliver Avila',
  transactions: [630, 800, 300, 50, 120],
  interest: 1.1,
  pin: 5555,
  transactionsDates: [
    '2023-10-02T14:43:31.074Z',
    '2023-10-29T11:24:19.761Z',
    '2023-11-15T10:45:23.907Z',
    '2024-01-22T12:17:46.255Z',
    '2024-02-12T15:14:06.486Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4, account5];
let currentAccount;
let sortedTransaction = false;
const options = {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
};

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.total__value--in');
const labelSumOut = document.querySelector('.total__value--out');
const labelSumInterest = document.querySelector('.total__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerTransactions = document.querySelector('.transactions');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const form = document.querySelector('.login');
const formClose = document.querySelector('.form--close');
const formCredit = document.querySelector('.form--loan');
const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const formateTransaction = (locale, currency, transaction) =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(transaction);

//---------------------------------------------

// const now = new Date();
// const day = now.getDate();
// const month = now.getMonth();
// const year = now.getFullYear();

// const getZero = num => {
//   if (num >= 0 && num < 10) {
//     return `0${num}`;
//   } else {
//     return num;
//   }
// };

// labelDate.textContent = `${getZero(day)}/${getZero(month)}/${year}`;

//---------------------------------------------

// const getZero = num => num.padStart(2, '0');

//---------------------------------------------

// const displayDate = date => {
//   const getDayOfDate = (date1, date2) =>
//     Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));
//   const dayPass = getDayOfDate(new Date(), date);

//   if (dayPass === 0) return 'Сьогодні';
//   if (dayPass === 1) return 'Вчора';
//   if (dayPass <= 5) {
//     return `${dayPass} дні назад`;
//   } else {
//     const day = getZero(`${date.getDate()}`);
//     const month = getZero(`${date.getMonth() + 1}`);
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   }
// };

//---------------------------------------------

const displayDate = (date, locale) => {
  const getDayOfDate = (date1, date2) =>
    Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));
  const dayPass = getDayOfDate(new Date(), date);

  if (dayPass === 0) return 'Сьогодні';
  if (dayPass === 1) return 'Вчора';
  if (dayPass <= 5) {
    return `${dayPass} дні назад`;
  } else {
    return new Intl.DateTimeFormat(locale).format(date);
  }
};
//---------------------------------------------

// const now = new Date();
// const day = getZero(`${now.getDate()}`);
// const month = getZero(`${now.getMonth() + 1}`);
// const year = now.getFullYear();
//---------------------------------------------

// const locale = navigator.language;
// labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now);
//---------------------------------------------

const createNickname = nickname => {
  const userName = nickname
    .toLowerCase()
    .split(' ')
    .map(nick => nick[0])
    .join('');

  return userName;
};

const addNicknames = acc =>
  acc.forEach(item => (item.nickname = createNickname(item.userName)));

addNicknames(accounts);

const getUsersOperation = (
  { transactions, transactionsDates, locale, currency },
  sort = false
) => {
  containerTransactions.innerHTML = '';

  const currentSort = sort
    ? transactions.slice().sort((x, y) => x - y)
    : transactions;

  currentSort.map((transaction, index) => {
    const transitType = transaction > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(transactionsDates[index]);

    const transactionDate = displayDate(date, locale);

    containerTransactions.insertAdjacentHTML(
      'afterbegin',
      `<div class="transactions__row">
          <div class="transactions__type transactions__type--${transitType}">
            ${index + 1} ${transitType}
          </div>
          <div class="transactions__date">${transactionDate}</div>
          <div class="transactions__value">${formateTransaction(
            locale,
            currency,
            transaction
          )}</div>
        </div>`
    );
  });
};

const userInterface = ({ transactions, interest, locale, currency }) => {
  const deposits = transactions
    .filter(deposit => deposit > 0)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  labelSumIn.textContent = formateTransaction(locale, currency, deposits);

  const withdrawals = transactions
    .filter(withdrawal => withdrawal < 0)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const depositProc = transactions
    .filter(deposit => deposit > 0)
    .map(deposit => Math.floor((deposit * interest) / 100))
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  labelSumOut.textContent = formateTransaction(locale, currency, withdrawals);

  const balance = transactions.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  labelDate.textContent = new Intl.DateTimeFormat(locale, options).format();
  accounts.balance = balance;
  labelBalance.textContent = formateTransaction(locale, currency, balance);
  labelSumInterest.textContent = `${depositProc.toFixed(2)}%`;
};

btnLogin.addEventListener('click', e => {
  e.preventDefault();

  currentAccount = accounts.find(
    account => account.nickname === inputLoginUsername.value
  );

  if (currentAccount?.pin === +inputLoginPin.value) {
    labelWelcome.textContent = `Hello ${
      currentAccount.userName.split(' ')[0]
    }!`;
    containerApp.style.opacity = 100;
    getUsersOperation(currentAccount);
    userInterface(currentAccount);
  }
  form.reset();
});

btnTransfer.addEventListener('click', e => {
  e.preventDefault();

  const transferAmount = +inputTransferAmount.value;

  const recipientNick = String(inputTransferTo.value);

  const recipientAccount = accounts.find(
    account => account.nickname === recipientNick
  );
  inputTransferTo.value = '';
  inputTransferAmount.value = '';
  if (
    transferAmount > 0 &&
    accounts.balance >= transferAmount &&
    recipientAccount &&
    currentAccount.nickname !== recipientAccount.nickname
  ) {
    currentAccount.transactions.push(-transferAmount);
    recipientAccount.transactions.push(transferAmount);
    currentAccount.transactionsDates.push(new Date());
    getUsersOperation(currentAccount);
    userInterface(currentAccount);
  }
});

formClose.addEventListener('submit', e => {
  e.preventDefault();

  if (
    e.target.elements.user.value === currentAccount.nickname &&
    e.target.elements.pass.value === currentAccount.pin
  ) {
    const currentIndexAccounts = accounts.indexOf(
      account => account.nickname === currentAccount.nickname
    );
    accounts.splice(currentIndexAccounts, 1);
  }
  containerApp.style.opacity = 0;
  labelWelcome.textContent = 'Войдите в свой аккаунт';
  formClose.reset();
});

formCredit.addEventListener('submit', e => {
  e.preventDefault();

  const credit = Math.floor(e.target.elements.credit.value);

  if (
    credit > 0 &&
    currentAccount.transactions.some(trans => trans > (credit * 10) / 100)
  ) {
    currentAccount.transactions.push(credit);
    currentAccount.transactionsDates.push(new Date());
    userInterface(currentAccount);
    getUsersOperation(currentAccount);
  }
  formCredit.reset();
});

btnSort.addEventListener('click', e => {
  e.preventDefault();

  getUsersOperation(currentAccount, !sortedTransaction);

  sortedTransaction = !sortedTransaction;
});

currentAccount = account1;
getUsersOperation(currentAccount);
userInterface(currentAccount);
containerApp.style.opacity = 100;
