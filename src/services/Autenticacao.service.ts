import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User, UserCredential } from "firebase/auth";
import { auth } from "../config/firebase/FirebaseConfig";

export async function cadastrarUsuario(email: string, senha: string): Promise<User> {
    const credencialUsuario: UserCredential = await createUserWithEmailAndPassword(auth, email, senha);
    return credencialUsuario.user;
}

export async function realizarLogin(email: string, senha: string): Promise<User> {
    const credencialUsuario: UserCredential = await signInWithEmailAndPassword(auth, email, senha);
    return credencialUsuario.user;
}

export async function sair(): Promise<void> {
    await signOut(auth);
}