import Api from "../config/api/Api";
import { PrestadorServico } from "../models/cadastro/PrestadorServico.model";
import { CadastroPrestadorDTO } from "../models/dto/CadastroPrestadorDTO.model";
import { isNotEmpty } from "../utils/ValidationUtil";

export async function buscarPrestadoresServico(termoPesquisa?: string): Promise<PrestadorServico[]> {
    try {
        const parametros: any = {};
        if (isNotEmpty(termoPesquisa)) {
            parametros.termoPesquisa = termoPesquisa;
        }
        return (await Api.get('/prestadores-servico', { params: parametros })).data;
    } catch (error: any) {
        return [];
    }
}

export async function buscarPrestadorServico(codigo: number): Promise<PrestadorServico> {
    return (await Api.get(`/prestadores-servico/${codigo}`)).data;
}

export async function cadastrarPrestador(cadastroPrestadorDTO: CadastroPrestadorDTO): Promise<void> {
    await Api.post('/prestadores-servico', cadastroPrestadorDTO);
}

export async function atualizarAvatarPrestador(codigo: number, codigoAvatar: number): Promise<void> {
    await Api.put(`/prestadores-servico/${codigo}/avatar`, { codigo: codigoAvatar });
}

export async function inativarPrestador(codigo: number): Promise<void> {
    await Api.put(`/prestadores-servico/${codigo}/inativar`, null, {});
}
