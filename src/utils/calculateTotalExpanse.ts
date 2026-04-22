import {
  currentBalanceAmount,
  totalExpenseAmount,
  totalIncomeAmount,
} from "../models/dom";
import { getTransactions } from "../storage/transactionStorage";

export function totalIncomeAndExpanse() {
  if (!currentBalanceAmount || !totalIncomeAmount || !totalExpenseAmount) {
    return;
  }
  /**
   * Calculate total income
   */
  const totalIncome = getTransactions()
    .filter((item: any) => item.type === "Income")
    .reduce((acc: number, curr: any) => acc + curr.amount, 0);

  /**
   * Calculate total expenses
   */
  const totalExpenses = getTransactions()
    .filter((item: any) => item.type === "Expense")
    .reduce((acc: number, curr: any) => acc + curr.amount, 0);

  /**
   * Calculate current balance
   */
  const currentBalance = totalIncome - totalExpenses;

  /**
   * Update summary UI values
   */
  currentBalanceAmount.textContent = `₹ ${currentBalance}`;
  totalIncomeAmount.textContent = `₹ ${totalIncome}`;
  totalExpenseAmount.textContent = `₹ ${totalExpenses}`;
}
