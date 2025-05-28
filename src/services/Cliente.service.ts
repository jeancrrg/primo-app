import Api from "../config/api/Api";
import { Cliente } from "../models/cadastro/Cliente";
import { FormularioCadastroCliente } from "../models/interfaces/formularios/FormularioCadastroCliente";

export async function buscarCliente(codigoPessoa: number): Promise<Cliente> {
    return (await Api.get(`/clientes/${codigoPessoa}`)).data;
}

export async function cadastrarCliente(formularioCadastroCliente: FormularioCadastroCliente): Promise<void> {
    await Api.post('/clientes', formularioCadastroCliente);
}

export async function atualizarAvatarCliente(codigoPessoa: number, codigoAvatar: number): Promise<void> {
    await Api.put(`/clientes/${codigoPessoa}/avatar`, { codigo: codigoAvatar });
}

export async function inativarCliente(codigoPessoa: number): Promise<void> {
    await Api.put(`/clientes/${codigoPessoa}/inativar`, null, {});
}
