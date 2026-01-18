import { Timestamp } from "firebase/firestore";

export interface TransactionData {
  id?: string;
  userId: string;
  type: "income" | "expense";
  amount: number;
  description: string;
  categoryId: string;
  categoryName: string;
  createdAt: Timestamp | any;
}

export interface TransactionSummary {
  transArray: TransactionData[];
  income: number;
  expense: number;
}

export interface Totals {
  balance: number;
  income: number;
  expense: number;
}
