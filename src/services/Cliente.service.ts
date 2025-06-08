import Api from "../config/api/Api";
import { Cliente } from "../models/cadastro/Cliente.model";
import { FormularioCadastroCliente } from "../models/interfaces/formularios/FormularioCadastroCliente.interface";

export async function buscarCliente(codigo: number): Promise<Cliente> {
    return (await Api.get(`/clientes/${codigo}`)).data;
}

export async function cadastrarCliente(formularioCadastroCliente: FormularioCadastroCliente): Promise<void> {
    await Api.post('/clientes', formularioCadastroCliente);
}

export async function atualizarAvatarCliente(codigo: number, codigoAvatar: number): Promise<void> {
    await Api.put(`/clientes/${codigo}/avatar`, { codigo: codigoAvatar });
}

export async function inativarCliente(codigo: number): Promise<void> {
    await Api.put(`/clientes/${codigo}/inativar`, null, {});
}
