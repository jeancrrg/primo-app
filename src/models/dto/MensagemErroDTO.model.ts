export class MensagemErroDTO {
    codigoErro: number;
    status: string;
    mensagem: string;

    constructor(codigoErro: number, status: string, mensagem: string) {
        this.codigoErro = codigoErro;
        this.status = status;
        this.mensagem = mensagem;
    }
    
}