import { TipoPessoaEnum } from "../enum/TipoPessoa.enum";

export class LoginDTO {
    codigoPessoa: number;
    token: string;
    tipoPessoa: TipoPessoaEnum;

    constructor(codigoPessoa: number, token: string, tipoPessoa: TipoPessoaEnum) {
        this.codigoPessoa = codigoPessoa;
        this.token = token;
        this.tipoPessoa = tipoPessoa;
    }
}