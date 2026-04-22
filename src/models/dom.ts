let saveBtn = document.querySelector(".add__transaction__save__button");
const historyELement = document.querySelector<HTMLElement>(".history__data");
let totalExpenseAmount = document.querySelector<HTMLElement>(
  ".total__expenses__amount",
);
let totalIncomeAmount = document.querySelector<HTMLElement>(
  ".total__income__amount",
);
let currentBalanceAmount = document.querySelector<HTMLElement>(
  ".current__balance__amount",
);
let viewAll = document.querySelector<HTMLElement>(".vier__all__transaction");

let description = document.querySelector<HTMLInputElement>(
  ".description__input",
);
let amount = document.querySelector<HTMLInputElement>(".amount__input");
let type = document.querySelector<HTMLInputElement>(".type__input");
let bank = document.querySelector<HTMLInputElement>(".bank__input");
let category = document.querySelector<HTMLInputElement>(".category__input");

let bankSelect = document.querySelector<HTMLSelectElement>(
  ".filter__right__select",
);

const recordElement = document.querySelector<HTMLElement>(
  ".transaction__record",
);

const updateTransactionCancelBtn = document.querySelector<HTMLButtonElement>(
  ".add__transaction__cancel__button",
);

let updateBtn = document.querySelector(".add__transaction__update__button");

export {
  saveBtn,
  historyELement,
  totalExpenseAmount,
  totalIncomeAmount,
  currentBalanceAmount,
  viewAll,
  description,
  amount,
  type,
  bank,
  category,
  bankSelect,
  recordElement,
  updateTransactionCancelBtn,
  updateBtn,
};
