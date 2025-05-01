import Api from "../config/api/Api";
import { TipoServico } from "../models/TipoServico";

export async function buscarTiposServico(): Promise<TipoServico[]> {
    try {
        const response = await Api.get('/tipos-servico');
        return response.data;
    } catch (error: any) {
        console.error('Erro ao buscar os tipos de serviço! - ', error);
        return [];
    }
}