import type { Transaction } from "../models/transaction";

const KEY = "transactions";

export function getTransactions(): Transaction[] {
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}

export function saveTransactions(data: Transaction[]) {
  localStorage.setItem(KEY, JSON.stringify(data));
}
