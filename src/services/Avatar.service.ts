import Api from "../config/api/Api";
import { Avatar } from "../models/cadastro/Avatar";
import { isNotEmpty } from "../utils/ValidationUtil";

export async function buscarAvatares(codigo?: number): Promise<Avatar[]> {
    try {
        const parametros: any = {};
        if (isNotEmpty(codigo)) {
            parametros.codigo = codigo;
        }
        const response = await Api.get('/avatares', { params: parametros });
        return response.data;
    } catch (error: any) {
        console.error('Erro ao buscar os avatares! - ', error);
        throw new Error('Erro ao buscar os avatares!');
    }
}
