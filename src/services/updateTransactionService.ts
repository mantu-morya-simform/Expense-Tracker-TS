import { amount, bank, category, description, type } from "../models/dom";
import type { Transaction } from "../models/transaction";
import { ErrorMessages, SuccessMessages } from "../storage/constants";

/**
 * Updates an existing transaction and saves it back to localStorage.
 *
 * @param e - The event triggered by clicking the update button
 * @param id - The ID of the transaction being updated
 * @param selectedData - The original transaction data before update
 * @param data - The full list of existing transactions
 *
 * @returns void
 */
export function updateData(
  e: Event,
  id: number,
  selectedData: Transaction,
  data: Transaction[],
): void {
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
   * Create updated transaction object
   */
  const transaction: Transaction = {
    id: selectedData.id,
    description: description.value,
    amount: Number(amount.value),
    type: type.value === "Income" ? "Income" : "Expense",
    bank: bank.value,
    category: category.value,
    date: new Date().toLocaleString(),
  };

  /**
   * Remove old transaction with same ID
   */
  const newDataAfterUpdate = data.filter((item) => item.id !== id);

  /**
   * Add updated transaction to list
   */
  newDataAfterUpdate.push(transaction);

  /**
   * Save updated transactions back to localStorage
   */
  localStorage.setItem("transactions", JSON.stringify(newDataAfterUpdate));

  /**
   * Notify user and redirect to home page
   */
  alert(SuccessMessages.DATA_SAVED);
  window.location.href = "../../index.html";
}
