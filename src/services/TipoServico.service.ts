import Api from "../config/api/Api";
import { TipoServico } from "../models/cadastro/TipoServico";
import { isNotEmpty } from "../utils/ValidationUtil";

export async function buscarTiposServico(codigo?: number, descricao?: string): Promise<TipoServico[]> {
    const parametros: any = {};
    if (isNotEmpty(codigo)) {
        parametros.codigo = codigo;
    }
    if (isNotEmpty(descricao)) {
        parametros.descricao = descricao;
    }
    return (await Api.get('/tipos-servico', { params: parametros })).data;
}
