import { recordElement } from "../models/dom";
import type { Transaction } from "../models/transaction";
import { showTransactionsData } from "../ui/historyUI";

export function bankFilterTransactions(e: Event, data: Transaction[]) {
  const target = e.target;

  if (!recordElement) {
    console.error("recordElement not found");
    return;
  }

  recordElement.textContent = `${data?.length} records found`;

  console.log(recordElement.textContent);

  if (!(target instanceof HTMLSelectElement)) return;

  if (target.value !== "All__Bank") {
    let selectedBankName = target.value;
    let newIncomeData = data.filter((data) => data.bank === selectedBankName);
    showTransactionsData(newIncomeData);
    recordElement.textContent = `${newIncomeData.length} records found`;
  } else {
    showTransactionsData(data);
    recordElement.textContent = `${data.length} records found`;
  }
}
