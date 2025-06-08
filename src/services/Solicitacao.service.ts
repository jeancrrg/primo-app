import api from "../config/api/Api";
import { isNotEmpty } from "../utils/ValidationUtil";

export async function enviarSolicitacao(codigoSolicitacao: string): Promise<void> {
    const parametros: any = {};
    if (isNotEmpty(codigoSolicitacao)) {
        parametros.codigoSolicitacao = codigoSolicitacao;
    }
    await api.get('/solicitacoes', { params: parametros });
}