import { FormularioLogin } from './../models/interfaces/formularios/FormularioLogin';
import Api from "../config/api/Api";
import { auth } from "../config/firebase/FirebaseConfig";
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, User, UserCredential } from "firebase/auth";
import Toast from 'react-native-toast-message';
import { removerCodigoPessoaLogado, removerTipoPessoaLogado, removerTokenAcesso } from './Storage.service';
import { LoginDTO } from "../models/dto/LoginDTO";

export async function autenticarUsuario(email: string, senha: string): Promise<User> {
    try {
        const credencialUsuario: UserCredential = await signInWithEmailAndPassword(auth, email, senha);
        return credencialUsuario.user;
    } catch (error: any) {
        let mensagemErro: string;
        
        switch (error.code) {
            case 'auth/invalid-login-credentials':
                mensagemErro = 'Usuário ou senha inválida! Verifique novamente';
                break;

            case 'auth/user-not-found':
                mensagemErro = 'Usuário não encontrado. Verifique o email digitado';
                break;
            
            case 'auth/too-many-requests':
                mensagemErro = 'Muitas tentativas de login. Tente novamente mais tarde';
                break;

            default:
                mensagemErro = 'Ocorreu um erro inesperado! Entre em contato com o suporte';
        }
        Toast.show({ type: 'aviso', text1: 'AVISO', text2: 'Email já possui cadastro! Realize o login' });
        throw new Error(mensagemErro);
    }
}

export async function cadastrarUsuarioAutenticacao(email: string, senha: string): Promise<User> {
    try {
        const credencialUsuario: UserCredential = await createUserWithEmailAndPassword(auth, email, senha);
        return credencialUsuario.user;
    } catch (error: any) {
        switch (error.code) {
            case 'auth/email-already-in-use':
                Toast.show({ type: 'aviso', text1: 'AVISO', text2: 'Email já possui cadastro! Realize o login' });
                throw new Error('Email já possui cadastro! Realize o login');
            default:
                Toast.show({ type: 'erro', text1: 'ERRO', text2: 'Erro ao cadastrar o usuário de autenticação!' });
                throw new Error('Erro ao cadastrar o usuário de autenticação!');
        }
    }
}

export async function redefinirSenha(email: string): Promise<void> {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
        Toast.show({ type: 'erro', text1: 'ERRO', text2: 'Erro ao redefinir a senha!' });
        throw new Error('Erro ao redefinir a senha!');
    }
}

export async function realizarLogin(FormularioLogin: FormularioLogin): Promise<LoginDTO> {
    return (await Api.post('/autenticacoes/login', FormularioLogin)).data;
}

export async function sairAplicativo(): Promise<void> {
    await signOut(auth);
    removerTokenAcesso();
    removerCodigoPessoaLogado();
    removerTipoPessoaLogado();
}
