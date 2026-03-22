"use strict";
const account1 = {
  owner: "Mountacir Ait Lahsen",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2,
  pin: 1111,
};
const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};
const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};
const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
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
const insertMovements = function (movements) {
  movements.forEach(function (mov, number) {
    const insertMov = `<div
              class="flex justify-between items-baseline px-8 py-6 border-b border-[#EEEEEE] ${mov < 0 ? "WITHDRAWAL" : "DEPOSIT"}"
            >
              <div class="flex gap-6">
                <p
                  class="rounded-xl bg-linear-to-br ${mov < 0 ? "from-[#FC525F] to-[#E9315B]" : "from-[#8DDA62] to-[#43B882]"} text-white text-[11px] font-[poppins] font-medium py-px px-2"
                >
                  ${++number} ${mov < 0 ? "WITHDRAWAL" : "DEPOSIT"}
                </p>
                <span class="text-[11px] font-medium text-[rgb(102,102,102)]"
                  >2/26/2020</span
                >
              </div>
              <span class="text-[17px] text-[rgb(68,68,68)]">${mov > 0 ? "" : "-"}$${mov > 0 ? mov : mov * -1}</span>
            </div>`;
    movementsElement.insertAdjacentHTML("afterbegin", insertMov);
  });
};
const totalBalance = function (movements) {
  let balance = movements.reduce((accu, mov) => accu + mov, 0);
  balanceElement.textContent = `${balance > 0 ? "" : "-"}$${balance > 0 ? balance : balance * -1}`;
};
const inBalance = function (movements) {
  let balance = movements.reduce(
    (accu, mov) => (mov > 0 ? accu + mov : accu),
    0,
  );
  InBalanceElement.textContent = `${balance > 0 ? "" : "-"}$${balance > 0 ? balance : balance * -1}`;
};
const outBalance = function (movements) {
  let balance = movements.reduce(
    (accu, mov) => (mov < 0 ? accu + mov * -1 : accu),
    0,
  );
  OutBalanceElement.textContent = `$${balance}`;
};
const interest = function (account) {
  let interest = account.movements
    .filter((mov) => mov >= 0)
    .map((mov) => (mov * account.interestRate) / 100)
    .filter((interest) => interest >= 1)
    .reduce((interest, mov) => interest + mov, 0);
  interestElement.textContent = `$${interest}`;
};
const updateClock = function () {
  const now = new Date();
  const formatted = now.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
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
const loginUpdate = function (account) {
  greetingElement.textContent = `Good Afternoon, ${account.owner.slice(0, account.owner.indexOf(" "))}!`;
  insertMovements(account.movements);
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
const Login = function (username, pin, accounts) {
  if (username == undefined || pin == undefined) {
    console.log("username or pin is not filled");
    return -1;
  }
  const account = accounts.find((account) => account.username === username);
  if (account == undefined) {
    console.log("the account does not exist");
    return -1;
  }
  if (account.pin !== pin) {
    console.log("the account does not exist");
    return -1;
  }
  loginUpdate(account);
};
createUserName(accounts);
loginElement.addEventListener("click", (e) => {
  e.preventDefault();
  Login(usernameElement.value, Number(pinElement.value), accounts);
});
