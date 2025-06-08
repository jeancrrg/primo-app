export class InformacaoClienteDTO {
    codigo: number;
    nome: string;
    codigoAvatar: number;

    constructor(codigo: number, nome: string, codigoAvatar: number) {
        this.codigo = codigo;
        this.nome = nome;
        this.codigoAvatar = codigoAvatar;
    }
}