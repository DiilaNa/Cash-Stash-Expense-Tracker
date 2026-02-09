import { db, auth } from "./firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  Unsubscribe,
  QuerySnapshot,
  DocumentData,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { TransactionData, TransactionSummary } from "@/types/Cash";
import { getDocs } from "firebase/firestore";

export const addTransaction = async (transactiondata: TransactionData) => {
  return await addDoc(collection(db, "transactions"), transactiondata);
};

export const deleteTransactions = async (id: string) => {
  return await deleteDoc(doc(db, "transactions", id));
};

export const getTransactionsByUser = (
  callback: (data: TransactionSummary) => void,
): Unsubscribe | undefined => {
  const user = auth.currentUser;
  if (!user) return undefined;

  const q = query(
    collection(db, "transactions"),
    where("userId", "==", user.uid),
    orderBy("createdAt", "desc"),
  );

  return onSnapshot(
    q,
    (querySnapshot: QuerySnapshot<DocumentData>) => {
      const transArray: TransactionData[] = [];
      let income = 0;
      let expense = 0;

      querySnapshot.forEach((doc) => {
        const data = doc.data() as TransactionData;

        transArray.push({ ...data, id: doc.id });

        if (data.type === "income") {
          income += data.amount;
        } else {
          expense += data.amount;
        }
      });

      callback({ transArray, income, expense });
    },
    (error) => {
      console.error("Firestore error:", error);
    },
  );
};

export const updateTransaction = async (
  id: string,
  updatedData: Partial<TransactionData>,
) => {
  const transactionRef = doc(db, "transactions", id);
  return await updateDoc(transactionRef, updatedData);
};

export const getStatsData = (
  callback: (stats: any) => void,
): Unsubscribe | undefined => {
  const user = auth.currentUser;
  if (!user) return undefined;

  const q = query(
    collection(db, "transactions"),
    where("userId", "==", user.uid),
  );

  return onSnapshot(q, (snapshot) => {
    let totalIncome = 0;
    let totalExpense = 0;
    const categoryTotals: { [key: string]: number } = {};

    snapshot.forEach((doc) => {
      const data = doc.data() as TransactionData;
      if (data.type === "income") {
        totalIncome += data.amount;
      } else {
        totalExpense += data.amount;
        categoryTotals[data.categoryName] =
          (categoryTotals[data.categoryName] || 0) + data.amount;
      }
    });

    const pieData = Object.keys(categoryTotals).map((key, index) => ({
      name: key,
      amount: categoryTotals[key],
      color: ["#1A4D2E", "#4F6F52", "#739072", "#86A789", "#D2E3C8"][index % 5],
      legendFontColor: "#2C3639",
      legendFontSize: 12,
    }));

    const topCategory = Object.keys(categoryTotals).reduce(
      (a, b) => (categoryTotals[a] > categoryTotals[b] ? a : b),
      "None",
    );

    callback({
      pieData,
      totalIncome,
      totalExpense,
      topCategory,
    });
  });
};


export const getCurrentBalance = async (): Promise<number> => {
  const user = auth.currentUser;
  if (!user) return 0;

  const q = query(
    collection(db, "transactions"),
    where("userId", "==", user.uid),
  );
  const querySnapshot = await getDocs(q);

  let income = 0;
  let expense = 0;

  querySnapshot.forEach((doc) => {
    const data = doc.data() as TransactionData;
    if (data.type === "income") income += data.amount;
    else expense += data.amount;
  });

  return income - expense;
};