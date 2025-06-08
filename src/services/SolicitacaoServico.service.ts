import api from "../config/api/Api";
import { SolicitacaoServicoDTO } from "../models/dto/SolicitacaoServicoDTO.model";

export async function enviarSolicitacao(solicitacaoServicoDTO: SolicitacaoServicoDTO): Promise<void> {
    await api.post('/solicitacoes-servico', solicitacaoServicoDTO);
}