export class Cliente {
    codigo: number;
    nome: string;
    telefone: string;
    email: string;
    cpf: string;
    modeloVeiculo: string;
    anoVeiculo: number;
    codigoAvatar: number;

    constructor(codigo: number, nome: string, telefone: string, email: string, cpf: string, modeloVeiculo: string, anoVeiculo: number, codigoAvatar: number) {
        this.codigo = codigo;
        this.nome = nome;
        this.telefone = telefone;
        this.email = email;
        this.cpf = cpf;
        this.modeloVeiculo = modeloVeiculo;
        this.anoVeiculo = anoVeiculo;
        this.codigoAvatar = codigoAvatar;
    }
}