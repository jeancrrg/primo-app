import Api from "../config/api/Api";
import { Cliente } from "../models/cadastro/Cliente";

export async function buscarCliente(codigoPessoa: number): Promise<Cliente> {
    try {
        const response = await Api.get('/clientes', {
            params: { codigoPessoa }
        });
        return response.data;
    } catch (error: any) {
        console.error('Erro ao buscar o cliente! - ', error);
        throw new Error('Erro ao buscar o cliente!');
    }
}

export async function atualizarAvatarCliente(codigoPessoa: number, codigoAvatar: number): Promise<void> {
    try {
        const response = await Api.put('/clientes/avatar', null, {
            params: { codigoPessoa, codigoAvatar }
        });
        return response.data;
    } catch (error: any) {
        console.error('Erro ao atualizar o avatar do cliente! - ', error);
        throw new Error('Erro ao atualizar o avatar do cliente!');
    }
}