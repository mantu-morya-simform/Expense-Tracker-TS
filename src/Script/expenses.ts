// import { bankSelect } from "../models/dom";
import {
  deleteTransaction,
  editTransaction,
} from "../services/transactionService";
import { getTransactions } from "../storage/transactionStorage";
import { showTransactionsData } from "../ui/historyUI";
import { renderBankFilter } from "../ui/renderBankFilter";
import { bankFilterTransactions } from "../utils/bankFilterTransactions";

// get old data
const data = getTransactions();
let expenseData = data.filter((item) => item.type === "Expense");

let bankSelect = renderBankFilter("filter-container");

showTransactionsData(expenseData);

bankSelect?.addEventListener("change", (e) => {
  bankFilterTransactions(e, expenseData);
});

/**
 * Initializes delete functionality for transactions.
 * Typically binds delete event handlers to UI elements.
 *
 * @function deleteTransaction
 */
deleteTransaction();

/**
 * Initializes edit functionality for transactions.
 * Typically binds edit event handlers to UI elements.
 *
 * @function editTransaction
 */
editTransaction();
