/**
 * @fileoverview
 * Handles navigation to the full transaction history page.
 */

import { viewAll } from "../models/dom";

/**
 * Attaches a click event listener to the "View All" button.
 * Redirects the user to the transaction history page.
 *
 * @returns {void}
 */
export function viewAllTransaction(): void {
  viewAll?.addEventListener("click", () => {
    /**
     * Navigate to history page
     */
    window.location.href = "../../src/pages/history.html";
  });
}
