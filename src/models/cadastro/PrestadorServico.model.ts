import { Endereco } from "./Endereco.model";

export class PrestadorServico {
    codigo: number;
    nome: string;
    telefone: string;
    email: string;
    cnpj: string;
    codigoTipoServico: number;
    descricaoTipoServico: string;
    valorServico: number;
    codigoAvatar: number;
    endereco: Endereco;

    constructor(codigo: number, nome: string, telefone: string, email: string, cnpj: string,
                codigoTipoServico: number, descricaoTipoServico: string, valorServico: number, codigoAvatar: number, endereco: Endereco) {
        this.codigo = codigo;
        this.nome = nome;
        this.telefone = telefone;
        this.email = email;
        this.cnpj = cnpj;
        this.codigoTipoServico = codigoTipoServico;
        this.descricaoTipoServico = descricaoTipoServico;
        this.valorServico = valorServico;
        this.codigoAvatar = codigoAvatar;
        this.endereco = endereco;
    }
}