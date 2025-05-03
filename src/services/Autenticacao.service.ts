import Api from "../config/api/Api";
import { auth } from "../config/firebase/FirebaseConfig";
import { CadastroPrestadorDTO } from "../models/dto/CadastroPrestadorDTO";
import { CadastroClienteDTO } from './../models/dto/CadastroClienteDTO';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User, UserCredential } from "firebase/auth";

export async function realizarLogin(email: string, senha: string): Promise<User> {
    const credencialUsuario: UserCredential = await signInWithEmailAndPassword(auth, email, senha);
    return credencialUsuario.user;
}

export async function cadastrarUsuarioAutenticacao(email: string, senha: string): Promise<User> {
    const credencialUsuario: UserCredential = await createUserWithEmailAndPassword(auth, email, senha);
    return credencialUsuario.user;
}

export async function cadastrarCliente(cadastroClienteDTO: CadastroClienteDTO): Promise<void> {
    try {
        await Api.post('/autenticacao/cadastro/cliente', cadastroClienteDTO);
    } catch (error: any) {
        console.error('Erro ao cadastrar o cliente! - ', error);
    }
}

export async function cadastrarPrestador(cadastroPrestadorDTO: CadastroPrestadorDTO): Promise<void> {
    try {
        await Api.post('/autenticacao/cadastro/prestador', cadastroPrestadorDTO);
    } catch (error: any) {
        console.error('Erro ao cadastrar o prestador de serviço! - ', error);
    }
}

export async function sair(): Promise<void> {
    await signOut(auth);
}
