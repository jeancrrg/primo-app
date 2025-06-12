import { FirebaseError } from "firebase/app";
import { ErroFirebaseEnum } from "../models/enum/ErroFirebase.enum";
import Toast from "react-native-toast-message";
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, User, UserCredential } from "firebase/auth";
import { auth } from "../config/firebase/FirebaseConfig";
import { removerCodigoPessoaLogado, removerTipoPessoaLogado, removerTokenAcesso } from "../services/Storage.service";

export async function autenticarUsuario(email: string, senha: string): Promise<User> {
    const credencialUsuario: UserCredential = await signInWithEmailAndPassword(auth, email, senha);
    return credencialUsuario.user;
}

export async function cadastrarUsuarioAutenticacao(email: string, senha: string): Promise<User> {
    const credencialUsuario: UserCredential = await createUserWithEmailAndPassword(auth, email, senha);
    return credencialUsuario.user;
}

export async function redefinirSenha(email: string): Promise<void> {
    await sendPasswordResetEmail(auth, email);
}

export async function sairAplicativo(): Promise<void> {
    await signOut(auth);
    removerTokenAcesso();
    removerCodigoPessoaLogado();
    removerTipoPessoaLogado();
}

export function tratarErroFirebase(error: any): void {
    const codigo: string = (error as FirebaseError).code;
    let mensagem: string;
    switch (codigo) {
        case ErroFirebaseEnum.CREDENCIAIS_LOGIN_INVALIDAS:
            mensagem = 'Email ou senha inválido!';
            break;
        case ErroFirebaseEnum.CREDENCIAIS_INVALIDAS:
            mensagem = 'Credenciais inválidas!';
            break;
        case ErroFirebaseEnum.USUARIO_NAO_ENCONTRADO:
            mensagem = 'Usuário não encontrado!';
            break;
        case ErroFirebaseEnum.MUITAS_REQUISICOES:
            mensagem = 'Muitas tentativas. Tente novamente mais tarde.';
            break;
        default:
            mensagem = 'Erro inesperado de autenticação.';
    }
    Toast.show({ type: 'aviso', text1: 'AVISO', text2: mensagem });
}
