const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));

const data = JSON.parse(localStorage.getItem("transactions") || "[]");

const selectedData = data.find((item) => item.id === id);

let updateBtn = document.querySelector(".add__transaction__update__button");
let description = document.querySelector<HTMLInputElement>(
  ".description__input",
);
let amount = document.querySelector<HTMLInputElement>(".amount__input");
let type = document.querySelector<HTMLInputElement>(".type__input");
let bank = document.querySelector<HTMLInputElement>(".bank__input");
let category = document.querySelector<HTMLInputElement>(".category__input");

function loadInitialData() {
  description.value = selectedData.description;
  amount.value = selectedData.amount;
  type.value = selectedData.type;
  bank.value = selectedData.bank;
  category.value = selectedData.category;
}
loadInitialData();

const updateData = (e) => {
  e.preventDefault();

  if (!description.value) {
    alert("Description Not Define");
    return;
  }

  if (!amount.value) {
    alert("Amount Not Define");
    return;
  }

  if (Number(amount.value) <= 0) {
    alert("Provide Correct Amount");
    return;
  }

  const transaction = {
    id: selectedData.id,
    description: description.value,
    amount: Number(amount.value),
    type: type.value,
    bank: bank.value,
    category: category.value,
    date: new Date().toLocaleString(),
  };

  const newDataAfterUpdate = data.filter((item) => item.id !== id);

  // add new updated data
  newDataAfterUpdate.push(transaction);

  // save back updated data
  localStorage.setItem("transactions", JSON.stringify(newDataAfterUpdate));
  alert("Data Update Successfully");
  window.location.href = "../../index.html";
};

updateBtn.addEventListener("click", updateData);
