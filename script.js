'use strict';

// Simply Bank App

const account1 = {
  userName: 'Cecil Ireland',
  transactions: [500, 250, -300, 5000, -850, -110, -170, 1100],
  interest: 1.5,
  pin: 1111,
};

const account2 = {
  userName: 'Amani Salt',
  transactions: [2000, 6400, -1350, -70, -210, -2000, 5500, -30],
  interest: 1.3,
  pin: 2222,
};

const account3 = {
  userName: 'Corey Martinez',
  transactions: [900, -200, 280, 300, -200, 150, 1400, -400],
  interest: 0.8,
  pin: 3333,
};

const account4 = {
  userName: 'Kamile Searle',
  transactions: [530, 1300, 500, 40, 190],
  interest: 1,
  pin: 4444,
};

const account5 = {
  userName: 'Oliver Avila',
  transactions: [630, 800, 300, 50, 120],
  interest: 1.1,
  pin: 5555,
};

const accounts = [account1, account2, account3, account4, account5];

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

let currentAccount;

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

const getUsersOperation = ({ transactions }, sort = false) => {
  containerTransactions.innerHTML = '';

  const currentSort = sort
    ? transactions.slice().sort((x, y) => x - y)
    : transactions;

  currentSort.map((transaction, index) => {
    const transitType = transaction > 0 ? 'deposit' : 'withdrawal';

    containerTransactions.insertAdjacentHTML(
      'afterbegin',
      `<div class="transactions__row">
          <div class="transactions__type transactions__type--${transitType}">
            ${index + 1} ${transitType}
          </div>
          
          <div class="transactions__value">${transaction}$</div>
        </div>`
    );
  });
};

const userInterface = ({ transactions, interest }) => {
  const deposits = transactions
    .filter(deposit => deposit > 0)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  labelSumIn.textContent = `${deposits}$`;

  const withdrawals = transactions
    .filter(withdrawal => withdrawal < 0)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const depositProc = transactions
    .filter(deposit => deposit > 0)
    .map(deposit => Math.floor((deposit * interest) / 100))
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  labelSumOut.textContent = `${withdrawals}$`;

  const balance = transactions.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  accounts.balance = balance;
  labelBalance.textContent = `${balance}$`;
  labelSumInterest.textContent = `${depositProc}%`;
};

btnLogin.addEventListener('click', e => {
  e.preventDefault();

  currentAccount = accounts.find(
    account => account.nickname === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
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

  const transferAmount = Number(inputTransferAmount.value);

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

  const credit = +e.target.elements.credit.value;
  console.log(credit);

  if (
    credit > 0 &&
    currentAccount.transactions.some(trans => trans > (credit * 10) / 100)
  ) {
    currentAccount.transactions.push(credit);
    userInterface(currentAccount);
    getUsersOperation(currentAccount);
  }
  formCredit.reset();
});

let sortedTransaction = false;

btnSort.addEventListener('click', e => {
  e.preventDefault();

  getUsersOperation(currentAccount, !sortedTransaction);

  sortedTransaction = !sortedTransaction;
  console.log('click');
});
