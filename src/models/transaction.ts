export interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: "Income" | "Expense";
  bank: string;
  category: string;
  date: string;
}
