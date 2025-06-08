export class SolicitacaoServicoDTO {
    codigoCliente: number;
    codigoPrestador: number;

    constructor(codigoCliente: number, codigoPrestador: number) {
        this.codigoCliente = codigoCliente;
        this.codigoPrestador = codigoPrestador;
    }
}