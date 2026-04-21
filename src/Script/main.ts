let saveBtn = document.querySelector(".add__transaction__save__button");
const saveData = (e) => {
  e.preventDefault();
  let description = document.querySelector<HTMLInputElement>(
    ".description__input",
  ).value;
  let amount = document.querySelector<HTMLInputElement>(".amount__input").value;
  let type = document.querySelector<HTMLInputElement>(".type__input").value;
  let bank = document.querySelector<HTMLInputElement>(".bank__input").value;
  let category =
    document.querySelector<HTMLInputElement>(".category__input").value;

  if (!description) {
    alert("Description Not Define");
    return;
  }

  if (!amount) {
    alert("Amount Not Define");
    return;
  }

  if (Number(amount) <= 0) {
    alert("Provide Correct Amount");
    return;
  }

  const transaction = {
    id: Date.now(),
    description,
    amount: Number(amount),
    type,
    bank,
    category,
    date: new Date().toLocaleString(),
  };
  // get old data
  const existingData = JSON.parse(localStorage.getItem("transactions")) || [];
  // add new data
  existingData.push(transaction);
  // save back
  localStorage.setItem("transactions", JSON.stringify(existingData));
  showRecentData();
  alert("Data Saved Sucessfully");
};

saveBtn.addEventListener("click", saveData);

//history

const historyELement = document.querySelector(".history__data");
// get old data

const showRecentData = () => {
  const data = JSON.parse(localStorage.getItem("transactions")) || [];
  const recentData = data.slice(-5);
  let totalExpenseAmount = document.querySelector(".total__expenses__amount");
  let totalIncomeAmount = document.querySelector(".total__income__amount");
  let currentBalanceAmount = document.querySelector(
    ".current__balance__amount",
  );

  const totalIncome = data
    .filter((item) => item.type === "Income")
    .reduce((acc, curr) => {
      return acc + curr.amount;
    }, 0);

  const totalExpenses = data
    .filter((item) => item.type === "Expense")
    .reduce((acc, curr) => {
      return acc + curr.amount;
    }, 0);

  const currentBalance = totalIncome - totalExpenses;

  currentBalanceAmount.textContent = `₹ ${currentBalance}`;
  totalIncomeAmount.textContent = `₹ ${totalIncome}`;
  totalExpenseAmount.textContent = `₹ ${totalExpenses}`;

  if (recentData.length === 0) {
    historyELement.innerHTML = `<img
                                class="recent__transactions__not__found__logo"
                                src="/src/assets/icons/not-found-error-alert-svgrepo-com.svg"
                                alt=""
                            />
                            <p>No transactions yet. Add your first one!</p>`;
  } else {
    console.log(recentData);
    historyELement.innerHTML = recentData
      .map(
        (item) => `
        <div class="transaction__single__history" data-id="${item.id}">
                                ${
                                  item.type === "Income"
                                    ? `
                                <img
                                    class="total__income__logo"
                                    src="/src/assets/icons/arrow-up-svgrepo-com.svg"
                                    alt=""
                                />`
                                    : `<img
                                    class="total__income__logo"
                                    src="/src/assets/icons/arrow-down-svgrepo-com.svg"
                                    alt=""
                                />`
                                }
                                <div class="transaction__mid">
                                    <p>${item.description}</p>
                                    <div class="transaction__mid__data">
                                        <p>${item.bank.split("__")[0]} ${!item.bank.split("__")[1] ? "" : item.bank.split("__")[1]}</p>
                                        <p>${item.category}</p>
                                        <p>${item.date.split(",")[0]}</p>
                                        <p>${item.date.split(",")[1]}</p>
                                    </div>
                                </div>
                                <b><p class="transaction__amount">₹${item.amount}</p></b>
                                  <img class="edit__icon" src="./src/assets/icons/pencil-simple.svg" alt="" />
                                  <img class="delete__icon" src="./src/assets/icons/trash.svg" alt="" />
                            </div>
    `,
      )
      .join("");
  }
};

showRecentData();

let viewAll = document.querySelector(".vier__all__transaction");

viewAll.addEventListener("click", () => {
  window.location.href = "../../src/pages/history.html";
});

historyELement?.addEventListener("click", (e: MouseEvent) => {
  const target = e.target as HTMLElement;

  const deleteBtn = target.closest(".delete__icon");
  if (!deleteBtn) return;

  const transactionDiv = deleteBtn.closest(".transaction__single__history");
  if (!transactionDiv) return;

  const id = Number(transactionDiv.getAttribute("data-id"));

  const data = JSON.parse(localStorage.getItem("transactions") || "[]");

  const updatedData = data.filter((item) => item.id !== id);

  localStorage.setItem("transactions", JSON.stringify(updatedData));

  showRecentData();
});

historyELement?.addEventListener("click", (e: MouseEvent) => {
  const target = e.target as HTMLElement;

  const editBtn = target.closest(".edit__icon");
  if (!editBtn) return;

  const transactionDiv = editBtn.closest(".transaction__single__history");
  if (!transactionDiv) return;

  const id = Number(transactionDiv.getAttribute("data-id"));

  window.location.href = `../../src/pages/edit.html?id=${id}`;
});
