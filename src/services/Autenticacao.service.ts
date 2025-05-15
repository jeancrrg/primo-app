import { LoginDTO } from './../models/dto/LoginDTO';
import Api from "../config/api/Api";
import { auth } from "../config/firebase/FirebaseConfig";
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, User, UserCredential } from "firebase/auth";
import { CHAVE_CODIGO_PESSOA } from '../constants/ChaveAsyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isNotEmpty } from '../utils/ValidationUtil';
import { FormularioLogin } from '../models/interfaces/formularios/FormularioLogin';
import { FormularioCadastroCliente } from '../models/interfaces/formularios/FormularioCadastroCliente';
import { CadastroPrestadorDTO } from '../models/dto/CadastroPrestadorDTO';

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
        switch (error.code) {
            case 'auth/email-already-in-use':
                throw new Error('Email já possui cadastro! Realize o login');
            default:
                throw new Error('Erro ao cadastrar o usuário de autenticação');
        }
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

export async function realizarLogin(formulario: FormularioLogin): Promise<LoginDTO> {
    try {
        const response = await Api.post('/autenticacoes/login', formulario);
        return response.data;
    } catch (error: any) {
        console.error('Erro ao realizar o login! - ', error);
        throw new Error('Erro ao realizar o login!');
    }
}

export async function cadastrarCliente(formularioCadastroCliente: FormularioCadastroCliente): Promise<void> {
    try {
        await Api.post('/autenticacoes/cadastro/cliente', formularioCadastroCliente);
    } catch (error: any) {
        console.error('Erro ao cadastrar o cliente! - ', error);
        throw new Error('Erro ao cadastrar o cliente!');
    }
}

export async function cadastrarPrestador(cadastroPrestadorDTO: CadastroPrestadorDTO): Promise<void> {
    try {
        await Api.post('/autenticacoes/cadastro/prestador', cadastroPrestadorDTO);
    } catch (error: any) {
        console.error('Erro ao cadastrar o prestador de serviço! - ', error);
        throw new Error('Erro ao realizar o prestador de serviço!');
    }
}

export async function sair(): Promise<void> {
    await signOut(auth);
}

export async function salvarCodigoPessoaLogado(codigoPessoa: number): Promise<void> {
    AsyncStorage.setItem(CHAVE_CODIGO_PESSOA, codigoPessoa.toString());
}

export async function obterCodigoPessoaLogado(): Promise<number | null> {
    let codigoPessoa: number | null = null;
    await AsyncStorage.getItem(CHAVE_CODIGO_PESSOA)
        .then(async valor => {
            if (isNotEmpty(valor)) {
                codigoPessoa = Number(valor);
            }
        });
    return codigoPessoa;
}

export async function removerCodigoPessoaLogado(): Promise<void> {
    await AsyncStorage.removeItem(CHAVE_CODIGO_PESSOA);
}
