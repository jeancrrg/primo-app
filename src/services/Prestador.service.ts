import Api from "../config/api/Api";
import { PrestadorServico } from "../models/cadastro/PrestadorServico";
import { isNotEmpty } from "../utils/ValidationUtil";

export async function buscarPrestadoresServico(termoPesquisa?: string): Promise<PrestadorServico[]> {
    try {
        const params: any = {};
        if (isNotEmpty(termoPesquisa)) {
            params.termoPesquisa = termoPesquisa;
        }
        const response = await Api.get('/prestadores-servico', { params });
        return response.data;
    } catch (error: any) {
        if (error.response?.status == 404) {
            return [];
        }
        console.error('Erro ao buscar os prestadores de serviço! - ', error);
        throw new Error('Erro ao buscar os prestadores de serviço!');
    }
}