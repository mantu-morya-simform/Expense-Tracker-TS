/**
 * @fileoverview
 * Contains core transaction operations such as save, delete, and edit.
 * Handles interaction between DOM inputs, storage layer, and UI updates.
 */

import {
  amount,
  bank,
  category,
  description,
  historyELement,
  type,
} from "../models/dom";
import type { Transaction } from "../models/transaction";
import { ErrorMessages, SuccessMessages } from "../storage/constants";
import {
  getTransactions,
  saveTransactions,
} from "../storage/transactionStorage";
import { showTransactionsData } from "../ui/historyUI";

/**
 * Handles saving a new transaction.
 * Performs validation, constructs transaction object,
 * persists it to storage, and updates UI.
 *
 * @param {Event} e - Form submit or button click event
 * @returns {void}
 */
export function saveTransaction(e: Event): void {
  e.preventDefault();

  if (!description || !amount || !type || !bank || !category) {
    alert(ErrorMessages.FORM_NOT_FOUND);
    return;
  }

  if (!description.value) {
    alert(ErrorMessages.DESCRIPTION_REQUIRED);
    return;
  }

  if (!amount.value) {
    alert(ErrorMessages.AMOUNT_REQUIRED);
    return;
  }

  if (Number(amount.value) <= 0) {
    alert(ErrorMessages.INVALID_AMOUNT);
    return;
  }

  /**
   * Create transaction object
   * @type {Transaction}
   */
  const transaction: Transaction = {
    id: Date.now(),
    description: description.value,
    amount: Number(amount.value),
    type: type.value === "Income" ? "Income" : "Expense",
    bank: bank.value,
    category: category.value,
    date: new Date().toLocaleString(),
  };

  /** Fetch existing transactions from storage */
  const existingData = getTransactions();

  /** Add new transaction */
  existingData.push(transaction);

  /** Persist updated transactions */
  saveTransactions(existingData);

  /** Refresh UI */
  showTransactionsData(existingData);

  alert(SuccessMessages.DATA_SAVED);
}

/**
 * Initializes delete functionality using event delegation.
 * Listens for clicks on delete icons within transaction history
 * and removes the selected transaction from storage.
 *
 * @returns {void}
 */
export function deleteTransaction(): void {
  historyELement?.addEventListener("click", (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    /** Find closest delete button */
    const deleteBtn = target.closest(".delete__icon");
    if (!deleteBtn) return;

    /** Get parent transaction container */
    const transactionDiv = deleteBtn.closest(".transaction__single__history");
    if (!transactionDiv) return;

    /** Extract transaction ID */
    const id = Number(transactionDiv.getAttribute("data-id"));

    /** Retrieve stored transactions */
    const data = getTransactions();

    /** Filter out deleted transaction */
    const updatedData = data.filter((item: Transaction) => item.id !== id);

    /** Save updated data */
    saveTransactions(updatedData);

    /** Refresh UI */
    showTransactionsData(updatedData);
  });
}

/**
 * Initializes edit functionality using event delegation.
 * Redirects user to edit page with transaction ID as query param.
 *
 * @returns {void}
 */
export function editTransaction(): void {
  historyELement?.addEventListener("click", (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    /** Find closest edit button */
    const editBtn = target.closest(".edit__icon");
    if (!editBtn) return;

    /** Get parent transaction container */
    const transactionDiv = editBtn.closest(".transaction__single__history");
    if (!transactionDiv) return;

    /** Extract transaction ID */
    const id = Number(transactionDiv.getAttribute("data-id"));

    /** Redirect to edit page with ID */
    window.location.href = `../../src/pages/edit.html?id=${id}`;
  });
}
