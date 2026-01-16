import { RegisterData } from "@/types/Auth";
import { createUserWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const registerUser = async (userData: RegisterData) => {
  const response = await createUserWithEmailAndPassword(
    auth,
    userData.email,
    userData.password
  );
  await updateProfile(response.user, { displayName: userData.fullname });
  await setDoc(doc(db, "users", response.user.uid), {
    fullname: userData.fullname,
    role: "USER",
    email: userData.email,
    createdAt: new Date(),
  });
  return response.user;
};

export const logoutUser = async () => {
  await signOut(auth);
  AsyncStorage.clear();
  return;
};