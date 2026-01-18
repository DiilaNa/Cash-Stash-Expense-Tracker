import { TransactionData } from "@/types/Cash";
import { db } from "./firebase";
import { addDoc, collection } from "firebase/firestore";

export const addTransaction =async (transactiondata: TransactionData) => {
    return await addDoc(collection(db, "transactions"), transactiondata);
}




