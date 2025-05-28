import Api from "../config/api/Api";
import { Cliente } from "../models/cadastro/Cliente";
import { CadastroClienteRequest } from "../models/dto/request/CadastroClienteRequest";

export async function buscarCliente(codigoPessoa: number): Promise<Cliente> {
    return (await Api.get(`/clientes/${codigoPessoa}`)).data;
}

export async function cadastrarCliente(cadastroClienteRequest: CadastroClienteRequest): Promise<void> {
    await Api.post('/clientes', cadastroClienteRequest);
}

export async function atualizarAvatarCliente(codigoPessoa: number, codigoAvatar: number): Promise<void> {
    await Api.put(`/clientes/${codigoPessoa}/avatar`, null, {
        params: { codigoPessoa, codigoAvatar }
    });
}

export async function inativarCliente(codigoPessoa: number): Promise<void> {
    await Api.put(`/clientes/${codigoPessoa}/inativar`, null, {});
}
