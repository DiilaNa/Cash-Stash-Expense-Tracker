import { RegisterData } from "@/types/Auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const registerUser = async (userData: RegisterData) => {
  const response = await createUserWithEmailAndPassword(
    auth,
    userData.email,
    userData.password,
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

export const login = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const updateUserProfile = async (displayName: string) => {
  const user = auth.currentUser;
  if (user) {
    return await updateProfile(user, { displayName });
  }
  throw new Error("No user logged in");
};