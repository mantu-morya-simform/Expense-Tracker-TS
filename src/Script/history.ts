import { bankSelect } from "../models/dom";
import {
  deleteTransaction,
  editTransaction,
} from "../services/transactionService";
import { getTransactions } from "../storage/transactionStorage";
import { showTransactionsData } from "../ui/historyUI";
import { bankFilterTransactions } from "../utils/bankFilterTransactions";

const data = getTransactions();
showTransactionsData(data);

bankSelect.addEventListener("change", (e) => {
  bankFilterTransactions(e, data);
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
