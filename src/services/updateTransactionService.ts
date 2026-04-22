import { amount, bank, category, description, type } from "../models/dom";
import type { Transaction } from "../models/transaction";

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
    alert("Form elements not found");
    return;
  }

  /**
   * Validate description input
   */
  if (!description.value) {
    alert("Description Not Define");
    return;
  }

  /**
   * Validate amount input
   */
  if (!amount.value) {
    alert("Amount Not Define");
    return;
  }

  /**
   * Ensure amount is greater than 0
   */
  if (Number(amount.value) <= 0) {
    alert("Provide Correct Amount");
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
  alert("Data Update Successfully");
  window.location.href = "../../index.html";
}
