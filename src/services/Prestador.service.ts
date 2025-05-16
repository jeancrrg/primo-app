import Api from "../config/api/Api";
import { PrestadorServico } from "../models/cadastro/PrestadorServico";
import { isNotEmpty } from "../utils/ValidationUtil";

export async function buscarPrestadoresServico(termoPesquisa?: string): Promise<PrestadorServico[]> {
    try {
        const parametros: any = {};
        if (isNotEmpty(termoPesquisa)) {
            parametros.termoPesquisa = termoPesquisa;
        }
        const response = await Api.get('/prestadores-servico', { params: parametros });
        return response.data;
    } catch (error: any) {
        if (error.response?.status == 404) {
            return [];
        }
        console.error('Erro ao buscar os prestadores de serviço! - ', error);
        throw new Error('Erro ao buscar os prestadores de serviço!');
    }
}

export async function buscarPrestadorServico(codigoPessoa: number): Promise<PrestadorServico> {
    try {
        const response = await Api.get('/prestadores-servico/unico', {
            params: { codigoPessoa }
        });
        return response.data;
    } catch (error: any) {
        console.error('Erro ao buscar o prestador de serviço! - ', error);
        throw new Error('Erro ao buscar o prestador de serviço!');
    }
}

export async function atualizarAvatarPrestador(codigoPessoa: number, codigoAvatar: number): Promise<void> {
    try {
        const response = await Api.put('/prestadores-servico/avatar', null, {
            params: { codigoPessoa, codigoAvatar }
        });
        return response.data;
    } catch (error: any) {
        console.error('Erro ao atualizar o avatar do prestador de serviço! - ', error);
        throw new Error('Erro ao atualizar o avatar do prestador de serviço!');
    }
}