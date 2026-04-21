const historyELement = document.querySelector(".history__data");
// get old data
const data = JSON.parse(localStorage.getItem("transactions")) || [];

function showHistoryData(data) {
  if (data.length === 0) {
    historyELement.innerHTML = `<img
                                class="recent__transactions__not__found__logo"
                                src="../assets/icons/not-found-error-alert-svgrepo-com.svg"
                                alt=""
                            />
                            <p>No transactions yet. Add your first one!</p>`;
  } else {
    console.log(data);
    historyELement.innerHTML = data
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
                                 <img class="edit__icon" src="../assets/icons/pencil-simple.svg" alt="" />
                                <img class="delete__icon" src="../assets/icons/trash.svg" alt="" />
                            </div>
    `,
      )
      .join("");
  }
}
showHistoryData(data);

const historyData = document.querySelector<HTMLElement>(".history__record");
historyData.textContent = `${data?.length} records found`;

let bankSelect = document.querySelector<HTMLSelectElement>(
  ".filter__right__select",
);

bankSelect.addEventListener("change", (e) => {
  const target = e.target;

  if (!(target instanceof HTMLSelectElement)) return;
  if (target.value !== "All__Bank") {
    let selectedBankName = target.value;
    let newHistoryData = data.filter((data) => data.bank === selectedBankName);
    showHistoryData(newHistoryData);
    historyData.textContent = `${newHistoryData.length} records found`;
  } else {
    showHistoryData(data);
    historyData.textContent = `${data.length} records found`;
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

  showHistoryData(updatedData);
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
