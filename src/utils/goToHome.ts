import { updateTransactionCancelBtn } from "../models/dom";

/**
 * Redirects user to home page on cancel button click.
 */
export function goToHome(): void {
  updateTransactionCancelBtn?.addEventListener("click", () => {
    window.location.href = "../../index.html";
  });
}
