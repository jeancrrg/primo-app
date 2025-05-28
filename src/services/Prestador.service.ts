import Api from "../config/api/Api";
import { PrestadorServico } from "../models/cadastro/PrestadorServico";
import { CadastroPrestadorDTO } from "../models/dto/CadastroPrestadorDTO";
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

export async function buscarPrestadorServico(codigoPessoa: number): Promise<PrestadorServico> {
    return (await Api.get(`/prestadores-servico/${codigoPessoa}`)).data;
}

export async function cadastrarPrestador(cadastroPrestadorDTO: CadastroPrestadorDTO): Promise<void> {
    await Api.post('/prestadores-servico', cadastroPrestadorDTO);
}

export async function atualizarAvatarPrestador(codigoPessoa: number, codigoAvatar: number): Promise<void> {
    await Api.put(`/prestadores-servico/${codigoPessoa}/avatar`, { codigo: codigoAvatar });
}

export async function inativarPrestador(codigoPessoa: number): Promise<void> {
    await Api.put(`/prestadores-servico/${codigoPessoa}/inativar`, null, {});
}
