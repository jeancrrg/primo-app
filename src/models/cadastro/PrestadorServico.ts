import { Endereco } from "./Endereco";

export class PrestadorServico {
    codigo: number;
    nome: string;
    codigoTipoServico: number;
    descricaoTipoServico: string;
    valorServico: number;
    codigoAvatar: number;
    endereco: Endereco;

    constructor(codigo: number, nome: string, codigoTipoServico: number, descricaoTipoServico: string,
                valorServico: number, codigoAvatar: number, endereco: Endereco) {
        this.codigo = codigo;
        this.nome = nome;
        this.codigoTipoServico = codigoTipoServico;
        this.descricaoTipoServico = descricaoTipoServico;
        this.valorServico = valorServico;
        this.codigoAvatar = codigoAvatar;
        this.endereco = endereco;
    }
}