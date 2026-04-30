/**
 * @fileoverview
 * Entry point for initializing transaction-related UI behavior.
 * Binds event listeners and triggers initial data rendering.
 */

import { saveBtn } from "../models/dom";
import {
  deleteTransaction,
  editTransaction,
  saveTransaction,
} from "../services/transactionService";
import { getTransactions } from "../storage/transactionStorage";
import { showTransactionsData } from "../ui/historyUI";
import { totalIncomeAndExpanse } from "../utils/calculateTotalExpanse";
import { viewAllTransaction } from "../utils/viewHistory";

/**
 * Attaches a click event listener to the save button
 * to handle saving a new transaction.
 *
 * @listens click
 */
saveBtn?.addEventListener("click", saveTransaction);

totalIncomeAndExpanse();

/**
 * Renders the most recent transactions in the UI.
 *
 * @function showRecentData
 */

const data = getTransactions();

/**
 * Get last 5 transactions for recent history display
 */
const recentData = data.slice(-5);

showTransactionsData(recentData);

/**
 * Displays all transactions (full history view).
 *
 * @function viewAllTransaction
 */
viewAllTransaction();

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
