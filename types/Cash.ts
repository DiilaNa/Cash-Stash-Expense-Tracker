import { Timestamp } from "firebase/firestore";

export interface TransactionData {
  userId: string;
  type: "income" | "expense"; 
  amount: number;
  description: string;
  categoryId: string;
  categoryName: string;
  createdAt: Timestamp | any;
}
