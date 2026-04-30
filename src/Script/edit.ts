import { updateBtn } from "../models/dom";
import type { Transaction } from "../models/transaction";
import { updateData } from "../services/updateTransactionService";
import { getTransactions } from "../storage/transactionStorage";
import { goToHome } from "../utils/goToHome";
import { loadInitialData } from "../utils/loadInitialData";

/**
 * Extracts the transaction ID from the URL query parameters.
 * Example: ?id=123
 */
const params = new URLSearchParams(window.location.search);
const id: number = Number(params.get("id"));

/**
 * Fetch all stored transactions from local storage.
 */
const data: Transaction[] = getTransactions();

/**
 * Find the selected transaction using the ID from the URL.
 * Note: This can return undefined if no matching transaction is found.
 */
const selectedData: Transaction | undefined = data.find(
  (item) => item.id === id,
);

/**
 * Load initial data into the UI form fields for editing.
 * Only runs if a valid transaction is found.
 */
if (selectedData) {
  loadInitialData(selectedData);
}

/**
 * Handle update button click event.
 * Updates the selected transaction with new values.
 */

updateBtn?.addEventListener("click", (e: Event) => {
  if (!selectedData) return;
  updateData(e, id, selectedData, data);
});

/**
 * Redirect user back to home page when needed.
 */
goToHome();
