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
const movementsElement = document.querySelector(".movements");
const balanceElement = document.querySelector(".total_balance");
const clockElement = document.querySelector(".clock");
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
  let balance = 0;
  for (let i = 0; i < movements.length; i++) balance += movements[i];
  balanceElement.textContent = `${balance > 0 ? "" : "-"}$${balance > 0 ? balance : balance * -1}`;
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
insertMovements(account1.movements);
totalBalance(account1.movements);
setInterval(updateClock, 1000);
updateClock();