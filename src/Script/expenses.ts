const historyELement = document.querySelector(".history__data");
// get old data
const data = JSON.parse(localStorage.getItem("transactions")) || [];

let expenseData = data.filter((item) => item.type === "Expense");

function showExpenseData(expenseData) {
  if (expenseData.length === 0) {
    historyELement.innerHTML = `<img
                                class="recent__transactions__not__found__logo"
                                src="../assets/icons/not-found-error-alert-svgrepo-com.svg"
                                alt=""
                            />
                            <p>No transactions yet. Add your first one!</p>`;
  } else {
    historyELement.innerHTML = expenseData
      .map(
        (item) => `
        <div class="transaction__single__history" data-id="${item.id}">
                                ${
                                  item.type === "Income"
                                    ? `
                                <img
                                    class="total__income__logo"
                                    src="../assets/icons/arrow-up-svgrepo-com.svg"
                                    alt=""
                                />`
                                    : `<img
                                    class="total__income__logo"
                                    src="../assets/icons/arrow-down-svgrepo-com.svg"
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
                                <img class="delete__icon" src="../assets/icons/trash.svg" alt="" />
                            </div>
    `,
      )
      .join("");
  }
}

showExpenseData(expenseData);

const expenseDataElement =
  document.querySelector<HTMLElement>(".expense__record");
expenseDataElement.textContent = `${expenseData?.length} records found`;

let bankSelect = document.querySelector<HTMLSelectElement>(
  ".filter__right__select",
);

bankSelect.addEventListener("change", (e) => {
  const target = e.target;

  if (!(target instanceof HTMLSelectElement)) return;
  if (target.value !== "All__Bank") {
    let selectedBankName = target.value;
    let newExpenseData = expenseData.filter(
      (data) => data.bank === selectedBankName,
    );
    showExpenseData(newExpenseData);
    expenseDataElement.textContent = `${newExpenseData.length} records found`;
  } else {
    showExpenseData(expenseData);
    expenseDataElement.textContent = `${expenseData.length} records found`;
  }
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
  expenseData = updatedData.filter((item) => item.type === "Expense");

  showExpenseData(expenseData);
});
