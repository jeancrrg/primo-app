import { PrestadorServico } from "../models/PrestadorServico";
import Api from "../api/Api";

export async function buscarPrestadoresServico(): Promise<PrestadorServico[]> {
    try {
        const response = await Api.get('/prestadores-servico');
        return response.data;
    } catch (error: any) {
        console.error('Erro ao buscar os prestadores de serviço! - ', error);
        return [];
    }
}