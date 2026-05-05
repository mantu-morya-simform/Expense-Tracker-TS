/**
 * @fileoverview
 * Handles rendering of recent transactions and summary data
 * such as total income, total expenses, and current balance.
 */

import { historyELement } from "../models/dom";
import type { Transaction } from "../models/transaction";
import notFoundIcon from "../assets/icons/not-found-error-alert-svgrepo-com.svg";
import arrowUpIcon from "../assets/icons/arrow-up-svgrepo-com.svg";
import arrowDownIcon from "../assets/icons/arrow-down-svgrepo-com.svg";
import pencilIcon from "../assets/icons/pencil-simple.svg";
import trashIcon from "../assets/icons/trash.svg";

/**
 * Fetches transaction data from localStorage, calculates financial summaries,
 * and updates the UI with recent transactions and totals.
 *
 * @returns {void}
 */
export const showTransactionsData = (data: Transaction[]): void => {
  if (!historyELement) return;
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
        src="${notFoundIcon}"
        alt="transaction__not__found__logo"
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
                src="${arrowUpIcon}"
                alt="income__logo"
              />`
              : `
              <img
                class="total__income__logo"
                src="${arrowDownIcon}"
                alt="expanse__logo"
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

          <img class="edit__icon" src="${pencilIcon}" alt="edit__btn__logo" />
          <img class="delete__icon" src="${trashIcon}" alt="delete__btn__logo" />
        </div>
      `;
    })
    .join("");
};
