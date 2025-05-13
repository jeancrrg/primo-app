import { LoginDTO } from './../models/dto/LoginDTO';
import Api from "../config/api/Api";
import { auth } from "../config/firebase/FirebaseConfig";
import { CadastroPrestadorDTO } from "../models/dto/CadastroPrestadorDTO";
import { CadastroClienteDTO } from '../models/dto/CadastroClienteDTO';
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, User, UserCredential } from "firebase/auth";

export async function autenticarUsuario(email: string, senha: string): Promise<User> {
    try {
        const credencialUsuario: UserCredential = await signInWithEmailAndPassword(auth, email, senha);
        return credencialUsuario.user;
    } catch (error: any) {
        console.error('Erro ao autenticar o usuário! - ', error.code);
        switch (error.code) {
            case 'auth/invalid-login-credentials':
                throw new Error('Usuário ou senha inválida! Verifique novamente');

            case 'auth/user-not-found':
                throw new Error('Usuário não encontrado. Verifique o email digitado');

            case 'auth/too-many-requests':
                throw new Error('Muitas tentativas de login. Tente novamente mais tarde');

            default:
                throw new Error('Ocorreu um erro inesperado! Entre em contato com o suporte');
        }
    }
}

export async function cadastrarUsuarioAutenticacao(email: string, senha: string): Promise<User> {
    try {
        const credencialUsuario: UserCredential = await createUserWithEmailAndPassword(auth, email, senha);
        return credencialUsuario.user;
    } catch (error: any) {
        console.error('Erro ao cadastrar o usuário de autenticação! - ', error);
        throw new Error('Erro ao cadastrar o usuário de autenticação!');
    }
}

export async function redefinirSenha(email: string): Promise<void> {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
        console.error('Erro ao redefinir a senha! - ', error);
        throw new Error('Erro ao redefinir a senha!');
    }
}

export async function realizarLogin(loginDTO: LoginDTO): Promise<string> {
    try {
        const response = await Api.post('/autenticacao/login', loginDTO);
        const token: string = response.data.token;
        return token;
    } catch (error: any) {
        console.error('Erro ao realizar o login! - ', error);
        throw new Error('Erro ao realizar o login!');
    }
}

export async function cadastrarCliente(cadastroClienteDTO: CadastroClienteDTO): Promise<void> {
    try {
        await Api.post('/autenticacao/cadastro/cliente', cadastroClienteDTO);
    } catch (error: any) {
        console.error('Erro ao cadastrar o cliente! - ', error);
        throw new Error('Erro ao cadastrar o cliente!');
    }
}

export async function cadastrarPrestador(cadastroPrestadorDTO: CadastroPrestadorDTO): Promise<void> {
    try {
        await Api.post('/autenticacao/cadastro/prestador', cadastroPrestadorDTO);
    } catch (error: any) {
        console.error('Erro ao cadastrar o prestador de serviço! - ', error);
        throw new Error('Erro ao realizar o prestador de serviço!');
    }
}

export async function sair(): Promise<void> {
    await signOut(auth);
}
