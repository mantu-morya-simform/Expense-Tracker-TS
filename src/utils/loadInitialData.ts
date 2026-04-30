import { amount, bank, category, description, type } from "../models/dom";
import type { Transaction } from "../models/transaction";

/**
 * Load transaction data into form fields.
 * @param selectedData - Transaction to display in the form
 */
export function loadInitialData(selectedData: Transaction): void {
  if (!description || !amount || !type || !bank || !category) {
    return;
  }

  description.value = selectedData.description;
  amount.value = String(selectedData.amount);
  type.value = selectedData.type;
  bank.value = selectedData.bank;
  category.value = selectedData.category;
}
