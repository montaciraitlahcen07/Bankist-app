"use strict";
const account1 = {
  owner: "Mountacir Ait Lahsen",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2,
  pin: 1111,
  movementsDates: [
    "2026-04-12T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2026-04-23T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2026-04-06T23:36:17.929Z",
    "2026-04-13T10:51:36.790Z",
  ],
  locale: "en-US",
  currency: "EUR",
};
const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  locale: "en-GB",
  currency: "USD",
};
const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [],
  locale: "en-US",
  currency: "USD",
};
const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [],
  locale: "en-US",
  currency: "EUR",
};
const accounts = [account1, account2, account3, account4];
const movementsElement = document.querySelector(".movements");
const balanceElement = document.querySelector(".total_balance");
const InBalanceElement = document.querySelector(".in_balance");
const OutBalanceElement = document.querySelector(".out_balance");
const interestElement = document.querySelector(".interest");
const clockElement = document.querySelector(".clock");
const usernameElement = document.querySelector(".username");
const pinElement = document.querySelector(".pin");
const loginElement = document.querySelector(".login-button");
const greetingElement = document.querySelector(".greeting");
const mainElement = document.querySelector(".main");
const summaryElement = document.querySelector(".summary");
const transferToElement = document.querySelector(".transfer_to");
const transferAmountElement = document.querySelector(".transfer_amount");
const transferButtonElement = document.querySelector(".transfer_button");
const closeUserElement = document.querySelector(".close_user");
const closePinElement = document.querySelector(".close_pin");
const closeButtonElement = document.querySelector(".close_button");
const loanAmountElement = document.querySelector(".loan_amount");
const loanButtonElement = document.querySelector(".loan_button");
const sortElement = document.querySelector(".sort");
let sorted = false;
const insertMovements = function (account) {
  movementsElement.innerHTML = "";
  const acc = account.movements.map((mov, i) => {
    return { movements: mov, movementsDates: account.movementsDates[i] };
  });
  if (sorted) acc.sort((a, b) => a.movements - b.movements);
  acc.forEach(function (obj, number) {
    let DisplayDate;
    console.log(
      (new Date() - new Date(obj.movementsDates)) / (1000 * 60 * 60 * 24),
    );
    let daysPassed = Math.round(
      Math.abs(
        (new Date() - new Date(obj.movementsDates)) / (1000 * 60 * 60 * 24),
      ),
    );
    if (daysPassed === 0) DisplayDate = "Today";
    else if (daysPassed === 1) DisplayDate = "Yesterday";
    else if (daysPassed <= 7)
      DisplayDate = `${Math.round((new Date() - new Date(obj.movementsDates)) / (1000 * 60 * 60 * 24))} days ago`;
    else
      DisplayDate = new Intl.DateTimeFormat(account.locale, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(new Date(obj.movementsDates));
    const insertMov = `<div
              class="flex justify-between items-baseline px-8 py-6 border-b border-[#EEEEEE] ${obj.movements < 0 ? "WITHDRAWAL" : "DEPOSIT"}"
            >
              <div class="flex gap-6">
                <p
                  class="rounded-xl bg-linear-to-br ${obj.movements < 0 ? "from-[#FC525F] to-[#E9315B]" : "from-[#8DDA62] to-[#43B882]"} text-white text-[11px] font-[poppins] font-medium py-px px-2"
                >
                  ${++number} ${obj.movements < 0 ? "WITHDRAWAL" : "DEPOSIT"}
                </p>
                <span class="text-[11px] font-medium text-[rgb(102,102,102)]"
                  >${DisplayDate}</span
                >
              </div>
              <span class="text-[17px] text-[rgb(68,68,68)]">${new Intl.NumberFormat(account.locale, {style: 'currency', currency: account.currency}).format(obj.movements)}</span>
            </div>`;
    movementsElement.insertAdjacentHTML("afterbegin", insertMov);
  });
};
const totalBalance = function (movements) {
  let balance = movements.reduce((accu, mov) => accu + mov, 0);
  
  balanceElement.textContent = new Intl.NumberFormat('en-us', {style: 'currency', currency: account.currency}).format(balance);
};
const inBalance = function (movements) {
  let balance = movements.reduce(
    (accu, mov) => (mov > 0 ? accu + mov : accu),
    0,
  );
  InBalanceElement.textContent = new Intl.NumberFormat('en-us', {style: 'currency', currency: account.currency}).format(balance);
};
const outBalance = function (movements) {
  let balance = movements.reduce(
    (accu, mov) => (mov < 0 ? accu + mov * -1 : accu),
    0,
  );
  OutBalanceElement.textContent = new Intl.NumberFormat('en-us', {style: 'currency', currency: account.currency}).format(balance);
};
const interest = function (account) {
  let interest = account.movements
    .filter((mov) => mov >= 0)
    .map((mov) => (mov * account.interestRate) / 100)
    .filter((interest) => interest >= 1)
    .reduce((interest, mov) => interest + mov, 0)
    .toFixed(2);
  interestElement.textContent = new Intl.NumberFormat('en-us', {style: 'currency', currency: account.currency}).format(interest);
};
const updateClock = function () {
  const now = new Date();
  const formatted = new Intl.DateTimeFormat(account.locale, {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(now);
  clockElement.textContent = formatted;
};
const createUserName = function (accounts) {
  accounts.forEach(function (account) {
    account.username = account.owner
      .toLowerCase()
      .split(" ")
      .map((user) => user[0])
      .join("");
  });
};
const updateData = function (account) {
  greetingElement.textContent = `Good Afternoon, ${account.owner.slice(0, account.owner.indexOf(" "))}!`;
  insertMovements(account);
  totalBalance(account.movements);
  inBalance(account.movements);
  outBalance(account.movements);
  interest(account);
  setInterval(updateClock, 1000);
  updateClock();
  mainElement.classList.remove("opacity-0");
  summaryElement.classList.remove("opacity-0");
  usernameElement.value = "";
  pinElement.value = "";
  usernameElement.blur();
  pinElement.blur();
};
// the account who is active right now the one that could transfer money, loan and close the account
let account = null;
const Login = function (username, pin, accounts) {
  sorted = false;
  if (username == undefined || pin == undefined) {
    ("username or pin is not filled");
    usernameElement.value = "";
    pinElement.value = "";
    usernameElement.blur();
    pinElement.blur();
    return -1;
  }
  account = accounts.find((acc) => acc.username === username);
  if (account == undefined) {
    usernameElement.value = "";
    pinElement.value = "";
    usernameElement.blur();
    pinElement.blur();
    return -1;
  }
  if (account.pin !== pin) {
    return -1;
  }
  updateData(account);
};
const transferMoney = function (transferTo, Amount, accounts, account) {
  sorted = false;
  if (transferTo == undefined || Amount == undefined) {
    transferToElement.value = "";
    transferAmountElement.value = "";
    transferToElement.blur();
    transferAmountElement.blur();
    return -1;
  }
  if (
    account.movements.reduce((accu, mov) => accu + mov, 0) < Amount ||
    Amount <= 0 ||
    account.username === transferTo
  ) {
    transferToElement.value = "";
    transferAmountElement.value = "";
    transferToElement.blur();
    transferAmountElement.blur();
    return -1;
  }
  const ReceiverAccount = accounts.find((acc) => acc.username === transferTo);
  if (ReceiverAccount == undefined) {
    transferToElement.value = "";
    transferAmountElement.value = "";
    transferToElement.blur();
    transferAmountElement.blur();
    return -1;
  }
  account.movements.push(Amount * -1);
  account.movementsDates.push(new Date().toISOString());
  ReceiverAccount.movements.push(Amount);
  ReceiverAccount.movementsDates.push(new Date().toISOString());
  transferToElement.value = "";
  transferAmountElement.value = "";
  transferToElement.blur();
  transferAmountElement.blur();
};
const closeAccount = function (user, pin, accounts, account) {
  sorted = false;
  if (user == undefined || pin == undefined) {
    closeUserElement.value = "";
    closePinElement.value = "";
    closeUserElement.blur();
    closePinElement.blur();
    return -1;
  }
  if (user !== account.username || Number(pin) !== account.pin) {
    closeUserElement.value = "";
    closePinElement.value = "";
    closeUserElement.blur();
    closePinElement.blur();
    return -1;
  }
  accounts.splice(
    accounts.findIndex((account) => account.username === user),
    1,
  );
  mainElement.classList.add("opacity-0");
  summaryElement.classList.add("opacity-0");
  closeUserElement.value = "";
  closePinElement.value = "";
  closeUserElement.blur();
  closePinElement.blur();
};
const loanRequest = function (amount, account) {
  sorted = false;
  if (
    amount < 0 ||
    amount == undefined ||
    !account.movements.some((mov) => mov > amount * 0.1)
  ) {
    loanAmountElement.value = "";
    loanAmountElement.blur();
    return -1;
  }
  account.movements.push(amount);
  account.movementsDates.push(new Date().toISOString());
  loanAmountElement.value = "";
  loanAmountElement.blur();
};
const sorting = function () {
  sorted = !sorted;
  insertMovements(account);
};
createUserName(accounts);
loginElement.addEventListener("click", (e) => {
  e.preventDefault();
  Login(usernameElement.value, Number(pinElement.value), accounts);
});
transferButtonElement.addEventListener("click", (e) => {
  e.preventDefault();
  transferMoney(
    transferToElement.value,
    Number(transferAmountElement.value),
    accounts,
    account,
  );
  updateData(account);
});
loanButtonElement.addEventListener("click", (e) => {
  e.preventDefault();
  loanRequest(Number(loanAmountElement.value), account);
  updateData(account);
});
closeButtonElement.addEventListener("click", (e) => {
  e.preventDefault();
  closeAccount(
    closeUserElement.value,
    closePinElement.value,
    accounts,
    account,
  );
});
sortElement.addEventListener("click", sorting);
