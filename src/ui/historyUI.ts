/**
 * @fileoverview
 * Handles rendering of recent transactions and summary data
 * such as total income, total expenses, and current balance.
 */

import { historyELement } from "../models/dom";
import type { Transaction } from "../models/transaction";

/**
 * Fetches transaction data from localStorage, calculates financial summaries,
 * and updates the UI with recent transactions and totals.
 *
 * @returns {void}
 */
export const showTransactionsData = (data: Transaction[]): void => {
  /**
   * Retrieve transactions from localStorage
   * Defaults to empty array if no data exists
   */

  /**
   * Render empty state if no transactions exist
   */
  if (data.length === 0) {
    historyELement.innerHTML = `
      <img
        class="recent__transactions__not__found__logo"
        src="/src/assets/icons/not-found-error-alert-svgrepo-com.svg"
        alt=""
      />
      <p>No transactions yet. Add your first one!</p>
    `;
    return;
  }

  /**
   * Render recent transactions list
   */
  historyELement.innerHTML = data
    .map((item: any) => {
      /** Extract bank details */
      const [bankName, bankExtra] = item.bank.split("__");

      /** Split date into parts */
      const [datePart, timePart] = item.date.split(",");

      return `
        <div class="transaction__single__history" data-id="${item.id}">
          
          ${
            item.type === "Income"
              ? `
              <img
                class="total__income__logo"
                src="/src/assets/icons/arrow-up-svgrepo-com.svg"
                alt=""
              />`
              : `
              <img
                class="total__income__logo"
                src="/src/assets/icons/arrow-down-svgrepo-com.svg"
                alt=""
              />`
          }

          <div class="transaction__mid">
            <p>${item.description}</p>

            <div class="transaction__mid__data">
              <p>${bankName} ${bankExtra || ""}</p>
              <p>${item.category}</p>
              <p>${datePart}</p>
              <p>${timePart}</p>
            </div>
          </div>

          <b>
            <p class="transaction__amount">₹${item.amount}</p>
          </b>

          <img class="edit__icon" src="../../src/assets/icons/pencil-simple.svg" alt="" />
          <img class="delete__icon" src="../../src/assets/icons/trash.svg" alt="" />
        </div>
      `;
    })
    .join("");
};
