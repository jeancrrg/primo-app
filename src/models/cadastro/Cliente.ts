export class Cliente {
    codigoPessoa: number;
    nome: string;
    telefone: string;
    email: string;
    modeloVeiculo: string;
    anoVeiculo: number;
    codigoAvatar: number;

    constructor(codigoPessoa: number, nome: string, telefone: string, email: string, modeloVeiculo: string, anoVeiculo: number, codigoAvatar: number) {
        this.codigoPessoa = codigoPessoa;
        this.nome = nome;
        this.telefone = telefone;
        this.email = email;
        this.modeloVeiculo = modeloVeiculo;
        this.anoVeiculo = anoVeiculo;
        this.codigoAvatar = codigoAvatar;
    }
}